import { InputType, Field, Int } from '@nestjs/graphql';
import { IsOptional, IsAlpha, Length } from 'class-validator';
import { YesOrNo } from '../../prisma/yes-or-no-type.enum';
import { MenuType } from '../../prisma/menu-type.enum';
import { MenuPosition } from '../../prisma/menu-position.enum';

@InputType()
export class CreateMenuInput {
  @Field()
  @IsOptional()
  @IsAlpha()
  @Length(0, 255)
  label: string;

  @Field()
  @IsAlpha()
  @Length(0, 255)
  link: string;

  @Field()
  parent: number;

  @Field(() => Int, { nullable: true })
  pageId?: number;

  @Field()
  sort: number;

  @Field()
  depth: number;

  @Field({ nullable: true})
  mobileSort?: number;

  @Field(() => YesOrNo, { defaultValue: YesOrNo.NO })
  hasFooterMenuButton: keyof typeof YesOrNo;

  @Field(() => YesOrNo, { defaultValue: YesOrNo.NO })
  isMegaMenu: keyof typeof YesOrNo;

  @Field(() => MenuType, { defaultValue: MenuType.HEADER })
  menuType: keyof typeof MenuType;

  @Field(() => MenuPosition, { defaultValue: MenuPosition.BOTTOM })
  menuPosition: keyof typeof MenuPosition;
}
