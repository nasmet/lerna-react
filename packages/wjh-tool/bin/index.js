#!/usr/bin/env node

const { argv } = require('yargs');
const upload = require('../src/upload');
const compress = require('../src/compress');
const compileScss = require('../src/compile-scss');
const infoOperator = require('../src/info-operator');

if (argv.c) {
  compress();
} else if (argv.u) {
  upload();
} else if (argv.cs) {
  compileScss();
} else if (argv.cstype) {
  infoOperator.read().then(res => {
    res.CSS = argv.cstype;
    infoOperator.write(res);
  });
} else if (argv.id) {
  infoOperator.read().then(res => {
    res.SecretId = argv.id;
    infoOperator.write(res);
  });
} else if (argv.key) {
  infoOperator.read().then(res => {
    res.SecretKey = argv.key;
    infoOperator.write(res);
  });
} else if (argv.bucket) {
  infoOperator.read().then(res => {
    res.Bucket = argv.bucket;
    infoOperator.write(res);
  });
} else if (argv.region) {
  infoOperator.read().then(res => {
    res.Region = argv.region;
    infoOperator.write(res);
  });
} else if (argv.tiny) {
  infoOperator.read().then(res => {
    res.TinifyKey = argv.tiny;
    infoOperator.write(res);
  });
} else {
  console.log('暂不支持');
}
