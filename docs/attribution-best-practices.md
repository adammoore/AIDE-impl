# Attribution Best Practices for AI in Research

## Introduction

This guide provides comprehensive best practices for attributing AI contributions in research using the enhanced CRediT taxonomy and SWHID integration in AIDE v0.3. The approach addresses the fundamental question of whether AI contribution should be linked to a contributor or as an action of a contributor.

## Core Attribution Philosophy: Human-Centric Model

### Fundamental Principle

**AI systems are sophisticated tools, not research contributors.** Like statistical software, laboratory equipment, or analytical instruments, AI systems perform tasks under human direction, supervision, and validation.

### Key Tenets

1. **Human Responsibility**: Humans remain responsible for AI selection, deployment, validation, and interpretation
2. **Tool Perspective**: AI contributions are actions performed through human agency
3. **Accountability**: Clear attribution to human decision-makers and validators
4. **Transparency**: Distinguish between human intellectual work and AI-assisted tasks

## Enhanced CRediT Taxonomy for AI Research

### Standard CRediT Roles (14 Official Roles)

These roles remain unchanged and represent human intellectual contributions:

1. **Conceptualization** - Ideas and research goals formulation
2. **Data curation** - Data management and maintenance activities
3. **Formal analysis** - Statistical, mathematical, computational analysis
4. **Funding acquisition** - Financial support acquisition
5. **Investigation** - Research and investigation processes
6. **Methodology** - Methodology development and model creation
7. **Project administration** - Management and coordination
8. **Resources** - Provision of materials and tools
9. **Software** - Programming and software development
10. **Supervision** - Oversight and leadership
11. **Validation** - Results verification and reproducibility
12. **Visualization** - Data presentation and visualization
13. **Writing – original draft** - Initial manuscript preparation
14. **Writing – review & editing** - Critical review and revision

### AI-Specific Extensions (3 New Roles)

#### 1. AI Curation (`ai_curation`)
**Definition**: Selection, configuration, and deployment of AI systems for research tasks.

**When to Use**:
- Selecting appropriate AI models for specific research problems
- Configuring AI system parameters and hyperparameters
- Designing prompts for language models
- Integrating AI tools into research workflows

**Sub-categories**:
- `ai_model_selection`: Choosing AI models/systems
- `ai_parameter_tuning`: Configuring system parameters
- `ai_prompt_engineering`: Designing effective prompts
- `ai_tool_integration`: Workflow integration

#### 2. AI Oversight (`ai_oversight`)
**Definition**: Monitoring, validating, and ensuring responsible use of AI systems.

**When to Use**:
- Validating AI outputs for accuracy and reliability
- Identifying and mitigating bias in AI systems
- Ensuring ethical compliance in AI use
- Monitoring AI systems for safety issues

**Sub-categories**:
- `ai_quality_assurance`: Output validation and quality control
- `ai_bias_mitigation`: Bias identification and mitigation
- `ai_ethics_compliance`: Ethical standards compliance
- `ai_safety_monitoring`: Safety and risk monitoring

#### 3. AI Integration (`ai_integration`)
**Definition**: Incorporating AI systems into research methodologies and workflows.

**When to Use**:
- Designing AI-enhanced research workflows
- Creating custom AI tools or adaptations
- Integrating AI with existing research infrastructure
- Developing automated AI-driven processes

**Sub-categories**:
- `ai_workflow_design`: AI-enhanced workflow design
- `ai_tool_development`: Custom AI tool creation
- `ai_system_integration`: Infrastructure integration
- `ai_automation_design`: Automated process design

## Attribution Patterns and Levels

### Level 1: Basic Attribution
**Use for**: Simple AI assistance with clear human oversight

```json
{
  "contributorRole": ["writing_original_draft", "ai_oversight"],
  "ai_contribution_details": {
    "writing_original_draft": {
      "ai_assistance_level": "minimal",
      "ai_tools_used": ["ChatGPT-4"],
      "human_oversight": "comprehensive",
      "validation_method": "manual_review"
    }
  }
}
```

### Level 2: Detailed Attribution
**Use for**: Moderate AI use with specific tool identification

```json
{
  "contributorRole": [
    "formal_analysis",
    "ai_curation",
    "ai_oversight"
  ],
  "ai_contribution_details": {
    "formal_analysis": {
      "ai_assistance_level": "substantial",
      "ai_tools_used": ["GPT-4", "Statistical Analysis AI"],
      "human_oversight": "continuous",
      "validation_method": "expert_validation",
      "confidence_level": 0.89
    }
  }
}
```

### Level 3: Comprehensive Attribution
**Use for**: Extensive AI use, clinical research, or high-stakes applications

Includes full tool details, validation methods, confidence levels, and justifications.

## SWHID Integration for AI Models

### Model Component Identification

Use SWHIDs to identify specific AI model components:

- **Complete Model**: `swh:1:dir:...` - Entire model package
- **Architecture**: `swh:1:cnt:...` - Model definition files
- **Weights**: `swh:1:cnt:...` - Serialized parameters
- **Training Code**: `swh:1:dir:...` - Training pipeline
- **Configuration**: `swh:1:cnt:...` - Config files
- **Release**: `swh:1:rel:...` - Tagged versions

### SWHID Best Practices

1. **Comprehensive Coverage**: Include SWHIDs for all AI model components used
2. **Qualified Identifiers**: Use qualifiers for context (origin, path, anchor)
3. **Provenance Chains**: Link derived models to base models via SWHIDs
4. **Verification**: Ensure SWHIDs can be independently verified

Example:
```json
{
  "model": {
    "swhid": {
      "core": "swh:1:dir:94a9ed024d3859793618152ea559a168bbcbb5e2",
      "weights": "swh:1:cnt:abc123...",
      "config": "swh:1:cnt:def456..."
    }
  }
}
```

## Domain-Specific Guidelines

### Medical/Clinical Research

**Additional Requirements**:
- Mandatory ethical review documentation
- Comprehensive bias assessment and mitigation
- Expert clinical validation for all AI outputs
- Detailed fairness evaluation across patient populations

**Attribution Pattern**:
```json
{
  "contributorRole": ["investigation", "ai_oversight", "validation"],
  "oversight": {
    "ethical_review": {
      "required": true,
      "obtained": true,
      "reference": "IRB-2025-001"
    },
    "bias_mitigation": {
      "assessed": true,
      "assessment_method": "expert_evaluation"
    }
  }
}
```

### Computational Research

**Focus Areas**:
- Detailed software provenance via SWHIDs
- Reproducibility through complete model identification
- Performance and efficiency documentation

### Social Sciences Research

**Considerations**:
- Enhanced bias mitigation requirements
- Cultural sensitivity in AI tool selection
- Demographic representation in validation

## Validation and Compliance

### Attribution Validation Checklist

#### CRediT Roles
- [ ] All roles from standard or AI-extended taxonomy
- [ ] AI-specific roles used appropriately
- [ ] Human accountability maintained
- [ ] No direct attribution to AI systems

#### AI Contribution Details
- [ ] Assistance level specified (minimal/moderate/substantial/extensive)
- [ ] Validation methods documented
- [ ] Confidence levels provided where appropriate
- [ ] Justifications explain AI use rationale

#### SWHID Integration
- [ ] Proper SWHID format (`swh:1:xxx:hash`)
- [ ] Appropriate object types for artifacts
- [ ] Qualifiers used for contextual information
- [ ] Independent verification possible

### Common Mistakes to Avoid

1. **Attributing to AI**: Never list AI systems as contributors
2. **Vague Descriptions**: Avoid generic "AI assistance" without specifics
3. **Missing Validation**: Always document how AI outputs were validated
4. **Incomplete SWHIDs**: Include all relevant model components
5. **Overconfidence**: Don't claim perfect AI accuracy

## Implementation Guidelines

### For Individual Researchers

1. **Document AI Use**: Keep detailed records of AI tool usage
2. **Validate Outputs**: Always review and validate AI-generated content
3. **Specify Tools**: Name specific AI tools and versions
4. **Justify Use**: Explain why AI assistance was beneficial
5. **Maintain Oversight**: Ensure human responsibility throughout

### For Research Teams

1. **Role Clarity**: Define who is responsible for AI curation and oversight
2. **Shared Standards**: Establish team-wide attribution standards
3. **Review Processes**: Implement peer review for AI-assisted work
4. **Documentation**: Maintain central records of AI tool usage

### For Institutions

1. **Policy Development**: Create institutional AI attribution policies
2. **Training Programs**: Train researchers on attribution best practices
3. **Tool Guidelines**: Provide approved AI tool lists and configurations
4. **Compliance Monitoring**: Regular audits of AI attribution practices

## Future Considerations

### Evolving Standards

- Monitor CRediT community developments for AI extensions
- Track journal and publisher attribution requirements
- Adapt to regulatory changes in AI transparency

### Technology Evolution

- Update SWHID practices as model identification improves
- Incorporate new AI tool categories as they emerge
- Refine attribution granularity based on community feedback

### International Harmonization

- Align with global AI attribution standards
- Consider regional variations in AI governance
- Participate in international standardization efforts

## Examples and Templates

### Quick Reference Template

```json
{
  "actor": {
    "contributorRole": [
      "[standard_role]",
      "[ai_role]"
    ],
    "ai_contribution_details": {
      "[standard_role]": {
        "ai_assistance_level": "[minimal|moderate|substantial|extensive]",
        "ai_tools_used": ["[tool_name]"],
        "human_oversight": "[none|minimal|continuous|comprehensive]",
        "validation_method": "[method]",
        "justification": "[explanation]"
      }
    }
  }
}
```

### Domain-Specific Examples

See `examples/attribution-patterns-examples.json` for comprehensive examples across different research domains.

## Resources

- **CRediT Taxonomy**: https://credit.niso.org
- **SWHID Specification**: https://www.swhid.org
- **Software Heritage**: https://www.softwareheritage.org
- **AIDE Schema**: Complete specification in `src/aide_schema_v0_3.json`

---

*These best practices ensure transparent, accountable, and standardized attribution of AI use in research while maintaining human responsibility and enabling proper recognition of all contributors.*