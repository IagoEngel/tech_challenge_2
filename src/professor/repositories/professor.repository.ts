import { IPostagem } from 'src/posts/schemas/models/post.interface';

export abstract class ProfessorRepository {
  abstract getAllPostAdmin(): Promise<IPostagem[]>;
  abstract createPost(post: IPostagem): Promise<void>;
  abstract updatePost(post: IPostagem): Promise<void>;
  abstract deletePost(postId: number): Promise<void>;
}
