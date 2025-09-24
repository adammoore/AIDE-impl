# AIDE v0.3 Enhancements Summary

## Overview

AIDE v0.3 introduces **Enhanced Attribution Systems** with extended CRediT taxonomy and SWHID integration, addressing critical questions about AI contribution attribution in research while maintaining the robust RAiD integration foundation from v0.2.

## Key Question Addressed

**Should AI contribution be linked to a contributor or as an action of a contributor?**

**Answer**: AIDE v0.3 adopts a **human-centric attribution model** where AI systems are treated as sophisticated tools (like statistical software or laboratory equipment) rather than research contributors. AI contributions are attributed as actions performed through human agency, oversight, and validation.

## Major Enhancements

### 1. Extended CRediT Taxonomy

#### New AI-Specific Roles (3 additions)
- **`ai_curation`**: Selection, configuration, and deployment of AI systems
- **`ai_oversight`**: Monitoring, validation, and ensuring responsible AI use
- **`ai_integration`**: Incorporating AI systems into research workflows

#### Maintains 14 Standard CRediT Roles
All existing CRediT roles remain unchanged for backward compatibility and human intellectual contribution attribution.

#### Attribution Patterns
- **Basic**: Simple AI assistance flags
- **Detailed**: Specific tools and validation methods
- **Comprehensive**: Complete attribution with confidence levels and justifications

### 2. SWHID Integration for AI Models

#### Software Heritage Identifiers (SWHID) Support
- **Model Components**: Core model, architecture, weights, training code, configuration
- **Provenance Chains**: Complete model lineage with cryptographic verification
- **Qualified Identifiers**: Context-rich SWHIDs with origin, path, and anchor information

#### Model Identification Structure
```
swh:1:cnt:abc123... (model weights)
swh:1:dir:def456... (complete model package)
swh:1:rel:ghi789... (tagged model release)
```

### 3. Enhanced Schema (v0.3)

#### New Actor Fields
- `ai_contribution_details`: Granular AI assistance information per role
- `attribution_metadata`: Attribution system metadata and generation method

#### Enhanced Model Fields
- `swhid`: Complete SWHID structure for all model components
- `software_heritage`: Archival status and verification information
- `model_lineage`: Relationship tracking to base models and training processes

#### Expanded Provenance
- `software_provenance`: SWHID-based software artifact relationships
- Enhanced verification methods including `swhid_verification`

## Implementation Architecture

### Core Components

1. **CreditAttribution Class** (`src/credit-attribution.js`)
   - Validates and generates enhanced CRediT attributions
   - Provides attribution patterns and best practices
   - Supports multiple output formats (AIDE, DataCite, ORCID)

2. **SwhidUtils Class** (`src/swhid-utils.js`)
   - Generates SWHIDs for AI model components
   - Parses and validates SWHID formats
   - Creates model lineage relationships

3. **Enhanced AIDE Schema** (`src/aide_schema_v0_3.json`)
   - Complete schema with CRediT extensions and SWHID support
   - Maintains backward compatibility with v0.1 and v0.2
   - Comprehensive validation rules

### Integration Points

#### With Existing RAiD System (v0.2)
- RAiD continues as hierarchical base identifier
- SWHID components enhance software provenance within RAiD structure
- Enhanced attribution complements hierarchical PID management

#### With External Standards
- **CRediT**: Official NISO standard with community-approved extensions
- **SWHID**: ISO/IEC 18670 standard for software identification
- **Software Heritage**: Global software archival and verification

## Benefits Delivered

### 1. Clear Attribution Framework
- **Human Accountability**: Maintains human responsibility for AI use
- **Tool Perspective**: Treats AI as sophisticated research instruments
- **Granular Detail**: Multiple levels of attribution detail for different contexts

### 2. Software Heritage Integration
- **Permanent Identification**: Cryptographically secure model identification
- **Complete Provenance**: Full model lineage and derivation tracking
- **Independent Verification**: Decentralized verification capabilities

### 3. Standards Compliance
- **CRediT Compatibility**: Builds on established research attribution standards
- **International Standards**: Leverages ISO standards for global compatibility
- **Community Alignment**: Participates in ongoing standardization efforts

## Use Cases and Examples

### Clinical Research
```json
{
  "contributorRole": ["investigation", "ai_oversight", "validation"],
  "ai_contribution_details": {
    "investigation": {
      "ai_assistance_level": "substantial",
      "validation_method": "expert_validation",
      "human_oversight": "comprehensive"
    }
  }
}
```

### Computational Research
```json
{
  "model": {
    "swhid": {
      "core": "swh:1:dir:abc123...",
      "weights": "swh:1:cnt:def456...",
      "training_code": "swh:1:dir:ghi789..."
    }
  }
}
```

### Multi-Modal AI Research
Comprehensive attribution with multiple AI tools, validation methods, and complete software provenance chains.

## Implementation Status

### ✅ Completed Features
- Enhanced CRediT taxonomy with AI-specific roles
- Complete SWHID integration for AI model identification
- Comprehensive attribution validation and formatting
- Multiple attribution patterns for different contexts
- Integration with existing RAiD hierarchical PID system
- Extensive examples and documentation

### 🔄 Validation Results
- Schema validation: ✅ AIDE v0.3 structure
- CRediT roles: ✅ All standard + AI extensions validated
- SWHID format: ✅ Proper format validation
- Attribution patterns: ✅ Multiple levels supported
- Format compatibility: ✅ AIDE, DataCite, ORCID formats

## Documentation and Resources

### Comprehensive Guides
- **Attribution Best Practices** (`docs/attribution-best-practices.md`)
- **Enhanced Attribution Design** (`docs/enhanced-attribution-design.md`)
- **Technical Integration Guide** (main README updates)

### Examples and Demos
- **Enhanced Attribution Demo** (`examples/enhanced-attribution-demo.js`)
- **Attribution Patterns** (`examples/attribution-patterns-examples.json`)
- **Complete v0.3 Example** (auto-generated by demo)

### Code Implementation
- **Core Classes**: CreditAttribution, SwhidUtils integrated into main exports
- **Schema Definition**: Complete v0.3 JSON schema with validation rules
- **Utility Functions**: Comprehensive tooling for attribution and SWHID operations

## Future Directions

### Community Engagement
- Participate in CRediT community discussions on AI extensions
- Contribute to SWHID AI use case development
- Monitor journal and publisher adoption requirements

### Technical Evolution
- Enhanced AI model component identification
- Integration with emerging AI governance frameworks
- Automated attribution generation tools

### Standards Development
- Support formal standardization of AI-specific CRediT roles
- Contribute to international AI transparency standards
- Develop best practices for domain-specific attribution

## Migration Path

### From v0.1/v0.2 to v0.3
1. **Schema Compatibility**: All existing disclosures remain valid
2. **Optional Enhancements**: Add AI-specific roles and SWHID information progressively
3. **Validation Support**: Multi-version schema validation available
4. **Tool Support**: Utilities provided for attribution enhancement and migration

### Adoption Strategy
1. **Pilot Implementation**: Start with basic attribution patterns
2. **Progressive Enhancement**: Add detailed attribution as needed
3. **Full Integration**: Implement comprehensive attribution for high-stakes research
4. **Community Adoption**: Share practices and contribute to standards development

---

*AIDE v0.3 establishes a comprehensive framework for transparent, accountable, and standardized AI attribution in research, balancing detailed tracking with practical implementation while maintaining human responsibility and recognition.*