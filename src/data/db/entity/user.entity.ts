import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Index} from 'typeorm';
import { Validate } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index({unique: true})
  username: string;

  @Column()
  @Index({unique: true})
  email: string;

  @Column()
  password: string;

  @CreateDateColumn({timezone: true})
  createdAt: Date;

}
