export type RefreshTokenHandler = () => Promise<string | null>;
export type ResetAuthHandler = () => void;

export interface AuthHandlers {
  refreshToken: RefreshTokenHandler | null;
  resetAuth: ResetAuthHandler | null;
}
