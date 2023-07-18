export class MemberDto {
  public readonly id?: number;
  public readonly username: string;
  readonly password: string;
  public readonly account: string;
  public readonly role: number[];
  public readonly created_at?: Date;
}

export class CreateMemberDto {
  username: string;
  password: string;
  account: string;
  role: string;
}

export class UpdateMemberDto {
  role?: string;
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
