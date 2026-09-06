import { registerEnumType } from '@nestjs/graphql';

export enum MenuType {
  HEADER = 'HEADER',
  FOOTER = 'FOOTER',
  SIDEBAR = 'SIDEBAR',
}

registerEnumType(MenuType, { name: 'MenuType', description: undefined });
