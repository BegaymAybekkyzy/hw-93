import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Album, AlbumDocument } from '../schemas/album.schema';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageStorage } from '../multer';
import { CreateAlbumsDto } from './createAlbums.dto';
import { TokenAuthGuard } from '../token-auth/token-auth.guard';
import { Roles } from '../roles.decorator';
import { PermitGuard } from '../permit/permit.guard';

@Controller('albums')
export class AlbumsController {
  constructor(
    @InjectModel(Album.name)
    private readonly albumModel: Model<AlbumDocument>,
  ) {}

  @Get()
  getAllAlbums(@Query('artist') artist: number) {
    const filter = artist ? { artist } : {};
    return this.albumModel.find(filter);
  }

  @Get(':id')
  getAlbumById(@Param('id') id: string) {
    return this.albumModel.findById(id);
  }

  @UseGuards(TokenAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('cover', imageStorage()))
  createAlbum(
    @UploadedFile() file: Express.Multer.File,
    @Body() artistDto: CreateAlbumsDto,
  ) {
    const newAlbum = new this.albumModel({
      artist: artistDto.artist,
      title: artistDto.title,
      album_year: artistDto.album_year,
      cover: file ? `/covers/${file.filename}` : null,
    });
    return newAlbum.save();
  }

  @UseGuards(TokenAuthGuard, PermitGuard)
  @Roles('admin')
  @Delete(':id')
  async deleteAlbum(@Param('id') id: string) {
    await this.albumModel.findByIdAndDelete(id);
    return { message: 'Album deleted' };
  }
}
