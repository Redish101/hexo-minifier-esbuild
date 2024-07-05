# hexo-minifier-esbuild

> 使用`esbuild`压缩你的静态资源。

## 安装 

```bash
npm install @redish101/hexo-esbuild
```

修改`package.json`中的`scripts`字段：

```json
"scripts": {
  "build": "hexo generate && hexo-minifier-esbuild"
  // 其余脚本
}
```

当然，您也可以全局安装：

```bash
npm install @redish101/hexo-esbuild -g
```

然后在每次执行`hexo generate`后执行`hexo-minifier-esbuild`。
