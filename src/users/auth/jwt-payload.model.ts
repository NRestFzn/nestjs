export interface JwtPayload {
  id: number;
  fullName: string;
  email: string;
  iat?: Date;
}
