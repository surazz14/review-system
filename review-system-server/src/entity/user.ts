import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
  JoinColumn,
} from "typeorm";

import { Review } from "./review";

export enum UserRole {
  ADMIN = "admin",
  Member = "member",
}

@Entity("users")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  _id!: number;

  @Column({
    length: 100,
    default: "",
  })
  name?: string;

  @Column({
    length: 100,
    default: "",
  })
  address: string;

  @Column({
    length: 100,
    default: "",
  })
  position: string;

  @Column({
    length: 100,
    default: "",
  })
  email?: string;

  @Column({
    length: 100,
    default: "",
  })
  password!: string;

  @OneToMany(() => Review, (reviews) => reviews.reviewedBy, {
    onDelete: "CASCADE",
  })
  
  @JoinColumn()
  reviewedBy: Review[];

  @OneToMany(() => Review, (reviews) => reviews.assignedUser, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  reviews?: Review[];

  @Column("text", { array: true, nullable: true })
  assigned?: string[];

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.Member,
  })
  role!: UserRole;
}
