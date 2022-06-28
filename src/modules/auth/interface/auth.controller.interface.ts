export interface IAuthController {
  login: (body: { username: string; password: string }) => void;
}
