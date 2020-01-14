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

  async AddLike(post: Post): Promise<Post[]> {
    await firebase.firestore().collection('posts').doc(post.id).set(post);
    return this.getALLPosts();
  }

  async getByCategory(categoryId: number): Promise<Post[]> {
    let allPosts: Post[] = await this.getALLPosts();

    if (categoryId > 1) {
      allPosts = allPosts.filter((post) => post.category.id === categoryId);
    }

    return allPosts;
  }
}

export default new PostService();
