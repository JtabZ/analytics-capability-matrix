import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, ChevronUp, Grid, List, Filter, X } from 'lucide-react';

const CapabilityMatrix = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLayers, setSelectedLayers] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [expandedLayers, setExpandedLayers] = useState([]);
  const [viewMode, setViewMode] = useState('cards');

  const capabilities = {
    sources: {
      name: 'Sources',
      description: 'Where business data lives and appears',
      color: 'blue',
      items: [
        {
          name: 'CRM Data',
          description: 'Customer relationship management system data including accounts, contacts, opportunities, and activities',
          products: ['Sales Cloud', 'Service Cloud']
        },
        {
          name: 'Marketing Data',
          description: 'Campaign data, email engagement, customer journeys, and marketing attribution',
          products: ['Marketing Cloud', 'Marketing Cloud Account Engagement']
        },
        {
          name: 'Commerce Data',
          description: 'E-commerce transactions, product catalogs, shopping cart data, and order history',
          products: ['Commerce Cloud']
        },
        {
          name: 'Collaboration Data',
          description: 'Team communication, channels, messages, file sharing, and workflow activity',
          products: ['Slack', 'Chatter']
        },
        {
          name: 'External SaaS Applications',
          description: 'Third-party business applications like ERP, HR systems, financial platforms',
          products: ['MuleSoft Anypoint', 'Salesforce Connect']
        },
        {
          name: 'Cloud Storage',
          description: 'Files, documents, images, and unstructured data from cloud storage platforms',
          products: ['Salesforce Files', 'Data Cloud']
        },
        {
          name: 'IoT & Sensor Data',
          description: 'Real-time data from connected devices, sensors, and edge computing',
          products: ['IoT Cloud', 'Data Cloud']
        },
        {
          name: 'Partner & Marketplace Data',
          description: 'Third-party data enrichment, demographic data, firmographic data',
          products: ['Data Cloud Partner Data']
        }
      ]
    },
    collection: {
      name: 'Collection',
      description: 'How data gets into the platform',
      color: 'purple',
      items: [
        {
          name: 'Pre-built Connectors',
          description: 'Out-of-the-box integrations with popular data sources requiring minimal configuration',
          products: ['Data Cloud Connectors', 'Tableau Connectors', 'MuleSoft Templates']
        },
        {
          name: 'API Integration',
          description: 'REST, SOAP, and GraphQL APIs for custom system connections',
          products: ['MuleSoft Anypoint Platform', 'Salesforce APIs', 'Tableau REST API']
        },
        {
          name: 'Batch Data Loading',
          description: 'Scheduled bulk data imports and exports for large datasets',
          products: ['Data Cloud Bulk API', 'Salesforce Bulk API', 'Data Loader']
        },
        {
          name: 'Real-time Streaming',
          description: 'Event-driven data ingestion with low-latency processing',
          products: ['Data Cloud Streaming', 'Platform Events', 'MuleSoft DataGraph']
        },
        {
          name: 'Change Data Capture',
          description: 'Automatic tracking and syncing of record changes across systems',
          products: ['Change Data Capture', 'Data Cloud CDC', 'MuleSoft CDC']
        },
        {
          name: 'File Upload & Import',
          description: 'Manual and automated file-based data ingestion (CSV, Excel, JSON)',
          products: ['Data Import Wizard', 'Tableau Prep', 'Data Cloud File Upload']
        },
        {
          name: 'Database Replication',
          description: 'Direct connections to operational databases with periodic sync',
          products: ['MuleSoft Database Connector', 'Data Cloud Database Connectors']
        },
        {
          name: 'Metadata Extraction',
          description: 'Automatic discovery and cataloging of data schemas and structures',
          products: ['Data Cloud Metadata API', 'Tableau Catalog']
        }
      ]
    },
    organization: {
      name: 'Organization',
      description: 'How data is made usable and trustworthy',
      color: 'green',
      items: [
        {
          name: 'Data Modeling',
          description: 'Define relationships, hierarchies, and structures for your data',
          products: ['Data Cloud Data Model Objects', 'Tableau Data Models', 'Custom Objects']
        },
        {
          name: 'Identity Resolution',
          description: 'Match and merge records across systems to create unified profiles',
          products: ['Data Cloud Identity Resolution', 'Matching & Duplicate Rules']
        },
        {
          name: 'Master Data Management',
          description: 'Maintain golden records and authoritative data sources',
          products: ['Data Cloud MDM', 'Salesforce CDM']
        },
        {
          name: 'Semantic Layer',
          description: 'Define business metrics, calculations, and logic centrally',
          products: ['Tableau Semantic Layer', 'Data Cloud Calculated Insights', 'CRM Analytics Recipes']
        },
        {
          name: 'Data Cataloging',
          description: 'Discover, document, and organize available data assets',
          products: ['Tableau Catalog', 'Data Cloud Data Explorer']
        },
        {
          name: 'Data Lineage',
          description: 'Track data origin, transformations, and dependencies',
          products: ['Tableau Catalog', 'Data Cloud Lineage']
        },
        {
          name: 'Data Quality Rules',
          description: 'Validate, cleanse, and standardize data at rest',
          products: ['Data Cloud Data Quality', 'Validation Rules', 'Duplicate Management']
        },
        {
          name: 'Data Governance',
          description: 'Privacy controls, consent management, and compliance frameworks',
          products: ['Data Cloud Governance', 'Shield Platform Encryption', 'Privacy Center']
        },
        {
          name: 'Data Transformation',
          description: 'Clean, reshape, and enrich data for analysis',
          products: ['Tableau Prep', 'Data Cloud Formulas', 'Flow Builder']
        },
        {
          name: 'Hierarchies & Segmentation',
          description: 'Organize data into business-relevant groups and categories',
          products: ['Data Cloud Segments', 'Salesforce Hierarchies', 'Tableau Sets']
        }
      ]
    },
    analysis: {
      name: 'Analysis',
      description: 'How people and AI explore and understand data',
      color: 'orange',
      items: [
        {
          name: 'Interactive Dashboards',
          description: 'Visual analytics with filters, drill-downs, and self-service exploration',
          products: ['Tableau', 'CRM Analytics', 'Salesforce Reports & Dashboards']
        },
        {
          name: 'Ad-hoc Querying',
          description: 'Self-service SQL and SOQL queries for data exploration',
          products: ['Data Cloud Query API', 'SOQL', 'Tableau Data Engine']
        },
        {
          name: 'Natural Language Query',
          description: 'Ask questions about data in plain language',
          products: ['Tableau Ask Data', 'Einstein GPT for Analytics']
        },
        {
          name: 'Statistical Analysis',
          description: 'Advanced calculations, forecasting, trend analysis, and correlations',
          products: ['Tableau', 'CRM Analytics', 'Einstein Discovery']
        },
        {
          name: 'Predictive Modeling',
          description: 'Build and deploy machine learning models for predictions',
          products: ['Einstein Discovery', 'Einstein Prediction Builder', 'Data Cloud Predictions']
        },
        {
          name: 'AI-Powered Insights',
          description: 'Automated anomaly detection, pattern recognition, and smart recommendations',
          products: ['Einstein Discovery', 'Tableau Einstein', 'CRM Analytics Einstein']
        },
        {
          name: 'Real-time Analytics',
          description: 'Live dashboards and streaming analytics on current data',
          products: ['Data Cloud Real-time Insights', 'Tableau Hyper']
        },
        {
          name: 'Embedded Analytics',
          description: 'Analytics embedded directly in business applications and workflows',
          products: ['Tableau Embedded', 'CRM Analytics Embedded', 'Lightning Web Components']
        },
        {
          name: 'Mobile Analytics',
          description: 'Access dashboards and insights on mobile devices',
          products: ['Tableau Mobile', 'Salesforce Mobile', 'CRM Analytics Mobile']
        },
        {
          name: 'Reporting & Subscriptions',
          description: 'Scheduled reports delivered via email or other channels',
          products: ['Salesforce Reports', 'Tableau Subscriptions', 'CRM Analytics Subscriptions']
        },
        {
          name: 'Data Exploration & Prep',
          description: 'Visual data profiling, cleaning, and preparation workflows',
          products: ['Tableau Prep', 'Data Cloud Data Explorer']
        },
        {
          name: 'Collaborative Analytics',
          description: 'Share, comment, and collaborate on data insights with teams',
          products: ['Tableau Cloud', 'Slack Canvas', 'Chatter']
        }
      ]
    },
    action: {
      name: 'Action',
      description: 'How insights drive business outcomes',
      color: 'red',
      items: [
        {
          name: 'Threshold Alerts',
          description: 'Automated notifications when metrics cross defined thresholds',
          products: ['Tableau Alerts', 'CRM Analytics Alerts', 'Flow Builder']
        },
        {
          name: 'Smart Notifications',
          description: 'Context-aware alerts delivered to the right person at the right time',
          products: ['Slack Notifications', 'Einstein Activity Capture', 'Mobile Push']
        },
        {
          name: 'Data Writeback',
          description: 'Update source systems directly from analytics interfaces',
          products: ['Tableau Extensions', 'MuleSoft APIs', 'Salesforce APIs']
        },
        {
          name: 'Workflow Automation',
          description: 'Trigger multi-step business processes based on data conditions',
          products: ['Flow Builder', 'MuleSoft RPA', 'Slack Workflow Builder']
        },
        {
          name: 'Journey Orchestration',
          description: 'Automate personalized customer journeys across channels',
          products: ['Marketing Cloud Journey Builder', 'Data Cloud Activations']
        },
        {
          name: 'Next Best Action',
          description: 'AI-driven recommendations for optimal next steps',
          products: ['Einstein Next Best Action', 'Einstein Recommendations']
        },
        {
          name: 'Conversational Agents',
          description: 'AI agents that take action through natural language',
          products: ['Einstein Copilot', 'Agentforce', 'Slack AI']
        },
        {
          name: 'Autonomous Agents',
          description: 'Self-directed AI that completes tasks without human intervention',
          products: ['Agentforce', 'Einstein Bots']
        },
        {
          name: 'Reverse ETL',
          description: 'Sync insights and enriched data back to operational systems',
          products: ['Data Cloud Activations', 'MuleSoft']
        },
        {
          name: 'API-driven Actions',
          description: 'Programmatic triggers and integrations via APIs',
          products: ['Salesforce APIs', 'MuleSoft', 'Platform Events']
        }
      ]
    }
  };

  const colorClasses = {
    blue: { bg: 'bg-blue-500', text: 'text-blue-700', lightBg: 'bg-blue-50', border: 'border-blue-200' },
    purple: { bg: 'bg-purple-500', text: 'text-purple-700', lightBg: 'bg-purple-50', border: 'border-purple-200' },
    green: { bg: 'bg-green-500', text: 'text-green-700', lightBg: 'bg-green-50', border: 'border-green-200' },
    orange: { bg: 'bg-orange-500', text: 'text-orange-700', lightBg: 'bg-orange-50', border: 'border-orange-200' },
    red: { bg: 'bg-red-500', text: 'text-red-700', lightBg: 'bg-red-50', border: 'border-red-200' }
  };

  const allProducts = useMemo(() => {
    const products = new Set();
    Object.values(capabilities).forEach(layer => {
      layer.items.forEach(item => {
        item.products.forEach(p => products.add(p));
      });
    });
    return Array.from(products).sort();
  }, []);

  const toggleLayer = (layerId) => {
    setExpandedLayers(prev =>
      prev.includes(layerId)
        ? prev.filter(id => id !== layerId)
        : [...prev, layerId]
    );
  };

  const toggleLayerFilter = (layerId) => {
    setSelectedLayers(prev =>
      prev.includes(layerId)
        ? prev.filter(id => id !== layerId)
        : [...prev, layerId]
    );
  };

  const toggleProductFilter = (product) => {
    setSelectedProducts(prev =>
      prev.includes(product)
        ? prev.filter(p => p !== product)
        : [...prev, product]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedLayers([]);
    setSelectedProducts([]);
  };

  const filteredCapabilities = useMemo(() => {
    const result = {};
    
    Object.entries(capabilities).forEach(([layerId, layer]) => {
      // Filter by layer selection
      if (selectedLayers.length > 0 && !selectedLayers.includes(layerId)) {
        return;
      }

      const filteredItems = layer.items.filter(item => {
        // Filter by search query
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          const matchesName = item.name.toLowerCase().includes(query);
          const matchesDesc = item.description.toLowerCase().includes(query);
          const matchesProduct = item.products.some(p => p.toLowerCase().includes(query));
          if (!matchesName && !matchesDesc && !matchesProduct) return false;
        }

        // Filter by product selection
        if (selectedProducts.length > 0) {
          const hasProduct = item.products.some(p => selectedProducts.includes(p));
          if (!hasProduct) return false;
        }

        return true;
      });

      if (filteredItems.length > 0) {
        result[layerId] = { ...layer, items: filteredItems };
      }
    });

    return result;
  }, [searchQuery, selectedLayers, selectedProducts]);

  const totalCapabilities = useMemo(() => {
    return Object.values(capabilities).reduce((sum, layer) => sum + layer.items.length, 0);
  }, []);

  const filteredCount = useMemo(() => {
    return Object.values(filteredCapabilities).reduce((sum, layer) => sum + layer.items.length, 0);
  }, [filteredCapabilities]);

  const renderCapabilityCard = (capability, layerColor) => {
    const colors = colorClasses[layerColor];
    
    return (
      <div
        key={capability.name}
        className={`${colors.lightBg} border-2 ${colors.border} rounded-lg p-4 hover:shadow-md transition-shadow`}
      >
        <h4 className={`font-bold text-lg ${colors.text} mb-2`}>{capability.name}</h4>
        <p className="text-sm text-gray-700 mb-3">{capability.description}</p>
        <div className="flex flex-wrap gap-2">
          {capability.products.map(product => (
            <span
              key={product}
              className="text-xs bg-white px-2 py-1 rounded border border-gray-300 text-gray-700"
            >
              {product}
            </span>
          ))}
        </div>
      </div>
    );
  };

  const renderTableView = () => {
    const allCapabilities = [];
    Object.entries(filteredCapabilities).forEach(([layerId, layer]) => {
      layer.items.forEach(item => {
        allCapabilities.push({
          ...item,
          layer: layer.name,
          layerColor: layer.color
        });
      });
    });

    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left p-3 border-b-2 border-gray-300 font-bold">Capability</th>
              <th className="text-left p-3 border-b-2 border-gray-300 font-bold">Layer</th>
              <th className="text-left p-3 border-b-2 border-gray-300 font-bold">Description</th>
              <th className="text-left p-3 border-b-2 border-gray-300 font-bold">Products</th>
            </tr>
          </thead>
          <tbody>
            {allCapabilities.map((cap, idx) => {
              const colors = colorClasses[cap.layerColor];
              return (
                <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="p-3 font-semibold text-gray-900">{cap.name}</td>
                  <td className="p-3">
                    <span className={`${colors.bg} text-white px-2 py-1 rounded text-xs font-semibold`}>
                      {cap.layer}
                    </span>
                  </td>
                  <td className="p-3 text-sm text-gray-700">{cap.description}</td>
                  <td className="p-3">
                    <div className="flex flex-wrap gap-1">
                      {cap.products.map(product => (
                        <span
                          key={product}
                          className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-700"
                        >
                          {product}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  const renderCardView = () => {
    return (
      <div className="space-y-6">
        {Object.entries(filteredCapabilities).map(([layerId, layer]) => {
          const isExpanded = expandedLayers.includes(layerId);
          const colors = colorClasses[layer.color];

          return (
            <div key={layerId} className="border-2 border-gray-200 rounded-xl overflow-hidden">
              <div
                onClick={() => toggleLayer(layerId)}
                className={`${colors.bg} text-white p-6 cursor-pointer flex items-center justify-between hover:opacity-90 transition-opacity`}
              >
                <div>
                  <h2 className="text-2xl font-bold mb-1">{layer.name}</h2>
                  <p className="text-sm opacity-90">{layer.description}</p>
                  <p className="text-xs opacity-75 mt-1">{layer.items.length} capabilities</p>
                </div>
                {isExpanded ? <ChevronUp className="w-8 h-8" /> : <ChevronDown className="w-8 h-8" />}
              </div>
              
              {isExpanded && (
                <div className="p-6 bg-white">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {layer.items.map(item => renderCapabilityCard(item, layer.color))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Comprehensive Capability Matrix
          </h1>
          <p className="text-gray-600 text-lg">
            Complete reference of Salesforce data and analytics capabilities
          </p>
          <p className="text-gray-500 text-sm mt-2">
            {filteredCount} of {totalCapabilities} capabilities
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          {/* Search */}
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search capabilities, descriptions, or products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Filters and View Toggle */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Layer Filters */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-semibold text-gray-700">Layers:</span>
              {Object.entries(capabilities).map(([layerId, layer]) => {
                const colors = colorClasses[layer.color];
                const isSelected = selectedLayers.includes(layerId);
                return (
                  <button
                    key={layerId}
                    onClick={() => toggleLayerFilter(layerId)}
                    className={`px-3 py-1 rounded-full text-sm font-semibold transition-all ${
                      isSelected
                        ? `${colors.bg} text-white`
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {layer.name}
                  </button>
                );
              })}
            </div>

            <div className="flex-grow"></div>

            {/* View Toggle */}
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('cards')}
                className={`px-3 py-1 rounded flex items-center gap-2 transition-all ${
                  viewMode === 'cards'
                    ? 'bg-white shadow text-gray-900'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Grid className="w-4 h-4" />
                Cards
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`px-3 py-1 rounded flex items-center gap-2 transition-all ${
                  viewMode === 'table'
                    ? 'bg-white shadow text-gray-900'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <List className="w-4 h-4" />
                Table
              </button>
            </div>

            {/* Clear Filters */}
            {(searchQuery || selectedLayers.length > 0 || selectedProducts.length > 0) && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-2 px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
              >
                <X className="w-4 h-4" />
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        {Object.keys(filteredCapabilities).length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center">
            <p className="text-gray-500 text-lg">No capabilities match your filters</p>
            <button
              onClick={clearFilters}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          viewMode === 'cards' ? renderCardView() : renderTableView()
        )}
      </div>
    </div>
  );
};

export default CapabilityMatrix;