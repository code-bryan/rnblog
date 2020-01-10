import { User as FirebaseUser } from 'firebase';
import md5 from 'md5';
import BasicRegistration from './BasicRegistration';

class User {
  uid: string = '';

  email: string = '';

  password: string = '';

  username: string = '';

  name: string = '';

  lastname: string = '';

  avatar: string = '';

  description: string = '';

  apiKey: string = '';

  static async fromAuthUser(firebaseUser: FirebaseUser, password: string): Promise<User> {
    const user = new User();

    user.uid = firebaseUser.uid;
    user.apiKey = await firebaseUser.getIdToken();
    user.email = firebaseUser.email as string;
    user.password = password;

    return user;
  }

  static fromBasicRegistration(basicRegistration: BasicRegistration): User {
    const user = new User();

    user.email = basicRegistration.email;
    user.password = basicRegistration.password;

    return user;
  }

  getGravatarUri(): string | null {
    if (this.email.length > 0) {
      return null;
    }

    const emailHashed = md5(this.email);
    return `https://www.gravatar.com/${emailHashed}`;
  }
}

export default User;
