#! /usr/bin/env node

/*
 * @Description: 使用ast删除console.log
 * @Author: 吴锦辉
 * @Date: 2021-10-18 10:44:42
 * @LastEditTime: 2021-11-23 11:06:04
 */

const generator = require('@babel/generator').default;
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const fs = require('fs');
const path = require('path');
const { argv } = require('yargs');

// const types = require('@babel/types');
const { streamWriteFile, streamReadFile } = require('../utils/stream');

const root = process.cwd();

/**
 * @description: 通过抽象语法树递归删除log
 * @param {string} root 根路径
 * @return {void}
 */
function deleteLog(root) {
  console.log('批量删除中');

  /** Step Parse */
  function parse(code) {
    return parser.parse(code, {
      // parse in strict mode and allow module declarations
      sourceType: 'module',

      plugins: [
        // enable jsx and flow syntax
        'jsx',
        'flow',
      ],
    });
  }

  /** Step Transform */
  function transform(ast) {
    traverse(ast, {
      ExpressionStatement(path) {
        if (
          path.node.expression.callee &&
          path.node.expression.callee.object &&
          path.node.expression.callee.object.name === 'console'
        ) {
          path.remove();

          return;
        }

        const { expressions = [] } = path.node.expression;

        let len = expressions.length;

        for (let i = 0; i < len; i += 1) {
          if (
            expressions[i].callee &&
            expressions[i].callee.object &&
            expressions[i].callee.object.name === 'console'
          ) {
            expressions.splice(i, 1);

            len -= 1;
            i -= 1;
          }
        }
      },
    });
  }

  /** Step Generate */
  function generate(ast) {
    return generator(ast).code;
  }

  /** 文件log删除 */
  function execute(file) {
    streamReadFile(file)
      .then(res => {
        const ast = parse(res);

        transform(ast);

        const targetCode = generate(ast);

        streamWriteFile(file, targetCode).catch(e => {
          console.error(`${file} 写入文件失败: `, e);
        });
      })
      .catch(e => {
        console.error(`${file} 读取文件失败: `, e);
      });
  }

  /**
   * @description: 递归遍历
   * @param {string} root 文件路径
   * @return {void}
   */
  function recursionTraversal(root) {
    fs.stat(root, (err, stat) => {
      if (err) {
        console.error(err);
      } else if (stat.isFile() && /\.(js|jsx)$/.test(root)) {
        execute(root);
      } else if (stat.isDirectory()) {
        if (/node_modules/.test(root)) {
          return;
        }

        fs.readdir(root, (err, files) => {
          if (err) {
            console.error(err);
          } else {
            files.forEach(file => {
              recursionTraversal(path.join(root, file));
            });
          }
        });
      }
    });
  }

  recursionTraversal(root);
}

if (argv.dc) {
  deleteLog(argv.path || root);

  return;
}

console.log('命令参数有误');
