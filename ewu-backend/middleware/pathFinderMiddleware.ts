import { FieldMiddleware, MiddlewareContext, NextFn } from '@nestjs/graphql';

export const pathFinderMiddleware: FieldMiddleware = async (
  ctx: MiddlewareContext,
  next: NextFn,
) => {
  const filePath: string = await next();
  if (filePath && filePath !== null) {
    return `${process.env.BASE_URL}/${filePath}`;
  } else {
    return null;
  }
};

export const pathFinderMiddlewareForArrayOfString: FieldMiddleware = async (
  ctx: MiddlewareContext,
  next: NextFn,
) => {
  const filePath: string[] = await next();
  let paths: string[] = [];
  filePath.map((path) => {
    if (path && path !== null) {
      paths = [...paths, `${process.env.BASE_URL}/${path}`];
    }
  });
  return [...paths];
};
