import { ApiService } from './api.service';
import { UserResDto } from './dto/UserDto';

export const UserService = {
  async getUserDetails(): Promise<UserResDto> {
    const response = await ApiService.fetchData<void, UserResDto>({
      url: `/user/profile`,
      method: 'GET'
    })
    return response.data
  }
}