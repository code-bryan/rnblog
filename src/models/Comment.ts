import User from './User';

class Comment {
  author: User = new User();

  body: string = '';

  publishDate: string = '';
}
export default Comment;
