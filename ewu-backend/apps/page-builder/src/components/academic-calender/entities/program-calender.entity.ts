import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Publish } from '../../../prisma/publish-type.enum';

@ObjectType()
export class ProgramCalender {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  year: number;

  @Field()
  label: string;
  
  @Field(() => Int, { nullable: true })
  order?: number

  @Field(() => Publish, { defaultValue: Publish.NO })
  isPublished: keyof typeof Publish;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => Int)
  createdBy: number;

  @Field(() => Int)
  updatedBy: number;
}

/*
model programCalender{
  id                 Int         @id  @default(autoincrement())
  year               Int
  label              String
  semesterCalender   semesterCalender[]
  isPublished        Publish      @default(NO)
  createdAt          DateTime     @default(now())
  updatedAt          DateTime     @default(now())
  createdBy          Int          @default(0)
  updatedBy          Int          @default(0)
}
*/
