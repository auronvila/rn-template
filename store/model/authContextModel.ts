export interface AuthContextModel {
  updateAuth: (token: string, userRole: string) => void,
  logOut: () => void,
  userInfo: {token:string,role:string},
  isAuthenticated: boolean
}