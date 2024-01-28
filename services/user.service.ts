import { ApiService } from './api.service';
import { UserDocumentsResDto, UserResDto } from './dto/UserDto';

export const UserService = {
  async getUserDetails(): Promise<UserResDto> {
    const response = await ApiService.fetchData<void, UserResDto>({
      url: `/user/profile`,
      method: 'GET'
    })
    return response.data
  },

  async changeOrUpdateRole(newRole: string): Promise<void> {
    await ApiService.fetchData<void, void>({
      url: `/user/role/${newRole}`,
      method: 'POST'
    })
  },

  async changePassword(password: string): Promise<void> {
    await ApiService.fetchData<{ password: string }, void>({
      url: '/user/change-password',
      method: 'POST',
      data: { password }
    })
  },

  async getDocumentsByUserType(): Promise<UserDocumentsResDto[]> {
    const response = await ApiService.fetchData<void, UserDocumentsResDto[]>({
      url: `/document/type/active-user`,
      method: 'GET'
    })
    return response.data
  }
}