# WebCell DevCLI

Developer command-line tool for [WebCell](https://web-cell.dev/)

[![NPM Dependency](https://david-dm.org/EasyWebApp/DevCLI.svg)](https://david-dm.org/EasyWebApp/DevCLI)
[![Build Status](https://travis-ci.com/EasyWebApp/DevCLI.svg?branch=master)](https://travis-ci.com/EasyWebApp/DevCLI)

[![NPM](https://nodei.co/npm/web-cell-cli.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/web-cell-cli/)



## Feature

 1. Boot a directory as a **WebCell project**

 2. Create a Component from Code template

 3. Bundle components to a package with **JS modules** in it

 4. Support to import **HTML** & **CSS** (LESS, SASS/SCSS or Stylus) as a `String`, **JSON** & **YAML** as an `Object`, and other assets as **Data URI** in ES module

 5. **Real-time preview** during development in Chrome, Firefox or IE



## Usage


### Create a Project

```Shell
npm init web-cell path/to/your_project \
    --remote https://github.com/your_id/repo_name.git
```

### Create a Component

```Shell
web-cell new your-tag attr1,attr2
```

### Create a Router & Pages

```Shell
web-cell new-router router_prefix page1,page2
```

### Configuration reference

 - [**Source directory**](https://github.com/EasyWebApp/material-cell/blob/master/package.json#L24)

 - [**NPM script**](https://github.com/EasyWebApp/material-cell/blob/master/package.json#L29)

 - [**Babel**](https://github.com/EasyWebApp/material-cell/blob/master/package.json#L55)


### Command

    Usage: web-cell [options] [command]

    Developer command-line tool for WebCell

    Options:
        -V, --version              output the version number
        -h, --help                 output usage information

    Commands:
        boot [path] [options]      Boot a directory as a WebCell project
        new <name> [attributes]    Create a Component from Code template
                                   (Attributes should be separated by commas)
        new-router <name> [pages]  Create a Router from Code template
                                   (Pages should be separated by commas)
        pack                       Bundle components to a package with JS modules in it
        preview                    Real-time preview during development
        help [cmd]                 display help for [cmd]



## Typical case

 1. [Cell Router](https://web-cell.dev/cell-router/)

 2. [Material Cell](https://web-cell-ht.ml)

 3. [GitHub Web widget](https://tech-query.me/GitHub-Web-Widget/)

 4. [Month picker](https://tech-query.me/month-picker/)
