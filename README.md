# AIDE - AI Disclosure Event Schema

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![GitHub Issues](https://img.shields.io/github/issues/adammoore/AIDE-impl.svg)](https://github.com/adammoore/AIDE-impl/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/adammoore/AIDE-impl.svg)](https://github.com/adammoore/AIDE-impl/pulls)

**Enhanced machine-actionable disclosure of AI use in research workflows with hierarchical PID management and RAiD integration**

## 🆕 AIDE v0.2 - Now with RAiD Integration

AIDE v0.2 introduces major enhancements including **hierarchical persistent identifier (PID) management through RAiD integration**, addressing critical issues in AI research transparency, accessibility, and trust identified through stakeholder consultations and the evolving AI landscape.

### 🔗 RAiD Integration Highlights
- **Hierarchical PID Structure**: Prevents PID explosion by grouping related AI components under research activities
- **Real API Integration**: Working implementation with RAiD sandbox and production environments
- **Global Standards**: Leverages ISO 23527 through RAiD for international compatibility
- **Production Ready**: Complete implementation with comprehensive testing and documentation

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
- 🔗 **RAiD Integration**: Hierarchical PID management using Research Activity Identifiers
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

### RAiD Integration Demo
```bash
# Run interactive demo (offline capable)
node examples/aide-raid-demo.js

# Run full RAiD integration test (requires API key)
RAID_API_KEY=your_key node examples/aide-raid-test-implementation.js
```

### Schema Validation
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

### AIDE v0.1 Examples (Legacy)
- **ChatGPT** (`src/examples/aide_example_chatgpt.json`) - Writing assistance for manuscript preparation
- **Claude** (`src/examples/aide_example_claude.json`) - Data analysis and code generation
- **Hugging Face** (`src/examples/aide_example_huggingface.json`) - Model deployment and inference

### AIDE v0.2 Examples with RAiD Integration
- **Enhanced Research** (`src/examples/aide_example_v0_2_enhanced.json`) - Genomic analysis with full provenance tracking
- **RAiD Integration Demo** (`examples/aide-raid-demo-output.json`) - Generated from interactive demo
- **Research Workflow** (`examples/aide-raid-workflow-example.json`) - Complete multi-step AI research workflow

### RAiD Integration Usage

```javascript
const AideRaidIntegration = require('./src/aide-raid-integration');

// Initialize with RAiD API configuration
const integration = new AideRaidIntegration({
  raid: {
    apiUrl: 'https://api.demo.raid.org.au',
    apiKey: process.env.RAID_API_KEY
  }
});

// Create research activity with hierarchical AIDE disclosure
const result = await integration.createResearchActivityWithAide(
  {
    title: 'AI-Enhanced Climate Research',
    description: 'Research project using AI for climate data analysis'
  },
  {
    actor: { name: 'Dr. Jane Smith', orcid: 'https://orcid.org/0000-0000-0000-0000' },
    usage: { category: 'data_analysis', purpose: 'Climate pattern analysis', contribution_level: 'substantial' },
    model: { name: 'GPT-4', transparency_level: 'limited' },
    oversight: { humanInTheLoop: true, responsibleUse: true, bias_mitigation: { assessed: true } },
    provenance: { chain_integrity: true, backward_traceable: true, verification_method: 'manual' }
  }
);

console.log(`Hierarchical ID: ${result.hierarchicalId}`);
// Output: https://raid.org/10.1234/research-project-2025/aide.001
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
6. **RAiD Hierarchical PID Systems** - Structured component relationships with cost optimization via Research Activity Identifiers
7. **Automated Research Pipelines** - Integration with workflow orchestration systems and batch processing
8. **Global Equity Infrastructure** - Regional pricing and accessibility frameworks through RAiD governance
9. **Trust Verification Networks** - Distributed provenance validation systems with cryptographic integrity
10. **AI Vendor Partnerships** - Native disclosure generation in AI platforms with automatic RAiD registration

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
│   ├── aide_schema_v0_2.json           # 🆕 Enhanced schema with RAiD integration
│   ├── index.js                        # JavaScript validation library (v0.2 support)
│   ├── raid-client.js                  # 🆕 RAiD API client for PID operations
│   ├── aide-raid-integration.js        # 🆕 Main integration layer
│   └── examples/                       # Example disclosure files
│       ├── aide_example_chatgpt.json   # v0.1 ChatGPT example
│       ├── aide_example_claude.json    # v0.1 Claude example
│       ├── aide_example_huggingface.json # v0.1 Hugging Face example
│       └── aide_example_v0_2_enhanced.json # v0.2 comprehensive example
├── examples/                           # 🆕 RAiD integration examples
│   ├── aide-raid-demo.js              # Interactive demo (offline capable)
│   ├── aide-raid-test-implementation.js # Complete test suite with real API
│   ├── aide-raid-workflow-example.json # Multi-step research workflow
│   └── aide-raid-demo-output.json     # Generated demo output
├── tests/                              # Jest test suite
├── scripts/                            # Build and validation scripts
├── docs/                               # 🆕 Enhanced documentation
│   ├── hierarchical-pid-specification.md # PID hierarchy design
│   ├── raid-integration-design.md     # 🆕 RAiD integration technical design
│   ├── README-RAID-INTEGRATION.md     # 🆕 Complete RAiD integration guide
│   ├── IMPLEMENTATION-SUMMARY.md      # 🆕 Implementation achievements summary
│   ├── technical-roadmap-2025-2027.md # Implementation roadmap
│   └── README.md                      # Documentation overview
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
npm run validate              # Validate schema examples
npm test                      # Run test suite
npm run build                 # Build and verify project

# RAiD Integration Testing
node examples/aide-raid-demo.js                    # Offline demo
RAID_API_KEY=key node examples/aide-raid-test-implementation.js  # Live API test
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

- **🆕 RAiD Integration**: [Complete implementation guide](docs/README-RAID-INTEGRATION.md) with production deployment
- **🆕 Implementation Summary**: [Achievements and capabilities](docs/IMPLEMENTATION-SUMMARY.md) overview
- **🆕 RAiD Technical Design**: [Integration architecture](docs/raid-integration-design.md) and API specifications
- **🆕 Hierarchical PIDs**: [PID system specification](docs/hierarchical-pid-specification.md) for cost optimization
- **🆕 Technical Roadmap**: [2025-2027 implementation plan](docs/technical-roadmap-2025-2027.md) addressing global challenges
- **Getting Started**: [Documentation overview](docs/README.md)

## 🗺️ Development Roadmap

### ✅ Phase 1 (COMPLETED): RAiD Integration Foundation
- ✅ Enhanced AIDE v0.2 schema implementation
- ✅ Hierarchical PID infrastructure with RAiD
- ✅ Real API integration and testing
- ✅ Production-ready implementation

### Phase 2 (Q1-Q2 2025): Enhanced Trust & Provenance
- Advanced bidirectional provenance validation
- Cryptographic integrity verification
- Commercial model transparency reporting
- Automated compliance checking

### Phase 3 (Q3-Q4 2025): Scale & Automation
- Large-scale automated research pipelines
- AI-enhanced metadata generation
- Real-time hallucination detection
- Batch processing optimization

### Phase 4 (Q1-Q2 2026): Global Infrastructure
- Distributed PID validation network
- Enhanced sustainability tracking
- Blockchain integration for immutable records
- Multi-regional RAiD deployment

### Phase 5 (Q3-Q4 2026): Ecosystem Integration
- Publisher platform integration
- Repository system integration
- AI vendor partnerships with native AIDE support
- Funder compliance automation

See the complete [Technical Roadmap](docs/technical-roadmap-2025-2027.md) for detailed implementation plans.

## 📞 Contact

- Project Issues: [GitHub Issues](https://github.com/adammoore/AIDE-impl/issues)
- Documentation: [Project Docs](docs/)

---

*AIDE: Making AI use in research transparent, citable, and auditable* 🔍✨