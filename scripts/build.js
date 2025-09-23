#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function buildProject() {
  console.log('🔨 Building AIDE schema project...\n');

  // Ensure all required directories exist
  const dirs = ['src', 'src/examples', 'tests', 'scripts', 'docs'];
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`📁 Created directory: ${dir}`);
    }
  });

  // Validate all example files
  console.log('🔍 Validating example files...');
  try {
    require('./validate.js');
    console.log('✅ All validations passed');
  } catch (error) {
    console.error('❌ Validation failed:', error.message);
    process.exit(1);
  }

  // Check schema files exist
  const requiredFiles = [
    'src/aide_schema_v0_1.json',
    'src/aide_schema_v0_1.xsd'
  ];

  requiredFiles.forEach(file => {
    if (!fs.existsSync(file)) {
      console.error(`❌ Required file missing: ${file}`);
      process.exit(1);
    }
  });

  console.log('✅ Schema files verified');

  // Generate build info
  const buildInfo = {
    version: '0.1.0',
    timestamp: new Date().toISOString(),
    schemaFiles: [
      'src/aide_schema_v0_1.json',
      'src/aide_schema_v0_1.xsd'
    ],
    examples: fs.readdirSync('src/examples')
      .filter(file => file.startsWith('aide_example_') && file.endsWith('.json'))
      .map(file => file.replace('.json', '').replace('aide_example_', ''))
  };

  fs.writeFileSync('build-info.json', JSON.stringify(buildInfo, null, 2));

  console.log('🎉 Build completed successfully!');
  console.log(`📊 Generated build info: build-info.json`);
}

if (require.main === module) {
  buildProject();
}