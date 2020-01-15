import Comment from './Comment';
import Category from './Category';
import User from './User';

class Post {
  id: string = '';

  title: string = '';

  body: string[] = [];

  author: User = new User();

  publishDate: string = '';

  createdAt: string = '';

  category: Category = new Category();

  likes: string[] = [];

  comments: Comment[] = [];

  image: string = '';
}

export default Post;
