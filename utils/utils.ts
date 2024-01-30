import { USER_ROLES } from '../constants';

export function LocalizeUserRole(role: string) {
  switch (role) {
    case USER_ROLES.USER :
      return 'Kulanıcı';
    case USER_ROLES.DRIVER:
      return 'Şoför';
    case USER_ROLES.TRANSPORTER:
      return 'Hizmet Veren';
    default :
      return ''
  }
}