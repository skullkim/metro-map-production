import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

import { CurrentSearched } from './currentSearched';
import { StationBookMark } from './stationBookMark';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    length: 30,
    nullable: false,
  })
  email!: string;

  @Column({
    length: 2000,
    nullable: false,
  })
  password!: string;

  @Column({
    nullable: false,
  })
  checkedEmail!: boolean;

  @OneToMany(() => CurrentSearched, (currentSearched) => currentSearched.user)
  targetUser!: CurrentSearched;

  @OneToMany(() => StationBookMark, (stationBookMark) => stationBookMark.user)
  bookMark!: StationBookMark;

  static getUser(email: string) {
    return this.createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getOne();
  }

  static createUser(email: string, password: string) {
    return this.createQueryBuilder('user')
      .insert()
      .into(User)
      .values([{ email, password, checkedEmail: false }])
      .execute();
  }

  static userCheckedEmail(id: number, checkedEmail: boolean = true) {
    return this.createQueryBuilder('user')
      .update(User)
      .set({ checkedEmail })
      .where('id = :id', { id })
      .execute();
  }

  static updateUserEmail(userId: number, email: string) {
    return this.createQueryBuilder('user')
      .update(User)
      .set({ email })
      .where('id = :userId', { userId })
      .execute();
  }

  static updateUserPassword(userId: number, password: string) {
    return this.createQueryBuilder('user')
      .update(User)
      .set({ password })
      .where('id = :userId', { userId })
      .execute();
  }

  static getUserEmail(userId: number) {
    return this.createQueryBuilder('user')
      .where('user.id = :userId', { userId })
      .getOne();
  }
}
