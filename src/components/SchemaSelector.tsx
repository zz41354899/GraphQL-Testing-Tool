import React from 'react';
import { Schema } from '../types';

interface SchemaSelectorProps {
  schemas: Schema[];
  selectedSchema: string;
  onSchemaChange: (schemaId: string) => void;
}

const SchemaSelector: React.FC<SchemaSelectorProps> = ({ 
  schemas, 
  selectedSchema, 
  onSchemaChange 
}) => {
  return (
    <div className="flex items-center space-x-2">
      <label htmlFor="schema-selector" className="text-sm text-gray-300">
        Schema:
      </label>
      <select
        id="schema-selector"
        value={selectedSchema}
        onChange={(e) => onSchemaChange(e.target.value)}
        className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
      >
        {schemas.map((schema) => (
          <option key={schema.id} value={schema.id}>
            {schema.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SchemaSelector;