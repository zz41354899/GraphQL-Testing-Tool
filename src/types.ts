export interface Schema {
  id: string;
  name: string;
  schema: string;
}

export interface SampleQuery {
  id: string;
  name: string;
  schema: string;
  query: string;
}

export interface GraphQLResult {
  success: boolean;
  data?: any;
  errors?: string[];
}