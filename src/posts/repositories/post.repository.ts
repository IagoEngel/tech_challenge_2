import { IPostagem } from '../schemas/models/post.interface';

export abstract class PostagemRepository {
  abstract getAllPosts(): Promise<IPostagem[]>;
  abstract getPost(postId: number): Promise<IPostagem>;
  abstract searchPost(queryString: string): Promise<IPostagem[]>;
}
