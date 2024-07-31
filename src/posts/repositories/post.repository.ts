import { IPostagem } from '../schemas/models/post.interface';

export abstract class PostagemRepository {
  abstract getAllPosts(): Promise<IPostagem[]>;
  abstract getPost(postId: number): Promise<IPostagem>;
  abstract searchPost(queryString: string): Promise<IPostagem[]>;
  abstract createPost(post: IPostagem): Promise<void>;
  abstract updatePost(post: IPostagem): Promise<void>;
  abstract deletePost(postId: string): Promise<void>;
}
