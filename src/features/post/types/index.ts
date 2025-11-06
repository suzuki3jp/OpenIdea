export type Post = {
  postId: string;
  userId: string;
  postTitle: string;
  goodCount: number;
  badCount: number;
  freeContent: string;
  paidContent: string;
};

export type NewPost = {
  postTitle: string;
  freeContent: string;
  paidContent: string;
};
