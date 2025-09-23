const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const fs = require('fs');
const path = require('path');

class AIDEValidator {
  constructor(version = '0.2') {
    this.ajv = new Ajv({
      allErrors: true,
      strict: false,
      validateSchema: false // Disable schema validation to handle 2020-12 draft
    });
    addFormats(this.ajv);

    // Load the AIDE schema
    const schemaPath = path.join(__dirname, `aide_schema_v${version.replace('.', '_')}.json`);
    this.schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
    this.validate = this.ajv.compile(this.schema);
  }

  validateDisclosure(disclosure) {
    const valid = this.validate(disclosure);
    return {
      valid,
      errors: this.validate.errors || []
    };
  }

  loadExample(exampleName) {
    const examplePath = path.join(__dirname, 'examples', `aide_example_${exampleName}.json`);
    return JSON.parse(fs.readFileSync(examplePath, 'utf8'));
  }

  createBasicDisclosure({
    id,
    actorName,
    orcid,
    affiliation = null,
    usage,
    model,
    humanInTheLoop = true,
    responsibleUse = true,
    context = null,
    data = null,
    prompts = null
  }) {
    const disclosure = {
      id,
      created: new Date().toISOString(),
      actor: {
        name: actorName,
        orcid,
        ...(affiliation && { affiliation })
      },
      usage,
      model,
      oversight: {
        humanInTheLoop,
        responsibleUse
      }
    };

    if (context) disclosure.context = context;
    if (data) disclosure.data = data;
    if (prompts) disclosure.prompts = prompts;

    return disclosure;
  }
}

// Create a default validator instance for convenience
const defaultValidator = new AIDEValidator();

// Export convenient validate function
function validate(disclosure) {
  return defaultValidator.validateDisclosure(disclosure);
}

module.exports = { AIDEValidator, validate };