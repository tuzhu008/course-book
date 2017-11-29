# Node Version Manager [![Build Status](https://travis-ci.org/creationix/nvm.svg?branch=master)][3] [![nvm version](https://img.shields.io/badge/version-v0.33.6-yellow.svg)][4] [![CII Best Practices](https://bestpractices.coreinfrastructure.org/projects/684/badge)](https://bestpractices.coreinfrastructure.org/projects/684)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of Contents

- [Installation](#installation)
  - [Install script](#install-script)
  - [Verify installation](#verify-installation)
  - [Important Notes](#important-notes)
  - [Git install](#git-install)
  - [Manual Install](#manual-install)
  - [Manual upgrade](#manual-upgrade)
- [Usage](#usage)
  - [Long-term support](#long-term-support)
  - [Migrating global packages while installing](#migrating-global-packages-while-installing)
  - [Default global packages from file while installing](#default-global-packages-from-file-while-installing)
  - [io.js](#iojs)
  - [System version of node](#system-version-of-node)
  - [Listing versions](#listing-versions)
  - [.nvmrc](#nvmrc)
  - [Deeper Shell Integration](#deeper-shell-integration)
    - [zsh](#zsh)
      - [Calling `nvm use` automatically in a directory with a `.nvmrc` file](#calling-nvm-use-automatically-in-a-directory-with-a-nvmrc-file)
- [License](#license)
- [Running tests](#running-tests)
- [Bash completion](#bash-completion)
  - [Usage](#usage-1)
- [Compatibility Issues](#compatibility-issues)
- [Installing nvm on Alpine Linux](#installing-nvm-on-alpine-linux)
- [Docker for development environment](#docker-for-development-environment)
- [Problems](#problems)
- [Mac OS "troubleshooting"](#mac-os-troubleshooting)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 安装

### 安装脚本

你可以使用cURL的 [安装脚本][2] 来安装和更新：

```sh
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.6/install.sh | bash
```

或者 Wget:

```sh
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.6/install.sh | bash
```

<sub>这段脚本将克隆 nvm库到 `~/.nvm` ，请添加source 行到配置文件 (`~/.bash_profile`, `~/.zshrc`, `~/.profile`, or `~/.bashrc`).</sub>

```sh
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" # This loads nvm
```

你可以自定义安装 source, directory, profile, 和 version，请使用  `NVM_SOURCE`, `NVM_DIR`, `PROFILE`, 和 `NODE_VERSION` 变量.
Eg: `curl ... | NVM_DIR=/usr/local/nvm bash` for a global install.

<sub>*NB. The installer can use `git`, `curl`, or `wget` to download `nvm`, whatever is available.*</sub>

**Note:** On Linux, after running the install script, if you get `nvm: command not found` or see no feedback from your terminal after you type:

```sh
command -v nvm
```
simply close your current terminal, open a new terminal, and try verifying again.

**Note:** On OS X, if you get `nvm: command not found` after running the install script, one of the following might be the reason:-
 - your system may not have a [`.bash_profile file`] where the command is set up. Simply create one with `touch ~/.bash_profile` and run the install script again
 - you might need to restart your terminal instance. Try opening a new tab/window in your terminal and retry.

If the above doesn't fix the problem, open your `.bash_profile` and add the following line of code:

`source ~/.bashrc`

- For more information about this issue and possible workarounds, please [refer here](https://github.com/creationix/nvm/issues/576)

### Verify installation

To verify that nvm has been installed, do:

```sh
command -v nvm
```

which should output 'nvm' if the installation was successful. Please note that `which nvm` will not work, since `nvm` is a sourced shell function, not an executable binary.

### Important Notes

If you're running a system without prepackaged binary available, which means you're going to install nodejs or io.js from its source code, you need to make sure your system has a C++ compiler. For OS X, Xcode will work, for Debian/Ubuntu based GNU/Linux, the `build-essential` and `libssl-dev` packages work.

**Note:** `nvm` does not support Windows (see [#284](https://github.com/creationix/nvm/issues/284)). Two alternatives exist, which are neither supported nor developed by us:
 - [nvm-windows](https://github.com/coreybutler/nvm-windows)
 - [nodist](https://github.com/marcelklehr/nodist)

**Note:** `nvm` does not support [Fish] either (see [#303](https://github.com/creationix/nvm/issues/303)). Alternatives exist, which are neither supported nor developed by us:
 - [bass](https://github.com/edc/bass) allows you to use utilities written for Bash in fish shell
 - [fast-nvm-fish](https://github.com/brigand/fast-nvm-fish) only works with version numbers (not aliases) but doesn't significantly slow your shell startup
 - [plugin-nvm](https://github.com/derekstavis/plugin-nvm) plugin for [Oh My Fish](https://github.com/oh-my-fish/oh-my-fish), which makes nvm and its completions available in fish shell
 - [fnm](https://github.com/fisherman/fnm) - [fisherman](https://github.com/fisherman/fisherman)-based version manager for fish

**Note:** We still have some problems with FreeBSD, because there is no official pre-built binary for FreeBSD, and building from source may need [patches](https://www.freshports.org/www/node/files/patch-deps_v8_src_base_platform_platform-posix.cc); see the issue ticket:
 - [[#900] [Bug] nodejs on FreeBSD may need to be patched ](https://github.com/creationix/nvm/issues/900)
 - [nodejs/node#3716](https://github.com/nodejs/node/issues/3716)

**Note:** On OS X, if you do not have Xcode installed and you do not wish to download the ~4.3GB file, you can install the `Command Line Tools`. You can check out this blog post on how to just that:
 - [How to Install Command Line Tools in OS X Mavericks & Yosemite (Without Xcode)](http://osxdaily.com/2014/02/12/install-command-line-tools-mac-os-x/)

**Note:** On OS X, if you have/had a "system" node installed and want to install modules globally, keep in mind that:
 - When using nvm you do not need `sudo` to globally install a module with `npm -g`, so instead of doing `sudo npm install -g grunt`, do instead `npm install -g grunt`
 - If you have an `~/.npmrc` file, make sure it does not contain any `prefix` settings (which is not compatible with nvm)
 - You can (but should not?) keep your previous "system" node install, but nvm will only be available to your user account (the one used to install nvm). This might cause version mismatches, as other users will be using `/usr/local/lib/node_modules/*` VS your user account using `~/.nvm/versions/node/vX.X.X/lib/node_modules/*`

Homebrew installation is not supported. If you have issues with homebrew-installed `nvm`, please `brew uninstall` it, and install it using the instructions below, before filing an issue.

**Note:** If you're using `zsh` you can easily install `nvm` as a zsh plugin. Install [`zsh-nvm`](https://github.com/lukechilds/zsh-nvm) and run `nvm upgrade` to upgrade.

**Note:** Git versions before v1.7 may face a problem of cloning nvm source from GitHub via https protocol, and there is also different behavior of git before v1.6, so the minimum required git version is v1.7.0 and we recommend v1.7.9.5 as it's the default version of the widely used Ubuntu 12.04 LTS. If you are interested in the problem we mentioned here, please refer to GitHub's [HTTPS cloning errors](https://help.github.com/articles/https-cloning-errors/) article.

### Git 安装

如果你已经安装了 `git` (需要 git v1.7+):

1. 在用户配置文件的根目录中克隆这个"repo"
  - 从任何地方运行`cd ~/` ，然后运行 `git clone https://github.com/creationix/nvm.git .nvm`
2. `cd ~/.nvm` and check out the latest version with `git checkout v0.33.6`
3. activate nvm by sourcing it from your shell: `. nvm.sh`

Now add these lines to your `~/.bashrc`, `~/.profile`, or `~/.zshrc` file to have it automatically sourced upon login:
(you may have to add to more than one of the above files)

```sh
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```

### Manual Install

For a fully manual install, create a folder somewhere in your filesystem with the `nvm.sh` file inside it. I put mine in `~/.nvm` and added the following to the `nvm.sh` file.

```sh
export NVM_DIR="$HOME/.nvm" && (
  git clone https://github.com/creationix/nvm.git "$NVM_DIR"
  cd "$NVM_DIR"
  git checkout `git describe --abbrev=0 --tags --match "v[0-9]*" origin`
) && . "$NVM_DIR/nvm.sh"
```

Now add these lines to your `~/.bashrc`, `~/.profile`, or `~/.zshrc` file to have it automatically sourced upon login:
(you may have to add to more than one of the above files)

```sh
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" # This loads nvm
```

### Manual upgrade

For manual upgrade with `git` (requires git v1.7+):

1. change to the `$NVM_DIR`
1. pull down the latest changes
1. check out the latest version
1. activate the new version

```sh
(
  cd "$NVM_DIR"
  git fetch origin
  git checkout `git describe --abbrev=0 --tags --match "v[0-9]*" origin`
) && . "$NVM_DIR/nvm.sh"
```

## 用法

要下载、编译和安装最新的node版本，请执行如下:

```sh
nvm install node
```

然后在任何一个新的shell中使用已安装的版本:

```sh
nvm use node
```

或者你可以直接运行它:

```sh
nvm run node --version
```
或者，您可以在子shell中使用所需版本的node运行任意的命令，并使用所需版本的node:

```sh
nvm exec 4.2 node --version
```

您还可以将可执行文件的路径设置为被安装的位置:

```sh
nvm which 5.0
```

替代像 "0.10" or "5.0" 或 "4.2.1"这样的版本指针，可以通过`nvm install`, `nvm use`, `nvm run`, `nvm exec`, `nvm which`等等使用下面特别的默认别名：

 - `node`: 这将安装最新版本的 [`node`](https://nodejs.org/en/)
 - `iojs`: 这将安装最新版本的 [`io.js`](https://iojs.org/en/)
 - `stable`: 稳定。这个别名已被**弃用**，它只适用于 `node` `v0.12` 和更早的版本 。 目前, 这是`node`的别名。
 - `unstable`: 不稳定。这个别名指向`node` `v0.11` - 最后一个 "unstable" node 发布, 自 1.0以后, 所有 node 版本都是稳定的。(在semver中，版本的通信易断裂，不稳定).

### 长期支持（LST）

Node有一个用于长期支持(LTS)的[时间表](https://github.com/nodejs/LTS#lts_schedule)。您可以在别名引用LTS版本；带有`lts/*`记号的`.nvmrc`文件用于最新的LTS；`lts/argon`用于"argon"系列的LST发布版本。此外，下面的命令支持LTS参数:

 - `nvm install --lts` / `nvm install --lts=argon` / `nvm install 'lts/*'` / `nvm install lts/argon`
 - `nvm uninstall --lts` / `nvm uninstall --lts=argon` / `nvm uninstall 'lts/*'` / `nvm uninstall lts/argon`
 - `nvm use --lts` / `nvm use --lts=argon` / `nvm use 'lts/*'` / `nvm use lts/argon`
 - `nvm exec --lts` / `nvm exec --lts=argon` / `nvm exec 'lts/*'` / `nvm exec lts/argon`
 - `nvm run --lts` / `nvm run --lts=argon` / `nvm run 'lts/*'` / `nvm run lts/argon`
 - `nvm ls-remote --lts` / `nvm ls-remote --lts=argon` `nvm ls-remote 'lts/*'` / `nvm ls-remote lts/argon`
 - `nvm version-remote --lts` / `nvm version-remote --lts=argon` / `nvm version-remote 'lts/*'` / `nvm version-remote lts/argon`

任何时候，您本地的`nvm`副本都连接到 https://nodejs.org ，它将为所有可用的LTS线路重新创建适当的本地别名。这些别名(存储在`$NVM_DIR/alias/lts`中)由`nvm`管理，您不应该修改、删除或创建这些文件—您的更改会被取消，对这些文件的干预会从导致可能不支持的错误。

### 在安装时迁移全局包

如果您想要安装一个新版本的Node.js并从以前的版本迁移npm包:

```sh
nvm install node --reinstall-packages-from=node
```

这将首先使用 "nvm version node" 来识别您正在迁移包的当前版本。然后，它将解析来自远程服务器的新版本并安装它。最后，它运行 "nvm reinstall-packages"来将npm包从先前的 Node 版本重新安装到新版本。

您还可以从特定版本的Node安装和迁移npm包:

```sh
nvm install 6 --reinstall-packages-from=5
nvm install v4.2 --reinstall-packages-from=iojs
```

### 安装时默认的全局包

If you have a list of default packages you want installed every time you install a new version we support that too. You can add anything npm would accept as a package argument on the command line.
如果有一个默认包列表，想要每次安装一个新版本时都安装它，我们也支持这样。您可以在命令行中添加任何npm可接受的作为包参数。

```sh
# $NVM_DIR/default-packages

rimraf
object-inspect@1.0.2
stevemao/left-pad
```

### io.js

如果想要安装[io.js](https://github.com/iojs/io.js/):

```sh
nvm install iojs
```

如果想要安装一个新版本的 io.js，并迁移之前版本的 npm包：

```sh
nvm install iojs --reinstall-packages-from=iojs
```

在node中迁移npm包时也提到了的指导原则也同样适用于 io.js。

### node 的系统版本

如果您想使用系统安装的 node 版本，您可以使用特殊的默认别名"system":

```sh
nvm use system
nvm run system --version
```

### 版本列表

显示已安装的node版本：

```sh
nvm ls
```

如果你想知道有哪些版本可供安装:

```sh
nvm ls-remote
```

为了恢复你的PATH，你可以停用它:

```sh
nvm deactivate
```

要在任何新shell中设置一个默认的节点版本，请使用别名'default':

```sh
nvm alias default node
```

要使用node 的二进制文件镜像`$NVM_NODEJS_ORG_MIRROR`:

```sh
export NVM_NODEJS_ORG_MIRROR=https://nodejs.org/dist
nvm install node

NVM_NODEJS_ORG_MIRROR=https://nodejs.org/dist nvm install 4.2
```

要使用 io.js 的二进制文件镜像`$NVM_IOJS_ORG_MIRROR`:

```sh
export NVM_IOJS_ORG_MIRROR=https://iojs.org/dist
nvm install iojs-v1.0.3

NVM_IOJS_ORG_MIRROR=https://iojs.org/dist nvm install iojs-v1.0.3
```

默认情况下，`nvm use`不会创建一个 "current" 符号链接。将`$NVM_SYMLINK_CURRENT`设置为"true"，以启用该行为，这在IDE中有时是有用的。注意，在启用了这个环境变量的多个shell选项卡中使用`nvm`可能会导致竞态(race)条件.

### .nvmrc

你可以在根目录（或者任何父目录）创建一个包含版本号的`.nvmrc`文件，当在命令行中为指定版本时，`nvm use`, `nvm install`, `nvm exec`, `nvm run`, 和 `nvm which` 等等都将遵从`.nvmrc`文件。

例如，要使nvm默认为当前目录的最新的5.9发行版:

```sh
$ echo "5.9" > .nvmrc

$ echo "lts/*" > .nvmrc # to default to the latest LTS version
```

然后当你运行nvm:

```sh
$ nvm use
Found '/path/to/project/.nvmrc' with version <5.9>
Now using node v5.9.1 (npm v3.7.3)
```

### 深层的 Shell 集成

您可以使用[`avn`](https://github.com/wbyoung/avn) 深入集成到您的shell中，并在更改目录时自动调用`nvm`。`avn` 不受 `nvm` 开发团队的支持。请[向`avn` 团队报告问题](https://github.com/wbyoung/avn/issues/new)。

如果你更喜欢轻量的解决方案，下面的配方是由 `nvm` 用户贡献的。它们不受 `nvm` 开发团队的支持。然而，我们接受了更多的示例请求。

#### zsh

##### 在带有`.nvmrc`文件的目录中自动调用`nvm use`

当你输入一个包含`.nvmrc`文件（这个文件告诉nvm应该`use`哪一个node）的目录时，把这个文件放到你的`$HOME/.zshrc`中来自动调用`nvm use`：

```zsh
# 在nvm初始化之后将其放置！
autoload -U add-zsh-hook
load-nvmrc() {
  local node_version="$(nvm version)"
  local nvmrc_path="$(nvm_find_nvmrc)"

  if [ -n "$nvmrc_path" ]; then
    local nvmrc_node_version=$(nvm version "$(cat "${nvmrc_path}")")

    if [ "$nvmrc_node_version" = "N/A" ]; then
      nvm install
    elif [ "$nvmrc_node_version" != "$node_version" ]; then
      nvm use
    fi
  elif [ "$node_version" != "$(nvm version default)" ]; then
    echo "Reverting to nvm default version"
    nvm use default
  fi
}
add-zsh-hook chpwd load-nvmrc
load-nvmrc
```

## License

nvm is released under the MIT license.


Copyright (C) 2010-2017 Tim Caswell and Jordan Harband

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## 运行测试

测试是用[Urchin]写的。安装Urchin(和其他依赖项):

    npm install

有缓慢的测试和快速的测试。缓慢的测试会做一些事情，比如安装node，并检查是否使用了正确的版本。快速测试通过伪造来测试诸如别名和卸载之类的东西。从nvm git存储库的根目录中，运行如下快速测试:

    npm run test/fast

运行慢测试

    npm run test/slow

运行所有测试

    npm test

> **[info]** 留心: 
>
> 在测试运行时避免运行nvm。

## Bash completion

To activate, you need to source `bash_completion`:

```sh
[[ -r $NVM_DIR/bash_completion ]] && . $NVM_DIR/bash_completion
```

Put the above sourcing line just below the sourcing line for nvm in your profile (`.bashrc`, `.bash_profile`).

### Usage

nvm:
> $ nvm <kbd>Tab</kbd>
```
alias               deactivate          install             ls                  run                 unload
clear-cache         exec                list                ls-remote           unalias             use
current             help                list-remote         reinstall-packages  uninstall           version
```

nvm alias:
> $ nvm alias <kbd>Tab</kbd>
```
default
```

> $ nvm alias my_alias <kbd>Tab</kbd>
```
v0.6.21        v0.8.26       v0.10.28
```

nvm use:
> $ nvm use <kbd>Tab</kbd>
```
my_alias        default        v0.6.21        v0.8.26       v0.10.28
```

nvm uninstall:
> $ nvm uninstall <kbd>Tab</kbd>
```
my_alias        default        v0.6.21        v0.8.26       v0.10.28
```

## Compatibility Issues
`nvm` will encounter some issues if you have some non-default settings set. (see [#606](/../../issues/606))
The following are known to cause issues:

Inside `~/.npmrc`:
```sh
prefix='some/path'
```
Environment Variables:
```sh
$NPM_CONFIG_PREFIX
$PREFIX
```
Shell settings:
```sh
set -e
```

## 在 Alpine Linux 上安装 nvm
In order to provide the best performance (and other optimisations), nvm will download and install pre-compiled binaries for Node (and npm) when you run `nvm install X`. The Node project compiles, tests and hosts/provides pre-these compiled binaries which are built for mainstream/traditional Linux distributions (such as Debian, Ubuntu, CentOS, RedHat et al).

Alpine Linux, unlike mainstream/traditional Linux distributions, is based on [busybox](https://www.busybox.net/), a very compact (~5MB) Linux distribution. Busybox (and thus Alpine Linux) uses a different C/C++ stack to most mainstream/traditional Linux distributions - [musl](https://www.musl-libc.org/). This makes binary programs built for such mainstream/traditional incompatible with Alpine Linux, thus we cannot simply `nvm install X` on Alpine Linux and expect the downloaded binary to run correctly - you'll likely see "...does not exist" errors if you try that.

There is a `-s` flag for `nvm install` which requests nvm download Node source and compile it locally.

If installing nvm on Alpine Linux *is* still what you want or need to do, you should be able to achieve this by running the following from you Alpine Linux shell:

```sh
apk add -U curl bash ca-certificates openssl ncurses coreutils python2 make gcc g++ libgcc linux-headers grep util-linux binutils findutils
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.6/install.sh | bash
```

The Node project has some desire but no concrete plans (due to the overheads of building, testing and support) to offer Alpine-compatible binaries.

As a potential alternative, @mhart (a Node contributor) has some [Docker images for Alpine Linux with Node and optionally, npm, pre-installed](https://github.com/mhart/alpine-node).

## Docker for development environment

To make the development and testing work easier, we have a Dockerfile for development usage, which is based on Ubuntu 14.04 base image, prepared with essential and useful tools for `nvm` development, to build the docker image of the environment, run the docker command at the root of `nvm` repository:

```sh
$ docker build -t nvm-dev .
```

This will package your current nvm repository with our pre-defiend development environment into a docker image named `nvm-dev`, once it's built with success, validate your image via `docker images`:

```sh
$ docker images

REPOSITORY         TAG                 IMAGE ID            CREATED             SIZE
nvm-dev            latest              9ca4c57a97d8        7 days ago          1.22 GB
```

If you got no error message, now you can easily involve in:

```sh
$ docker run -it nvm-dev -h nvm-dev

nvm@nvm-dev:~/.nvm$
```

Please note that it'll take about 15 minutes to build the image and the image size would be about 1.2GB, so it's not suitable for production usage.

For more information and documentation about docker, please refer to its official website:
 - https://www.docker.com/
 - https://docs.docker.com/

## Problems

 - If you try to install a node version and the installation fails, be sure to delete the node downloads from src (`~/.nvm/src/`) or you might get an error when trying to reinstall them again or you might get an error like the following:

    curl: (33) HTTP server doesn't seem to support byte ranges. Cannot resume.

 - Where's my `sudo node`? Check out [#43](https://github.com/creationix/nvm/issues/43)

 - After the v0.8.6 release of node, nvm tries to install from binary packages. But in some systems, the official binary packages don't work due to incompatibility of shared libs. In such cases, use `-s` option to force install from source:

```sh
nvm install -s 0.8.6
```

 - If setting the `default` alias does not establish the node version in new shells (i.e. `nvm current` yields `system`), ensure that the system's node `PATH` is set before the `nvm.sh` source line in your shell profile (see [#658](https://github.com/creationix/nvm/issues/658))

## Mac OS "troubleshooting"

**nvm node version not found in vim shell**

If you set node version to a version other than your system node version `nvm use 6.2.1` and open vim and run `:!node -v` you should see `v6.2.1` if you see your system version `v0.12.7`. You need to run:

```shell
sudo chmod ugo-x /usr/libexec/path_helper
```

More on this issue in [dotphiles/dotzsh](https://github.com/dotphiles/dotzsh#mac-os-x).

[1]: https://github.com/creationix/nvm.git
[2]: https://github.com/creationix/nvm/blob/v0.33.6/install.sh
[3]: https://travis-ci.org/creationix/nvm
[4]: https://github.com/creationix/nvm/releases/tag/v0.33.6
[Urchin]: https://github.com/scraperwiki/urchin
[Fish]: http://fishshell.com

|指令|描述|
|:-----------------------|:------------------------|
| nvm --help| 显示帮助信息 |
| nvm --version  |  打印nvm的版本 |
 |nvm install [-s] <version> |                Download and install a <version>, [-s] from source. Uses .nvmrc if available
   --reinstall-packages-from=<version>     When installing, reinstall packages installed in <node|iojs|node version number>
   --lts                                   When installing, only select from LTS (long-term support) versions
   --lts=<LTS name>                        When installing, only select from versions for a specific LTS line
   --skip-default-packages                 When installing, skip the default-packages file if it exists
   --latest-npm                            After installing, attempt to upgrade to the latest working npm on the given node version
 nvm uninstall <version>                   Uninstall a version
 nvm uninstall --lts                       Uninstall using automatic LTS (long-term support) alias `lts/*`, if available.
 nvm uninstall --lts=<LTS name>            Uninstall using automatic alias for provided LTS line, if available.
 nvm use [--silent] <version>              Modify PATH to use <version>. Uses .nvmrc if available
   --lts                                   Uses automatic LTS (long-term support) alias `lts/*`, if available.
   --lts=<LTS name>                        Uses automatic alias for provided LTS line, if available.
 nvm exec [--silent] <version> [<command>] Run <command> on <version>. Uses .nvmrc if available
   --lts                                   Uses automatic LTS (long-term support) alias `lts/*`, if available.
   --lts=<LTS name>                        Uses automatic alias for provided LTS line, if available.
 nvm run [--silent] <version> [<args>]     Run `node` on <version> with <args> as arguments. Uses .nvmrc if available
   --lts                                   Uses automatic LTS (long-term support) alias `lts/*`, if available.
   --lts=<LTS name>                        Uses automatic alias for provided LTS line, if available.
 nvm current                               Display currently activated version
 nvm ls                                    List installed versions
 nvm ls <version>                          List versions matching a given <version>
 nvm ls-remote                             List remote versions available for install
   --lts                                   When listing, only show LTS (long-term support) versions
 nvm ls-remote <version>                   List remote versions available for install, matching a given <version>
   --lts                                   When listing, only show LTS (long-term support) versions
   --lts=<LTS name>                        When listing, only show versions for a specific LTS line
 nvm version <version>                     Resolve the given description to a single local version
 nvm version-remote <version>              Resolve the given description to a single remote version
   --lts                                   When listing, only select from LTS (long-term support) versions
   --lts=<LTS name>                        When listing, only select from versions for a specific LTS line
 nvm deactivate                            Undo effects of `nvm` on current shell
 nvm alias [<pattern>]                     Show all aliases beginning with <pattern>
 nvm alias <name> <version>                Set an alias named <name> pointing to <version>
 nvm unalias <name>                        Deletes the alias named <name>
 nvm install-latest-npm                    Attempt to upgrade to the latest working `npm` on the current node version
 nvm reinstall-packages <version>          Reinstall global `npm` packages contained in <version> to current version
 nvm unload                                Unload `nvm` from shell
 nvm which [<version>]                     Display path to installed node version. Uses .nvmrc if available
 nvm cache dir                             Display path to the cache directory for nvm
 nvm cache clear                           Empty cache directory for nvm

Example:
 nvm install 8.0.0                     Install a specific version number
 nvm use 8.0                           Use the latest available 8.0.x release
 nvm run 6.10.3 app.js                 Run app.js using node 6.10.3
 nvm exec 4.8.3 node app.js            Run `node app.js` with the PATH pointing to node 4.8.3
 nvm alias default 8.1.0               Set default node version on a shell
 nvm alias default node                Always default to the latest available node version on a shell

Note:
 to remove, delete, or uninstall nvm - just remove the `$NVM_DIR` folder (usually `~/.nvm`)
