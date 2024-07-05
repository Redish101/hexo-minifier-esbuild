# esbuild-hexo-minifier

> 使用`esbuild`压缩你的静态资源。

## 安装

```bash
npm install esbuild-hexo-minifier
```

修改`package.json`中的`scripts`字段：

```json
"scripts": {
  "build": "hexo generate && esbuild-hexo-minifier"
  // 其余脚本
}
```

当然，您也可以全局安装：

```bash
npm install esbuild-hexo-minifier -g
```

然后在每次执行`hexo generate`后执行`esbuild-hexo-minifier`。

## 支持压缩的资源

- html
- css
- js
- 图片
- 字体
