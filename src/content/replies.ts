export const AUTHOR_NAME = 'Tiago Estrela Lauer';

export interface AuthorReply {
  commentId: string;
  date: string;
  body: string;
}

export const AUTHOR_REPLIES: readonly AuthorReply[] = [];

export function repliesFor(commentId: string): readonly AuthorReply[] {
  return AUTHOR_REPLIES.filter((reply) => reply.commentId === commentId);
}
