// ==================== DataBuilder - 数据构建系统 ====================
// 企业级数据构建工具，支持开发/生产模式、增量构建、智能合并

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

class DataBuilder {
  constructor(options = {}) {
    this.options = {
      rootDir: path.resolve(__dirname, '..'),
      dataDir: 'data',
      outputDir: 'data/build',
      cacheDir: 'data/cache',
      mode: 'development', // 'development' | 'production'
      verbose: true,
      ...options
    };

    this.stats = {
      filesProcessed: 0,
      nodesMerged: 0,
      errors: [],
      warnings: [],
      startTime: Date.now()
    };

    this.cache = null;
    this.manifest = {
      version: '1.0.0',
      buildTime: new Date().toISOString(),
      files: new Map(),
      chunks: []
    };
  }

  // 主构建入口
  async build() {
    console.log('🔨 开始数据构建...');
    console.log(`📦 模式: ${this.options.mode}`);
    
    try {
      // 1. 加载缓存
      await this.loadCache();
      
      // 2. 扫描源文件
      const sources = await this.scanSources();
      console.log(`📁 发现 ${sources.length} 个源文件`);
      
      // 3. 解析和验证
      const parsedData = await this.parseSources(sources);
      
      // 4. 智能合并
      const mergedData = await this.mergeData(parsedData);
      
      // 5. 数据优化
      const optimizedData = await this.optimizeData(mergedData);
      
      // 6. 生成输出
      await this.generateOutput(optimizedData);
      
      // 7. 保存缓存
      await this.saveCache();
      
      // 8. 生成报告
      this.generateReport();
      
      console.log('✅ 构建完成！');
      return true;
      
    } catch (error) {
      console.error('❌ 构建失败:', error);
      this.stats.errors.push(error.message);
      return false;
    }
  }

  // 扫描源文件
  async scanSources() {
    const sourcesDir = path.join(this.options.rootDir, this.options.dataDir, 'sources');
    const sources = [];

    const scanDir = async (dir, category) => {
      const entries = await fs.promises.readdir(dir, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        
        if (entry.isDirectory()) {
          await scanDir(fullPath, entry.name);
        } else if (entry.name.endsWith('.json')) {
          const stat = await fs.promises.stat(fullPath);
          const hash = await this.calculateFileHash(fullPath);
          
          sources.push({
            path: fullPath,
            relativePath: path.relative(sourcesDir, fullPath),
            category: category || 'root',
            name: entry.name,
            size: stat.size,
            mtime: stat.mtime,
            hash
          });
        }
      }
    };

    await scanDir(sourcesDir, '');
    return sources.sort((a, b) => a.relativePath.localeCompare(b.relativePath));
  }

  // 计算文件哈希
  async calculateFileHash(filePath) {
    const content = await fs.promises.readFile(filePath);
    return crypto.createHash('md5').update(content).digest('hex');
  }

  // 解析源文件
  async parseSources(sources) {
    const parsedData = {
      domains: [],
      nodes: new Map(),
      relationships: [],
      metadata: {},
      extensions: {
        cases: [],
        industry: {},
        trends: [],
        solutions: [],
        comments: []
      }
    };

    for (const source of sources) {
      try {
        const content = await fs.promises.readFile(source.path, 'utf-8');
        const data = JSON.parse(content);
        
        // 检查是否需要重新构建
        const cached = this.cache?.files?.get(source.relativePath);
        if (cached && cached.hash === source.hash && this.options.mode === 'development') {
          console.log(`  ⏭️  跳过未变更: ${source.relativePath}`);
          continue;
        }

        console.log(`  📄 解析: ${source.relativePath}`);
        
        // 根据文件类型处理
        if (source.category === 'core') {
          this.parseCoreData(data, parsedData, source);
        } else if (source.category === 'extensions') {
          this.parseExtensionData(data, parsedData, source);
        }

        // 更新清单
        this.manifest.files.set(source.relativePath, {
          hash: source.hash,
          size: source.size,
          category: source.category
        });

        this.stats.filesProcessed++;
        
      } catch (error) {
        console.error(`  ❌ 解析失败: ${source.relativePath}`, error.message);
        this.stats.errors.push({
          file: source.relativePath,
          error: error.message
        });
      }
    }

    return parsedData;
  }

  // 解析核心数据
  parseCoreData(data, parsedData, source) {
    // 领域定义
    if (data.domains) {
      parsedData.domains.push(...data.domains);
    }

    // 节点数据
    if (data.nodes) {
      Object.entries(data.nodes).forEach(([domainId, domainData]) => {
        if (!parsedData.nodes.has(domainId)) {
          parsedData.nodes.set(domainId, new Map());
        }
        
        Object.entries(domainData).forEach(([categoryId, categoryData]) => {
          parsedData.nodes.get(domainId).set(categoryId, categoryData);
        });
      });
    }

    // 关系数据
    if (data.relationships) {
      parsedData.relationships.push(...data.relationships);
    }

    // 元数据
    if (data.metadata) {
      Object.assign(parsedData.metadata, data.metadata);
    }
  }

  // 解析扩展数据
  parseExtensionData(data, parsedData, source) {
    // 扩展节点
    if (data.nodes) {
      Object.entries(data.nodes).forEach(([domainId, domainData]) => {
        if (!parsedData.nodes.has(domainId)) {
          parsedData.nodes.set(domainId, new Map());
        }
        
        Object.entries(domainData).forEach(([categoryId, categoryData]) => {
          const existing = parsedData.nodes.get(domainId).get(categoryId);
          if (existing) {
            // 合并到现有类别
            if (categoryData.problems) {
              existing.problems = existing.problems || [];
              existing.problems.push(...categoryData.problems);
            }
          } else {
            // 新类别
            parsedData.nodes.get(domainId).set(categoryId, categoryData);
          }
        });
      });
    }

    // 案例研究
    if (data.caseStudies) {
      parsedData.extensions.cases.push(...data.caseStudies);
    }

    // 行业数据
    if (data.industryData) {
      Object.assign(parsedData.extensions.industry, data.industryData);
    }

    // 趋势数据
    if (data.trends) {
      parsedData.extensions.trends.push(...data.trends);
    }

    // 解决方案
    if (data.detailedSolutions) {
      parsedData.extensions.solutions.push(...data.detailedSolutions);
    }

    // 用户评论
    if (data.userContributions) {
      parsedData.extensions.comments.push(...data.userContributions);
    }
  }

  // 智能合并数据
  async mergeData(parsedData) {
    console.log('🔄 合并数据...');

    const merged = {
      center: {
        id: 'center',
        name: '00后人生问题图谱',
        type: 'center',
        icon: '🧭',
        color: '#6366f1',
        description: '全面解析当代年轻人面临的成长挑战'
      },
      domains: this.mergeDomains(parsedData.domains),
      knowledgeNodes: {},
      relationships: this.mergeRelationships(parsedData.relationships),
      extensions: parsedData.extensions,
      metadata: {
        ...parsedData.metadata,
        buildTime: new Date().toISOString(),
        version: this.manifest.version
      }
    };

    // 合并节点数据
    parsedData.nodes.forEach((categories, domainId) => {
      merged.knowledgeNodes[domainId] = {};
      categories.forEach((categoryData, categoryId) => {
        merged.knowledgeNodes[domainId][categoryId] = categoryData;
        this.stats.nodesMerged += categoryData.problems?.length || 0;
      });
    });

    // 生成统计
    merged.statistics = this.generateStatistics(merged);

    return merged;
  }

  // 合并领域定义
  mergeDomains(domains) {
    const domainMap = new Map();
    
    domains.forEach(domain => {
      if (domainMap.has(domain.id)) {
        // 合并相同领域
        const existing = domainMap.get(domain.id);
        Object.assign(existing, domain);
      } else {
        domainMap.set(domain.id, { ...domain });
      }
    });

    return Array.from(domainMap.values());
  }

  // 合并关系
  mergeRelationships(relationships) {
    const seen = new Set();
    return relationships.filter(rel => {
      const key = `${rel.source}-${rel.target}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  // 生成统计数据
  generateStatistics(data) {
    let totalNodes = 0;
    let totalProblems = 0;
    const severityCount = { critical: 0, high: 0, medium: 0, low: 0 };
    const domainCount = {};

    Object.entries(data.knowledgeNodes).forEach(([domainId, categories]) => {
      domainCount[domainId] = 0;
      Object.values(categories).forEach(category => {
        if (category.problems) {
          totalProblems += category.problems.length;
          domainCount[domainId] += category.problems.length;
          
          category.problems.forEach(problem => {
            totalNodes++;
            if (problem.severity) {
              severityCount[problem.severity]++;
            }
          });
        }
      });
    });

    return {
      totalNodes,
      totalProblems,
      totalDomains: data.domains.length,
      totalRelationships: data.relationships.length,
      severityDistribution: severityCount,
      domainDistribution: domainCount,
      lastUpdated: new Date().toISOString()
    };
  }

  // 优化数据
  async optimizeData(data) {
    console.log('⚡ 优化数据...');

    if (this.options.mode === 'production') {
      // 生产模式：压缩和优化
      return this.optimizeForProduction(data);
    } else {
      // 开发模式：保持可读性
      return this.optimizeForDevelopment(data);
    }
  }

  // 生产环境优化
  optimizeForProduction(data) {
    // 1. 移除不必要的字段
    const optimized = JSON.parse(JSON.stringify(data));
    
    // 2. 压缩键名（可选）
    // 3. 生成索引
    optimized._index = this.generateIndex(optimized);
    
    return optimized;
  }

  // 开发环境优化
  optimizeForDevelopment(data) {
    // 保持数据结构清晰，便于调试
    return data;
  }

  // 生成索引
  generateIndex(data) {
    const index = {
      nodesById: new Map(),
      nodesByType: new Map(),
      nodesBySeverity: new Map()
    };

    Object.entries(data.knowledgeNodes).forEach(([domainId, categories]) => {
      Object.values(categories).forEach(category => {
        if (category.problems) {
          category.problems.forEach(problem => {
            // ID索引
            index.nodesById.set(problem.id, {
              domain: domainId,
              category: category.name,
              ...problem
            });

            // 类型索引
            if (!index.nodesByType.has(problem.type)) {
              index.nodesByType.set(problem.type, []);
            }
            index.nodesByType.get(problem.type).push(problem.id);

            // 严重程度索引
            if (problem.severity) {
              if (!index.nodesBySeverity.has(problem.severity)) {
                index.nodesBySeverity.set(problem.severity, []);
              }
              index.nodesBySeverity.get(problem.severity).push(problem.id);
            }
          });
        }
      });
    });

    // 转换为普通对象（可序列化）
    return {
      nodesById: Object.fromEntries(index.nodesById),
      nodesByType: Object.fromEntries(index.nodesByType),
      nodesBySeverity: Object.fromEntries(index.nodesBySeverity)
    };
  }

  // 生成输出
  async generateOutput(data) {
    console.log('📦 生成输出...');

    const outputDir = path.join(
      this.options.rootDir,
      this.options.outputDir,
      this.options.mode
    );

    // 确保输出目录存在
    await fs.promises.mkdir(outputDir, { recursive: true });

    if (this.options.mode === 'production') {
      // 生产模式：生成压缩版和分块版
      await this.generateProductionOutput(data, outputDir);
    } else {
      // 开发模式：生成可读版本
      await this.generateDevelopmentOutput(data, outputDir);
    }

    // 保存清单
    await this.saveManifest(outputDir);
  }

  // 生成生产环境输出
  async generateProductionOutput(data, outputDir) {
    // 1. 完整压缩版
    const minified = JSON.stringify(data);
    await fs.promises.writeFile(
      path.join(outputDir, 'data.min.json'),
      minified
    );
    console.log(`  📄 data.min.json (${(minified.length / 1024).toFixed(1)}KB)`);

    // 2. 分块版本
    const splitDir = path.join(outputDir, 'data.split');
    await fs.promises.mkdir(splitDir, { recursive: true });

    // 核心数据
    const coreData = {
      center: data.center,
      domains: data.domains,
      metadata: data.metadata
    };
    await fs.promises.writeFile(
      path.join(splitDir, 'core.json'),
      JSON.stringify(coreData)
    );

    // 按领域分块
    for (const [domainId, categories] of Object.entries(data.knowledgeNodes)) {
      const domainData = {
        domainId,
        categories
      };
      await fs.promises.writeFile(
        path.join(splitDir, `${domainId}.json`),
        JSON.stringify(domainData)
      );
      console.log(`  📄 ${domainId}.json`);
    }

    // 扩展数据
    await fs.promises.writeFile(
      path.join(splitDir, 'extensions.json'),
      JSON.stringify(data.extensions)
    );

    // 关系数据
    await fs.promises.writeFile(
      path.join(splitDir, 'relationships.json'),
      JSON.stringify(data.relationships)
    );
  }

  // 生成开发环境输出
  async generateDevelopmentOutput(data, outputDir) {
    const output = JSON.stringify(data, null, 2);
    await fs.promises.writeFile(
      path.join(outputDir, 'data.json'),
      output
    );
    console.log(`  📄 data.json (${(output.length / 1024).toFixed(1)}KB)`);
  }

  // 保存清单
  async saveManifest(outputDir) {
    const manifestPath = path.join(outputDir, 'manifest.json');
    const manifestData = {
      ...this.manifest,
      files: Object.fromEntries(this.manifest.files)
    };
    
    await fs.promises.writeFile(
      manifestPath,
      JSON.stringify(manifestData, null, 2)
    );
  }

  // 加载缓存
  async loadCache() {
    const cachePath = path.join(
      this.options.rootDir,
      this.options.cacheDir,
      'manifest.json'
    );

    try {
      const content = await fs.promises.readFile(cachePath, 'utf-8');
      const cache = JSON.parse(content);
      this.cache = {
        ...cache,
        files: new Map(Object.entries(cache.files || {}))
      };
      console.log('📋 已加载缓存');
    } catch {
      this.cache = { files: new Map() };
      console.log('📋 无缓存，将完整构建');
    }
  }

  // 保存缓存
  async saveCache() {
    const cachePath = path.join(
      this.options.rootDir,
      this.options.cacheDir,
      'manifest.json'
    );

    await fs.promises.mkdir(path.dirname(cachePath), { recursive: true });
    
    const cacheData = {
      ...this.manifest,
      files: Object.fromEntries(this.manifest.files),
      stats: this.stats,
      buildDuration: Date.now() - this.stats.startTime
    };

    await fs.promises.writeFile(cachePath, JSON.stringify(cacheData, null, 2));
  }

  // 生成构建报告
  generateReport() {
    const duration = Date.now() - this.stats.startTime;
    
    console.log('\n📊 构建报告');
    console.log('═'.repeat(50));
    console.log(`⏱️  构建耗时: ${(duration / 1000).toFixed(2)}s`);
    console.log(`📁 处理文件: ${this.stats.filesProcessed}`);
    console.log(`🔄 合并节点: ${this.stats.nodesMerged}`);
    console.log(`⚠️  警告: ${this.stats.warnings.length}`);
    console.log(`❌ 错误: ${this.stats.errors.length}`);
    
    if (this.stats.errors.length > 0) {
      console.log('\n❌ 错误详情:');
      this.stats.errors.forEach(err => {
        console.log(`  - ${err.file || 'General'}: ${err.error || err}`);
      });
    }
    
    console.log('═'.repeat(50));
  }
}

// CLI 支持
if (require.main === module) {
  const args = process.argv.slice(2);
  const mode = args.includes('--production') ? 'production' : 'development';
  const verbose = !args.includes('--quiet');

  const builder = new DataBuilder({ mode, verbose });
  builder.build().then(success => {
    process.exit(success ? 0 : 1);
  });
}

module.exports = { DataBuilder };
