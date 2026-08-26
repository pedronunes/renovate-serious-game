const fs = require('fs');
const pdf = require('pdf-parse');

const dataBuffer = fs.readFileSync('docs/Calibration_Serious-Game_final_DATERRA.pdf');

pdf(dataBuffer).then(function(data) {
  console.log(`=== PDF Total Pages: ${data.numpages} ===\n`);
  fs.writeFileSync('scratch/pdf_extracted_text.txt', data.text, 'utf8');
  console.log('Successfully saved text to scratch/pdf_extracted_text.txt!');
  console.log('\nSample Text (First 1500 chars):\n');
  console.log(data.text.substring(0, 1500));
}).catch(err => {
  console.error('PDF error:', err);
});
