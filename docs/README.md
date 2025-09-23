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

### 🚀 Quick Start with RAiD Integration
1. **[README-RAID-INTEGRATION.md](README-RAID-INTEGRATION.md)** - Complete guide to RAiD integration
2. **[IMPLEMENTATION-SUMMARY.md](IMPLEMENTATION-SUMMARY.md)** - Overview of what's been accomplished
3. **[raid-integration-design.md](raid-integration-design.md)** - Technical design and API documentation
4. **[hierarchical-pid-specification.md](hierarchical-pid-specification.md)** - PID hierarchy specification

### Implementation Guide
The main implementation is documented in the root [README.md](../README.md) with:
- Enhanced schema definitions with RAiD support in `/src/`
- RAiD integration client and logic in `/src/`
- Interactive demos and examples in `/examples/`
- Legacy example disclosures in `/src/examples/`
- Validation tools in `/scripts/`
- Test suite in `/tests/`

## 🔗 Related Resources

### Schema and Implementation
- [JSON Schema v0.2](../src/aide_schema_v0_2.json) - Enhanced schema with RAiD integration
- [JSON Schema v0.1](../src/aide_schema_v0_1.json) - Original schema definition
- [RAiD Client](../src/raid-client.js) - RAiD API client implementation
- [Integration Layer](../src/aide-raid-integration.js) - Main integration logic

### Examples and Demos
- [RAiD Integration Demo](../examples/aide-raid-demo.js) - Interactive demonstration
- [Live API Test Suite](../examples/aide-raid-test-implementation.js) - Comprehensive testing
- [Workflow Example](../examples/aide-raid-workflow-example.json) - Multi-step research workflow
- [Legacy Examples](../src/examples/) - Original v0.1 disclosure examples

### External Resources
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