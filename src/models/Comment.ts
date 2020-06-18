import User from './User';

class Comment {
  id: number = 0;

  author: User = new User();

  body: string = '';

  publishDate: string = '';
}
export default Comment;
