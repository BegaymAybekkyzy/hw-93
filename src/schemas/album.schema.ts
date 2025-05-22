import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';
import { Artist } from './artist.schema';

export type AlbumDocument = Album & Document;

@Schema()
export class Album {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: Artist.name,
  })
  artist: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ type: String, default: null })
  cover: string | null;

  @Prop({ required: true })
  album_year: number;
}

export const AlbumSchema = SchemaFactory.createForClass(Album);
