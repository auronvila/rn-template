export interface AuthContextModel {
  updateAuth: (token: string) => void,
  authToken: string,
  isAuthenticated: boolean
}