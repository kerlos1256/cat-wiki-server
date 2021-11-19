import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Breed {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  apiId: string;

  @Column()
  name: string;

  @Column()
  desc: string;

  @Column()
  imgUrl: string;

  @Column()
  searched: number;
}
