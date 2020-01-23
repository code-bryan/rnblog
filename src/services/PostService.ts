import firebase from 'react-native-firebase';
import Post from '../models/Post';

class PostService {
  // eslint-disable-next-line class-methods-use-this
  async getALLPosts(categoryId?: number): Promise<Post[]> {
    const postsFromFirestore = await firebase.firestore().collection('posts').get();
    let allPosts: Post[] = [];

    postsFromFirestore.docs.forEach((item) => {
      const post: Post = item.data() as Post;
      post.id = item.id;

      if (post.publishDate.length <= 0) {
        return;
      }

      allPosts.push(post);
    });

    if (categoryId && categoryId > 1) {
      allPosts = allPosts.filter((post) => post.category.id === categoryId);
    }

    return allPosts;
  }

  async updatePost(post: Post): Promise<Post[]> {
    await firebase.firestore().collection('posts').doc(post.id).set(post);
    return this.getALLPosts();
  }
}

export default new PostService();
