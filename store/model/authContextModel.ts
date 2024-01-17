export interface AuthContextModel {
  updateAuth: (token: string | null, userRole: string | null) => void,
  logOut: () => void,
  userInfo: { token: string | null, role: string | null } | null | undefined,
  isAuthenticated: boolean
}