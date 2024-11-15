import React from 'react';
import '../styles/markdown-preview.css';

interface PreviewProps {
  htmlContent: string;
}

export const Preview: React.FC<PreviewProps> = ({ htmlContent }) => {
  return (
    <div 
      className="markdown-preview"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}