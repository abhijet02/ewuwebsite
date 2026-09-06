import { ObjectType, Field, Int } from '@nestjs/graphql';
import { YesOrNo } from '../../prisma/yes-or-no-type.enum';
import { MenuType } from '../../prisma/menu-type.enum';
import { MenuPosition } from '../../prisma/menu-position.enum';
@ObjectType()
export class Menu {
  @Field(() => Int)
  id: number;

  @Field(() => Int, { nullable: true })
  pageId?: number;

  @Field()
  label: string;

  @Field()
  link: string;

  @Field()
  parent: number;

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

  @Field()
  createdAt: Date;

  @Field({ nullable: true })
  updateAt?: Date;
}
