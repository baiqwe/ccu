# Cloudflare Pages 部署指南

## 配置步骤

### 1. 在Cloudflare Pages控制台设置

进入你的Cloudflare Pages项目设置页面，配置以下内容：

#### Build Settings (构建设置)

**Framework preset**: Next.js

**Build command** (构建命令):
```bash
npm run build
```

**Build output directory** (构建输出目录):
```
out
```

### 2. Environment Variables (环境变量)

如果需要，可以在设置中添加环境变量：

```
NODE_VERSION=22.16.0
```

### 3. 部署方式选择

#### 方式 A: Git 集成部署（推荐）
- Cloudflare Pages会自动检测到GitHub仓库的推送
- 每次push到main分支时自动触发部署
- 当前配置已推送完成，等待自动部署即可

#### 方式 B: Wrangler CLI 部署
```bash
# 先构建项目
npm run build

# 使用wrangler部署
npx wrangler pages deploy out
```

## 当前配置文件

### next.config.js
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',      // 静态导出模式
  images: {
    unoptimized: true,   // 禁用图片优化（静态导出要求）
  },
  trailingSlash: true,   // URL末尾添加斜杠
};

module.exports = nextConfig;
```

### wrangler.toml
```toml
name = "matrix-calculator"
compatibility_date = "2025-12-28"
pages_build_output_dir = "out"
```

## 已配置功能

✅ Google Analytics (G-4H0FWL25R3)  
✅ 静态导出模式  
✅ SEO优化（sitemap.xml, robots.txt）  
✅ 多语言支持 (en/es)  
✅ 响应式设计  
✅ 渐变UI和毛玻璃效果  

## 部署后验证

部署成功后访问以下URL验证：

1. **首页**: `https://你的域名.pages.dev/en`
2. **工具页**: `https://你的域名.pages.dev/en/inverse-matrix-calculator`
3. **Sitemap**: `https://你的域名.pages.dev/sitemap.xml`
4. **Robots**: `https://你的域名.pages.dev/robots.txt`

## 注意事项

⚠️ **重要限制**：
- 静态导出模式下，某些Next.js功能不可用：
  - ~~服务端渲染 (SSR)~~ → 已改为静态生成 (SSG)
  - ~~API Routes~~ → 使用Cloudflare Workers如需要
  - ~~动态路由（部分）~~ → 使用generateStaticParams预生成

✅ **已处理**：
- 所有页面已配置为静态生成
- 翻译系统兼容静态导出
- 所有工具页面通过generateStaticParams预生成

## 故障排除

如果部署仍然失败，检查：

1. **构建日志**中是否有错误
2. **确认构建命令**正确：`npm run build`
3. **确认输出目录**正确：`out`
4. **环境变量**是否配置（如果需要）

## 当前提交

```
Commit: 0fb7ded
Files changed: 3 files (+10 -8)
- Created: wrangler.toml
- Modified: next.config.js, package.json
```

准备就绪，可以重新触发部署！🚀
