import User from "./User";

class Credentials {
  email: string = '';

  password: string = '';

  static getCredentialsFromUser(user: User): Credentials {
    const credentials = new Credentials();

    credentials.email = user.email;
    credentials.password = user.password;

    return credentials;
  }
}

export default Credentials;
