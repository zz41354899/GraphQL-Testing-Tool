import React, { useState } from 'react';
import Header from './components/Header';
import GraphQLEditor from './components/GraphQLEditor';
import SchemaSelector from './components/SchemaSelector';
import ResultViewer from './components/ResultViewer';
import { sampleSchemas } from './data/sampleSchemas';
import { sampleQueries } from './data/sampleQueries';
import { validateAndExecuteQuery } from './utils/graphqlUtils';
import { GraphQLResult } from './types';

function App() {
  const [selectedSchema, setSelectedSchema] = useState(sampleSchemas[0]);
  const [query, setQuery] = useState(sampleQueries[0].query);
  const [result, setResult] = useState<GraphQLResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSchemaChange = (schemaId: string) => {
    const schema = sampleSchemas.find(s => s.id === schemaId);
    if (schema) {
      setSelectedSchema(schema);
      // Reset result when schema changes
      setResult(null);
    }
  };

  const handleQueryChange = (value: string | undefined) => {
    if (value !== undefined) {
      setQuery(value);
    }
  };

  const handleRunQuery = async () => {
    setIsLoading(true);
    try {
      const executionResult = await validateAndExecuteQuery(query, selectedSchema.schema);
      setResult(executionResult);
    } catch (error) {
      setResult({
        success: false,
        errors: [error instanceof Error ? error.message : String(error)]
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <Header />
      
      <div className="flex flex-col md:flex-row flex-grow overflow-hidden">
        <div className="w-full md:w-2/3 flex flex-col p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">GraphQL Query</h2>
            <SchemaSelector 
              schemas={sampleSchemas} 
              selectedSchema={selectedSchema.id} 
              onSchemaChange={handleSchemaChange} 
            />
          </div>
          
          <div className="flex-grow relative rounded-lg overflow-hidden border border-gray-700">
            <GraphQLEditor 
              value={query} 
              onChange={handleQueryChange} 
              schema={selectedSchema.schema}
            />
          </div>
          
          <div className="mt-4 flex justify-end">
            <button 
              onClick={handleRunQuery}
              disabled={isLoading}
              className="px-4 py-2 bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors duration-200 flex items-center"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : 'Run Query'}
            </button>
          </div>
        </div>
        
        <div className="w-full md:w-1/3 p-4 overflow-auto">
          <h2 className="text-xl font-semibold mb-4">Results</h2>
          <ResultViewer result={result} />
        </div>
      </div>
    </div>
  );
}

export default App;