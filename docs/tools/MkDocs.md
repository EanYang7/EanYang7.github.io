# MkDocs

## Material for MkDocs

Material for MkDocs是MkDocs的主题，这是一个面向（技术）项目文档的静态站点生成器。可以使用Python包管理器`pip`安装Material for MkDocs。

## 安装

先创建一个虚拟环境，再

```shell
pip install mkdocs-material
```

这将自动安装所有依赖项的兼容版本： [MkDocs](https://www.mkdocs.org/), [Markdown](https://python-markdown.github.io/), [Pygments](https://pygments.org/) 和[Python Markdown Extensions](https://facelessuser.github.io/pymdown-extensions/)。Material for MkDocs始终努力支持最新版本，因此无需单独安装这些软件包。

## 创建

使用mkdocs可执行文件引导项目文档

进入项目所在的目录，然后

```she
mkdocs new .
```

这将创建以下结构：

```
.
├─ docs/
│  └─ index.md
└─ mkdocs.yml
```

## 配置

只需在`mkdocs.yml`中添加以下行即可启用主题：

```yaml
theme:
  name: material
```

### 主题颜色

[Changing the colors - Material for MkDocs (squidfunk.github.io)](https://squidfunk.github.io/mkdocs-material/setup/changing-the-colors/?h=palette#system-preference)

### 高级配置

Material for MkDocs有许多配置选项。设置部分详细解释了如何配置和自定义颜色、字体、图标等：

- [Changing the colors](https://squidfunk.github.io/mkdocs-material/setup/changing-the-colors/)
- [Changing the fonts](https://squidfunk.github.io/mkdocs-material/setup/changing-the-fonts/)
- [Changing the language](https://squidfunk.github.io/mkdocs-material/setup/changing-the-language/)
- [Changing the logo and icons](https://squidfunk.github.io/mkdocs-material/setup/changing-the-logo-and-icons/)
- [Ensuring data privacy](https://squidfunk.github.io/mkdocs-material/setup/ensuring-data-privacy/)
- [Setting up navigation](https://squidfunk.github.io/mkdocs-material/setup/setting-up-navigation/)
- [Setting up site search](https://squidfunk.github.io/mkdocs-material/setup/setting-up-site-search/)
- [Setting up site analytics](https://squidfunk.github.io/mkdocs-material/setup/setting-up-site-analytics/)
- [Setting up social cards](https://squidfunk.github.io/mkdocs-material/setup/setting-up-social-cards/)
- [Setting up a blog](https://squidfunk.github.io/mkdocs-material/setup/setting-up-a-blog/)
- [Setting up tags](https://squidfunk.github.io/mkdocs-material/setup/setting-up-tags/)
- [Setting up versioning](https://squidfunk.github.io/mkdocs-material/setup/setting-up-versioning/)
- [Setting up the header](https://squidfunk.github.io/mkdocs-material/setup/setting-up-the-header/)
- [Setting up the footer](https://squidfunk.github.io/mkdocs-material/setup/setting-up-the-footer/)
- [Adding a git repository](https://squidfunk.github.io/mkdocs-material/setup/adding-a-git-repository/)
- [Adding a comment system](https://squidfunk.github.io/mkdocs-material/setup/adding-a-comment-system/)
- [Building an optimized site](https://squidfunk.github.io/mkdocs-material/setup/building-an-optimized-site/)
- [Building for offline usage](https://squidfunk.github.io/mkdocs-material/setup/building-for-offline-usage/)

此外，请参阅支持的[Markdown扩展](https://squidfunk.github.io/mkdocs-material/setup/extensions/)列表，这些扩展与Material for MkDocs本机集成，提供了前所未有的低成本技术写作体验。

## 预览与构建

```shell
mkdocs serve
```

```shell
mkdocs build
```

## 发布

github page

```yml title=.github/workflows/ci.yml
name: ci 
on:
  push:
    branches:
      - master 
      - main
permissions:
  contents: write
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-python@v4
        with:
          python-version: 3.x
      - uses: actions/cache@v3
        with:
          key: mkdocs-material-${{ github.ref }} 
          path: .cache
          restore-keys: |
            mkdocs-material-
      - run: pip install mkdocs-material 
      - run: mkdocs gh-deploy --force
```

## 设置导航

### nav结构

```yaml title=mkdocs.yml
nav:
  - 首页: 'index.md'
  - 课程: 
    - 'index.md'
    - A:  
      - 'index.md'
      - 'index.md'
    - B: 
      - 'index.md'
      - 'index.md'
      - C: 
        - 'index.md'
        - 'index.md'
        - D: 
          - 'index.md'
          - 'index.md'
```

只有一级的话，导航栏和侧边栏都会有

两级及以上时，导航栏是1级，侧边栏是2级及以上，2级作为分区标题。

三级及以上的可以折叠起来

---

清晰简洁的导航结构是良好项目文档的一个重要方面。Material for MkDocs提供了多种选项来配置导航元素的行为，包括 [tabs](https://squidfunk.github.io/mkdocs-material/setup/setting-up-navigation/?h=nav#navigation-tabs) 和[sections](https://squidfunk.github.io/mkdocs-material/setup/setting-up-navigation/?h=nav#navigation-sections)，以及其旗舰功能之一：即时加载[instant loading](https://squidfunk.github.io/mkdocs-material/setup/setting-up-navigation/?h=nav#instant-loading)。

### 即时加载

当启用即时加载时，所有内部链接上的点击将被拦截并通过[XHR](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)发送，而无需完全重新加载页面。将以下行添加到`mkdocs.yml`中：

```yaml title=mkdocs.yml
theme:
  features:
    - navigation.instant
```

生成的页面被解析和注入，所有事件处理程序和组件都会自动反弹，即Material for MkDocs现在的行为就像一个单页应用程序。现在，搜索索引在导航中幸存下来，这对大型文档网站特别有用。

### 锚点跟踪

启用锚点跟踪后，地址栏中的URL会自动更新为目录中突出显示的活动锚点。将以下行添加到`mkdocs.yml`中：

```yaml title=mkdocs.yml
theme:
  features:
    - navigation.tracking
```

### 导航选项卡

启用选项卡后，对于1220px以上的视口，顶级部分将在标题下方的菜单层中呈现，但在移动设备上保持原样。将以下行添加到`mkdocs.yml`：

```yaml title=mkdocs.yml
theme:
  features:
    - navigation.tabs
```

#### 粘性导航选项卡

启用粘性选项卡后，导航选项卡将锁定在标题下方，向下滚动时始终可见。只需在`mkdocs.yml`中添加以下两个功能标志：

```yaml title=mkdocs.yml
theme:
  features:
    - navigation.tabs
    - navigation.tabs.sticky
```

### sections分区

启用分区后，对于1220px以上的视口，顶级分区在侧边栏中呈现为组，但在移动设备上保持原样。将以下行添加到`mkdocs.yml`中：

```yaml title=mkdocs.yml
theme:
  features:
    - navigation.sections
```

[`navigation.tabs`](https://squidfunk.github.io/mkdocs-material/setup/setting-up-navigation/#navigation-tabs) 和[`navigation.sections`](https://squidfunk.github.io/mkdocs-material/setup/setting-up-navigation/#navigation-sections)这两个功能标志可以相互组合。如果启用了这两个功能标志，则会为级别2的导航项渲染**部分**。

### 导航展开

当启用扩展时，默认情况下左侧边栏将扩展所有可折叠的子部分，因此用户不必手动打开子部分。将以下行添加到`mkdocs.yml`中：

```yaml title=mkdocs.yml
theme:
  features:
    - navigation.expand
```

### 导航路径面包屑

当导航路径被激活时，每个页面的标题上方都会呈现一个面包屑导航，这可能会让用户在屏幕较小的设备上访问文档时更容易定位。将以下行添加到`mkdocs.yml`中：

```yaml title=mkdocs.yml
theme:
  features:
    - navigation.path
```

### 分区索引页

启用分区索引页后，可以将文档直接附加到分区，这对于提供概述页特别有用。将以下行添加到`mkdocs.yml`中：

```yaml title=mkdocs.yml
theme:
  features:
    - navigation.indexes 
```

为了将页面链接到部分，请在相应的文件夹中创建一个名为`index.md`的新文档，并将其添加到导航部分的开头：

```yaml
nav:
  - Section:
    - section/index.md 
    - Page 1: section/page-1.md
    ...
    - Page n: section/page-n.md
```

### 目录

#### 跟随锚点

当启用了目录的锚点跟随时，侧边栏会自动滚动，以便活动锚点始终可见。

```yaml
theme:
  features:
    - toc.follow
```

#### 导航集成

当启用目录的导航集成时，它总是作为左侧导航侧边栏的一部分呈现。

### 返回顶部按钮

`- navigation.top`

## 插件

### jupyter notebook

**[mkdocs-jupyter](https://github.com/danielfrg/mkdocs-jupyter)**

### Latex

```js title=docs/javascripts/mathjax.js
window.MathJax = {
  tex: {
    inlineMath: [["\\(", "\\)"]],
    displayMath: [["\\[", "\\]"]],
    processEscapes: true,
    processEnvironments: true
  },
  options: {
    ignoreHtmlClass: ".*|",
    processHtmlClass: "arithmatex"
  }
};

document$.subscribe(() => { 
  MathJax.typesetPromise()
})
```

```yaml title=mkdocs.yml
markdown_extensions:
  - pymdownx.arithmatex:
      generic: true

extra_javascript:
  - javascripts/mathjax.js
  - https://polyfill.io/v3/polyfill.min.js?features=es6
  - https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js
```

### 创建和更新的日期

[Adding a git repository - Material for MkDocs (squidfunk.github.io)](https://squidfunk.github.io/mkdocs-material/setup/adding-a-git-repository/?h=repo_url#document-dates)