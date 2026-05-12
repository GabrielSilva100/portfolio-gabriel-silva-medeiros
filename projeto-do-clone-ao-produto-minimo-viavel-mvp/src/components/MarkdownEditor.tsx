import React from 'react';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ value, onChange, className }) => {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={className}
      placeholder="Digite seu markdown aqui..."
      spellCheck={false}
    />
  );
};
