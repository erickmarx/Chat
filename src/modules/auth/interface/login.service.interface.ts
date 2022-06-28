export interface ILoginService {
  validate: (password: string, hashedPassword: string) => Promise<boolean>;
}
