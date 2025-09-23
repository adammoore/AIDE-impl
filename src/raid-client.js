/**
 * RAiD (Research Activity Identifier) Client
 * Provides integration with RAiD API for hierarchical PID management
 */

class RaidClient {
  constructor(options = {}) {
    this.apiUrl = options.apiUrl || 'https://api.demo.raid.org.au';
    this.apiKey = options.apiKey;
    this.timeout = options.timeout || 30000;
  }

  /**
   * Create a new research activity (RAiD)
   * @param {Object} metadata - Research activity metadata
   * @returns {Promise<Object>} Created RAiD object
   */
  async createResearchActivity(metadata) {
    const raidData = {
      identifier: {
        id: metadata.id || this._generateRaidId(),
        schemeUri: "https://raid.org/",
        registrationAgency: {
          id: "https://ror.org/038sjwq14", // ARDC ROR
          schemeUri: "https://ror.org/"
        }
      },
      date: [
        {
          date: new Date().toISOString().split('T')[0],
          dateType: {
            id: "https://vocabularies.coar-repositories.org/date_types/created/",
            schemeUri: "https://vocabularies.coar-repositories.org/date_types/"
          }
        }
      ],
      title: [
        {
          text: metadata.title,
          type: {
            id: "https://vocabularies.coar-repositories.org/title_types/primary/",
            schemeUri: "https://vocabularies.coar-repositories.org/title_types/"
          }
        }
      ],
      description: [
        {
          text: metadata.description,
          type: {
            id: "https://vocabularies.coar-repositories.org/description_types/abstract/",
            schemeUri: "https://vocabularies.coar-repositories.org/description_types/"
          }
        }
      ],
      contributor: metadata.contributors || [],
      organisation: metadata.organisations || [],
      access: {
        type: {
          id: metadata.accessType || "https://vocabularies.coar-repositories.org/access_rights/open/",
          schemeUri: "https://vocabularies.coar-repositories.org/access_rights/"
        }
      }
    };

    try {
      const response = await this._makeRequest('POST', '/raid', raidData);
      return response;
    } catch (error) {
      throw new Error(`Failed to create research activity: ${error.message}`);
    }
  }

  /**
   * Register an AIDE disclosure as a hierarchical component under a RAiD
   * @param {string} raidId - Parent RAiD identifier
   * @param {Object} aideData - AIDE disclosure data
   * @returns {Promise<Object>} Registration result
   */
  async registerAideDisclosure(raidId, aideData) {
    const hierarchicalId = this._generateHierarchicalId(raidId, 'aide');

    // Update RAiD with related object
    const relatedObject = {
      id: hierarchicalId,
      type: {
        id: "https://aide-schema.org/types/ai-disclosure",
        schemeUri: "https://aide-schema.org/types/"
      },
      category: [
        {
          id: "https://aide-schema.org/categories/ai-usage",
          schemeUri: "https://aide-schema.org/categories/"
        }
      ]
    };

    try {
      // First, get current RAiD to append related object
      const currentRaid = await this.getResearchActivity(raidId);

      if (!currentRaid.relatedObject) {
        currentRaid.relatedObject = [];
      }
      currentRaid.relatedObject.push(relatedObject);

      // Update RAiD with new related object
      await this._makeRequest('PUT', `/raid/${encodeURIComponent(raidId)}`, currentRaid);

      return {
        hierarchicalId,
        raidId,
        status: 'registered'
      };
    } catch (error) {
      throw new Error(`Failed to register AIDE disclosure: ${error.message}`);
    }
  }

  /**
   * Retrieve a research activity by ID
   * @param {string} raidId - RAiD identifier
   * @returns {Promise<Object>} RAiD object
   */
  async getResearchActivity(raidId) {
    try {
      const response = await this._makeRequest('GET', `/raid/${encodeURIComponent(raidId)}`);
      return response;
    } catch (error) {
      throw new Error(`Failed to retrieve research activity: ${error.message}`);
    }
  }

  /**
   * Get all hierarchical components under a RAiD
   * @param {string} raidId - RAiD identifier
   * @returns {Promise<Array>} Array of related objects
   */
  async getHierarchicalComponents(raidId) {
    try {
      const raid = await this.getResearchActivity(raidId);
      return raid.relatedObject || [];
    } catch (error) {
      throw new Error(`Failed to retrieve hierarchical components: ${error.message}`);
    }
  }

  /**
   * Search for research activities
   * @param {Object} searchParams - Search parameters
   * @returns {Promise<Array>} Array of matching RAiDs
   */
  async searchResearchActivities(searchParams) {
    const queryString = new URLSearchParams(searchParams).toString();

    try {
      const response = await this._makeRequest('GET', `/raid/search?${queryString}`);
      return response.results || [];
    } catch (error) {
      throw new Error(`Failed to search research activities: ${error.message}`);
    }
  }

  /**
   * Update a research activity
   * @param {string} raidId - RAiD identifier
   * @param {Object} updateData - Updated metadata
   * @returns {Promise<Object>} Updated RAiD object
   */
  async updateResearchActivity(raidId, updateData) {
    try {
      const response = await this._makeRequest('PUT', `/raid/${encodeURIComponent(raidId)}`, updateData);
      return response;
    } catch (error) {
      throw new Error(`Failed to update research activity: ${error.message}`);
    }
  }

  /**
   * Generate a unique RAiD identifier
   * @private
   * @returns {string} RAiD identifier
   */
  _generateRaidId() {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    return `https://raid.org/10.1234/ra-${timestamp}-${random}`;
  }

  /**
   * Generate hierarchical identifier under a RAiD
   * @private
   * @param {string} raidId - Parent RAiD identifier
   * @param {string} componentType - Type of component (aide, model, data, etc.)
   * @returns {string} Hierarchical identifier
   */
  _generateHierarchicalId(raidId, componentType) {
    const timestamp = Date.now();
    const sequence = Math.random().toString(36).substring(2, 6);
    return `${raidId}/${componentType}.${sequence}`;
  }

  /**
   * Make HTTP request to RAiD API
   * @private
   * @param {string} method - HTTP method
   * @param {string} endpoint - API endpoint
   * @param {Object} data - Request data
   * @returns {Promise<Object>} Response data
   */
  async _makeRequest(method, endpoint, data = null) {
    const url = `${this.apiUrl}${endpoint}`;
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };

    if (this.apiKey) {
      options.headers['Authorization'] = `Bearer ${this.apiKey}`;
    }

    if (data && (method === 'POST' || method === 'PUT')) {
      options.body = JSON.stringify(data);
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);

      options.signal = controller.signal;

      const response = await fetch(url, options);
      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      } else {
        return await response.text();
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        throw new Error('Request timeout');
      }
      throw error;
    }
  }
}

module.exports = RaidClient;