import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class UserModel {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  email: string;

  password: string;

  @Field()
  role: 'ADMIN' | 'USER';

  @Field()
  created_at: Date;
}