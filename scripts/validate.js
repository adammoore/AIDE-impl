#!/usr/bin/env node

const { AIDEValidator } = require('../src/index.js');
const fs = require('fs');
const path = require('path');

function validateExamples() {
  const validator = new AIDEValidator();
  const examplesDir = path.join(__dirname, '../src/examples');

  console.log('🔍 Validating AIDE example files...\n');

  const jsonFiles = fs.readdirSync(examplesDir)
    .filter(file => file.endsWith('.json') && file.startsWith('aide_example_'));

  let allValid = true;

  for (const file of jsonFiles) {
    const filePath = path.join(examplesDir, file);
    const disclosure = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    const result = validator.validateDisclosure(disclosure);

    if (result.valid) {
      console.log(`✅ ${file} - Valid`);
    } else {
      console.log(`❌ ${file} - Invalid`);
      result.errors.forEach(error => {
        console.log(`   Error: ${error.instancePath} ${error.message}`);
      });
      allValid = false;
    }
  }

  console.log(`\n${allValid ? '🎉' : '💥'} Validation ${allValid ? 'completed successfully' : 'failed'}`);

  if (!allValid) {
    process.exit(1);
  }
}

function validateFile(filePath) {
  const validator = new AIDEValidator();

  if (!fs.existsSync(filePath)) {
    console.error(`❌ File not found: ${filePath}`);
    process.exit(1);
  }

  const disclosure = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const result = validator.validateDisclosure(disclosure);

  if (result.valid) {
    console.log(`✅ ${filePath} - Valid AIDE disclosure`);
  } else {
    console.log(`❌ ${filePath} - Invalid AIDE disclosure`);
    result.errors.forEach(error => {
      console.log(`   Error: ${error.instancePath} ${error.message}`);
    });
    process.exit(1);
  }
}

// CLI usage
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    validateExamples();
  } else {
    validateFile(args[0]);
  }
}