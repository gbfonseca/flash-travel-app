import { Credentials, User } from '~/models';

import api from './api';

type SignInReturnType = {
  token: string;
  user: User;
};

export default {
  async signIn(data: Credentials): Promise<SignInReturnType> {
    const response = await api.post('/auth/signin', data);

    return response.data;
  },
};
