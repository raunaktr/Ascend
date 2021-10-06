import { gql, GraphQLClient } from "graphql-request";

export const getPostsAndPortfolio = async () => {
  const endpoint = "https://api-ap-northeast-1.graphcms.com/v2/ckue8do3o7mq001xne93y9st9/master";

  const graphQLClient = new GraphQLClient(endpoint);
  //   , {
  //   headers: {
  //     authorization: "Bearer MY_TOKEN",
  //   },
  // }
  const query = gql`
    {
      portfolios {
        title
        tags
        slug
        description
        date
        coverImage {
          url
          height
          width
        }
      }
      posts {
        title
        slug
        id
        description
        content
        date
        tags
        author {
          name
          image {
            url
            width
            height
          }
        }
      }
    }
  `;

  return await graphQLClient.request(query);
};
