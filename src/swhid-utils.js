/**
 * SWHID (Software Heritage Identifier) Utilities for AIDE
 * Provides functionality for generating and working with SWHIDs for AI models and artifacts
 */

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

class SwhidUtils {
  constructor() {
    this.schemaVersion = '1';
    this.prefix = 'swh';
  }

  /**
   * Object types supported by SWHID
   */
  static get ObjectTypes() {
    return {
      CONTENT: 'cnt',      // Individual file content
      DIRECTORY: 'dir',    // Directory tree
      REVISION: 'rev',     // Commit/revision
      RELEASE: 'rel',      // Tagged release
      SNAPSHOT: 'snp'      // Repository snapshot
    };
  }

  /**
   * Generate SWHID for file content
   * @param {Buffer|string} content - File content as Buffer or string
   * @returns {string} SWHID identifier
   */
  generateContentSwhid(content) {
    const buffer = Buffer.isBuffer(content) ? content : Buffer.from(content, 'utf8');
    const header = `blob ${buffer.length}\0`;
    const headerBuffer = Buffer.from(header, 'utf8');
    const combined = Buffer.concat([headerBuffer, buffer]);
    const hash = crypto.createHash('sha1').update(combined).digest('hex');

    return `${this.prefix}:${this.schemaVersion}:${SwhidUtils.ObjectTypes.CONTENT}:${hash}`;
  }

  /**
   * Generate SWHID for a local file
   * @param {string} filePath - Path to the file
   * @returns {Promise<string>} SWHID identifier
   */
  async generateFileSwhid(filePath) {
    try {
      const content = await fs.promises.readFile(filePath);
      return this.generateContentSwhid(content);
    } catch (error) {
      throw new Error(`Failed to generate SWHID for file ${filePath}: ${error.message}`);
    }
  }

  /**
   * Generate SWHID for model weights/parameters
   * @param {string} modelPath - Path to model file (e.g., pytorch_model.bin, model.safetensors)
   * @returns {Promise<object>} Model SWHID information
   */
  async generateModelSwhid(modelPath) {
    const swhid = await this.generateFileSwhid(modelPath);
    const stats = await fs.promises.stat(modelPath);
    const filename = path.basename(modelPath);

    return {
      swhid,
      filename,
      size: stats.size,
      format: this.detectModelFormat(filename),
      lastModified: stats.mtime.toISOString()
    };
  }

  /**
   * Generate SWHID for directory (e.g., complete model repository)
   * @param {string} dirPath - Path to directory
   * @param {Array<string>} excludes - Files/patterns to exclude
   * @returns {Promise<string>} Directory SWHID
   */
  async generateDirectorySwhid(dirPath, excludes = ['.git', '.DS_Store', '__pycache__']) {
    const entries = await this.getDirectoryEntries(dirPath, excludes);
    const sortedEntries = entries.sort((a, b) => a.name.localeCompare(b.name));

    let treeContent = '';
    for (const entry of sortedEntries) {
      const mode = entry.isDirectory ? '40000' : '100644';
      const type = entry.isDirectory ? 'tree' : 'blob';
      treeContent += `${mode} ${entry.name}\0${Buffer.from(entry.hash, 'hex')}`;
    }

    const header = `tree ${Buffer.byteLength(treeContent)}\0`;
    const combined = Buffer.concat([
      Buffer.from(header, 'utf8'),
      Buffer.from(treeContent, 'binary')
    ]);

    const hash = crypto.createHash('sha1').update(combined).digest('hex');
    return `${this.prefix}:${this.schemaVersion}:${SwhidUtils.ObjectTypes.DIRECTORY}:${hash}`;
  }

  /**
   * Generate comprehensive SWHIDs for AI model package
   * @param {string} modelDir - Path to model directory
   * @returns {Promise<object>} Complete SWHID information
   */
  async generateModelPackageSwhids(modelDir) {
    const result = {
      package: await this.generateDirectorySwhid(modelDir),
      components: {}
    };

    // Common AI model files
    const modelFiles = [
      'pytorch_model.bin',
      'model.safetensors',
      'tf_model.h5',
      'model.onnx',
      'config.json',
      'tokenizer.json',
      'vocab.txt',
      'README.md'
    ];

    for (const filename of modelFiles) {
      const filePath = path.join(modelDir, filename);
      try {
        if (fs.existsSync(filePath)) {
          const fileInfo = await this.generateModelSwhid(filePath);
          result.components[filename] = fileInfo;
        }
      } catch (error) {
        // File doesn't exist or can't be read, skip silently
      }
    }

    return result;
  }

  /**
   * Parse SWHID string into components
   * @param {string} swhid - SWHID string
   * @returns {object} Parsed SWHID components
   */
  parseSwhid(swhid) {
    const swhidRegex = /^swh:(\d+):([a-z]+):([a-f0-9]{40})(?:;(.+))?$/;
    const match = swhid.match(swhidRegex);

    if (!match) {
      throw new Error(`Invalid SWHID format: ${swhid}`);
    }

    const [, schemaVersion, objectType, objectId, qualifiers] = match;

    const result = {
      prefix: 'swh',
      schemaVersion,
      objectType,
      objectId,
      qualifiers: {}
    };

    if (qualifiers) {
      const qualifierPairs = qualifiers.split(';');
      for (const pair of qualifierPairs) {
        const [key, value] = pair.split('=', 2);
        if (key && value) {
          result.qualifiers[key] = decodeURIComponent(value);
        }
      }
    }

    return result;
  }

  /**
   * Build SWHID with qualifiers
   * @param {string} coreSwhid - Core SWHID without qualifiers
   * @param {object} qualifiers - Key-value pairs for qualifiers
   * @returns {string} Complete SWHID with qualifiers
   */
  buildSwhidWithQualifiers(coreSwhid, qualifiers = {}) {
    let result = coreSwhid;

    const qualifierPairs = Object.entries(qualifiers)
      .filter(([key, value]) => key && value)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`);

    if (qualifierPairs.length > 0) {
      result += ';' + qualifierPairs.join(';');
    }

    return result;
  }

  /**
   * Validate SWHID format
   * @param {string} swhid - SWHID to validate
   * @returns {boolean} True if valid SWHID format
   */
  isValidSwhid(swhid) {
    try {
      this.parseSwhid(swhid);
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Generate SWHID for AI model training snapshot
   * @param {object} trainingInfo - Training information
   * @returns {string} Snapshot SWHID
   */
  generateTrainingSnapshotSwhid(trainingInfo) {
    const {
      modelCode,
      trainingData,
      hyperparameters,
      timestamp,
      gitCommit
    } = trainingInfo;

    // Simplified snapshot generation - in practice would be more complex
    const snapshotContent = JSON.stringify({
      model_code: modelCode,
      training_data: trainingData,
      hyperparameters,
      timestamp,
      git_commit: gitCommit
    });

    const hash = crypto.createHash('sha1').update(snapshotContent).digest('hex');
    return `${this.prefix}:${this.schemaVersion}:${SwhidUtils.ObjectTypes.SNAPSHOT}:${hash}`;
  }

  /**
   * Create model lineage SWHID relationships
   * @param {string} derivedModelSwhid - SWHID of derived model
   * @param {string} baseModelSwhid - SWHID of base model
   * @param {string} trainingCodeSwhid - SWHID of training code
   * @returns {object} Lineage relationships
   */
  createModelLineage(derivedModelSwhid, baseModelSwhid, trainingCodeSwhid) {
    return {
      derived_model: derivedModelSwhid,
      relationships: [
        {
          type: 'derived_from',
          target: baseModelSwhid,
          relationship: 'base_model'
        },
        {
          type: 'created_by',
          target: trainingCodeSwhid,
          relationship: 'training_code'
        }
      ],
      provenance_type: 'ai_model_lineage'
    };
  }

  // Private helper methods

  async getDirectoryEntries(dirPath, excludes) {
    const entries = [];
    const items = await fs.promises.readdir(dirPath, { withFileTypes: true });

    for (const item of items) {
      if (excludes.some(exclude => item.name.includes(exclude))) {
        continue;
      }

      const fullPath = path.join(dirPath, item.name);
      let hash;

      if (item.isDirectory()) {
        hash = (await this.generateDirectorySwhid(fullPath, excludes)).split(':').pop();
      } else {
        hash = (await this.generateFileSwhid(fullPath)).split(':').pop();
      }

      entries.push({
        name: item.name,
        isDirectory: item.isDirectory(),
        hash
      });
    }

    return entries;
  }

  detectModelFormat(filename) {
    const ext = path.extname(filename).toLowerCase();
    const formats = {
      '.bin': 'pytorch',
      '.pth': 'pytorch',
      '.pt': 'pytorch',
      '.safetensors': 'safetensors',
      '.h5': 'tensorflow',
      '.pb': 'tensorflow',
      '.onnx': 'onnx',
      '.tflite': 'tensorflow_lite',
      '.json': 'config'
    };

    return formats[ext] || 'unknown';
  }
}

module.exports = SwhidUtils;