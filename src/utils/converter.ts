import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx';
import MarkdownIt from 'markdown-it';
import { saveAs } from 'file-saver';

const md = new MarkdownIt();

export const convertToWord = async (markdownContent: string) => {
  try {
    const doc = new Document({
      sections: [{
        properties: {},
        children: parseMarkdownToDocx(markdownContent),
      }],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, 'converted-document.docx');
  } catch (error) {
    console.error('Error converting to Word:', error);
    alert('Error converting document. Please try again.');
  }
};

const parseMarkdownToDocx = (markdown: string): Paragraph[] => {
  const tokens = md.parse(markdown, {});
  const paragraphs: Paragraph[] = [];

  tokens.forEach((token, index) => {
    if (token.type === 'heading_open') {
      const level = parseInt(token.tag.slice(1)) as 1 | 2 | 3 | 4 | 5 | 6;
      const content = tokens[index + 1].content;
      paragraphs.push(
        new Paragraph({
          text: content,
          heading: HeadingLevel[`HEADING_${level}`],
        })
      );
    } else if (token.type === 'paragraph_open') {
      const content = tokens[index + 1].content;
      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: content,
            }),
          ],
        })
      );
    }
  });

  return paragraphs;
};