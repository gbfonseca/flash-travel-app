import { Credentials, SignUpCredentials, User } from '~/models';

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
  async signUp(data: SignUpCredentials): Promise<User> {
    const response = await api.post('/auth/signup', data);

    return response.data;
  },
};
