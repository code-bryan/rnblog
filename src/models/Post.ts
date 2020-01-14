import Comment from './Comment';
import Category from './Category';
import User from './User';

class Post {
  id: string = '';

  title: string = '';

  body: string = '';

  author: User = new User();

  publishDate: string = '';

  category: Category = new Category();

  likes: number = 0;

  comments: Comment[] = [];

  image: string = '';
}

export default Post;
