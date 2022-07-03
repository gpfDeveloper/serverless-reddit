export type PostItemProps = {
  id: string;
  createdBy: string;
  createdAt: string;
  title: string;
  content: string;
  votes?: any[];
  comments?: any[];
  numOfComments?: number;
  vote?: number;
  img?: string;
};

export type CommentItemProps = {
  createdAt: string;
  createdBy: string;
  content: string;
};
