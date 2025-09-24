# Enhanced Attribution Design for AIDE v0.3

## Overview

This document outlines the enhanced attribution system for AIDE v0.3, extending the CRediT taxonomy with AI-specific roles and integrating SWHID for model identification. The design addresses the fundamental question: **Should AI contribution be linked to a contributor or as an action of a contributor?**

## Core Attribution Philosophy

### Human-Centric Attribution Model

After careful analysis, we adopt a **human-centric attribution model** where:

1. **AI systems are tools, not contributors** - Like statistical software or laboratory equipment
2. **Humans remain responsible** - For AI selection, deployment, validation, and interpretation
3. **AI contributions are actions** - Performed through human agency and oversight
4. **Enhanced CRediT roles** - Capture the nuanced ways humans work with AI systems

### Rationale

- **Responsibility**: Humans maintain legal, ethical, and scientific responsibility
- **Accountability**: Clear attribution to human decision-makers and validators
- **Standards Compliance**: Aligns with existing research integrity frameworks
- **Tool Evolution**: Allows AI to be treated like other sophisticated research tools

## Enhanced CRediT Taxonomy for AI Research

### Standard CRediT Roles (Unchanged)

The 14 standard CRediT roles remain unchanged to maintain compatibility:

1. **Conceptualization** - Ideas; formulation or evolution of overarching research goals
2. **Data curation** - Management activities to annotate, scrub data and maintain research data
3. **Formal analysis** - Statistical, mathematical, computational techniques to analyze data
4. **Funding acquisition** - Acquisition of financial support for the research
5. **Investigation** - Conducting research and investigation process, performing experiments
6. **Methodology** - Development or design of methodology; creation of models
7. **Project administration** - Management and coordination responsibility for research activity
8. **Resources** - Provision of study materials, reagents, materials, patients, laboratory samples
9. **Software** - Programming, software development; designing computer programs
10. **Supervision** - Oversight and leadership responsibility for research activity planning
11. **Validation** - Verification of the overall replication/reproducibility of results
12. **Visualization** - Preparation, creation and/or presentation of the published work
13. **Writing – original draft** - Preparation of the published work, specifically writing the initial draft
14. **Writing – review & editing** - Critical review, commentary or revision of the published work

### AI-Enhanced CRediT Extensions

We extend the taxonomy with AI-specific role modifiers and sub-categories:

#### 1. AI-Assisted Core Roles

Each standard CRediT role can be modified with AI assistance indicators:

- **ai_assisted**: Human performed role with AI assistance
- **ai_generated**: AI generated output with human oversight and validation
- **ai_supervised**: Automated AI process with human supervision
- **ai_validated**: AI output validated by human expert

#### 2. New AI-Specific Roles

**AI Curation**
- Definition: Selection, configuration, and deployment of AI systems for research tasks
- Sub-categories:
  - `ai_model_selection`: Choosing appropriate AI models/systems
  - `ai_parameter_tuning`: Configuring AI system parameters
  - `ai_prompt_engineering`: Designing effective prompts for AI systems

**AI Oversight**
- Definition: Monitoring, validating, and ensuring responsible use of AI systems
- Sub-categories:
  - `ai_quality_assurance`: Validating AI outputs for accuracy and reliability
  - `ai_bias_mitigation`: Identifying and addressing bias in AI systems
  - `ai_ethics_compliance`: Ensuring AI use meets ethical standards

**AI Integration**
- Definition: Incorporating AI systems into research workflows and methodologies
- Sub-categories:
  - `ai_workflow_design`: Designing AI-enhanced research workflows
  - `ai_tool_development`: Creating custom AI tools or adaptations
  - `ai_system_integration`: Integrating AI systems with existing research infrastructure

#### 3. Attribution Patterns

**Primary Attribution Pattern (Recommended)**
```json
{
  "contributorRole": [
    "formal_analysis",
    "ai_curation",
    "ai_oversight"
  ],
  "ai_assistance_details": {
    "formal_analysis": {
      "ai_assisted": true,
      "ai_tools": ["GPT-4", "Custom Analysis Model"],
      "human_validation": "expert_review"
    }
  }
}
```

**Granular Attribution Pattern (Detailed Research)**
```json
{
  "contributorRole": [
    "formal_analysis.ai_assisted",
    "ai_curation.ai_model_selection",
    "ai_oversight.ai_quality_assurance"
  ]
}
```

## SWHID Integration for AI Models

### SWHID Application to AI Artifacts

SWHID extends beyond traditional source code to identify AI-specific artifacts:

#### Model Components
- **Model Architecture** (`swh:1:cnt:...`) - Model definition files (Python, JSON, etc.)
- **Model Weights** (`swh:1:cnt:...`) - Serialized model parameters
- **Training Code** (`swh:1:dir:...`) - Complete training pipeline
- **Inference Code** (`swh:1:cnt:...`) - Model serving/inference scripts
- **Model Metadata** (`swh:1:cnt:...`) - Configuration, hyperparameters, documentation

#### Dataset Lineage
- **Training Data** (`swh:1:dir:...`) - Complete training datasets
- **Validation Sets** (`swh:1:dir:...`) - Model validation data
- **Test Data** (`swh:1:dir:...`) - Model evaluation datasets
- **Data Processing** (`swh:1:rev:...`) - Data preprocessing pipelines

#### Model Releases
- **Model Releases** (`swh:1:rel:...`) - Tagged model versions
- **Deployment Snapshots** (`swh:1:snp:...`) - Production model deployments
- **Experiment Snapshots** (`swh:1:snp:...`) - Research experiment states

### SWHID Generation for AI Models

#### Standard Model File
```
swh:1:cnt:94a9ed024d3859793618152ea559a168bbcbb5e2
```

#### Model with Context
```
swh:1:cnt:94a9ed024d3859793618152ea559a168bbcbb5e2;origin=https://huggingface.co/bert-base-uncased;visit=swh:1:snp:463f73c3...;anchor=swh:1:rev:abc123...;path=/pytorch_model.bin
```

#### Training Snapshot
```
swh:1:snp:463f73c3bc13c7adc5c9b0328229a47b1c5e3e5;origin=https://github.com/research-lab/climate-bert;visit=swh:1:snp:463f73c3...
```

## Enhanced AIDE Schema Integration

### Model Identification

```json
{
  "model": {
    "name": "Climate-BERT",
    "version": "v1.2.0",
    "provider": "Research Lab",
    "swhid": {
      "core": "swh:1:cnt:94a9ed024d3859793618152ea559a168bbcbb5e2",
      "architecture": "swh:1:cnt:abc123...",
      "weights": "swh:1:cnt:def456...",
      "training_code": "swh:1:dir:ghi789...",
      "release": "swh:1:rel:jkl012..."
    },
    "transparency_level": "open",
    "software_heritage": {
      "archived": true,
      "archival_date": "2025-01-15T10:00:00Z",
      "verification_status": "verified"
    }
  }
}
```

### Enhanced Actor Attribution

```json
{
  "actor": {
    "name": "Dr. Climate Researcher",
    "orcid": "https://orcid.org/0000-0002-1825-0097",
    "affiliation": {
      "name": "University of Climate Science",
      "ror": "https://ror.org/013cjyk83"
    },
    "contributorRole": [
      "conceptualization",
      "formal_analysis",
      "ai_curation",
      "ai_oversight",
      "validation"
    ],
    "ai_contribution_details": {
      "formal_analysis": {
        "ai_assistance_level": "substantial",
        "ai_tools_used": ["Climate-BERT", "Statistical Analysis AI"],
        "human_oversight": "continuous",
        "validation_method": "expert_review"
      },
      "ai_curation": {
        "activities": ["ai_model_selection", "ai_parameter_tuning"],
        "justification": "Selected Climate-BERT for domain expertise in climate data analysis"
      }
    }
  }
}
```

### Provenance with SWHID

```json
{
  "provenance": {
    "chain_integrity": true,
    "backward_traceable": true,
    "source_chain": [
      {
        "step": 0,
        "pid": "https://raid.org/10.1234/climate-research-2025",
        "transformation": "research_activity_context",
        "confidence": 1.0
      },
      {
        "step": 1,
        "swhid": "swh:1:cnt:94a9ed024d3859793618152ea559a168bbcbb5e2",
        "transformation": "ai_model_inference",
        "confidence": 0.89,
        "human_validation": true
      }
    ],
    "software_provenance": {
      "model_lineage": [
        {
          "swhid": "swh:1:rel:base-model-v1.0",
          "relationship": "derived_from"
        },
        {
          "swhid": "swh:1:dir:training-pipeline-v2.1",
          "relationship": "trained_with"
        }
      ]
    }
  }
}
```

## Attribution Best Practices

### 1. Human Agency Principle
- Always attribute AI use to the human who:
  - Selected the AI system
  - Configured the AI system
  - Validated the AI outputs
  - Takes responsibility for the results

### 2. Transparency Principle
- Clearly distinguish between:
  - Human-authored content
  - AI-assisted content with human oversight
  - AI-generated content with human validation
  - Purely automated processes with human supervision

### 3. Granularity Principle
- Match attribution detail to research context:
  - **Basic**: Simple ai_assisted flags
  - **Detailed**: Specific AI tools and validation methods
  - **Comprehensive**: Complete SWHID provenance chains

### 4. Accountability Principle
- Ensure clear lines of responsibility:
  - Who selected the AI system and why?
  - Who validated the AI outputs?
  - Who takes responsibility for any errors?
  - Who ensured ethical compliance?

## Implementation Considerations

### Backward Compatibility
- All existing CRediT roles remain valid
- AI extensions are additive, not replacing
- Legacy AIDE disclosures continue to validate

### Tool Support
- SWHID computation tools for AI models
- CRediT role validation and suggestion systems
- Attribution pattern validation and guidance

### Community Standards
- Align with emerging AI research attribution standards
- Participate in CRediT community discussions on AI extensions
- Contribute to SWHID AI use case development

### Future Directions
- Monitor AI attribution practices in major journals
- Track regulatory requirements for AI transparency
- Adapt to evolving AI governance frameworks

---

*This design balances comprehensive attribution with practical implementation, ensuring AI use in research is both transparent and appropriately attributed to responsible humans.*