export const listVotesPerPost = /* GraphQL */ `
  query ListVotesPerPost($id: ID!) {
    getPost(id: $id) {
      title
      votes {
        items {
          id
          vote
          createdAt
          updatedAt
          postVotesId
          owner
        }
        nextToken
      }
    }
  }
`;

export const listCommentsPerPost = /* GraphQL */ `
  query ListCommentsPerPost($id: ID!) {
    getPost(id: $id) {
      title
      comments {
        items {
          id
          username
          content
          createdAt
          updatedAt
          postCommentsId
          owner
        }
        nextToken
      }
    }
  }
`;
