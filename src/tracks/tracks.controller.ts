import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Track, TrackDocument } from '../schemas/track.schema';
import { Model } from 'mongoose';
import { CreateTracksDto } from './createTracks.dto';

@Controller('tracks')
export class TracksController {
  constructor(
    @InjectModel(Track.name)
    private readonly trackModel: Model<TrackDocument>,
  ) {}

  @Get()
  getAllTracks(@Query('album') album: number) {
    const filter = album ? { album } : {};
    return this.trackModel.find(filter);
  }

  @Get(':id')
  getTrackById(@Param('id') id: string) {
    return this.trackModel.findById(id);
  }

  @Post()
  async createTrack(@Body() trackDto: CreateTracksDto) {
    const trackCount = await this.trackModel.countDocuments({
      album: trackDto.album,
    });

    const newTrack = new this.trackModel({
      album: trackDto.album,
      title: trackDto.title,
      duration: trackDto.duration,
      number: trackCount + 1,
    });
    return newTrack.save();
  }

  @Delete(':id')
  async deleteTrack(@Param('id') id: string) {
    await this.trackModel.findByIdAndDelete(id);
    return { message: 'Track deleted' };
  }
}
