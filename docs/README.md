# AIDE Documentation

This directory contains comprehensive documentation for the AI Disclosure Event (AIDE) schema project.

## 📁 Directory Structure

### `/papers/`
Core research papers and reports defining the AIDE framework:
- `AIDE_Draft_Report.pdf` - Technical implementation report
- `AIDE_White_Paper.pdf` - Persistent identifiers for trust in AI-enabled research
- `AIDE_Green_Paper.pdf` - Policy and framework overview

### `/diagrams/`
Visual materials including flow diagrams, mockups, and presentations:
- `AIDE_Badge_Flow_Diagram.pdf/.png/.svg` - Process flow for badge implementation
- `AIDE_Badge_Mockup.png/.svg` - Visual mockup of provenance badges
- `AIDE_Badge_Slide.pdf` - Presentation slide for badge concept
- `AIDE_Infographic_Slide.pdf` - Overview infographic
- `AIDE_Badge_Diagrams.pptx` - Editable PowerPoint diagrams
- `AIDE_Infographic.pptx` - Editable infographic source

### `/specs/`
Technical specifications and implementation details:
- `AIDE_Provenance_Badge_Spec.pdf` - Detailed badge specification

## 📖 Key Documents

### Getting Started
1. Start with `papers/AIDE_White_Paper.pdf` for the conceptual overview
2. Review `papers/AIDE_Draft_Report.pdf` for technical details
3. Examine `diagrams/AIDE_Badge_Flow_Diagram.pdf` for implementation flow
4. Check `specs/AIDE_Provenance_Badge_Spec.pdf` for badge requirements

### Implementation Guide
The main implementation is documented in the root [README.md](../README.md) with:
- Schema definitions in `/src/`
- Example disclosures in `/src/examples/`
- Validation tools in `/scripts/`
- Test suite in `/tests/`

## 🔗 Related Resources

- [JSON Schema](../src/aide_schema_v0_1.json) - Machine-readable schema definition
- [XSD Schema](../src/aide_schema_v0_1.xsd) - XML validation schema
- [Example Files](../src/examples/) - Complete disclosure examples
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