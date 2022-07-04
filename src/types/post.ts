export type PostItemProps = {
  id: string;
  createdBy: string;
  createdAt: string;
  title: string;
  content?: string;
  votes?: any[];
  comments?: any[];
  img?: string;
};

export type CommentItemProps = {
  createdAt: string;
  createdBy: string;
  content: string;
};

export type VoteItemProps = {
  id: string;
  vote: number;
};
