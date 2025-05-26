import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as argon2 from 'argon2';
import process from 'node:process';
import jwt from 'jsonwebtoken';
import { Document } from 'mongoose';

const ARGON2_OPTIONS = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

export const JWT_SECRET: string = process.env.JWT_SECRET || 'defaultSecret';

export interface UserDoc extends Document, User {
  checkPassword(password: string): Promise<boolean>;
  generateToken: () => void;
}

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, enum: ['admin', 'user'], default: 'user' })
  role: string;

  @Prop({ required: true })
  token: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<UserDoc>('save', async function (this: UserDoc) {
  if (!this.isModified('password')) return;
  this.password = await argon2.hash(this.password, ARGON2_OPTIONS);
});

UserSchema.methods.checkPassword = async function (
  this: UserDoc,
  password: string,
) {
  return await argon2.verify(this.password, password);
};

UserSchema.methods.generateToken = function (this: UserDoc) {
  this.token = jwt.sign({ id: this._id }, JWT_SECRET, { expiresIn: '30d' });
};

UserSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    delete returnedObject.password;
    return returnedObject;
  },
});
