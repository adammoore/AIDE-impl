const { AIDEValidator } = require('../src/index.js');

describe('AIDE Schema Validation', () => {
  let validator;

  beforeEach(() => {
    validator = new AIDEValidator();
  });

  test('should validate a minimal valid disclosure', () => {
    const disclosure = {
      id: 'https://doi.org/10.1234/example',
      created: '2024-01-01T12:00:00Z',
      actor: {
        name: 'Test Researcher',
        orcid: 'https://orcid.org/0000-0000-0000-0000'
      },
      usage: {
        category: 'writing',
        purpose: 'drafting introduction'
      },
      model: {
        name: 'ChatGPT'
      },
      oversight: {
        humanInTheLoop: true,
        responsibleUse: true
      }
    };

    const result = validator.validateDisclosure(disclosure);
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test('should fail validation when required fields are missing', () => {
    const incompleteDisclosure = {
      id: 'https://doi.org/10.1234/example',
      created: '2024-01-01T12:00:00Z'
      // Missing required fields
    };

    const result = validator.validateDisclosure(incompleteDisclosure);
    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
  });

  test('should validate ORCID format', () => {
    const disclosure = {
      id: 'https://doi.org/10.1234/example',
      created: '2024-01-01T12:00:00Z',
      actor: {
        name: 'Test Researcher',
        orcid: 'invalid-orcid'
      },
      usage: {
        category: 'writing',
        purpose: 'drafting introduction'
      },
      model: {
        name: 'ChatGPT'
      },
      oversight: {
        humanInTheLoop: true,
        responsibleUse: true
      }
    };

    const result = validator.validateDisclosure(disclosure);
    expect(result.valid).toBe(false);
    expect(result.errors.some(error => error.instancePath === '/actor/orcid')).toBe(true);
  });

  test('should validate usage category enum', () => {
    const disclosure = {
      id: 'https://doi.org/10.1234/example',
      created: '2024-01-01T12:00:00Z',
      actor: {
        name: 'Test Researcher',
        orcid: 'https://orcid.org/0000-0000-0000-0000'
      },
      usage: {
        category: 'invalid_category',
        purpose: 'drafting introduction'
      },
      model: {
        name: 'ChatGPT'
      },
      oversight: {
        humanInTheLoop: true,
        responsibleUse: true
      }
    };

    const result = validator.validateDisclosure(disclosure);
    expect(result.valid).toBe(false);
    expect(result.errors.some(error => error.instancePath === '/usage/category')).toBe(true);
  });

  test('should load and validate example files', () => {
    const examples = ['chatgpt', 'claude', 'huggingface'];

    examples.forEach(exampleName => {
      const disclosure = validator.loadExample(exampleName);
      const result = validator.validateDisclosure(disclosure);

      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });

  test('should create basic disclosure using helper method', () => {
    const disclosure = validator.createBasicDisclosure({
      id: 'https://doi.org/10.1234/test',
      actorName: 'Test Researcher',
      orcid: 'https://orcid.org/0000-0000-0000-0000',
      usage: {
        category: 'coding',
        purpose: 'data analysis script'
      },
      model: {
        name: 'Claude',
        version: '3.5 Sonnet',
        provider: 'Anthropic'
      }
    });

    const result = validator.validateDisclosure(disclosure);
    expect(result.valid).toBe(true);
    expect(disclosure.created).toBeDefined();
    expect(new Date(disclosure.created)).toBeInstanceOf(Date);
  });
});