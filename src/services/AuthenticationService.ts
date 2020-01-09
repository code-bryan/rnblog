import firebase from 'firebase';
import Credentials from '../models/Credentials';
import User from '../models/User';
import BasicRegistration from '../models/BasicRegistration';

class AuthenticationService {
  private user: User = new User();

  async authenticateUser(credentials: Credentials): Promise<User> {
    const authentication = await firebase.auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password);

    this.user.uid = authentication.user?.uid as string;
    this.user.email = authentication.user?.email as string;
    this.user.password = credentials.password;
    this.user.apiKey = await authentication.user?.getIdToken() as string;

    return this.user;
  }

  async registerUser(basicRegistration: BasicRegistration) {
    const newUser = await firebase.auth()
      .createUserWithEmailAndPassword(basicRegistration.email, basicRegistration.password);

    this.user.uid = newUser.user?.uid as string;
    this.user.email = newUser.user?.email as string;
    this.user.password = basicRegistration.password;
    this.user.apiKey = await newUser.user?.getIdToken() as string;

    console.log(this.user);
  }
}

export default new AuthenticationService();
