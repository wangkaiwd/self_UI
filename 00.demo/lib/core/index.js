// require支持的文件类型：
// .js: 读取该文件，并通过node.js中vm模块来执行读取到的字符串
// .json: 通过fs.readFile读取到文件内容，执行JSON.parse即可
const pkg = require('../../package.json');
const semver = require('semver');
const cliLog = require('../util/log');
const { LOWEST_NODE_VERSION, DEFAULT_CLI_HOME } = require('../const');
const colors = require('colors/safe');
const rootCheck = require('root-check');
const fs = require('fs');
const dotenv = require('dotenv');
const homedir = require('os').homedir();
const path = require('path');
const commander = require('commander');
const exec = require('./exec');
const Initiator = require('../command/init/Initiator');
const { getNpmLatestVersion } = require('../util/npm-info');
const program = new commander.Command();

const core = async argv => {
  try {
    await prepare();
    registerCommand();
  } catch (e) { // 通过try catch来自己处理错误，防止程序终止以及打印堆栈信息
    cliLog.error(e.message);
  }
};

const prepare = async () => {
  checkPkgVersion();
  checkNodeVersion();
  checkRootAccount();
  checkHomedir();
  checkEnv();
  await checkLatestVersion();
};

// 注册命令
const registerCommand = () => {
  const name = Object.keys(pkg.bin)[0];
  program
    .version(pkg.version)
    .name(name)
    .usage('<command> [options]')
    .option('-d, --debug', 'enable debug mode', false);
  // .option('-tp, --target-path <targetPath>', 'specify location of local debug file', '');

  program
    .command('init [projectName]')
    .description('init project that package name is projectName')
    .option('-f, --force', 'force init project')
    .action(async (...args) => {
      await new Initiator(...args).init();
    });
  listenDebug();
  promptAvailableComands();
  // 先执行
  program.parse(process.argv);
};

const promptAvailableComands = () => {
  program.on('command:*', function (operands) {
    cliLog.error(`Unknown command: ${operands[0]}`);
    // cmd.name() 获取命令名称
    const availableCommands = program.commands.map(cmd => cmd.name());
    if (availableCommands.length > 0) {
      cliLog.error(`Available commands: ${availableCommands.join(', ')}`);
    }
  });
}

const listenDebug = () => {
  // 启动debug模式
  program.on('option:debug', function () {
    process.env.LOG_LEVEL = 'verbose';
    cliLog.level = process.env.LOG_LEVEL;
    cliLog.verbose('cli', 'test');
  });
};
const checkPkgVersion = () => {
  cliLog.info(pkg.version);
};

const checkNodeVersion = () => {
  const { version } = process;
  if (semver.lt(version, LOWEST_NODE_VERSION)) {
    // 这样整个报错的堆栈信息会被打印出来，可以通过try catch来自己处理错误信息
    throw Error(`ppk-cli need to install node version after ${LOWEST_NODE_VERSION}`);
  }
};
const checkRootAccount = () => {
  // return the numerical effective user identity of the process
  // 根用户: 0
  // 其它用户: 501
  // root 账户创建的一些文件，其它用户没有权限处理，会引发权限问题，所以要进行权限降级
  rootCheck();
  // console.log(process.geteuid());
};
// 实现缓存等功能时要用到主目录
const checkHomedir = () => {
  if (!homedir || !fs.existsSync(homedir)) {
    throw Error(colors.red(`User home directory is not exists!`));
  }
};
const checkEnv = () => {
  const envPath = path.resolve(homedir, '.env');
  if (fs.existsSync(envPath)) {
    // https://github.com/motdotla/dotenv#path
    dotenv.config({ path: envPath });
  }
  createDefaultConfig();
};
const createDefaultConfig = () => {
  const cliConfig = {
    home: homedir
  };
  if (process.env.CLI_HOME) {
    cliConfig.cliHome = path.resolve(homedir, process.env.CLI_HOME);
  } else {
    cliConfig.cliHome = path.resolve(homedir, DEFAULT_CLI_HOME);
  }
  process.env.CLI_HOME_PATH = cliConfig.cliHome;
};

// 检查当前版本是否是最新版本，并提示更新
// 1. 从package.json中拿到name和version
// 2. 通过name发起ajax请求，获取npm information
// 3. 通过请求的数据，利用semver对版本号进行比对
// 4. 找出比当前版本号大的版本列表
// 5. 找出最新的一个版本
const checkLatestVersion = () => {
  const { name, version } = pkg;
  return getNpmLatestVersion(name)
    .then((lastVersion) => {
      if (semver.gt(lastVersion, version)) {
        cliLog.warn(`please update ${name} manually, current version: ${version}, last version: ${lastVersion}. update command: npm i -g ${name}`);
      }
    });
};
module.exports = core;