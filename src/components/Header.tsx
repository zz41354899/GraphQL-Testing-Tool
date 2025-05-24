import React from 'react';
import { Code2 } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Code2 className="h-8 w-8 text-indigo-400" />
          <h1 className="text-2xl font-bold text-white">GraphQL Playground</h1>
        </div>
        <div className="text-sm text-gray-300">
          Test and validate your GraphQL queries
        </div>
      </div>
    </header>
  );
};

export default Header;