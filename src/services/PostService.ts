import firebase from 'firebase';
import Post from '../models/Post';

class PostService {
  async getALLPosts(): Promise<Post[]> {
    const postsFromFirestore = await firebase.firestore().collection('posts').get();
    const posts: Post[] = [];

    postsFromFirestore.docs.forEach((item) => {
      const post: Post = item.data() as Post;
      post.id = item.id;
      posts.push(post);
    });

    return posts;
  }
}

export default new PostService();
