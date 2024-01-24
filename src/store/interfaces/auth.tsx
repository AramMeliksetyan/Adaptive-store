export interface IAuthInitialState {
  isAuthenticated: boolean;
}

export interface IRefreshTokenRequest {
  refreshToken: string;
}

export interface IAuthenticateUserResponse extends IRefreshTokenRequest {
  accessToken: string;
  username: string;
}

export interface IAuthenticateUserRequest {
  password: string;
  username: string;
}
