import firebase from 'react-native-firebase';
import User from '../models/User';
import UserMention from '../models/UserMention';

class UserService {
  // eslint-disable-next-line class-methods-use-this
  async getUsers(): Promise<UserMention[]> {
    const userFromFirebase = await firebase.firestore().collection('users').get();
    let users: UserMention[] = [];

    userFromFirebase.forEach((document) => {
      const user = document.data() as User;
      users = [
        ...users,
        {
          id: user.uid,
          image: user.avatar,
          name: user.username,
        },
      ];
    });

    return users;
  }
}

export default new UserService();
