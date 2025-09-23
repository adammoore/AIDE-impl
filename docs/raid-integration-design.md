# RAiD Integration Design for AIDE Hierarchical PIDs

## Overview

This document outlines the integration design between AIDE (AI Disclosure Event) schema and RAiD (Research Activity Identifier) for implementing hierarchical persistent identifiers in AI research workflows.

## RAiD-AIDE Integration Model

### Core Concept

RAiD serves as the **base identifier** for research activities, with AIDE disclosure events as **hierarchical components** under each RAiD. This creates a structured PID hierarchy that prevents PID explosion while maintaining granular tracking.

### Hierarchical Structure

```
RAiD (Research Activity):     https://raid.org/10.1234/research-project-2025
├── AIDE Disclosure 1:        https://raid.org/10.1234/research-project-2025/aide.001
├── AIDE Disclosure 2:        https://raid.org/10.1234/research-project-2025/aide.002
├── Model Component:          https://raid.org/10.1234/research-project-2025/model.llama-3-8b
├── Dataset Component:        https://raid.org/10.1234/research-project-2025/data.training-set-v1
└── Workflow Step:           https://raid.org/10.1234/research-project-2025/workflow.step-003
```

## Integration Points

### 1. AIDE Schema Enhancement

The AIDE v0.2 schema already includes a `context.raid` field. We enhance this to support hierarchical relationships:

```json
{
  "id": "https://raid.org/10.1234/research-project-2025/aide.001",
  "context": {
    "raid": "https://raid.org/10.1234/research-project-2025",
    "hierarchical_position": "aide.001",
    "parent_activity": "https://raid.org/10.1234/research-project-2025"
  }
}
```

### 2. RAiD Extended Metadata

RAiD's extended metadata schema supports related objects, which we use to reference AIDE disclosures:

```json
{
  "identifier": "https://raid.org/10.1234/research-project-2025",
  "relatedObjects": [
    {
      "id": "https://raid.org/10.1234/research-project-2025/aide.001",
      "type": "ai-disclosure",
      "relationship": "hasPart"
    }
  ]
}
```

## Technical Implementation

### RAiD Client Interface

```javascript
class RaidClient {
  constructor(apiUrl, apiKey) {
    this.apiUrl = apiUrl;
    this.apiKey = apiKey;
  }

  async createResearchActivity(metadata) {
    // Create base RAiD
  }

  async registerAideDisclosure(raidId, aideData) {
    // Register AIDE as hierarchical component
  }

  async getHierarchicalComponents(raidId) {
    // Retrieve all components under RAiD
  }
}
```

### AIDE-RAiD Integration Layer

```javascript
class AideRaidIntegration {
  async createHierarchicalAide(raidId, aideDisclosure) {
    // Generate hierarchical PID
    const hierarchicalId = `${raidId}/aide.${this.generateSequence()}`;

    // Enhance AIDE with RAiD context
    aideDisclosure.id = hierarchicalId;
    aideDisclosure.context.raid = raidId;

    // Register with RAiD
    await this.raidClient.registerComponent(raidId, aideDisclosure);

    return aideDisclosure;
  }
}
```

## Benefits of RAiD-AIDE Integration

### 1. Research Activity Context
- Each AIDE disclosure is linked to a specific research project
- Enables project-level AI usage tracking and compliance

### 2. Hierarchical Organization
- Prevents PID explosion by grouping related disclosures
- Maintains fine-grained tracking within research context

### 3. Standardized Metadata
- Leverages RAiD's ISO 23527 standard
- Ensures international compatibility and recognition

### 4. Global Registry
- RAiD provides global persistence and resolution
- AIDE benefits from established infrastructure

## Implementation Phases

### Phase 1: Basic Integration
- Implement RAiD client for demo environment
- Enhance AIDE schema with RAiD context
- Create simple hierarchical PID generation

### Phase 2: Advanced Features
- Implement batch operations for multiple AIDE disclosures
- Add provenance tracking across RAiD hierarchy
- Integrate with RAiD's access control system

### Phase 3: Production Deployment
- Connect to production RAiD infrastructure
- Implement full metadata synchronization
- Add monitoring and analytics capabilities

## Technical Considerations

### Authentication
- RAiD uses Keycloak for authentication
- AIDE integration needs proper OAuth2/OIDC flow
- API keys for programmatic access

### Data Synchronization
- Bidirectional metadata updates between RAiD and AIDE
- Conflict resolution for concurrent modifications
- Version control for hierarchical components

### Error Handling
- Graceful degradation when RAiD is unavailable
- Local caching of hierarchical relationships
- Retry mechanisms for failed registrations

## Compliance and Governance

### Data Sovereignty
- RAiD respects regional data sovereignty requirements
- AIDE disclosures inherit governance from parent RAiD

### Access Control
- RAiD's multi-party access model supports collaborative research
- AIDE disclosures can have different visibility than parent project

### Audit Trail
- Complete provenance tracking through RAiD system
- Machine-readable change logs for compliance

## Testing Strategy

### Sandbox Environment
- Use RAiD demo API at https://api.demo.raid.org.au
- Create test research activities for AIDE integration
- Validate hierarchical PID resolution

### Integration Tests
- End-to-end workflow testing
- Performance testing with multiple AIDE disclosures
- Failover testing for production scenarios