import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ArtistDocument = Artist & Document;

@Schema()
export class Artist {
  @Prop({ required: true })
  name: string;

  @Prop({ type: String, default: null })
  photo: string | null;

  @Prop({ type: String, default: null })
  info: string | null;
}

export const ArtistSchema = SchemaFactory.createForClass(Artist);
