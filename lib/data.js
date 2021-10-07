import { gql, GraphQLClient } from "graphql-request";

const endpoint = "https://api-ap-northeast-1.graphcms.com/v2/ckue8do3o7mq001xne93y9st9/master";
const graphQLClient = new GraphQLClient(endpoint);

export const getPostsAndPortfolio = async () => {
  /* const graphQLClient = new GraphQLClient(endpoint
     , {
     headers: {
       authorization: "Bearer MY_TOKEN",
     },
   }
   );
  */
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

export const getPortfolioItems = async () => {
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
    }
  `;

  return await graphQLClient.request(query);
};

export const getPortfolioSlugs = async () => {
  const query = gql`
    {
      portfolios {
        slug
      }
    }
  `;

  return await graphQLClient.request(query);
};

export const getPortfolioItem = async (slug) => {
  const query = gql`
    query getPortfolio($slug: String!) {
      portfolios(where: { slug: $slug }) {
        title
        tags
        slug
        description
        date
        coverImage {
          url
          width
          height
        }
        content
      }
    }
  `;

  const variables = {
    slug,
  };

  return await graphQLClient.request(query, variables);
};

export const getPosts = async () => {
  const query = gql`
    {
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

export const getPost = async (slug) => {
  const query = gql`
    query getPosts($slug: String) {
      posts(where: { slug: $slug }) {
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

  const variables = {
    slug,
  };

  return await graphQLClient.request(query, variables);
};

export const getBlogSlugs = async () => {
  const query = gql`
    {
      posts {
        slug
      }
    }
  `;

  return await graphQLClient.request(query);
};
