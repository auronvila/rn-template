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

export async function uriToBlob(uri: string): Promise<Blob> {
  return new Promise((resolve, reject) => {
    fetch(uri)
      .then(response => response.blob())
      .then(blob => resolve(blob))
      .catch(error => reject(new Error('Failed to convert URI to Blob')));
  });
}

