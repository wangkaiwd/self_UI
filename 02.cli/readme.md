## 脚手架

思路：

* lerna也是一个脚手架，学习它的用法和原理来为我们之后实现自己的脚手架起到借鉴的目的
* 深入阅读`import-local`源码，从源码中学习知识

记录：

* /usr/bin/env
* ls -l: [long output format](https://www.mkssoftware.com/docs/man1/ls.1.asp#Long_Output_Format)

脚手架命令执行过程：

* vue create test
* 在环境变量$PATH中查询`vue`命令(`which vue`)
* 查询实际链接文件
* 通过/usr/bin/env node 执行文件

### 调试

脚手架命令调试：

* 在项目根目录`npm i -g cli-name`
* 在项目根目录`npm link`

分包调试：

* 链接本地库文件：

```shell
cd ./test-lib
npm link 
cd ../other-lib
npm link test-lib
```

### 参数解析

* process.env