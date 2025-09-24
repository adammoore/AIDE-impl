# AIDE Documentation

This directory contains comprehensive documentation for the AI Disclosure Event (AIDE) schema project, including the new RAiD integration for hierarchical PID management.

## 📁 Directory Structure

### 🆕 RAiD Integration Documentation
- `README-RAID-INTEGRATION.md` - Complete RAiD integration guide with production deployment
- `raid-integration-design.md` - Technical design and architecture documentation
- `IMPLEMENTATION-SUMMARY.md` - Summary of implementation achievements and capabilities

### Core AIDE Documentation
- `hierarchical-pid-specification.md` - Hierarchical PID system specification for cost optimization
- `technical-roadmap-2025-2027.md` - Implementation roadmap addressing global challenges

### Legacy Documentation (Available in Original Framework)
- `papers/` - Core research papers and reports defining the AIDE framework
- `diagrams/` - Visual materials including flow diagrams, mockups, and presentations
- `specs/` - Technical specifications and implementation details

## 📖 Key Documents

### 🚀 Quick Start with AIDE v0.3
1. **[attribution-best-practices.md](attribution-best-practices.md)** - Complete guide to AI attribution using CRediT + SWHID
2. **[enhanced-attribution-design.md](enhanced-attribution-design.md)** - Technical design for attribution systems
3. **[v0_3-enhancements-summary.md](v0_3-enhancements-summary.md)** - Overview of v0.3 features and benefits
4. **[README-RAID-INTEGRATION.md](README-RAID-INTEGRATION.md)** - Complete guide to RAiD integration (v0.2 foundation)

### Implementation Guide
The main implementation is documented in the root [README.md](../README.md) with:
- **v0.3 Features**: Enhanced CRediT attribution and SWHID integration in `/src/`
- **RAiD Integration**: Hierarchical PID client and logic in `/src/`
- **Interactive Demos**: v0.3 attribution demo and RAiD examples in `/examples/`
- **Legacy Examples**: Original disclosure examples in `/src/examples/`
- **Validation Tools**: Schema validation and compliance checking in `/scripts/`
- **Test Suite**: Comprehensive testing framework in `/tests/`

## 🔗 Related Resources

### Schema and Implementation
- [JSON Schema v0.3](../src/aide_schema_v0_3.json) - 🆕 Enhanced attribution with CRediT + SWHID
- [JSON Schema v0.2](../src/aide_schema_v0_2.json) - Enhanced schema with RAiD integration
- [JSON Schema v0.1](../src/aide_schema_v0_1.json) - Original schema definition
- [CRediT Attribution](../src/credit-attribution.js) - 🆕 Enhanced CRediT attribution system
- [SWHID Utils](../src/swhid-utils.js) - 🆕 Software Heritage identifier utilities
- [RAiD Client](../src/raid-client.js) - RAiD API client implementation
- [Integration Layer](../src/aide-raid-integration.js) - Main RAiD integration logic

### Examples and Demos
- [Enhanced Attribution Demo](../examples/enhanced-attribution-demo.js) - 🆕 v0.3 CRediT + SWHID demonstration
- [Attribution Patterns](../examples/attribution-patterns-examples.json) - 🆕 Comprehensive attribution examples
- [Complete v0.3 Example](../examples/aide_v0_3_complete_example.json) - 🆕 Full disclosure example
- [RAiD Integration Demo](../examples/aide-raid-demo.js) - Interactive RAiD demonstration
- [Live API Test Suite](../examples/aide-raid-test-implementation.js) - Comprehensive testing
- [Workflow Example](../examples/aide-raid-workflow-example.json) - Multi-step research workflow
- [Legacy Examples](../src/examples/) - Original v0.1 disclosure examples

### External Resources
- [CRediT Taxonomy](https://credit.niso.org) - 🆕 Official contributor roles taxonomy
- [SWHID Specification](https://www.swhid.org) - 🆕 Software Heritage identifiers
- [Software Heritage](https://www.softwareheritage.org) - 🆕 Global software archive
- [RAiD Project](https://raid.org/) - Research Activity Identifier homepage
- [RAiD API Documentation](https://api.demo.raid.org.au/swagger-ui/) - API reference
- [GitHub Repository](https://github.com/adammoore/AIDE-impl) - Main project

## 📝 Contributing to Documentation

When contributing documentation:
1. Place research papers in `/papers/`
2. Add visual materials to `/diagrams/`
3. Include specifications in `/specs/`
4. Update this README with new additions
5. Reference new docs in the main project README

## 📄 License

All documentation is licensed under Apache 2.0. See [LICENSE](../LICENSE) for details.