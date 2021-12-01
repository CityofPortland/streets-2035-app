import axios from 'axios';

type GraphQLError = {
  message: string;
  locations: Array<{ line: number; column: number }>;
};

export type GraphQLResponse<T> = {
  data?: T;
  errors?: Array<GraphQLError>;
};

export async function query<T>(q: string): Promise<GraphQLResponse<T>> {
  if (!process.env.VUE_APP_GRAPHQL_URL) {
    throw Error(
      'VUE_APP_GRAPHQL_URL is not defined and required to query the GraphQL server!'
    );
  }

  const res = await axios.post<GraphQLResponse<T>>(
    process.env.VUE_APP_GRAPHQL_URL,
    {
      query: q.replace(/\s+/, ' '),
    },
    {
      headers: {
        'content-type': 'application/json',
      },
    }
  );

  return res.data;
}
