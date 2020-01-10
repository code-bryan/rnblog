import firebase, { User as FirebaseUser } from 'firebase';
import Credentials from '../models/Credentials';
import User from '../models/User';
import BasicRegistration from '../models/BasicRegistration';

class AuthenticationService {
  async authenticateUser(credentials: Credentials): Promise<User> {
    const authUser = await firebase.auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password);

    const user = await User.fromAuthUser(authUser.user as FirebaseUser, credentials.password);

    return user;
  }

  async registerAuthUser(basicRegistration: BasicRegistration): Promise<User> {
    const createdAuthUser = await firebase.auth()
      .createUserWithEmailAndPassword(basicRegistration.email, basicRegistration.password);

    const user = await User
      .fromAuthUser(createdAuthUser.user as FirebaseUser, basicRegistration.password);

    return user;
  }

  async completeUserRegistration(user: User) {
    const users = await firebase.firestore()
      .collection('users')
      .where('username', '==', user.username)
      .get();

    if (users.size >= 1) {
      throw new Error('Username is already in use');
    }

    await firebase.firestore().collection('users').add(user);
    return user;
  }
}

export default new AuthenticationService();
