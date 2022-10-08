export default interface GetAccessTokenResponse {
  access_token: string;
  refresh_token: string;
  expire_in: string;
  error: string;
  message: string;
}
