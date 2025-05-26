import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Artist, ArtistDocument } from '../schemas/artist.schema';
import { Model } from 'mongoose';
import { CreateArtistDto } from './createArtists.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageStorage } from '../multer';
import { TokenAuthGuard } from '../token-auth/token-auth.guard';
import { PermitGuard } from '../permit/permit.guard';
import { Roles } from '../roles.decorator';

@Controller('artists')
export class ArtistsController {
  constructor(
    @InjectModel(Artist.name)
    private readonly artistModel: Model<ArtistDocument>,
  ) {}

  @Get()
  getAllArtists() {
    return this.artistModel.find();
  }

  @Get(':id')
  getArtistById(@Param('id') id: string) {
    return this.artistModel.findById(id);
  }

  @UseGuards(TokenAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('photo', imageStorage()))
  async createArtist(
    @UploadedFile() file: Express.Multer.File,
    @Body() artistDto: CreateArtistDto,
  ) {
    const newArtist = new this.artistModel({
      name: artistDto.name,
      info: artistDto.info,
      photo: file ? `/photos/${file.filename}` : null,
    });

    return await newArtist.save();
  }

  @UseGuards(TokenAuthGuard, PermitGuard)
  @Roles('admin')
  @Delete(':id')
  async deleteArtist(@Param('id') id: string) {
    await this.artistModel.findByIdAndDelete(id);
    return { message: 'Artist deleted' };
  }
}
