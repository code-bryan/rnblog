import Comment from './Comment';

class Post {
  id: number = 0;

  title: string = '';

  body: string = '';

  author: number = 0;

  publishDate: string = '';

  categoryId: number = 0;

  likes: number = 0;

  comments: Comment[] = [];
}

export default Post;
