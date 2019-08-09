import request from 'request-promise-native';
import config from 'config';

const apiUrl: string = `${config.get('app.apiUrl')}/users`;

export type User = {
  id: number,
  email: string,
  firstName: string,
  lastName: string,
  avatar: string,
};

export default {
  getUser: async (userId: string): Promise<User> => {
    const { data: { id, email, first_name: firstName, last_name: lastName, avatar }} = await request({
      method: 'GET',
      uri: `${apiUrl}/${userId}`,
      json: true,
    });

    return {
      id,
      email,
      firstName,
      lastName,
      avatar,
    };
  },
  getUsers: async (page: number): Promise<User[]> => {
    const { data } = await request({
      method: 'GET',
      uri: `${apiUrl}/?page=${page}`,
      json: true,
    });

    return data.map((entry: { id: number, email: string, first_name: string, last_name: string, avatar: string }) => {
      const { id, email, first_name: firstName, last_name: lastName, avatar } = entry;

      return {
        id,
        email,
        firstName,
        lastName,
        avatar,
      };
    })
  }
};
