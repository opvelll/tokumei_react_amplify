/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCommentByThreadId = /* GraphQL */ `
  subscription OnCommentByThreadId($threadId: ID!) {
    onCommentByThreadId(threadId: $threadId) {
      id
      title
      threadId
      createdAt
      updatedAt
    }
  }
`;
export const onCreateThread = /* GraphQL */ `
  subscription OnCreateThread {
    onCreateThread {
      id
      type
      title
      comments {
        items {
          id
          title
          threadId
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateThread = /* GraphQL */ `
  subscription OnUpdateThread {
    onUpdateThread {
      id
      type
      title
      comments {
        items {
          id
          title
          threadId
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteThread = /* GraphQL */ `
  subscription OnDeleteThread {
    onDeleteThread {
      id
      type
      title
      comments {
        items {
          id
          title
          threadId
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment {
    onCreateComment {
      id
      title
      threadId
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment {
    onUpdateComment {
      id
      title
      threadId
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment {
    onDeleteComment {
      id
      title
      threadId
      createdAt
      updatedAt
    }
  }
`;
