/*
 * @Description: test文件
 * @Author: 吴锦辉
 * @Date: 2021-10-21 13:32:45
 * @LastEditTime: 2021-10-22 14:00:58
 */

class Node {
  constructor(value) {
    this.val = value;
    this.left = null;
    this.right = null;
  }
}

const root = new Node(0);
const node1 = new Node(1);
const node2 = new Node(2);
const node3 = new Node(3);
const node4 = new Node(4);
const node5 = new Node(5);
const node6 = new Node(6);

root.left = node1;
root.right = node2;
node1.left = node3;
node1.right = node4;
node2.left = node5;
node2.right = node6;

/** 递归中序遍历 */
function recursionTraverse(root) {
  if (root.left) {
    recursionTraverse(root.left);
  }

  console.log(root.val);

  if (root.right) {
    recursionTraverse(root.right);
  }
}

// recursionTraverse(root);

/** 循环中序遍历 */
// function loopTraverse(root) {}

// loopTraverse(root);
