export class MemberDto {
  public readonly id: number;
  public username: string;
  password: string;
  public readonly account: string;
  public role: number[];
  public readonly created_at?: Date;
}

export class CreateMemberDto {
  username: string;
  password: string;
  account: string;
  role: string;
}

export class UpdateMemberRoleDto {
  role?: number[];
}

export class UpdateMemberDto {
  username?: string;
  password?: string;
}

export class MemberDataDto {
  id: number;
  account: string;
  username: string;
  role: number[];
  created_at?: Date;
}

export class MemberLogListDto {
  id?: number;
  account: string;
  username: string;
  role: number[];
  created_at?: Date;
  list: any;
}
