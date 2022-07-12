/*
 * @Description: 数组相关方法
 * @Author: 吴锦辉
 * @Date: 2022-07-12 14:56:57
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-07-12 16:07:18
 */

/**
 * @description: 数组对象合并相同项
 * @param {object[]} data
 * @param {string} key
 * @return {object[]}
 */
export default function mergeSameItem(data, key) {
  const mergeArr = [];
  const sameMap = {};

  data.forEach(v => {
    if (!Reflect.has(v, key)) {
      mergeArr.push(v);

      return;
    }

    let sames = sameMap[v[key]];

    if (sames) {
      sames.push(v);
    } else {
      sames = [v];
      sameMap[v[key]] = sames;
      mergeArr.push(sames);
    }
  });

  return mergeArr;
}
