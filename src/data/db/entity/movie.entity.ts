import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Index} from 'typeorm';
import { Validate } from 'class-validator';

@Entity()
export class Movie {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  adult: boolean;

  @Column({nullable:true})
  backdrop_path: string;

  @Column({nullable:true})
  belongs_to_collection: string;

  @Column()
  budget: number;

  @Column()
  homepage: string;

  @Column()
  @Index({unique:true})
  imdb_id: string;

  @Column()
  original_language: string;

  @Column()
  original_title: string;

  @Column()
  overview: string;

  @Column()
  popularity: number;

  @Column({nullable:true})
  poster_path: string;

  @Column()
  release_date: string;

  @Column()
  revenue: number;

  @Column()
  runtime: number;

  @Column()
  status: string;

  @Column()
  tagline: string;

  @Column()
  title: string;

  @Column()
  video: boolean;

  @Column()
  vote_average: number;

  @Column()
  vote_count: number;
 
}
