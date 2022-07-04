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
