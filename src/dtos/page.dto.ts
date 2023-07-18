export class PageDto {
  current: number;
  count: number;
  size: number;
  last: number;
}

export class PageQueryDto {
  current?: number;
  size?: number;
}
