export class CreateAlbumsDto {
  artist: string;
  title: string;
  album_year: number;
  cover: File | null;
}
