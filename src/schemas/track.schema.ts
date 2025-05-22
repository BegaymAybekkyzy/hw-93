import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';
import { Artist } from './artist.schema';

export type TrackDocument = Track & Document;

@Schema()
export class Track {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: Artist.name,
  })
  album: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  duration: string;

  @Prop({ required: true })
  number: number;
}

export const TrackSchema = SchemaFactory.createForClass(Track);
