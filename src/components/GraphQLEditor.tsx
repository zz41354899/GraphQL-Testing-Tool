import React, { useRef, useEffect } from 'react';
import Editor, { Monaco } from '@monaco-editor/react';
import { initializeMode } from 'monaco-graphql/esm/initializeMode';
import { buildSchema } from 'graphql';

interface GraphQLEditorProps {
  value: string;
  onChange: (value: string | undefined) => void;
  schema: string;
}

const GraphQLEditor: React.FC<GraphQLEditorProps> = ({ value, onChange, schema }) => {
  const monacoRef = useRef<Monaco | null>(null);
  const editorRef = useRef<any>(null);

  const handleEditorDidMount = (editor: any, monaco: Monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;

    // Set up editor
    editor.updateOptions({
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      fontFamily: 'JetBrains Mono, Menlo, Monaco, Consolas, monospace',
      fontSize: 14,
      lineNumbers: 'on',
      roundedSelection: true,
      automaticLayout: true,
    });
  };

  useEffect(() => {
    if (monacoRef.current && schema) {
      try {
        const parsedSchema = buildSchema(schema);
        
        // Initialize GraphQL language features
        initializeMode({
          schema: parsedSchema,
        });
      } catch (error) {
        console.error('Error initializing GraphQL mode:', error);
      }
    }
  }, [schema, monacoRef.current]);

  return (
    <Editor
      height="100%"
      defaultLanguage="graphql"
      value={value}
      onChange={onChange}
      onMount={handleEditorDidMount}
      theme="vs-dark"
      options={{
        wordWrap: 'on',
        tabSize: 2,
        contextmenu: true,
      }}
    />
  );
};

export default GraphQLEditor;