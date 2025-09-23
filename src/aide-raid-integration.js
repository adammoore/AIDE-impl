/**
 * AIDE-RAiD Integration Layer
 * Provides hierarchical PID management for AIDE disclosures using RAiD
 */

const RaidClient = require('./raid-client');
const { sha256 } = require('js-sha256');

class AideRaidIntegration {
  constructor(options = {}) {
    this.raidClient = new RaidClient(options.raid || {});
    this.defaultAccessType = options.defaultAccessType || 'https://vocabularies.coar-repositories.org/access_rights/open/';
  }

  /**
   * Create a new research activity and associated AIDE disclosure
   * @param {Object} researchActivity - Research activity metadata
   * @param {Object} aideDisclosure - AIDE disclosure data
   * @returns {Promise<Object>} Created AIDE with hierarchical PID
   */
  async createResearchActivityWithAide(researchActivity, aideDisclosure) {
    try {
      // Create the base research activity (RAiD)
      const raid = await this.raidClient.createResearchActivity(researchActivity);
      const raidId = raid.identifier.id;

      // Create hierarchical AIDE disclosure
      const hierarchicalAide = await this.createHierarchicalAide(raidId, aideDisclosure);

      return {
        raid,
        aide: hierarchicalAide,
        hierarchicalId: hierarchicalAide.id
      };
    } catch (error) {
      throw new Error(`Failed to create research activity with AIDE: ${error.message}`);
    }
  }

  /**
   * Create a hierarchical AIDE disclosure under an existing RAiD
   * @param {string} raidId - Parent RAiD identifier
   * @param {Object} aideDisclosure - AIDE disclosure data
   * @returns {Promise<Object>} Enhanced AIDE with hierarchical PID
   */
  async createHierarchicalAide(raidId, aideDisclosure) {
    try {
      // Generate hierarchical PID
      const hierarchicalId = this._generateHierarchicalPid(raidId, 'aide');

      // Enhance AIDE disclosure with RAiD context
      const enhancedAide = {
        ...aideDisclosure,
        id: hierarchicalId,
        context: {
          ...aideDisclosure.context,
          raid: raidId,
          hierarchical_position: this._extractHierarchicalPosition(hierarchicalId),
          parent_activity: raidId
        },
        provenance: {
          ...aideDisclosure.provenance,
          source_chain: [
            {
              step: 0,
              pid: raidId,
              transformation: "research_activity_context",
              confidence: 1.0
            },
            ...(aideDisclosure.provenance?.source_chain || [])
          ]
        }
      };

      // Register with RAiD
      await this.raidClient.registerAideDisclosure(raidId, enhancedAide);

      return enhancedAide;
    } catch (error) {
      throw new Error(`Failed to create hierarchical AIDE: ${error.message}`);
    }
  }

  /**
   * Get all AIDE disclosures under a research activity
   * @param {string} raidId - RAiD identifier
   * @returns {Promise<Array>} Array of AIDE disclosures
   */
  async getAideDisclosuresForActivity(raidId) {
    try {
      const components = await this.raidClient.getHierarchicalComponents(raidId);

      // Filter for AIDE disclosures
      return components.filter(component =>
        component.type?.id === 'https://aide-schema.org/types/ai-disclosure'
      );
    } catch (error) {
      throw new Error(`Failed to retrieve AIDE disclosures: ${error.message}`);
    }
  }

  /**
   * Create a batch of AIDE disclosures for a workflow
   * @param {string} raidId - Parent RAiD identifier
   * @param {Array} aideDisclosures - Array of AIDE disclosure data
   * @returns {Promise<Array>} Array of created hierarchical AIDs
   */
  async createBatchAideDisclosures(raidId, aideDisclosures) {
    const results = [];

    for (let i = 0; i < aideDisclosures.length; i++) {
      try {
        const disclosure = aideDisclosures[i];

        // Add batch context to each disclosure
        const batchEnhancedDisclosure = {
          ...disclosure,
          context: {
            ...disclosure.context,
            pipeline: {
              ...disclosure.context?.pipeline,
              batchId: this._generateBatchId(),
              stepNumber: i + 1,
              totalSteps: aideDisclosures.length
            }
          }
        };

        const hierarchicalAide = await this.createHierarchicalAide(raidId, batchEnhancedDisclosure);
        results.push(hierarchicalAide);
      } catch (error) {
        // Continue with other disclosures even if one fails
        results.push({
          error: error.message,
          originalDisclosure: aideDisclosures[i]
        });
      }
    }

    return results;
  }

  /**
   * Update an existing AIDE disclosure
   * @param {string} hierarchicalId - AIDE hierarchical identifier
   * @param {Object} updateData - Updated AIDE data
   * @returns {Promise<Object>} Updated AIDE disclosure
   */
  async updateAideDisclosure(hierarchicalId, updateData) {
    try {
      // Extract RAiD from hierarchical ID
      const raidId = this._extractRaidFromHierarchical(hierarchicalId);

      // Add update to change log
      const updatedAide = {
        ...updateData,
        prompts: {
          ...updateData.prompts,
          change_log: [
            ...(updateData.prompts?.change_log || []),
            {
              timestamp: new Date().toISOString(),
              change_type: "human_edited",
              description: "AIDE disclosure updated via RAiD integration"
            }
          ]
        }
      };

      // Note: RAiD doesn't directly store AIDE data, so this would need
      // to be implemented with a separate storage layer or metadata updates
      return updatedAide;
    } catch (error) {
      throw new Error(`Failed to update AIDE disclosure: ${error.message}`);
    }
  }

  /**
   * Validate AIDE-RAiD integration compliance
   * @param {Object} aideDisclosure - AIDE disclosure to validate
   * @returns {Object} Validation results
   */
  validateAideRaidCompliance(aideDisclosure) {
    const issues = [];
    const warnings = [];

    // Check required RAiD context
    if (!aideDisclosure.context?.raid) {
      issues.push("Missing RAiD context in AIDE disclosure");
    }

    // Validate hierarchical ID format
    if (aideDisclosure.id && !this._isValidHierarchicalId(aideDisclosure.id)) {
      issues.push("Invalid hierarchical PID format");
    }

    // Check provenance chain includes RAiD
    const hasRaidInProvenance = aideDisclosure.provenance?.source_chain?.some(
      step => step.pid?.includes('raid.org')
    );
    if (!hasRaidInProvenance) {
      warnings.push("RAiD not found in provenance chain");
    }

    return {
      valid: issues.length === 0,
      issues,
      warnings
    };
  }

  /**
   * Generate comprehensive research activity summary
   * @param {string} raidId - RAiD identifier
   * @returns {Promise<Object>} Activity summary with AIDE analytics
   */
  async generateActivitySummary(raidId) {
    try {
      const raid = await this.raidClient.getResearchActivity(raidId);
      const aideDisclosures = await this.getAideDisclosuresForActivity(raidId);

      const summary = {
        raid: {
          id: raidId,
          title: raid.title?.[0]?.text,
          description: raid.description?.[0]?.text,
          created: raid.date?.find(d => d.dateType?.id?.includes('created'))?.date
        },
        aiUsage: {
          totalDisclosures: aideDisclosures.length,
          categories: this._analyzeAiCategories(aideDisclosures),
          models: this._analyzeModels(aideDisclosures),
          contributionLevels: this._analyzeContributionLevels(aideDisclosures)
        },
        compliance: {
          humanOversight: this._analyzeHumanOversight(aideDisclosures),
          ethicalReview: this._analyzeEthicalReview(aideDisclosures),
          biasAssessment: this._analyzeBiasAssessment(aideDisclosures)
        }
      };

      return summary;
    } catch (error) {
      throw new Error(`Failed to generate activity summary: ${error.message}`);
    }
  }

  // Private helper methods

  _generateHierarchicalPid(raidId, componentType) {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 6);
    return `${raidId}/${componentType}.${timestamp}.${random}`;
  }

  _extractHierarchicalPosition(hierarchicalId) {
    const parts = hierarchicalId.split('/');
    return parts[parts.length - 1];
  }

  _extractRaidFromHierarchical(hierarchicalId) {
    const parts = hierarchicalId.split('/');
    return parts.slice(0, -1).join('/');
  }

  _isValidHierarchicalId(id) {
    return id.includes('raid.org') && id.includes('/');
  }

  _generateBatchId() {
    return `batch-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
  }

  _analyzeAiCategories(disclosures) {
    const categories = {};
    disclosures.forEach(disclosure => {
      const category = disclosure.usage?.category;
      if (category) {
        categories[category] = (categories[category] || 0) + 1;
      }
    });
    return categories;
  }

  _analyzeModels(disclosures) {
    const models = {};
    disclosures.forEach(disclosure => {
      const model = disclosure.model?.name;
      if (model) {
        models[model] = (models[model] || 0) + 1;
      }
    });
    return models;
  }

  _analyzeContributionLevels(disclosures) {
    const levels = {};
    disclosures.forEach(disclosure => {
      const level = disclosure.usage?.contribution_level;
      if (level) {
        levels[level] = (levels[level] || 0) + 1;
      }
    });
    return levels;
  }

  _analyzeHumanOversight(disclosures) {
    return disclosures.map(d => d.oversight?.humanInTheLoop).filter(Boolean).length;
  }

  _analyzeEthicalReview(disclosures) {
    return disclosures.map(d => d.oversight?.ethical_review?.obtained).filter(Boolean).length;
  }

  _analyzeBiasAssessment(disclosures) {
    return disclosures.map(d => d.oversight?.bias_mitigation?.assessed).filter(Boolean).length;
  }
}

module.exports = AideRaidIntegration;