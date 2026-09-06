import { registerEnumType } from '@nestjs/graphql';

export enum JobType {
  FULLTIME = 'FULLTIME',
  PARTTIME = 'PARTTIME',
  CONTACTUAL = 'CONTACTUAL',
}

registerEnumType(JobType, {
  name: 'JobType',
  description: 'Job type enumeration',
});
