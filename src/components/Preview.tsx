import React from 'react';

interface PreviewProps {
  htmlContent: string;
}

export const Preview: React.FC<PreviewProps> = ({ htmlContent }) => {
  return (
    <div className="w-full mt-6">
      <h2 className="text-lg font-semibold mb-2">Preview</h2>
      <div 
        className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none p-4 bg-white rounded-lg border border-gray-200"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </div>
  );
}