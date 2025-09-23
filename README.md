# AIDE - AI Disclosure Event Schema

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![GitHub Issues](https://img.shields.io/github/issues/adammoore/AIDE-impl.svg)](https://github.com/adammoore/AIDE-impl/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/adammoore/AIDE-impl.svg)](https://github.com/adammoore/AIDE-impl/pulls)

**Minimal, machine-actionable disclosure of AI use in research workflows**

## 🎯 Overview

As generative AI becomes deeply embedded in research workflows, reproducibility and trust require structured, machine-actionable disclosure of AI use. Current policies (UKRI, UKRIO, universities) demand transparency but lack technical standards.

AIDE provides a pragmatic schema leveraging existing persistent identifier (PID) infrastructure—ORCID, DataCite DOIs, ROR, and RAiD—to capture **who/when/what/why** of substantive AI use while supporting privacy via hashed prompt/output capsules.

## ✨ Core Features

- 🤖 **Machine-actionable**: JSON Schema and XSD validation
- 🔒 **Privacy-preserving**: Optional hash capsules for prompts/outputs
- 🔗 **PID-native**: Integrates with ORCID, DOI, ROR, RAiD
- ⚡ **Minimal friction**: Lightweight disclosure requirements
- 🔄 **Interoperable**: Standard metadata formats
- 📋 **Policy-aligned**: Meets institutional transparency requirements

## 📋 Schema Fields

### Required Fields
- `id` - DOI or persistent identifier for the disclosure
- `created` - ISO 8601 timestamp
- `actor` - ORCID and optional ROR affiliation
- `usage` - Category, purpose, role, stage
- `model` - Name, version, provider details
- `oversight` - Human oversight and responsible use attestation

### Optional Fields
- `context` - RAiD, grants, related outputs
- `data` - Referenced datasets/sources (DOIs)
- `prompts` - Hashed prompt/output capsules

## 🚀 Quick Start

### Installation

```bash
git clone https://github.com/adammoore/AIDE-impl.git
cd AIDE-impl
npm install
```

### Validation
```bash
# Validate all example files
npm run validate

# Validate a specific file
node scripts/validate.js path/to/disclosure.json
```

### Testing
```bash
npm test
```

### Build
```bash
npm run build
```

## 📚 Examples

The repository includes complete disclosure examples:

- **ChatGPT** (`aide_example_chatgpt.json`) - Writing assistance for manuscript preparation
- **Claude** (`aide_example_claude.json`) - Data analysis and code generation
- **Hugging Face** (`aide_example_huggingface.json`) - Model deployment and inference

```javascript
const { AIDEValidator } = require('./src/index.js');

const validator = new AIDEValidator();

// Create a basic disclosure
const disclosure = validator.createBasicDisclosure({
  id: 'https://doi.org/10.1234/example',
  actorName: 'Dr. Jane Smith',
  orcid: 'https://orcid.org/0000-0000-0000-0000',
  usage: {
    category: 'writing',
    purpose: 'manuscript drafting assistance'
  },
  model: {
    name: 'ChatGPT',
    version: 'GPT-4',
    provider: 'OpenAI'
  }
});

// Validate it
const result = validator.validateDisclosure(disclosure);
console.log(result.valid); // true
```

## 🏗️ Implementation Pathways

AIDE records can be implemented through multiple channels:

1. **DataCite DOIs** - Minted with human-readable landing pages and JSON API
2. **ORCID Integration** - Pushed as research contributions to researcher profiles
3. **Provenance Badges** - Compact visual indicators on publications
4. **Repository Systems** - Embedded in institutional repositories
5. **Publisher Workflows** - Integrated into submission and peer review

## 🔬 Pilot Programs

Three pilot programs are planned for 3-6 months each:

### 1. Publisher Integration
- Submission capture and display
- Editorial workflow integration
- Author guidance and validation

### 2. Repository Systems
- Automatic ORCID push
- Institutional compliance tracking
- Bulk validation tools

### 3. Model Provenance
- Model release DOIs
- Training data lineage
- Deployment tracking

## 🤝 Benefits by Stakeholder

### 📊 For Funders
- Measurable compliance signals
- Research integrity metrics
- Policy effectiveness tracking

### 📖 For Publishers
- Standardized metadata
- Clear author responsibilities
- Automated compliance checking

### 👩‍🔬 For Researchers
- Clear disclosure guidance
- Portable provenance records
- Reduced reporting burden

## 📁 Project Structure

```
├── src/
│   ├── aide_schema_v0_1.json     # JSON Schema definition
│   ├── aide_schema_v0_1.xsd      # XML Schema definition
│   ├── index.js                  # JavaScript validation library
│   └── examples/                 # Example disclosure files
├── tests/                        # Jest test suite
├── scripts/                      # Build and validation scripts
├── docs/                         # Documentation
├── package.json                  # Node.js dependencies
└── README.md                     # This file
```

## 🧪 Development

### Prerequisites
- Node.js 16+
- npm or yarn

### Setup
```bash
npm install
npm run validate  # Validate examples
npm test         # Run test suite
npm run build    # Build and verify project
```

### Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📜 License

Licensed under the Apache License, Version 2.0. See [LICENSE](LICENSE) for details.

## 🙏 Acknowledgments

This work builds on research by FAIR Research Consultancy and Management, with input from the research integrity and persistent identifier communities.

## 📞 Contact

- Project Issues: [GitHub Issues](https://github.com/adammoore/AIDE-impl/issues)
- Documentation: [Project Wiki](https://github.com/adammoore/AIDE-impl/wiki)

---

*AIDE: Making AI use in research transparent, citable, and auditable* 🔍✨