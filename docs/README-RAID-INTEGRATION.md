# AIDE-RAiD Integration

This implementation demonstrates the integration of AIDE (AI Disclosure Event) schema with RAiD (Research Activity Identifier) for hierarchical persistent identifier management in AI research workflows.

## Overview

The AIDE-RAiD integration addresses the PID explosion problem by creating a hierarchical structure where:
- **RAiD** serves as the base identifier for research activities
- **AIDE disclosures** are hierarchical components under each RAiD
- **Related AI components** (models, datasets, workflows) share the base PID structure

## Key Features

### 🔗 Hierarchical PID Structure
```
RAiD (Research Activity):     https://raid.org/10.1234/research-project-2025
├── AIDE Disclosure 1:        https://raid.org/10.1234/research-project-2025/aide.001
├── AIDE Disclosure 2:        https://raid.org/10.1234/research-project-2025/aide.002
├── Model Component:          https://raid.org/10.1234/research-project-2025/model.llama-3-8b
└── Dataset Component:        https://raid.org/10.1234/research-project-2025/data.training-set-v1
```

### 📊 Enhanced AIDE Schema (v0.2)
- RAiD context integration
- Hierarchical positioning
- Bidirectional provenance tracking
- Global accessibility and equity tracking
- Enhanced compliance and oversight

### 🛠 API Integration
- RAiD client for persistent identifier operations
- Automated hierarchical ID generation
- Batch processing for research workflows
- Validation and compliance checking

## Quick Start

### 1. Installation
```bash
git clone <repository>
cd AIDE-impl
npm install
```

### 2. Run Demo
```bash
# Run offline demo (no API key required)
node examples/aide-raid-demo.js

# Run full integration test (requires RAiD API key)
RAID_API_KEY=your_key node examples/aide-raid-test-implementation.js
```

### 3. Basic Usage
```javascript
const AideRaidIntegration = require('./src/aide-raid-integration');

const integration = new AideRaidIntegration({
  raid: {
    apiUrl: 'https://api.demo.raid.org.au',
    apiKey: process.env.RAID_API_KEY
  }
});

// Create research activity with AIDE disclosure
const result = await integration.createResearchActivityWithAide(
  researchActivityMetadata,
  aideDisclosureData
);

console.log(`Hierarchical ID: ${result.hierarchicalId}`);
```

## Implementation Components

### Core Files

| File | Description |
|------|-------------|
| `src/raid-client.js` | RAiD API client for PID operations |
| `src/aide-raid-integration.js` | Main integration layer |
| `src/aide_schema_v0_2.json` | Enhanced AIDE schema with RAiD support |
| `docs/raid-integration-design.md` | Technical design documentation |

### Example Files

| File | Description |
|------|-------------|
| `examples/aide-raid-demo.js` | Interactive demo (offline capable) |
| `examples/aide-raid-test-implementation.js` | Comprehensive test suite |
| `examples/aide-raid-workflow-example.json` | Sample research workflow |

## Schema Integration

### AIDE Enhancement for RAiD
The AIDE v0.2 schema includes new fields for RAiD integration:

```json
{
  "id": "https://raid.org/10.1234/research-project-2025/aide.001",
  "context": {
    "raid": "https://raid.org/10.1234/research-project-2025",
    "hierarchical_position": "aide.001",
    "parent_activity": "https://raid.org/10.1234/research-project-2025"
  },
  "provenance": {
    "source_chain": [
      {
        "step": 0,
        "pid": "https://raid.org/10.1234/research-project-2025",
        "transformation": "research_activity_context",
        "confidence": 1.0
      }
    ]
  }
}
```

### RAiD Extended Metadata
RAiD metadata includes references to AIDE disclosures:

```json
{
  "identifier": "https://raid.org/10.1234/research-project-2025",
  "relatedObject": [
    {
      "id": "https://raid.org/10.1234/research-project-2025/aide.001",
      "type": "ai-disclosure",
      "relationship": "hasPart"
    }
  ]
}
```

## Testing and Validation

### Offline Testing
The implementation includes comprehensive offline testing that works without RAiD API access:

```bash
node examples/aide-raid-demo.js
```

This demonstrates:
- Schema validation
- Hierarchical PID generation
- Integration compliance checking
- Batch processing simulation
- Activity summary generation

### Live API Testing
With RAiD API credentials:

```bash
RAID_API_KEY=your_key node examples/aide-raid-test-implementation.js
```

This performs:
- Real RAiD creation
- AIDE disclosure registration
- Multi-step workflow testing
- End-to-end validation

## Benefits

### 1. Prevents PID Explosion
- Related AI components share base RAiD identifier
- Reduces costs and complexity
- Maintains hierarchical organization

### 2. Research Context
- Each AIDE disclosure linked to specific research project
- Enables project-level AI usage tracking
- Supports compliance and audit requirements

### 3. Global Standards
- Leverages RAiD's ISO 23527 standard
- International compatibility and recognition
- Established infrastructure and governance

### 4. Enhanced Provenance
- Complete bidirectional traceability
- Machine-readable change logs
- Cryptographic verification support

## Configuration

### Environment Variables
```bash
RAID_API_KEY=your_raid_api_key
RAID_API_URL=https://api.demo.raid.org.au  # Optional, defaults to demo
```

### Integration Options
```javascript
const integration = new AideRaidIntegration({
  raid: {
    apiUrl: 'https://api.demo.raid.org.au',
    apiKey: process.env.RAID_API_KEY,
    timeout: 30000
  },
  defaultAccessType: 'open'  // Default access type for research activities
});
```

## Compliance and Governance

### Data Sovereignty
- RAiD respects regional data sovereignty requirements
- AIDE disclosures inherit governance from parent RAiD
- Configurable access controls and permissions

### Audit Trail
- Complete provenance tracking through RAiD system
- Machine-readable change logs for compliance
- Immutable record options (blockchain, distributed ledger)

### Quality Assurance
- Schema validation for both AIDE and RAiD
- Integration compliance checking
- Automated testing and validation

## Next Steps

### Production Deployment
1. **API Key Setup**: Obtain production RAiD API credentials
2. **Infrastructure**: Deploy integration layer with monitoring
3. **Workflow Integration**: Connect to existing research pipelines

### Extended Features
1. **Batch Operations**: Large-scale workflow processing
2. **Analytics Dashboard**: AI usage tracking and reporting
3. **Automated Compliance**: Real-time policy checking

### Community Integration
1. **Repository Support**: Integration with research data repositories
2. **Publisher Workflows**: Academic publishing pipeline integration
3. **Funder Reporting**: Automated compliance reporting for funding agencies

## Support

### Documentation
- [RAiD Metadata Schema](https://metadata.raid.org/)
- [AIDE Schema Specification](./src/aide_schema_v0_2.json)
- [Integration Design](./docs/raid-integration-design.md)

### Testing
- Demo environment: https://api.demo.raid.org.au
- Swagger UI: https://api.demo.raid.org.au/swagger-ui/
- Schema validation: `npm run validate`

### Community
- RAiD Community: https://raid.org/
- AIDE Implementation: This repository
- Issues and Contributions: Welcome via GitHub

---

*This implementation demonstrates a production-ready approach to hierarchical PID management for AI research workflows using established international standards.*