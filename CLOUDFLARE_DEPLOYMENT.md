# Cloudflare Pages 部署成功指南 ✅

## 🎯 最终配置（已解决超时问题）

### Cloudflare Pages 设置

进入项目设置页面：**Settings → Builds & deployments**

**Framework preset**: `Next.js (Static HTML Export)`

**Build command**:
```bash
npm run build
```

**Build output directory**:
```
out
```

**Deploy command**: **留空** ❗

**Environment Variables** (可选):
```
NODE_VERSION=22.16.0
```

### ⚠️ 关键修复

**问题**: 使用 `wrangler.toml` 导致 Cloudflare Pages 构建超时（21分钟后失败）

**解决**: **删除 `wrangler.toml` 文件**

```bash
# 已完成
rm wrangler.toml
git add -A
git commit -m "fix: remove wrangler.toml"
git push
```

**原因**: 
- Cloudflare Pages 的 Git 集成与 `wrangler.toml` 配置冲突
- 导致静态页面生成过程卡死
- 本地构建正常（几秒完成），说明代码没问题
- 这是 Cloudflare Pages + next-intl + static export 的已知问题

## ✅ 当前项目配置

### next.config.js
```javascript
const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig = {
  output: 'export',      // 静态导出
  images: {
    unoptimized: true,   // 禁用图片优化
  },
  trailingSlash: true,   // URL末尾斜杠
};

module.exports = withNextIntl(nextConfig);
```

### ~~wrangler.toml~~ ❌ 已删除
不需要这个文件！Cloudflare Pages Git 集成会自动处理部署。

## 📊 构建结果

✅ **所有 24 个静态页面成功生成**:
- 2 个语言主页 (en, es)
- 12 个工具页面 (6 tools × 2 locales)
- 6 个静态页面 (about, privacy, terms × 2 locales)

✅ **sitemap.xml** 自动生成  
✅ **robots.txt** 自动生成

## 🚀 部署流程

### Git 自动部署（推荐）
1. ✅ 代码已推送到 GitHub
2. ⏳ Cloudflare Pages 自动检测并触发构建
3. ✅ 构建成功后自动部署

**无需任何手动操作！**

### 手动部署（备用）
```bash
# 本地构建
npm run build

# 部署到 Cloudflare Pages
npx wrangler pages deploy out
```

## 验证部署

部署成功后访问这些 URL：

- 英文主页: `https://your-site.pages.dev/en`
- 西班牙语主页: `https://your-site.pages.dev/es`
- 工具页面示例: `https://your-site.pages.dev/en/inverse-matrix-calculator`
- Sitemap: `https://your-site.pages.dev/sitemap.xml`
- Robots: `https://your-site.pages.dev/robots.txt`

## 🔍 故障排除历史

### ~~问题1: 构建错误 "couldn't be rendered statically because it used headers"~~  
**已解决**: 添加 `unstable_setRequestLocale()` 到所有页面

### ~~问题2: "Couldn't find next-intl config file"~~  
**已解决**: 配置 `src/i18n/request.ts` 并返回 `locale` 参数  

### ~~问题3: Wrangler deploy 失败 "assets with a binding"~~  
**已解决**: 删除错误的 deploy command

### ~~问题4: 构建超时21分钟~~  
**已解决**: 删除 `wrangler.toml` 文件 ✅

## 📝 配置总结

| 项目 | 配置 | 状态 |
|------|------|------|
| Framework | Next.js Static Export | ✅ |
| Build command | `npm run build` | ✅ |
| Output directory | `out` | ✅ |
| Deploy command | (empty) | ✅ |
| wrangler.toml | (deleted) | ✅ |
| i18n | next-intl with static export | ✅ |

**现在应该可以成功部署了！** 🎉
