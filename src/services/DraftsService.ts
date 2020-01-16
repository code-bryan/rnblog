import firebase from 'firebase';
import moment from 'moment';
import Post from '../models/Post';
import DateFormats from '../constants/DateFormats';

class DraftsService {
  // eslint-disable-next-line class-methods-use-this
  async getAllDrafts(userId: string): Promise<Post[]> {
    const draftsFromFirestore = await firebase.firestore().collection('posts').get();
    const allDrafts: Post[] = [];

    draftsFromFirestore.docs.forEach((item) => {
      const draft: Post = item.data() as Post;
      draft.id = item.id;

      if (draft.author.uid !== userId) {
        return;
      }

      if (draft.publishDate.length > 0) {
        return;
      }

      allDrafts.push(draft);
    });

    return allDrafts;
  }

  async saveDraft(post: Post): Promise<Post[]> {
    // eslint-disable-next-line no-param-reassign
    post.createdAt = moment().format(DateFormats.database);
    await firebase.firestore().collection('posts').add({ ...post });
    return this.getAllDrafts(post.author.uid);
  }

  async editDraft(post: Post): Promise<Post[]> {
    // eslint-disable-next-line no-param-reassign
    await firebase.firestore().collection('posts').doc(post.id).update(post);
    return this.getAllDrafts(post.author.uid);
  }

  async publishDraft(post: Post): Promise<Post[]> {
    // eslint-disable-next-line no-param-reassign
    post.publishDate = moment().format(DateFormats.database);
    await firebase.firestore().collection('posts').doc(post.id).update(post);
    return this.getAllDrafts(post.author.uid);
  }

  async deleteDraft(post: Post): Promise<Post[]> {
    await firebase.firestore().collection('posts').doc(post.id).delete();
    return this.getAllDrafts(post.author.uid);
  }
}

export default new DraftsService();
