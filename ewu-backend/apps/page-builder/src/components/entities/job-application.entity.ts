import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Publish } from '../../prisma/publish-type.enum';
import { pathFinderMiddleware } from 'middleware/pathFinderMiddleware';
import { YesOrNo } from '../../prisma/yes-or-no-type.enum';

@ObjectType()
export class JobApplication {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  jobId: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  designation?: string;

  @Field()
  email: string;

  @Field()
  phone: string;

  @Field({ nullable: true })
  dob?:Date;

  @Field({ nullable: true })
  address?: string;

  @Field({ nullable: true })
  coverLetter?: string;

  @Field({ middleware: [pathFinderMiddleware], nullable: true })
  cvUrl?: string;

  @Field({ middleware: [pathFinderMiddleware],nullable: true })
  coverLetterUrl?: string;

  @Field({ middleware: [pathFinderMiddleware], nullable: true })
  attachmentUrl?: string;

  @Field({ middleware: [pathFinderMiddleware], nullable: true })
  photoUrl?: string;  
  
  @Field(() => Publish, { defaultValue: Publish.NO })
  isPublished: keyof typeof Publish;

    
  @Field(() => YesOrNo, { defaultValue: YesOrNo.NO })
  isChecked: keyof typeof YesOrNo;

  @Field()
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt?: Date;
}
