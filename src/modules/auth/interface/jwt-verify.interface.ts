export interface IJwtVerifyService {
  verify: (token: string) => boolean;
}
