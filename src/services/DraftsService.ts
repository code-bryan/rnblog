import firebase from 'firebase';
import Post from '../models/Post';

class DraftsService {
  // eslint-disable-next-line class-methods-use-this
  async getAllDrafts(userId: string): Promise<Post[]> {
    const draftsFromFirestore = await firebase.firestore().collection('drafts').get();
    const allDrafts: Post[] = [];

    draftsFromFirestore.docs.forEach((item) => {
      const draft: Post = item.data() as Post;
      draft.id = item.id;
      if (draft.author.uid === userId) {
        return;
      }
      allDrafts.push(draft);
    });

    return allDrafts;
  }
}

export default new DraftsService();
