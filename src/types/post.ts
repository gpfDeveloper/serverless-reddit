export type PostItemProps = {
  id: string;
  vote: number;
  createdBy: string;
  createdAt: string;
  title: string;
  content: string;
  numOfComments: number;
  img?: string;
};

export type CommentItemProps = {
  createdAt: string;
  createdBy: string;
  content: string;
};
