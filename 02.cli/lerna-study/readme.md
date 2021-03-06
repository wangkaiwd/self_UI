## Lerna

* [lerna](https://github.com/lerna/lerna)
* [scoped package](https://docs.npmjs.com/cli/v7/using-npm/scope)
* [publishing scoped public packages](https://docs.npmjs.com/creating-and-publishing-scoped-public-packages#publishing-scoped-public-packages)
* [publishConfig](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#publishconfig)

[publishConfig.access](https://github.com/lerna/lerna/tree/main/commands/publish#publishconfigaccess)

```json
"publishConfig": {
"access": "public"
}
```

使用步骤：

1. lerna init
2. lerna create dir-name
3. lerna add

需求：在开发一个`core`中，用到了另一个自己开发的`util`，如何进行本地调试？

* cd util
* npm link
  ![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/20210319184251.png)
* cd ../core
* npm link @ppk-cli-dev/util
  ![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/20210319184412.png)

这个过程在`package`较多时会变的比较繁琐

### lerna debug

1. install dependencies:
    ```shell
    # 安装项目依赖
    npm i
    # 安装项目中所有package的依赖
    lerna bootstrap
    ```
2. 在`Node.js`调试器中添加相应的配置：
   ![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/20210322215756.png)

一点点研究其中不懂的用法，也可以尝试自己去创建一些`demo`去调试

#### 执行流程

* importLocal
* main
  * cli
    * globalOptions
    * lernaCLI

### import-local

重要方法：

* Module._nodeModulePaths
* Module._resolveFilename