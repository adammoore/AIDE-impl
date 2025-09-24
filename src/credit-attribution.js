/**
 * Enhanced CRediT Attribution System for AIDE
 * Extends CRediT taxonomy with AI-specific roles and attribution patterns
 */

class CreditAttribution {
  constructor() {
    this.standardRoles = this.getStandardCreditRoles();
    this.aiExtensions = this.getAiCreditExtensions();
    this.attributionPatterns = this.getAttributionPatterns();
  }

  /**
   * Standard CRediT roles (14 official roles)
   */
  getStandardCreditRoles() {
    return {
      conceptualization: {
        id: 'conceptualization',
        definition: 'Ideas; formulation or evolution of overarching research goals and aims',
        description: 'Conceptualization includes idea development, goal formulation, research question formulation, and hypothesis development.'
      },
      data_curation: {
        id: 'data_curation',
        definition: 'Management activities to annotate (produce metadata), scrub data and maintain research data (including software code, where it is necessary for interpreting the data itself) for initial use and later re-use',
        description: 'Data curation includes data cleaning, data organization, data validation, and metadata creation.'
      },
      formal_analysis: {
        id: 'formal_analysis',
        definition: 'Application of statistical, mathematical, computational, or other formal techniques to analyze or synthesize study data',
        description: 'Formal analysis includes statistical analysis, mathematical modeling, computational analysis, and data synthesis.'
      },
      funding_acquisition: {
        id: 'funding_acquisition',
        definition: 'Acquisition of the financial support for the project leading to this publication',
        description: 'Funding acquisition includes grant writing, fundraising, and securing financial support.'
      },
      investigation: {
        id: 'investigation',
        definition: 'Conducting a research and investigation process, specifically performing the experiments, or data/evidence collection',
        description: 'Investigation includes experimental design execution, data collection, and evidence gathering.'
      },
      methodology: {
        id: 'methodology',
        definition: 'Development or design of methodology; creation of models',
        description: 'Methodology includes research design, model development, and analytical framework creation.'
      },
      project_administration: {
        id: 'project_administration',
        definition: 'Management and coordination responsibility for the research activity planning and execution',
        description: 'Project administration includes project planning, coordination, and execution management.'
      },
      resources: {
        id: 'resources',
        definition: 'Provision of study materials, reagents, materials, patients, laboratory samples, animals, instrumentation, computing resources, or other analysis tools',
        description: 'Resources includes provision of materials, equipment, computational resources, and research infrastructure.'
      },
      software: {
        id: 'software',
        definition: 'Programming, software development; designing computer programs; implementation of the computer code and supporting algorithms; testing of existing code components',
        description: 'Software includes programming, software design, code implementation, and software testing.'
      },
      supervision: {
        id: 'supervision',
        definition: 'Oversight and leadership responsibility for the research activity planning and execution, including mentorship external to the core team',
        description: 'Supervision includes research oversight, mentorship, and leadership responsibilities.'
      },
      validation: {
        id: 'validation',
        definition: 'Verification, whether as a part of the activity or separate, of the overall replication/reproducibility of results/experiments and other research outputs',
        description: 'Validation includes results verification, reproducibility testing, and quality assurance.'
      },
      visualization: {
        id: 'visualization',
        definition: 'Preparation, creation and/or presentation of the published work, specifically visualization/data presentation',
        description: 'Visualization includes data visualization, figure creation, and presentation materials development.'
      },
      writing_original_draft: {
        id: 'writing_original_draft',
        definition: 'Preparation, creation and/or presentation of the published work, specifically writing the initial draft (including substantive translation)',
        description: 'Writing original draft includes initial manuscript preparation and substantive translation.'
      },
      writing_review_editing: {
        id: 'writing_review_editing',
        definition: 'Preparation, creation and/or presentation of the published work by those from the original research group, specifically critical review, commentary or revision',
        description: 'Writing review and editing includes manuscript revision, critical review, and editorial improvements.'
      }
    };
  }

  /**
   * AI-specific CRediT extensions
   */
  getAiCreditExtensions() {
    return {
      ai_curation: {
        id: 'ai_curation',
        definition: 'Selection, configuration, and deployment of AI systems for research tasks',
        description: 'AI curation includes model selection, parameter configuration, and deployment planning.',
        subcategories: {
          ai_model_selection: 'Choosing appropriate AI models or systems for specific research tasks',
          ai_parameter_tuning: 'Configuring and optimizing AI system parameters and hyperparameters',
          ai_prompt_engineering: 'Designing and optimizing prompts for AI language models',
          ai_tool_integration: 'Integrating AI tools into existing research workflows'
        }
      },
      ai_oversight: {
        id: 'ai_oversight',
        definition: 'Monitoring, validating, and ensuring responsible use of AI systems in research',
        description: 'AI oversight includes quality assurance, bias mitigation, and ethics compliance.',
        subcategories: {
          ai_quality_assurance: 'Validating AI outputs for accuracy, reliability, and scientific validity',
          ai_bias_mitigation: 'Identifying, assessing, and addressing bias in AI systems and outputs',
          ai_ethics_compliance: 'Ensuring AI use meets ethical standards and institutional policies',
          ai_safety_monitoring: 'Monitoring AI systems for safety and unintended consequences'
        }
      },
      ai_integration: {
        id: 'ai_integration',
        definition: 'Incorporating AI systems into research methodologies and workflows',
        description: 'AI integration includes workflow design, tool development, and system integration.',
        subcategories: {
          ai_workflow_design: 'Designing AI-enhanced research workflows and pipelines',
          ai_tool_development: 'Creating custom AI tools, wrappers, or adaptations for research',
          ai_system_integration: 'Integrating AI systems with existing research infrastructure',
          ai_automation_design: 'Designing automated processes using AI systems'
        }
      }
    };
  }

  /**
   * Attribution patterns for different levels of detail
   */
  getAttributionPatterns() {
    return {
      basic: {
        description: 'Simple AI assistance flags for general disclosure',
        example: ['formal_analysis', 'ai_oversight']
      },
      detailed: {
        description: 'Specific AI assistance details with tool identification',
        example: ['formal_analysis.ai_assisted', 'ai_curation.ai_model_selection']
      },
      comprehensive: {
        description: 'Complete attribution with tool details and validation methods',
        example: {
          contributorRole: ['formal_analysis', 'ai_curation', 'ai_oversight'],
          ai_contribution_details: {
            formal_analysis: {
              ai_assistance_level: 'substantial',
              ai_tools_used: ['GPT-4', 'Custom Analysis Model'],
              human_oversight: 'continuous',
              validation_method: 'expert_review'
            }
          }
        }
      }
    };
  }

  /**
   * Validate CRediT roles (standard + AI extensions)
   * @param {Array<string>} roles - Array of CRediT role identifiers
   * @returns {object} Validation results
   */
  validateRoles(roles) {
    const allRoles = { ...this.standardRoles, ...this.aiExtensions };
    const valid = [];
    const invalid = [];
    const warnings = [];

    for (const role of roles) {
      // Handle dotted notation (e.g., 'formal_analysis.ai_assisted')
      const baseRole = role.split('.')[0];

      if (allRoles[baseRole]) {
        valid.push(role);
      } else {
        invalid.push(role);
      }

      // Check for common patterns that might need AI extensions
      if (this.standardRoles[baseRole] && role === baseRole) {
        const aiSuggestions = this.suggestAiExtensions(baseRole);
        if (aiSuggestions.length > 0) {
          warnings.push({
            role: baseRole,
            suggestion: `Consider adding AI-specific roles: ${aiSuggestions.join(', ')}`
          });
        }
      }
    }

    return {
      valid: invalid.length === 0,
      validRoles: valid,
      invalidRoles: invalid,
      warnings
    };
  }

  /**
   * Suggest AI extensions for standard CRediT roles
   * @param {string} standardRole - Standard CRediT role
   * @returns {Array<string>} Suggested AI extension roles
   */
  suggestAiExtensions(standardRole) {
    const suggestions = {
      formal_analysis: ['ai_curation', 'ai_oversight'],
      data_curation: ['ai_curation', 'ai_oversight'],
      software: ['ai_integration', 'ai_curation'],
      methodology: ['ai_integration', 'ai_curation'],
      visualization: ['ai_curation', 'ai_oversight'],
      writing_original_draft: ['ai_curation', 'ai_oversight'],
      validation: ['ai_oversight']
    };

    return suggestions[standardRole] || [];
  }

  /**
   * Generate attribution structure for AI-assisted research
   * @param {object} config - Attribution configuration
   * @returns {object} Complete attribution structure
   */
  generateAttribution(config) {
    const {
      actorInfo,
      standardRoles = [],
      aiAssistance = {},
      attributionLevel = 'detailed'
    } = config;

    const baseAttribution = {
      name: actorInfo.name,
      orcid: actorInfo.orcid,
      affiliation: actorInfo.affiliation,
      contributorRole: [...standardRoles]
    };

    // Add AI-specific roles based on assistance provided
    const aiRoles = this.inferAiRoles(aiAssistance);
    baseAttribution.contributorRole.push(...aiRoles);

    // Add detailed attribution based on level
    if (attributionLevel === 'detailed' || attributionLevel === 'comprehensive') {
      baseAttribution.ai_contribution_details = this.generateAiContributionDetails(aiAssistance);
    }

    if (attributionLevel === 'comprehensive') {
      baseAttribution.attribution_metadata = {
        attribution_level: attributionLevel,
        credit_version: 'enhanced-v1.0',
        generation_timestamp: new Date().toISOString()
      };
    }

    return baseAttribution;
  }

  /**
   * Infer AI-specific roles from assistance details
   * @param {object} aiAssistance - AI assistance details
   * @returns {Array<string>} Inferred AI roles
   */
  inferAiRoles(aiAssistance) {
    const roles = new Set();

    Object.entries(aiAssistance).forEach(([standardRole, details]) => {
      if (details.ai_tools_used && details.ai_tools_used.length > 0) {
        roles.add('ai_curation');
      }
      if (details.validation_method || details.human_oversight) {
        roles.add('ai_oversight');
      }
      if (details.workflow_integration || details.custom_tools) {
        roles.add('ai_integration');
      }
    });

    return Array.from(roles);
  }

  /**
   * Generate detailed AI contribution information
   * @param {object} aiAssistance - AI assistance details
   * @returns {object} Detailed contribution information
   */
  generateAiContributionDetails(aiAssistance) {
    const details = {};

    Object.entries(aiAssistance).forEach(([role, assistance]) => {
      details[role] = {
        ai_assistance_level: assistance.level || 'moderate',
        ai_tools_used: assistance.tools || [],
        human_oversight: assistance.oversight || 'continuous',
        validation_method: assistance.validation || 'manual_review',
        confidence_level: assistance.confidence || 0.8,
        ...assistance.additional || {}
      };
    });

    return details;
  }

  /**
   * Convert attribution to different output formats
   * @param {object} attribution - Attribution object
   * @param {string} format - Output format (aide, datacite, orcid)
   * @returns {object} Formatted attribution
   */
  formatAttribution(attribution, format = 'aide') {
    switch (format) {
      case 'aide':
        return this.formatForAide(attribution);
      case 'datacite':
        return this.formatForDataCite(attribution);
      case 'orcid':
        return this.formatForOrcid(attribution);
      default:
        return attribution;
    }
  }

  /**
   * Format attribution for AIDE schema
   * @param {object} attribution - Attribution object
   * @returns {object} AIDE-formatted attribution
   */
  formatForAide(attribution) {
    return {
      actor: {
        name: attribution.name,
        orcid: attribution.orcid,
        affiliation: attribution.affiliation,
        contributorRole: attribution.contributorRole,
        ai_contribution_details: attribution.ai_contribution_details
      }
    };
  }

  /**
   * Format attribution for DataCite
   * @param {object} attribution - Attribution object
   * @returns {object} DataCite-formatted attribution
   */
  formatForDataCite(attribution) {
    return {
      name: attribution.name,
      nameIdentifiers: [{
        nameIdentifier: attribution.orcid,
        nameIdentifierScheme: 'ORCID'
      }],
      affiliation: attribution.affiliation ? [attribution.affiliation] : [],
      contributorType: 'Other', // DataCite doesn't have direct CRediT mapping
      contributorRoles: attribution.contributorRole
    };
  }

  /**
   * Format attribution for ORCID
   * @param {object} attribution - Attribution object
   * @returns {object} ORCID-formatted attribution
   */
  formatForOrcid(attribution) {
    return {
      'put-code': null,
      'external-id': null,
      'role-title': attribution.contributorRole.join(', '),
      'type': 'research-contribution',
      'ai-assistance': attribution.ai_contribution_details ? 'yes' : 'no'
    };
  }

  /**
   * Generate attribution best practices guidance
   * @param {object} context - Research context
   * @returns {object} Best practices recommendations
   */
  generateBestPractices(context) {
    const { researchType, aiUsageLevel, publicationVenue } = context;

    const practices = {
      general: [
        'Always attribute AI use to responsible human contributors',
        'Clearly distinguish between human and AI contributions',
        'Provide transparency about AI tool selection and validation',
        'Maintain clear lines of accountability for AI outputs'
      ],
      specific: []
    };

    if (aiUsageLevel === 'extensive') {
      practices.specific.push(
        'Consider comprehensive attribution pattern with full tool details',
        'Include detailed validation methods for all AI outputs',
        'Document AI system versions and configuration parameters'
      );
    }

    if (researchType === 'clinical' || researchType === 'medical') {
      practices.specific.push(
        'Ensure AI oversight role includes clinical validation',
        'Document bias mitigation steps for health-related AI',
        'Include ethics review information for AI use in medical research'
      );
    }

    return practices;
  }
}

module.exports = CreditAttribution;