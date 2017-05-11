import { IsNotEmpty, IsString, IsDefined, IsBoolean, IsNumber } from 'class-validator';

export class MovieRequest {

  @IsBoolean()
  @IsDefined()
  adult: boolean;

  @IsString()
  backdrop_path: string;

  belongs_to_collection: any;

  @IsNumber()
  @IsDefined()
  budget: number;

  @IsString()
  @IsDefined()
  homepage: string;

  @IsString()
  @IsDefined()
  imdb_id: string;

  @IsNotEmpty()
  @IsString()
  @IsDefined()
  original_language: string;

  @IsNotEmpty()
  @IsString()
  @IsDefined()
  original_title: string;

  @IsString()
  @IsDefined()
  overview: string;

  @IsNumber()
  popularity: number;

  @IsString()
  poster_path: string;

  @IsNotEmpty()
  @IsString()
  @IsDefined()
  release_date: string;

  @IsNumber()
  @IsDefined()
  revenue: number;

  @IsNumber()
  runtime: number;

  @IsString()
  status: string;

  @IsString()
  tagline: string;

  @IsNotEmpty()
  @IsString()
  @IsDefined()
  title: string;

  @IsBoolean()
  video: boolean;

  @IsNumber()
  vote_average: number;

  @IsNumber()
  vote_count: number;
}
