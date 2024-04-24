import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  JoinColumn,
  ManyToOne,
} from "typeorm";

import { User } from "./user";

@Entity("reviews")
export class Review extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  _id!: number;

  @Column({
    length: 100,
    default: "",
  })
  feedback?: string;

  @ManyToOne(() => User, (user) => user.reviewedBy, {
    onDelete: "CASCADE",
  })

  @JoinColumn()
  reviewedBy!: User[];

  @ManyToOne(() => User, (user) => user.reviews, {
    onDelete: "CASCADE",
  })
  
  @JoinColumn()
  assignedUser!: User[];
}
