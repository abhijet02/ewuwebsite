import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsOptional } from 'class-validator';
import { Upload } from 'scalars/upload.scalar';

@InputType()
export class CreateInqueryInput {
  @Field()
  fullName: string;

  @Field({ nullable: true })
  studentId?: string;

  @IsEmail()
  @Field()
  email: string;

  @IsEmail()
  @IsOptional()
  @Field({ nullable: true})
  studentEmail?: string;

  @Field()
  phoneNumber: string;

  @Field({ nullable: true })
  subject?: string;

  @Field({ nullable: true })
  message?: string;

  @Field(() => Upload, {
    nullable: true,
    description: 'Input for the attachmentUrl Image.',
  })
  attachmentUrl?: Upload;
}

