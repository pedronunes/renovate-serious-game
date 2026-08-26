const fs = require('fs');
const { PDFParse } = require('pdf-parse');

const dataBuffer = fs.readFileSync('docs/Calibration_Serious-Game_final_DATERRA.pdf');

async function extractText() {
  const parser = new PDFParse({ data: dataBuffer });
  await parser.load();
  const textResult = await parser.getText();
  console.log('Text result type:', typeof textResult);
  const text = typeof textResult === 'string' ? textResult : (textResult.text || JSON.stringify(textResult));
  fs.writeFileSync('scratch/pdf_extracted_text.txt', text, 'utf8');
  console.log('Saved extracted PDF text to scratch/pdf_extracted_text.txt! Length:', text.length);
}

extractText().catch(err => console.error(err));
