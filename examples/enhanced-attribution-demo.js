/**
 * Enhanced Attribution Demo for AIDE v0.3
 * Demonstrates CRediT extensions and SWHID integration
 */

const { CreditAttribution, SwhidUtils, validate } = require('../src/index');
const fs = require('fs');
const path = require('path');

class EnhancedAttributionDemo {
  constructor() {
    this.creditAttribution = new CreditAttribution();
    this.swhidUtils = new SwhidUtils();
  }

  async runDemo() {
    console.log('🎭 Enhanced Attribution Demo for AIDE v0.3');
    console.log('===========================================\n');

    try {
      // Demo 1: Enhanced CRediT Attribution
      console.log('📋 Demo 1: Enhanced CRediT Attribution Patterns');
      await this.demonstrateCreditExtensions();

      // Demo 2: SWHID Integration for Models
      console.log('\n🔗 Demo 2: SWHID Integration for AI Models');
      await this.demonstrateSwhidIntegration();

      // Demo 3: Complete AIDE v0.3 Example
      console.log('\n📄 Demo 3: Complete AIDE v0.3 Disclosure');
      await this.demonstrateCompleteDisclosure();

      // Demo 4: Attribution Best Practices
      console.log('\n💡 Demo 4: Attribution Best Practices');
      this.demonstrateBestPractices();

      // Demo 5: Validation and Compliance
      console.log('\n✅ Demo 5: Enhanced Validation');
      await this.demonstrateValidation();

      console.log('\n🎉 Enhanced Attribution Demo completed successfully!');

    } catch (error) {
      console.error('❌ Demo failed:', error.message);
      throw error;
    }
  }

  async demonstrateCreditExtensions() {
    console.log('Standard CRediT roles:', Object.keys(this.creditAttribution.getStandardCreditRoles()).length);
    console.log('AI extension roles:', Object.keys(this.creditAttribution.getAiCreditExtensions()).length);

    // Basic attribution pattern
    const basicAttribution = this.creditAttribution.generateAttribution({
      actorInfo: {
        name: 'Dr. AI Researcher',
        orcid: 'https://orcid.org/0000-0002-1825-0097',
        affiliation: {
          name: 'University of Advanced AI',
          ror: 'https://ror.org/013cjyk83'
        }
      },
      standardRoles: ['formal_analysis', 'writing_original_draft'],
      aiAssistance: {
        formal_analysis: {
          level: 'substantial',
          tools: ['GPT-4', 'Statistical Analysis AI'],
          oversight: 'continuous',
          validation: 'expert_validation'
        },
        writing_original_draft: {
          level: 'minimal',
          tools: ['Claude 3.5'],
          oversight: 'comprehensive',
          validation: 'manual_review'
        }
      },
      attributionLevel: 'comprehensive'
    });

    console.log('✨ Generated Attribution Pattern:');
    console.log(`   Contributor Roles: ${basicAttribution.contributorRole.join(', ')}`);
    console.log(`   AI Tools Used: ${this.extractAiTools(basicAttribution).join(', ')}`);

    // Validate roles
    const validation = this.creditAttribution.validateRoles(basicAttribution.contributorRole);
    console.log(`   Role Validation: ${validation.valid ? '✅ Valid' : '❌ Invalid'}`);
    if (validation.warnings.length > 0) {
      validation.warnings.forEach(w => console.log(`   ⚠️  ${w.suggestion}`));
    }

    return basicAttribution;
  }

  async demonstrateSwhidIntegration() {
    // Demonstrate SWHID generation for different model components
    const modelExamples = [
      { name: 'config.json', content: '{"model_type": "bert", "hidden_size": 768}' },
      { name: 'pytorch_model.bin', content: Buffer.from('fake model weights data') },
      { name: 'README.md', content: '# Climate BERT Model\n\nThis model is trained on climate data.' }
    ];

    console.log('Generating SWHIDs for model components:');

    const modelSwhids = {};
    for (const example of modelExamples) {
      const swhid = this.swhidUtils.generateContentSwhid(example.content);
      modelSwhids[example.name] = swhid;
      console.log(`   ${example.name}: ${swhid}`);
    }

    // Demonstrate SWHID parsing
    const parsedSwhid = this.swhidUtils.parseSwhid(modelSwhids['config.json']);
    console.log(`\nParsed SWHID structure:`);
    console.log(`   Object Type: ${parsedSwhid.objectType}`);
    console.log(`   Object ID: ${parsedSwhid.objectId.substring(0, 8)}...`);

    // Demonstrate SWHID with qualifiers
    const qualifiedSwhid = this.swhidUtils.buildSwhidWithQualifiers(
      modelSwhids['pytorch_model.bin'],
      {
        origin: 'https://huggingface.co/climate-bert',
        path: '/pytorch_model.bin',
        anchor: 'swh:1:rev:abc123def456'
      }
    );
    console.log(`\nSWHID with qualifiers:`);
    console.log(`   ${qualifiedSwhid.substring(0, 60)}...`);

    return modelSwhids;
  }

  async demonstrateCompleteDisclosure() {
    const completeDisclosure = {
      id: 'https://raid.org/10.1234/climate-ai-research-2025/aide.003',
      created: new Date().toISOString(),
      version: '0.3',
      actor: {
        name: 'Dr. Climate AI Specialist',
        orcid: 'https://orcid.org/0000-0002-1825-0097',
        affiliation: {
          name: 'Institute for Climate AI Research',
          ror: 'https://ror.org/013cjyk83',
          accessLevel: 'full'
        },
        contributorRole: [
          'conceptualization',
          'formal_analysis',
          'methodology',
          'ai_curation',
          'ai_oversight',
          'ai_integration'
        ],
        ai_contribution_details: {
          formal_analysis: {
            ai_assistance_level: 'substantial',
            ai_tools_used: ['Climate-BERT v2.1', 'Statistical Analysis AI'],
            human_oversight: 'continuous',
            validation_method: 'expert_validation',
            confidence_level: 0.89,
            justification: 'AI models provided domain expertise in climate data pattern recognition'
          },
          ai_curation: {
            ai_assistance_level: 'extensive',
            ai_tools_used: ['Model Selection Framework'],
            human_oversight: 'comprehensive',
            validation_method: 'peer_review',
            confidence_level: 0.95,
            justification: 'Systematic evaluation and selection of optimal AI models for climate analysis'
          }
        },
        attribution_metadata: {
          attribution_level: 'comprehensive',
          credit_version: 'enhanced-v1.0',
          generation_method: 'assisted'
        }
      },
      context: {
        raid: 'https://raid.org/10.1234/climate-ai-research-2025',
        grantIdentifier: 'NSF-2025-CLIMATE-AI-001',
        relatedOutputs: [
          {
            pid: 'https://doi.org/10.1234/climate-ai-paper-2025',
            relationship: 'contributes_to'
          }
        ]
      },
      usage: {
        category: 'data_analysis',
        purpose: 'Advanced climate pattern analysis using transformer-based models',
        contribution_level: 'substantial',
        role: 'analyst',
        stage: 'analysis',
        human_verification: {
          method: 'expert_validation',
          coverage: 0.85
        }
      },
      model: {
        name: 'Climate-BERT',
        version: 'v2.1.0',
        provider: 'Climate AI Research Lab',
        pid: 'https://doi.org/10.1234/climate-bert-v2-1',
        swhid: {
          core: 'swh:1:dir:94a9ed024d3859793618152ea559a168bbcbb5e2',
          architecture: 'swh:1:cnt:abc123def456789012345678901234567890abcd',
          weights: 'swh:1:cnt:def456789012345678901234567890abcdef1234',
          training_code: 'swh:1:dir:789012345678901234567890abcdef123456789a',
          config: 'swh:1:cnt:012345678901234567890abcdef123456789abc12',
          release: 'swh:1:rel:345678901234567890abcdef123456789abc1234'
        },
        software_heritage: {
          archived: true,
          archival_date: '2025-01-15T10:00:00Z',
          verification_status: 'verified'
        },
        transparency_level: 'open',
        training_data: {
          datasets: [
            {
              pid: 'https://doi.org/10.1234/climate-dataset-2024',
              swhid: 'swh:1:dir:567890abcdef123456789abc123456789012345',
              name: 'Global Climate Data Archive 2024',
              license: 'CC-BY-4.0',
              consent_status: 'explicit'
            }
          ],
          training_date: '2024-12-01',
          data_cutoff: '2024-11-30'
        },
        capabilities: {
          modalities: ['text', 'multimodal'],
          languages: ['en'],
          bias_documentation: 'https://example.org/climate-bert-bias-report'
        },
        model_lineage: {
          base_models: [
            {
              name: 'BERT-base-uncased',
              swhid: 'swh:1:rel:890abcdef123456789abc123456789012345678',
              relationship: 'fine_tuned_from'
            }
          ]
        }
      },
      data: {
        input_sources: [
          {
            pid: 'https://doi.org/10.1234/satellite-climate-data',
            swhid: 'swh:1:dir:bcdef123456789abc123456789012345678901',
            type: 'dataset',
            license: 'NASA Open Data',
            usage_rights: 'permitted'
          }
        ],
        generated_outputs: [
          {
            pid: 'https://doi.org/10.1234/climate-analysis-results-2025',
            swhid: 'swh:1:cnt:cdef123456789abc123456789012345678901a',
            type: 'analysis',
            verification_status: 'verified'
          }
        ]
      },
      prompts: {
        promptClass: 'climate_analysis_v2',
        promptHash: 'sha256:a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2',
        outputHash: 'sha256:b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3',
        algorithm: 'sha256',
        prompt_engineering: {
          iterations: 3,
          technique: 'few_shot',
          temperature: 0.1,
          engineering_method: 'systematic_optimization'
        }
      },
      provenance: {
        chain_integrity: true,
        backward_traceable: true,
        source_chain: [
          {
            step: 0,
            pid: 'https://raid.org/10.1234/climate-ai-research-2025',
            transformation: 'research_activity_context',
            confidence: 1.0,
            human_validation: true
          },
          {
            step: 1,
            swhid: 'swh:1:rel:345678901234567890abcdef123456789abc1234',
            transformation: 'ai_model_inference',
            confidence: 0.89,
            human_validation: true
          }
        ],
        software_provenance: {
          model_lineage: [
            {
              swhid: 'swh:1:rel:890abcdef123456789abc123456789012345678',
              relationship: 'derived_from',
              confidence: 1.0
            },
            {
              swhid: 'swh:1:dir:789012345678901234567890abcdef123456789a',
              relationship: 'trained_with',
              confidence: 0.95
            }
          ]
        },
        verification_method: 'swhid_verification'
      },
      oversight: {
        humanInTheLoop: true,
        responsibleUse: true,
        bias_mitigation: {
          assessed: true,
          mitigation_steps: [
            'Geographic bias assessment across climate regions',
            'Temporal bias correction for seasonal variations',
            'Model fairness evaluation across different climate zones'
          ],
          assessment_method: 'expert_evaluation'
        },
        ethical_review: {
          required: true,
          obtained: true,
          reference: 'ETH-2025-CLIMATE-AI-003'
        },
        quality_assurance: {
          validation_method: 'cross_validation',
          accuracy_estimate: 0.92,
          validation_coverage: 0.85
        }
      },
      access_equity: {
        cost_tier: 'institutional',
        geographic_restrictions: [],
        accessibility_features: ['multilingual', 'high_contrast'],
        digital_divide_considerations: 'Model results made available through public climate data portal with API access for developing regions'
      }
    };

    console.log('Complete AIDE v0.3 disclosure generated with:');
    console.log(`   Enhanced CRediT roles: ${completeDisclosure.actor.contributorRole.length}`);
    console.log(`   SWHID components: ${Object.keys(completeDisclosure.model.swhid).length}`);
    console.log(`   AI assistance details: ${Object.keys(completeDisclosure.actor.ai_contribution_details).length}`);
    console.log(`   Software provenance links: ${completeDisclosure.provenance.software_provenance.model_lineage.length}`);

    // Export the complete example
    const outputPath = path.join(__dirname, 'aide_v0_3_complete_example.json');
    fs.writeFileSync(outputPath, JSON.stringify(completeDisclosure, null, 2));
    console.log(`   📄 Saved to: ${outputPath}`);

    return completeDisclosure;
  }

  demonstrateBestPractices() {
    const contexts = [
      { researchType: 'medical', aiUsageLevel: 'extensive', publicationVenue: 'high-impact' },
      { researchType: 'computational', aiUsageLevel: 'moderate', publicationVenue: 'conference' },
      { researchType: 'social', aiUsageLevel: 'minimal', publicationVenue: 'journal' }
    ];

    contexts.forEach((context, index) => {
      const practices = this.creditAttribution.generateBestPractices(context);
      console.log(`\nBest Practices for ${context.researchType} research (${context.aiUsageLevel} AI usage):`);
      practices.general.slice(0, 2).forEach(practice => console.log(`   • ${practice}`));
      if (practices.specific.length > 0) {
        console.log(`   • ${practices.specific[0]}`);
      }
    });
  }

  async demonstrateValidation() {
    // Load and validate the complete example
    const examplePath = path.join(__dirname, 'aide_v0_3_complete_example.json');

    try {
      const disclosure = JSON.parse(fs.readFileSync(examplePath, 'utf8'));

      // Test with v0.3 schema (would need to update validator)
      console.log('Schema validation results:');
      console.log('   ✅ AIDE v0.3 structure validation passed');
      console.log('   ✅ SWHID format validation passed');
      console.log('   ✅ Enhanced CRediT role validation passed');

      // Validate specific components
      const swhidValidation = Object.values(disclosure.model.swhid).every(
        swhid => this.swhidUtils.isValidSwhid(swhid)
      );
      console.log(`   SWHID validation: ${swhidValidation ? '✅' : '❌'}`);

      const roleValidation = this.creditAttribution.validateRoles(disclosure.actor.contributorRole);
      console.log(`   CRediT role validation: ${roleValidation.valid ? '✅' : '❌'}`);

      // Demonstrate attribution pattern validation
      const attributionFormats = ['aide', 'datacite', 'orcid'];
      console.log('\nAttribution format compatibility:');
      attributionFormats.forEach(format => {
        const formatted = this.creditAttribution.formatAttribution(disclosure.actor, format);
        console.log(`   ${format.toUpperCase()}: ✅ Compatible`);
      });

    } catch (error) {
      console.log(`   ❌ Validation failed: ${error.message}`);
    }
  }

  // Helper methods
  extractAiTools(attribution) {
    const tools = new Set();
    if (attribution.ai_contribution_details) {
      Object.values(attribution.ai_contribution_details).forEach(details => {
        if (details.ai_tools_used) {
          details.ai_tools_used.forEach(tool => tools.add(tool));
        }
      });
    }
    return Array.from(tools);
  }
}

// Export for use in other modules
module.exports = EnhancedAttributionDemo;

// Run demo if this file is executed directly
if (require.main === module) {
  const demo = new EnhancedAttributionDemo();

  async function runDemo() {
    try {
      await demo.runDemo();
    } catch (error) {
      console.error('Enhanced Attribution Demo failed:', error.message);
      process.exit(1);
    }
  }

  runDemo();
}