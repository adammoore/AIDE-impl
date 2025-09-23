/**
 * AIDE-RAiD Integration Demo
 * Demonstrates the complete workflow with mock data
 */

const AideRaidIntegration = require('../src/aide-raid-integration');
const { validate } = require('../src/index');
const fs = require('fs');

class AideRaidDemo {
  constructor() {
    // Initialize with mock configuration for demo purposes
    this.integration = new AideRaidIntegration({
      raid: {
        apiUrl: 'https://api.demo.raid.org.au',
        timeout: 5000
      }
    });
  }

  async runDemo() {
    console.log('🎯 AIDE-RAiD Integration Demo');
    console.log('============================\n');

    try {
      // Demo 1: Schema Validation
      console.log('📋 Step 1: AIDE Schema Validation');
      const mockAide = this.createMockAideDisclosure();
      const validation = validate(mockAide);
      console.log(`   Schema Valid: ${validation.valid ? '✅' : '❌'}`);
      if (!validation.valid) {
        console.log('   Errors:', validation.errors.map(e => e.message));
      }

      // Demo 2: Hierarchical PID Generation
      console.log('\n🔗 Step 2: Hierarchical PID Generation');
      const raidId = 'https://raid.org/10.1234/demo-research-2025';
      const hierarchicalAide = await this.generateHierarchicalAide(raidId, mockAide);
      console.log(`   Original ID: ${mockAide.id || 'none'}`);
      console.log(`   Hierarchical ID: ${hierarchicalAide.id}`);
      console.log(`   RAiD Context: ${hierarchicalAide.context.raid}`);

      // Demo 3: RAiD Integration Validation
      console.log('\n🔍 Step 3: RAiD Integration Validation');
      const raidValidation = this.integration.validateAideRaidCompliance(hierarchicalAide);
      console.log(`   Integration Valid: ${raidValidation.valid ? '✅' : '❌'}`);
      if (raidValidation.issues.length > 0) {
        console.log('   Issues:', raidValidation.issues);
      }
      if (raidValidation.warnings.length > 0) {
        console.log('   Warnings:', raidValidation.warnings);
      }

      // Demo 4: Batch Processing Simulation
      console.log('\n📊 Step 4: Batch Processing Simulation');
      const batchResults = this.simulateBatchProcessing(raidId);
      console.log(`   Created ${batchResults.length} hierarchical AIDs`);
      batchResults.forEach((aid, index) => {
        console.log(`   ${index + 1}. ${aid.id} (${aid.usage.category})`);
      });

      // Demo 5: Activity Summary
      console.log('\n📈 Step 5: Activity Summary Generation');
      const summary = this.generateMockSummary(batchResults);
      console.log(`   Total Disclosures: ${summary.totalDisclosures}`);
      console.log(`   Categories: ${Object.keys(summary.categories).join(', ')}`);
      console.log(`   Models: ${Object.keys(summary.models).join(', ')}`);
      console.log(`   Human Oversight: ${summary.humanOversight}/${summary.totalDisclosures}`);

      // Demo 6: Export Example Data
      console.log('\n💾 Step 6: Exporting Example Data');
      this.exportExampleData({
        raidId,
        hierarchicalAide,
        batchResults,
        summary,
        validation: { schema: validation, raid: raidValidation }
      });
      console.log('   Example data exported to examples/aide-raid-demo-output.json');

      console.log('\n🎉 Demo completed successfully!');
      console.log('\nNext Steps:');
      console.log('1. Set RAID_API_KEY to test with real RAiD sandbox');
      console.log('2. Review generated example data');
      console.log('3. Integrate with your research workflow');

    } catch (error) {
      console.error('❌ Demo failed:', error.message);
      throw error;
    }
  }

  createMockAideDisclosure() {
    return {
      created: new Date().toISOString(),
      version: "0.2",
      actor: {
        name: "Dr. Demo Researcher",
        orcid: "https://orcid.org/0000-0002-1825-0097",
        affiliation: {
          name: "Demo University",
          ror: "https://ror.org/013cjyk83",
          accessLevel: "full"
        },
        contributorRole: ["formal_analysis", "ai_assistance"]
      },
      usage: {
        category: "data_analysis",
        purpose: "Demonstrating AIDE-RAiD integration with sample data analysis",
        contribution_level: "substantial",
        role: "analyst",
        stage: "analysis",
        human_verification: {
          method: "manual_review",
          coverage: 0.9
        }
      },
      model: {
        name: "GPT-4",
        version: "GPT-4o mini",
        provider: "OpenAI",
        transparency_level: "limited",
        capabilities: {
          modalities: ["text"],
          languages: ["en"]
        }
      },
      data: {
        input_sources: [
          {
            pid: "https://doi.org/10.1234/demo-dataset",
            type: "dataset",
            license: "CC-BY-4.0",
            usage_rights: "permitted"
          }
        ],
        generated_outputs: [
          {
            pid: "https://doi.org/10.1234/demo-analysis-results",
            type: "analysis",
            verification_status: "verified"
          }
        ]
      },
      prompts: {
        promptClass: "demo_data_analyzer_v1",
        promptHash: "sha256:demo1234567890abcdef",
        outputHash: "sha256:result1234567890abcdef",
        algorithm: "sha256",
        prompt_engineering: {
          iterations: 2,
          technique: "few_shot",
          temperature: 0.1
        }
      },
      oversight: {
        humanInTheLoop: true,
        responsibleUse: true,
        bias_mitigation: {
          assessed: true,
          mitigation_steps: ["Sample bias assessment", "Output review"]
        },
        quality_assurance: {
          validation_method: "peer_review",
          accuracy_estimate: 0.88
        }
      },
      provenance: {
        chain_integrity: true,
        backward_traceable: true,
        verification_method: "manual"
      }
    };
  }

  async generateHierarchicalAide(raidId, aideDisclosure) {
    // Simulate hierarchical ID generation
    const timestamp = Date.now();
    const sequence = Math.random().toString(36).substring(2, 6);
    const hierarchicalId = `${raidId}/aide.${timestamp}.${sequence}`;

    return {
      ...aideDisclosure,
      id: hierarchicalId,
      context: {
        ...aideDisclosure.context,
        raid: raidId,
        hierarchical_position: `aide.${timestamp}.${sequence}`,
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
  }

  simulateBatchProcessing(raidId) {
    const batchAides = [
      {
        usage: { category: "writing", purpose: "Literature review", contribution_level: "minimal" },
        model: { name: "Claude", provider: "Anthropic" }
      },
      {
        usage: { category: "coding", purpose: "Data analysis script", contribution_level: "substantial" },
        model: { name: "CodeLlama", provider: "Meta" }
      },
      {
        usage: { category: "image_generation", purpose: "Research visualization", contribution_level: "substantial" },
        model: { name: "DALL-E", provider: "OpenAI" }
      }
    ];

    return batchAides.map((aide, index) => {
      const hierarchicalId = `${raidId}/aide.batch.${Date.now()}.${index + 1}`;
      return {
        id: hierarchicalId,
        context: {
          raid: raidId,
          hierarchical_position: `aide.batch.${Date.now()}.${index + 1}`,
          pipeline: {
            batchId: `demo-batch-${Date.now()}`,
            stepNumber: index + 1,
            totalSteps: batchAides.length
          }
        },
        usage: aide.usage,
        model: aide.model,
        oversight: {
          humanInTheLoop: true,
          responsibleUse: true
        }
      };
    });
  }

  generateMockSummary(batchResults) {
    const categories = {};
    const models = {};
    let humanOversight = 0;

    batchResults.forEach(aide => {
      const category = aide.usage.category;
      const model = aide.model.name;

      categories[category] = (categories[category] || 0) + 1;
      models[model] = (models[model] || 0) + 1;

      if (aide.oversight?.humanInTheLoop) {
        humanOversight++;
      }
    });

    return {
      totalDisclosures: batchResults.length,
      categories,
      models,
      humanOversight
    };
  }

  exportExampleData(data) {
    const outputPath = 'examples/aide-raid-demo-output.json';
    const exportData = {
      timestamp: new Date().toISOString(),
      demo_metadata: {
        description: "AIDE-RAiD Integration Demo Output",
        version: "0.2",
        note: "This is mock data for demonstration purposes"
      },
      ...data
    };

    fs.writeFileSync(outputPath, JSON.stringify(exportData, null, 2));
  }
}

// Export for use in other modules
module.exports = AideRaidDemo;

// Run demo if this file is executed directly
if (require.main === module) {
  const demo = new AideRaidDemo();

  async function runDemo() {
    try {
      await demo.runDemo();
    } catch (error) {
      console.error('Demo execution failed:', error.message);
      process.exit(1);
    }
  }

  runDemo();
}