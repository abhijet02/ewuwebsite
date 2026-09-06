import { registerEnumType } from '@nestjs/graphql';

export enum YesOrNo {
  YES = 'YES',
  NO = 'NO',
}

registerEnumType(YesOrNo, { name: 'YesOrNo', description: undefined });
