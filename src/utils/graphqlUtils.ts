import { buildSchema, GraphQLSchema, parse, validate, execute } from 'graphql';
import { addMocksToSchema } from '@graphql-tools/mock';
import { faker } from '@faker-js/faker';
import { GraphQLResult } from '../types';

// Custom scalar mocks
const mocks = {
  ID: () => faker.string.uuid(),
  String: () => faker.lorem.words(),
  Int: () => faker.number.int({ min: 1, max: 1000 }),
  Float: () => faker.number.float({ min: 0, max: 1000, precision: 0.01 }),
  Boolean: () => faker.datatype.boolean(),
  DateTime: () => faker.date.recent().toISOString(),
  Date: () => faker.date.recent().toISOString().split('T')[0],
  Email: () => faker.internet.email(),
  URL: () => faker.internet.url(),
  // Custom scalars for different data types
  Name: () => faker.person.fullName(),
  Title: () => faker.lorem.sentence(3),
  Description: () => faker.lorem.paragraph(),
  ImageURL: () => faker.image.url(),
  Price: () => faker.commerce.price({ min: 1, max: 1000 }),
};

export const parseSchema = (schemaString: string): GraphQLSchema => {
  try {
    return buildSchema(schemaString);
  } catch (error) {
    console.error('Error parsing schema:', error);
    throw new Error(`Failed to parse schema: ${error instanceof Error ? error.message : String(error)}`);
  }
};

export const validateAndExecuteQuery = async (
  queryString: string, 
  schemaString: string
): Promise<GraphQLResult> => {
  try {
    // Parse the schema
    const schema = parseSchema(schemaString);
    
    // Parse the query
    let parsedQuery;
    try {
      parsedQuery = parse(queryString);
    } catch (error) {
      return {
        success: false,
        errors: [`Syntax Error: ${error instanceof Error ? error.message : String(error)}`]
      };
    }
    
    // Validate the query against the schema
    const validationErrors = validate(schema, parsedQuery);
    if (validationErrors.length > 0) {
      return {
        success: false,
        errors: validationErrors.map(error => error.message)
      };
    }
    
    // Add mocks to the schema
    const mockedSchema = addMocksToSchema({
      schema,
      mocks,
      preserveResolvers: false,
    });
    
    // Execute the query with mocked data
    const result = await execute({
      schema: mockedSchema,
      document: parsedQuery,
      rootValue: {},
      contextValue: {},
    });
    
    if (result.errors && result.errors.length > 0) {
      return {
        success: false,
        data: result.data || undefined,
        errors: result.errors.map(error => error.message)
      };
    }
    
    return {
      success: true,
      data: result.data
    };
  } catch (error) {
    console.error('Error executing query:', error);
    return {
      success: false,
      errors: [`Execution Error: ${error instanceof Error ? error.message : String(error)}`]
    };
  }
};

// Helper function to generate mock data based on the schema
export const generateMockData = (schema: GraphQLSchema) => {
  const mockedSchema = addMocksToSchema({
    schema,
    mocks,
    preserveResolvers: false,
  });
  return mockedSchema;
};