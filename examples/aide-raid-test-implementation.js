/**
 * AIDE-RAiD Test Implementation
 * Demonstrates hierarchical PID integration between AIDE and RAiD
 */

const AideRaidIntegration = require('../src/aide-raid-integration');
const { validate } = require('../src/index');

class AideRaidTestImplementation {
  constructor() {
    this.integration = new AideRaidIntegration({
      raid: {
        apiUrl: 'https://api.demo.raid.org.au',
        // Note: In production, API key would come from environment variables
        apiKey: process.env.RAID_API_KEY
      }
    });
  }

  /**
   * Run comprehensive test of AIDE-RAiD integration
   */
  async runFullTest() {
    console.log('🔬 Starting AIDE-RAiD Integration Test');
    console.log('=====================================\n');

    try {
      // Test 1: Create research activity with AI disclosure
      console.log('📋 Test 1: Creating Research Activity with AIDE Disclosure');
      const result1 = await this.testCreateResearchActivityWithAide();
      console.log('✅ Test 1 completed successfully\n');

      // Test 2: Add multiple AIDE disclosures to existing research activity
      console.log('📊 Test 2: Adding Multiple AIDE Disclosures');
      const result2 = await this.testMultipleAideDisclosures(result1.raid.identifier.id);
      console.log('✅ Test 2 completed successfully\n');

      // Test 3: Batch creation for automated workflow
      console.log('🔄 Test 3: Batch AIDE Creation for Workflow');
      const result3 = await this.testBatchWorkflow();
      console.log('✅ Test 3 completed successfully\n');

      // Test 4: Generate activity summary
      console.log('📈 Test 4: Generating Research Activity Summary');
      const result4 = await this.testActivitySummary(result1.raid.identifier.id);
      console.log('✅ Test 4 completed successfully\n');

      // Test 5: Validation and compliance checks
      console.log('🔍 Test 5: Validation and Compliance Checks');
      const result5 = await this.testValidationAndCompliance(result1.aide);
      console.log('✅ Test 5 completed successfully\n');

      console.log('🎉 All tests completed successfully!');
      return {
        test1: result1,
        test2: result2,
        test3: result3,
        test4: result4,
        test5: result5
      };

    } catch (error) {
      console.error('❌ Test failed:', error.message);
      throw error;
    }
  }

  /**
   * Test creating a research activity with initial AIDE disclosure
   */
  async testCreateResearchActivityWithAide() {
    const researchActivity = {
      title: 'AI-Enhanced Climate Change Analysis 2025',
      description: 'Research project investigating climate change patterns using AI-enhanced data analysis techniques',
      contributors: [
        {
          position: {
            id: 'https://vocabulary.raid.org/contributor.position.type.id/15',
            schemeUri: 'https://vocabulary.raid.org/contributor.position.type.id/'
          },
          person: {
            id: 'https://orcid.org/0000-0002-1825-0097',
            schemeUri: 'https://orcid.org/'
          }
        }
      ],
      organisations: [
        {
          id: 'https://ror.org/013cjyk83',
          schemeUri: 'https://ror.org/',
          role: [
            {
              id: 'https://vocabulary.raid.org/organisation.role.id/34',
              schemeUri: 'https://vocabulary.raid.org/organisation.role.id/'
            }
          ]
        }
      ]
    };

    const aideDisclosure = {
      created: new Date().toISOString(),
      version: "0.2",
      actor: {
        name: "Dr. Climate Researcher",
        orcid: "https://orcid.org/0000-0002-1825-0097",
        affiliation: {
          name: "University of Climate Science",
          ror: "https://ror.org/013cjyk83",
          accessLevel: "full"
        },
        contributorRole: ["formal_analysis", "ai_assistance", "ai_oversight"]
      },
      usage: {
        category: "data_analysis",
        purpose: "Analyzing temperature trends in climate data using machine learning",
        contribution_level: "substantial",
        role: "analyst",
        stage: "analysis",
        human_verification: {
          method: "manual_review",
          coverage: 0.8
        }
      },
      model: {
        name: "GPT-4",
        version: "GPT-4o mini",
        provider: "OpenAI",
        transparency_level: "limited",
        capabilities: {
          modalities: ["text", "data"],
          languages: ["en"]
        }
      },
      data: {
        input_sources: [
          {
            pid: "https://doi.org/10.1234/climate-data-2024",
            type: "dataset",
            license: "CC-BY-4.0",
            usage_rights: "permitted"
          }
        ],
        generated_outputs: [
          {
            pid: "https://doi.org/10.1234/climate-analysis-results",
            type: "analysis",
            verification_status: "verified"
          }
        ]
      },
      prompts: {
        promptClass: "climate_data_analyzer_v1",
        promptHash: "sha256:abcd1234...",
        outputHash: "sha256:efgh5678...",
        algorithm: "sha256",
        prompt_engineering: {
          iterations: 3,
          technique: "few_shot",
          temperature: 0.1
        }
      },
      oversight: {
        humanInTheLoop: true,
        responsibleUse: true,
        bias_mitigation: {
          assessed: true,
          mitigation_steps: ["Geographic bias assessment", "Temporal bias correction"]
        },
        ethical_review: {
          required: true,
          obtained: true,
          reference: "ETH-2025-001"
        },
        quality_assurance: {
          validation_method: "expert_validation",
          accuracy_estimate: 0.92
        }
      },
      provenance: {
        chain_integrity: true,
        backward_traceable: true,
        verification_method: "manual"
      }
    };

    const result = await this.integration.createResearchActivityWithAide(
      researchActivity,
      aideDisclosure
    );

    console.log(`   RAiD ID: ${result.raid.identifier.id}`);
    console.log(`   Hierarchical AIDE ID: ${result.hierarchicalId}`);

    return result;
  }

  /**
   * Test adding multiple AIDE disclosures to existing research activity
   */
  async testMultipleAideDisclosures(raidId) {
    const aideDisclosures = [
      {
        created: new Date().toISOString(),
        version: "0.2",
        actor: {
          name: "Dr. Climate Researcher",
          orcid: "https://orcid.org/0000-0002-1825-0097"
        },
        usage: {
          category: "writing",
          purpose: "Drafting methodology section",
          contribution_level: "minimal",
          role: "assistant",
          stage: "writing"
        },
        model: {
          name: "Claude",
          version: "Claude 3.5 Sonnet",
          provider: "Anthropic",
          transparency_level: "documented"
        },
        oversight: {
          humanInTheLoop: true,
          responsibleUse: true,
          bias_mitigation: { assessed: true }
        },
        provenance: {
          chain_integrity: true,
          backward_traceable: true,
          verification_method: "manual"
        }
      },
      {
        created: new Date().toISOString(),
        version: "0.2",
        actor: {
          name: "Dr. Climate Researcher",
          orcid: "https://orcid.org/0000-0002-1825-0097"
        },
        usage: {
          category: "coding",
          purpose: "Data visualization script generation",
          contribution_level: "substantial",
          role: "generator",
          stage: "analysis"
        },
        model: {
          name: "CodeLlama",
          version: "CodeLlama 34B",
          provider: "Meta",
          transparency_level: "open"
        },
        oversight: {
          humanInTheLoop: true,
          responsibleUse: true,
          bias_mitigation: { assessed: false }
        },
        provenance: {
          chain_integrity: true,
          backward_traceable: true,
          verification_method: "automated"
        }
      }
    ];

    const results = [];
    for (const disclosure of aideDisclosures) {
      const result = await this.integration.createHierarchicalAide(raidId, disclosure);
      results.push(result);
      console.log(`   Added AIDE: ${result.id}`);
    }

    return results;
  }

  /**
   * Test batch creation for automated workflow
   */
  async testBatchWorkflow() {
    const researchActivity = {
      title: 'Automated Drug Discovery Pipeline 2025',
      description: 'High-throughput drug discovery using AI-enhanced molecular analysis'
    };

    const workflowSteps = [
      {
        created: new Date().toISOString(),
        version: "0.2",
        actor: {
          name: "Automated Pipeline",
          orcid: "https://orcid.org/0000-0002-1825-0097"
        },
        usage: {
          category: "data_analysis",
          purpose: "Molecular structure analysis",
          contribution_level: "primary",
          role: "analyst",
          stage: "analysis"
        },
        model: {
          name: "AlphaFold",
          version: "AlphaFold 3",
          provider: "DeepMind",
          transparency_level: "documented"
        },
        context: {
          pipeline: {
            workflowId: "drug-discovery-pipeline-v2",
            stepNumber: 1
          }
        },
        oversight: {
          humanInTheLoop: false,
          responsibleUse: true,
          bias_mitigation: { assessed: true }
        },
        provenance: {
          chain_integrity: true,
          backward_traceable: true,
          verification_method: "automated"
        }
      },
      {
        created: new Date().toISOString(),
        version: "0.2",
        actor: {
          name: "Automated Pipeline",
          orcid: "https://orcid.org/0000-0002-1825-0097"
        },
        usage: {
          category: "prediction",
          purpose: "Drug-target interaction prediction",
          contribution_level: "primary",
          role: "classifier",
          stage: "analysis"
        },
        model: {
          name: "ChemBERT",
          version: "ChemBERT v2.0",
          provider: "Research Lab",
          transparency_level: "open"
        },
        context: {
          pipeline: {
            workflowId: "drug-discovery-pipeline-v2",
            stepNumber: 2
          }
        },
        oversight: {
          humanInTheLoop: false,
          responsibleUse: true,
          bias_mitigation: { assessed: true }
        },
        provenance: {
          chain_integrity: true,
          backward_traceable: true,
          verification_method: "automated"
        }
      }
    ];

    // Create research activity
    const raid = await this.integration.raidClient.createResearchActivity(researchActivity);
    console.log(`   Created RAiD: ${raid.identifier.id}`);

    // Create batch disclosures
    const batchResults = await this.integration.createBatchAideDisclosures(
      raid.identifier.id,
      workflowSteps
    );

    console.log(`   Created ${batchResults.length} workflow step disclosures`);
    batchResults.forEach((result, index) => {
      if (result.error) {
        console.log(`   Step ${index + 1}: ❌ ${result.error}`);
      } else {
        console.log(`   Step ${index + 1}: ✅ ${result.id}`);
      }
    });

    return { raid, batchResults };
  }

  /**
   * Test activity summary generation
   */
  async testActivitySummary(raidId) {
    const summary = await this.integration.generateActivitySummary(raidId);

    console.log(`   Research Activity: ${summary.raid.title}`);
    console.log(`   Total AI Disclosures: ${summary.aiUsage.totalDisclosures}`);
    console.log(`   AI Categories Used:`, Object.keys(summary.aiUsage.categories));
    console.log(`   Models Used:`, Object.keys(summary.aiUsage.models));
    console.log(`   Human Oversight: ${summary.compliance.humanOversight}/${summary.aiUsage.totalDisclosures} disclosures`);

    return summary;
  }

  /**
   * Test validation and compliance checks
   */
  async testValidationAndCompliance(aideDisclosure) {
    // Test AIDE schema validation
    const schemaValidation = validate(aideDisclosure);
    console.log(`   AIDE Schema Valid: ${schemaValidation.valid}`);
    if (!schemaValidation.valid) {
      console.log(`   Schema Errors:`, schemaValidation.errors);
    }

    // Test RAiD integration compliance
    const raidCompliance = this.integration.validateAideRaidCompliance(aideDisclosure);
    console.log(`   RAiD Integration Valid: ${raidCompliance.valid}`);
    if (raidCompliance.issues.length > 0) {
      console.log(`   Integration Issues:`, raidCompliance.issues);
    }
    if (raidCompliance.warnings.length > 0) {
      console.log(`   Integration Warnings:`, raidCompliance.warnings);
    }

    return {
      schemaValidation,
      raidCompliance
    };
  }

  /**
   * Demonstrate offline testing (when RAiD API is unavailable)
   */
  async demonstrateOfflineTesting() {
    console.log('🔧 Demonstrating Offline Testing Mode');
    console.log('===================================\n');

    // Mock data structures
    const mockRaid = {
      identifier: {
        id: 'https://raid.org/10.1234/mock-research-activity'
      },
      title: [{ text: 'Mock Research Activity' }],
      description: [{ text: 'Testing AIDE-RAiD integration offline' }]
    };

    const mockAide = {
      id: 'https://raid.org/10.1234/mock-research-activity/aide.001',
      created: new Date().toISOString(),
      version: "0.2",
      context: {
        raid: 'https://raid.org/10.1234/mock-research-activity',
        hierarchical_position: 'aide.001'
      },
      actor: {
        name: "Mock Researcher",
        orcid: "https://orcid.org/0000-0002-1825-0097"
      },
      usage: {
        category: "testing",
        purpose: "Demonstrating offline integration",
        contribution_level: "minimal"
      },
      model: {
        name: "Mock AI",
        transparency_level: "open"
      },
      oversight: {
        humanInTheLoop: true,
        responsibleUse: true,
        bias_mitigation: { assessed: true }
      },
      provenance: {
        chain_integrity: true,
        backward_traceable: true,
        verification_method: "manual"
      }
    };

    // Test validation without API calls
    const validation = this.integration.validateAideRaidCompliance(mockAide);
    console.log('Offline Validation Results:');
    console.log(`  Valid: ${validation.valid}`);
    console.log(`  Issues: ${validation.issues.length}`);
    console.log(`  Warnings: ${validation.warnings.length}`);

    return { mockRaid, mockAide, validation };
  }
}

// Export for use in other modules
module.exports = AideRaidTestImplementation;

// Run tests if this file is executed directly
if (require.main === module) {
  const testImplementation = new AideRaidTestImplementation();

  async function runTests() {
    try {
      console.log('Starting AIDE-RAiD Integration Tests...\n');

      // First try offline testing (always works)
      await testImplementation.demonstrateOfflineTesting();

      console.log('\n' + '='.repeat(50) + '\n');

      // Then try full integration (requires RAiD API access)
      if (process.env.RAID_API_KEY) {
        await testImplementation.runFullTest();
      } else {
        console.log('⚠️  RAID_API_KEY not set, skipping live API tests');
        console.log('   Set RAID_API_KEY environment variable to test with real API');
      }

    } catch (error) {
      console.error('Test execution failed:', error.message);
      process.exit(1);
    }
  }

  runTests();
}