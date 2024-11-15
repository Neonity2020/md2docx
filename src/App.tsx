import { useState, useCallback } from 'react';
import { FileUploader } from './components/FileUploader';
import { Preview } from './components/Preview';
import { convertToWord } from './utils/converter';
import { DocumentArrowDownIcon } from '@heroicons/react/24/outline';
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
});

function App() {
  const [markdownContent, setMarkdownContent] = useState('');
  const [htmlContent, setHtmlContent] = useState('');

  const handleFileSelect = useCallback((content: string) => {
    setMarkdownContent(content);
    setHtmlContent(md.render(content));
  }, []);

  const handleConvert = useCallback(() => {
    if (markdownContent) {
      convertToWord(markdownContent);
    }
  }, [markdownContent]);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          Markdown to Word Converter
        </h1>
        
        <FileUploader onFileSelect={handleFileSelect} />
        
        {htmlContent && (
          <>
            <div className="bg-white shadow-md rounded-lg p-6 mt-6">
              <Preview htmlContent={htmlContent} />
            </div>
            
            <button
              onClick={handleConvert}
              className="mt-6 w-full flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <DocumentArrowDownIcon className="w-5 h-5 mr-2" />
              Convert to Word
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;