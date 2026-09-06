import { registerEnumType } from '@nestjs/graphql';

export enum MenuPosition {
  TOP = 'TOP',
  BOTTOM = 'BOTTOM',
}

registerEnumType(MenuPosition, {
  name: 'MenuPosition',
  description: undefined,
});
