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
  const res = await axios.post<GraphQLResponse<T>>(
    'http://localhost:4000/graphql',
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
