export interface AuthContextModel {
  updateAuth: (token: string) => void,
  logOut: () => void,
  authToken: string,
  isAuthenticated: boolean
}