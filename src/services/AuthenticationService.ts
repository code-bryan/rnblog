import firebase, { User as FirebaseUser } from 'firebase';
import Credentials from '../models/Credentials';
import User from '../models/User';
import BasicRegistration from '../models/BasicRegistration';

class AuthenticationService {
  // eslint-disable-next-line class-methods-use-this
  async authenticateUser(credentials: Credentials): Promise<User> {
    const authUser = await firebase.auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password);

    let user = new User();

    const userFromFirestore = await firebase.firestore()
      .collection('users')
      .where('uid', '==', authUser.user?.uid)
      .limit(1)
      .get();

    userFromFirestore.forEach((userFetched) => {
      user = userFetched.data() as User;
    });

    return user;
  }

  // eslint-disable-next-line class-methods-use-this
  async registerAuthUser(basicRegistration: BasicRegistration): Promise<User> {
    const createdAuthUser = await firebase.auth()
      .createUserWithEmailAndPassword(basicRegistration.email, basicRegistration.password);

    const user = await User
      .fromAuthUser(createdAuthUser.user as FirebaseUser, basicRegistration.password);

    return user;
  }

  // eslint-disable-next-line class-methods-use-this
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

  // eslint-disable-next-line class-methods-use-this
  async forgotPassword(email: string) {
    await firebase.auth().sendPasswordResetEmail(email);
  }

  // eslint-disable-next-line class-methods-use-this
  async userProfile(user: User): Promise<User> {
    const users = await firebase.firestore()
      .collection('users')
      .where('uid', '==', user.uid)
      .get();

    users.forEach((item) => {
      firebase.firestore().collection('users').doc(item.id).update(user);
    });

    return user;
  }
}

export default new AuthenticationService();
