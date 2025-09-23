# Hierarchical PID System for AI Research Components

## Overview

The enhanced AIDE v0.2 schema introduces a hierarchical persistent identifier (PID) system to address the PID explosion problem while maintaining granular tracking of AI research components.

## PID Structure

### Base PID Format
```
https://doi.org/10.1234/base-identifier/component-type.version.instance
```

### Component Types
- `model` - AI model or algorithm
- `data` - Dataset or data source
- `workflow` - Research workflow or pipeline
- `disclosure` - AIDE disclosure event
- `output` - Generated research output

### Examples

#### Model Hierarchy
```
Base Model:     https://doi.org/10.1234/llama-3/model.8b.base
Fine-tuned:     https://doi.org/10.1234/llama-3/model.8b.medical-v1
Deployment:     https://doi.org/10.1234/llama-3/model.8b.medical-v1.deployment-001
```

#### Research Workflow
```
Workflow:       https://doi.org/10.1234/cancer-study-2025/workflow.v2
Step 1:         https://doi.org/10.1234/cancer-study-2025/workflow.v2.step-001
Step 2:         https://doi.org/10.1234/cancer-study-2025/workflow.v2.step-002
Disclosure:     https://doi.org/10.1234/cancer-study-2025/disclosure.step-001.ai-usage
```

#### Dataset Lineage
```
Original:       https://doi.org/10.1234/medical-records/data.raw.v1
Processed:      https://doi.org/10.1234/medical-records/data.processed.v1
Training Set:   https://doi.org/10.1234/medical-records/data.processed.v1.train
Validation:     https://doi.org/10.1234/medical-records/data.processed.v1.validation
```

## Benefits

1. **Prevents PID Explosion**: Related components share base PID
2. **Maintains Granularity**: Each component retains unique identifier
3. **Enables Batch Operations**: Can query all components under base PID
4. **Supports Versioning**: Built-in version tracking
5. **Machine Readable**: Structured format enables automated processing

## Implementation Guidelines

### For DataCite Integration
- Base PID registered as primary DOI
- Component identifiers stored as related identifiers
- Metadata inheritance from base to components
- Automated landing page generation

### For Repository Systems
- Hierarchical browsing interface
- Batch validation tools
- Automated relationship mapping
- Version control integration

### For Research Workflows
- Automated PID generation for pipeline steps
- Dependency tracking between components
- Rollback capabilities using version hierarchy
- Compliance reporting across component hierarchy

## Governance Considerations

1. **Authority**: Who can mint component PIDs under a base identifier
2. **Inheritance**: Which metadata inherits from base to components
3. **Deletion**: Policies for removing component PIDs
4. **Migration**: Procedures for restructuring hierarchies
5. **Access Control**: Permissions for different hierarchy levels

## Cost Implications

- **Reduced Costs**: Single base DOI covers multiple components
- **Tiered Pricing**: Cost based on hierarchy depth and component count
- **Bulk Discounts**: Reduced rates for large hierarchical registrations
- **Regional Support**: Subsidized hierarchical PIDs for developing regions