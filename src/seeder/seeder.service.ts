import { Injectable } from '@nestjs/common';
import { User, UserDoc } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Album, AlbumDocument } from '../schemas/album.schema';
import { Track, TrackDocument } from '../schemas/track.schema';
import { Artist, ArtistDocument } from '../schemas/artist.schema';

@Injectable()
export class SeederService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDoc>,
    @InjectModel(Album.name) private readonly albumModel: Model<AlbumDocument>,
    @InjectModel(Track.name) private readonly trackModel: Model<TrackDocument>,
    @InjectModel(Artist.name)
    private readonly artistModel: Model<ArtistDocument>,
  ) {}

  async seed() {
    await this.userModel.deleteMany();
    await this.artistModel.deleteMany();
    await this.albumModel.deleteMany();
    await this.trackModel.deleteMany();

    const [testUser1, testUser2] = await this.userModel.create(
      {
        username: 'Bob',
        password: '111',
        role: 'user',
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MzQ3YzRmODcyYWJiZTIyYTJkMmQzNCIsImlhdCI6MTc0ODI3MDE1OSwiZXhwIjoxNzUwODYyMTU5fQ.GpfSKn5ProUlFp-Sfld59FXGM-DNZy3SMvRgrDePldk',
      },
      {
        username: 'Alice',
        password: '111',
        role: 'admin',
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODFiM2Q2YjAwNDEyNjhlN2E0NjgzNjciLCJpYXQiOjE3NDY2MTU3NTYsImV4cCI6MTc0OTIwNzc1Nn0.IASOw4JU2OoJ1w0I_56gzfbQYR7Ehi5Qtp0X_2pMCKU',
      },
    );

    const [ariana, shakira] = await this.artistModel.create(
      {
        user: testUser1._id,
        name: 'Ariana Grande',
        photo: null,
        info: 'Ariana is an American singer, songwriter, and actress.',
        isPublished: true,
      },
      {
        user: testUser2._id,
        name: 'Shakira',
        photo: null,
        info: null,
        isPublished: true,
      },
    );

    const [arianaAlbum1, arianaAlbum2, shakiraAlbum1, shakiraAlbum2] =
      await this.albumModel.create(
        {
          user: testUser1._id,
          artist: ariana._id,
          title: 'Positions',
          album_year: 2020,
          cover: 'covers/70523424-34ae-4c28-897a-1180139e9f71.jpg',
          isPublished: true,
        },
        {
          user: testUser1._id,
          artist: ariana._id,
          title: 'Sweetener',
          album_year: 2018,
          cover: 'covers/fe21513b-6707-43c3-b747-34aec01fa226.jpg',
          isPublished: true,
        },
        {
          user: testUser2._id,
          artist: shakira._id,
          title: 'She Wolf',
          album_year: 2009,
          cover: 'covers/c7daa49c-63e4-4770-b051-ed7902308202.jpeg',
          isPublished: true,
        },
        {
          user: testUser2._id,
          artist: shakira._id,
          title: 'Laundry Service',
          album_year: 2001,
          cover: 'covers/08f6947d-fe0d-4966-bae4-7bff70b1a4c5.jpg',
          isPublished: true,
        },
        {
          user: testUser2._id,
          artist: shakira._id,
          title: 'Laundry Service(no Published)',
          album_year: 2012,
          cover: 'covers/08f6947d-fe0d-4966-bae4-7bff70b1a4c5.jpg',
          isPublished: false,
        },
        {
          user: testUser1._id,
          artist: ariana._id,
          title: 'Sweetener (no Published)',
          album_year: 2018,
          cover: 'covers/fe21513b-6707-43c3-b747-34aec01fa226.jpg',
          isPublished: false,
        },
      );

    await this.trackModel.create(
      {
        user: testUser1._id,
        album: arianaAlbum1._id,
        title: 'shut up',
        duration: '3:45',
        number: 1,
        isPublished: true,
      },
      {
        user: testUser1._id,
        album: arianaAlbum1._id,
        title: 'Motive',
        duration: '3:47',
        number: 2,
        isPublished: true,
      },
      {
        user: testUser1._id,
        album: arianaAlbum1._id,
        title: '34+35',
        duration: '3:20',
        number: 3,
        isPublished: true,
      },
      {
        user: testUser1._id,
        album: arianaAlbum2._id,
        title: 'Sweetener',
        duration: '3:20',
        number: 1,
        isPublished: true,
      },
      {
        user: testUser1._id,
        album: arianaAlbum2._id,
        title: 'Everytime',
        duration: '3:45',
        number: 2,
        isPublished: true,
      },
      {
        user: testUser1._id,
        album: arianaAlbum2._id,
        title: 'Successful',
        duration: '3:40',
        number: 3,
        isPublished: true,
      },
      {
        user: testUser2._id,
        album: shakiraAlbum1._id,
        title: 'She Wolf',
        duration: '3:45',
        number: 1,
        isPublished: true,
      },
      {
        user: testUser2._id,
        album: shakiraAlbum1._id,
        title: 'Did It Again',
        duration: '3:45',
        number: 2,
        isPublished: true,
      },
      {
        user: testUser2._id,
        album: shakiraAlbum1._id,
        title: 'Why Wait',
        duration: '3:45',
        number: 3,
        isPublished: true,
      },
      {
        user: testUser2._id,
        album: shakiraAlbum2._id,
        title: 'Objection (Tango)',
        duration: '3:20',
        number: 1,
        isPublished: true,
      },
      {
        user: testUser2._id,
        album: shakiraAlbum2._id,
        title: 'Rules',
        duration: '3:45',
        number: 2,
        isPublished: true,
      },
      {
        user: testUser2._id,
        album: shakiraAlbum2._id,
        title: 'The One',
        duration: '3:45',
        number: 3,
        isPublished: true,
      },
    );
  }
}
