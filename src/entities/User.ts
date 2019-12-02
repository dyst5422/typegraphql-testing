import { Field, ID, InputType, ObjectType } from 'type-graphql';
import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@ObjectType()
@Entity()
export class User {
  @Field(_type => ID)
  @PrimaryGeneratedColumn()
  public readonly id: number;

  @Field()
  @Column()
  public firstName: string;

  @Field()
  @Column()
  public lastName: string;

  @Field()
  @Column()
  public age: number;

}

@InputType()
export class UserUpdateInput implements Partial<User> {
  @Field({ nullable: true })
  public firstName: string;

  @Field({ nullable: true })
  public lastName: string;

  @Field({ nullable: true })
  public age: number;
}
