export interface JwtPayload {
  sub: string;
  role: 'ADMIN' | 'USER';
  documentNumber: string;
}
