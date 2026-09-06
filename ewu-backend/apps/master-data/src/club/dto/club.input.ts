import { InputType, Field, PartialType, Int } from '@nestjs/graphql';
import { Upload } from '../../../../../scalars/upload.scalar';
import { pathFinderMiddleware } from 'middleware/pathFinderMiddleware';

@InputType()
export class CreateClubInput {
  @Field()
  title: string;

  @Field({ nullable: true })
  introduction?: string;

  @Field({ nullable: true })
  slug?: string;

  @Field(() => Int)
  order: number;

  @Field({ nullable: true })
  mission?: string;

  @Field({ nullable: true })
  vission?: string;

  @Field({ nullable: true })
  primaryColor?: string;

  @Field({ nullable: true })
  secondaryColor?: string;

  @Field(() => Upload, {
    nullable: true,
    description: 'Input for the photoUrl files.',
    middleware: [pathFinderMiddleware],
  })
  logoUrl?: Upload;
}

@InputType()
export class UpdateClubInput extends PartialType(CreateClubInput) {
  @Field(() => Int)
  id: number;
}
