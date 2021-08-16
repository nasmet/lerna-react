/*
 * @Description: 抽象语法树学习
 * @Author: 吴锦辉
 * @Date: 2021-07-13 09:58:52
 * @LastEditTime: 2021-07-19 11:43:23
 */

const babylon = require('babylon');
const traverse = require('@babel/traverse').default;
const generator = require('@babel/generator').default;
const t = require('@babel/types');
const { streamWriteFile, streamReadFile } = require('./stream');

/**
 * @description: 通过抽象语法树删除log
 * @param {string} file 文件路径
 * @return {void}
 */
function deleteLog(file) {
  /** Step Parse */
  function parse(code) {
    return babylon.parse(code);
  }

  /** Step Transform */
  function transform(ast) {
    traverse(ast, {
      ExpressionStatement(path) {
        if (path.node.expression.callee.object.name === 'console') {
          path.remove();
        }
      },
    });
  }

  /** Step Generate */
  function generate(ast) {
    return generator(ast).code;
  }

  streamReadFile(file)
    .then((res) => {
      const ast = parse(res);

      transform(ast);

      const targetCode = generate(ast);

      streamWriteFile(file, targetCode).catch(() => {
        console.error('写入文件失败');
      });
    })
    .catch(() => {
      console.error('读取文件失败');
    });
}

/**
 * @description: 通过抽象语法树添加内容
 * @param {string} file 文件路径
 * @param {string} content
 * @return {void}
 */
function addContent(file, content) {
  /** Step Parse */
  function parse(code) {
    return babylon.parse(code);
  }

  /** Step Generate */
  function generate(ast) {
    return generator(ast).code;
  }

  streamReadFile(file)
    .then((res) => {
      const ast = parse(res);

      const addAst = parse(content);

      ast.program.body.push(...addAst.program.body);

      const targetCode = generate(ast);

      streamWriteFile(file, targetCode).catch(() => {
        console.error('写入文件失败');
      });
    })
    .catch(() => {
      console.error('读取文件失败');
    });
}

/**
 * @description: 词法分析器
 * @param {string} sourceCode
 * @return {object[]}
 */
function LexicalAnalyzer(sourceCode) {}

module.exports = {
  deleteLog,
  addContent,
};
