import React, { useState } from 'react';
import { ChevronDown, ChevronRight, AlertTriangle } from 'lucide-react';
import { GraphQLResult } from '../types';

interface ResultViewerProps {
  result: GraphQLResult | null;
}

const ResultViewer: React.FC<ResultViewerProps> = ({ result }) => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    data: true,
    errors: true,
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-gray-800 rounded-lg border border-gray-700 p-6 text-gray-400">
        <div className="text-6xl mb-4">⚡</div>
        <p className="text-center mb-2">Run a query to see results</p>
        <p className="text-center text-sm">Results will appear here after execution</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
      {!result.success && (
        <div className="p-4 bg-red-900/30 border-b border-red-800 flex items-start space-x-2">
          <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-medium text-red-400">Query Error</h3>
            <p className="text-sm text-gray-300">The GraphQL query has errors.</p>
          </div>
        </div>
      )}
      
      {result.errors && result.errors.length > 0 && (
        <div className="border-b border-gray-700">
          <div 
            className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-700/50"
            onClick={() => toggleSection('errors')}
          >
            <h3 className="font-medium text-red-400 flex items-center">
              {expandedSections.errors ? <ChevronDown className="h-4 w-4 mr-1" /> : <ChevronRight className="h-4 w-4 mr-1" />}
              Errors
            </h3>
            <span className="text-xs bg-red-900/50 text-red-300 px-2 py-1 rounded-full">
              {result.errors.length}
            </span>
          </div>
          
          {expandedSections.errors && (
            <div className="p-4 bg-gray-900/30 text-sm max-h-60 overflow-auto">
              <ul className="space-y-2">
                {result.errors.map((error, index) => (
                  <li key={index} className="text-red-300 border-l-2 border-red-500 pl-3 py-1">
                    {error}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      
      {result.data && (
        <div className="border-b border-gray-700 last:border-0">
          <div 
            className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-700/50"
            onClick={() => toggleSection('data')}
          >
            <h3 className="font-medium text-green-400 flex items-center">
              {expandedSections.data ? <ChevronDown className="h-4 w-4 mr-1" /> : <ChevronRight className="h-4 w-4 mr-1" />}
              Data
            </h3>
          </div>
          
          {expandedSections.data && (
            <div className="p-4 bg-gray-900/30 text-sm max-h-96 overflow-auto">
              <pre className="font-mono text-gray-300 whitespace-pre-wrap">
                {JSON.stringify(result.data, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ResultViewer;