# AIDE - AI Disclosure Event Schema

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![GitHub Issues](https://img.shields.io/github/issues/adammoore/AIDE-impl.svg)](https://github.com/adammoore/AIDE-impl/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/adammoore/AIDE-impl.svg)](https://github.com/adammoore/AIDE-impl/pulls)

**Enhanced machine-actionable disclosure of AI use in research workflows with provenance tracking and trust frameworks**

## 🆕 AIDE v0.2 - Addressing Global AI Research Challenges

AIDE v0.2 introduces major enhancements addressing critical issues in AI research transparency, accessibility, and trust identified through stakeholder consultations and the evolving AI landscape.

## 🎯 Overview

As generative AI becomes deeply embedded in research workflows, reproducibility and trust require structured, machine-actionable disclosure of AI use. Current policies (UKRI, UKRIO, universities) demand transparency but lack technical standards.

AIDE provides a pragmatic schema leveraging existing persistent identifier (PID) infrastructure—ORCID, DataCite DOIs, ROR, and RAiD—to capture **who/when/what/why** of substantive AI use while supporting privacy via hashed prompt/output capsules.

## ✨ Core Features

### AIDE v0.1 Features
- 🤖 **Machine-actionable**: JSON Schema and XSD validation
- 🔒 **Privacy-preserving**: Optional hash capsules for prompts/outputs
- 🔗 **PID-native**: Integrates with ORCID, DOI, ROR, RAiD
- ⚡ **Minimal friction**: Lightweight disclosure requirements
- 🔄 **Interoperable**: Standard metadata formats
- 📋 **Policy-aligned**: Meets institutional transparency requirements

### 🚀 New in AIDE v0.2
- 🌐 **Bidirectional Provenance**: Complete source-to-output and output-to-source tracking
- 🏗️ **Hierarchical PIDs**: Structured component relationships preventing PID explosion
- 🤝 **Enhanced Attribution**: CRediT-style taxonomy with AI-specific contribution roles
- 🔍 **Commercial Transparency**: Required disclosure levels for closed AI models
- 🌍 **Global Equity**: Cost tier and geographic accessibility tracking
- 🌱 **Sustainability**: Energy consumption and carbon footprint metrics
- 🔗 **Training Data Lineage**: Detailed provenance of model training sources
- ⚖️ **Trust Frameworks**: Verification methods and governance mechanisms

## 📋 Schema Fields

### Required Fields (v0.1 & v0.2)
- `id` - Hierarchical persistent identifier for the disclosure
- `created` - ISO 8601 timestamp
- `actor` - ORCID, ROR affiliation, and enhanced contributor roles
- `usage` - Category, purpose, role, stage, contribution level
- `model` - Name, version, provider, transparency level
- `oversight` - Human oversight, responsible use, bias mitigation
- `provenance` - **New in v0.2**: Bidirectional tracking and verification

### Enhanced Fields (v0.2)
- `context` - RAiD, grants, related outputs, pipeline information
- `data` - Input sources, generated outputs, licensing information
- `prompts` - Hashed capsules with change logs and engineering details
- `access_equity` - **New**: Cost tiers, geographic restrictions, accessibility features

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

### AIDE v0.1 Examples
- **ChatGPT** (`aide_example_chatgpt.json`) - Writing assistance for manuscript preparation
- **Claude** (`aide_example_claude.json`) - Data analysis and code generation
- **Hugging Face** (`aide_example_huggingface.json`) - Model deployment and inference

### AIDE v0.2 Examples
- **Enhanced Research** (`aide_example_v0_2_enhanced.json`) - Genomic analysis with full provenance tracking, expert validation, and equity considerations

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

### Current Implementation Options
1. **DataCite DOIs** - Minted with human-readable landing pages and JSON API
2. **ORCID Integration** - Pushed as research contributions to researcher profiles
3. **Provenance Badges** - Compact visual indicators on publications
4. **Repository Systems** - Embedded in institutional repositories
5. **Publisher Workflows** - Integrated into submission and peer review

### 🆕 Enhanced Implementation (v0.2)
6. **Hierarchical PID Systems** - Structured component relationships with cost optimization
7. **Automated Research Pipelines** - Integration with workflow orchestration systems
8. **Global Equity Infrastructure** - Regional pricing and accessibility frameworks
9. **Trust Verification Networks** - Distributed provenance validation systems
10. **AI Vendor Partnerships** - Native disclosure generation in AI platforms

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
│   ├── aide_schema_v0_1.json           # Original JSON Schema definition
│   ├── aide_schema_v0_2.json           # 🆕 Enhanced schema with provenance & trust
│   ├── aide_schema_v0_1.xsd            # XML Schema definition
│   ├── index.js                        # JavaScript validation library
│   └── examples/                       # Example disclosure files
│       ├── aide_example_chatgpt.json   # v0.1 ChatGPT example
│       ├── aide_example_claude.json    # v0.1 Claude example
│       ├── aide_example_huggingface.json # v0.1 Hugging Face example
│       └── aide_example_v0_2_enhanced.json # 🆕 v0.2 comprehensive example
├── tests/                              # Jest test suite
├── scripts/                            # Build and validation scripts
├── docs/                               # 🆕 Enhanced documentation
│   ├── hierarchical-pid-specification.md # PID hierarchy design
│   ├── technical-roadmap-2025-2027.md    # Implementation roadmap
│   └── papers/                         # Research papers and reports
├── package.json                        # Node.js dependencies
└── README.md                           # This file
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

## 📚 Documentation

Comprehensive documentation is available in the [`/docs`](docs/) directory:

- **Research Papers**: [White papers and reports](docs/papers/) defining the AIDE framework
- **Visual Materials**: [Diagrams and mockups](docs/diagrams/) for implementation guidance
- **Technical Specs**: [Detailed specifications](docs/specs/) including badge requirements
- **🆕 Hierarchical PIDs**: [PID system specification](docs/hierarchical-pid-specification.md) for cost optimization
- **🆕 Technical Roadmap**: [2025-2027 implementation plan](docs/technical-roadmap-2025-2027.md) addressing global challenges
- **Getting Started**: [Documentation overview](docs/README.md)

## 🗺️ Development Roadmap

### Phase 1 (Q1-Q2 2025): Foundation
- Enhanced AIDE v0.2 schema implementation
- Hierarchical PID infrastructure
- Cost equity framework

### Phase 2 (Q3-Q4 2025): Trust & Provenance
- Bidirectional provenance engine
- AI attribution system
- Commercial model transparency

### Phase 3 (Q1-Q2 2026): Scale & Automation
- Automated research pipelines
- AI-enhanced metadata generation
- Hallucination detection system

### Phase 4 (Q3-Q4 2026): Global Infrastructure
- Distributed PID network
- Sustainability tracking
- Blockchain integration

### Phase 5 (Q1-Q2 2027): Ecosystem Integration
- Publisher platform integration
- Repository system integration
- AI vendor partnerships

See the complete [Technical Roadmap](docs/technical-roadmap-2025-2027.md) for detailed implementation plans.

## 📞 Contact

- Project Issues: [GitHub Issues](https://github.com/adammoore/AIDE-impl/issues)
- Documentation: [Project Docs](docs/)

---

*AIDE: Making AI use in research transparent, citable, and auditable* 🔍✨