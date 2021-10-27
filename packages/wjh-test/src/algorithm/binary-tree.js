/*
 * @Description: 二叉树相关
 * @Author: 吴锦辉
 * @Date: 2021-10-25 09:58:59
 * @LastEditTime: 2021-10-27 08:58:15
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

/** 递归先序遍历二叉树 */
function recursionTraverse(root) {
  const arr = [];

  function fn(root) {
    arr.push(root.val);

    if (root.left) {
      fn(root.left);
    }

    if (root.right) {
      fn(root.right);
    }
  }

  fn(root);

  console.log(arr);
}

recursionTraverse(root);

/** 循环先序遍历二叉树 */
function loopTraverse(root) {
  let p = root;
  p.parent = null;

  const arr = [];

  if (p) {
    p.tag = true;

    arr.push(p.val);
  }

  while (p) {
    while (p.left) {
      if (p.left.tag) {
        break;
      }

      p.left.parent = p;
      p = p.left;
      p.tag = true;

      arr.push(p.val);

      continue;
    }

    while (p.right) {
      if (p.right.tag) {
        break;
      }

      p.right.parent = p;
      p = p.right;
      p.tag = true;

      arr.push(p.val);

      continue;
    }

    p = p.parent;
  }

  console.log(arr);
}

loopTraverse(root);

/** 创建一颗平衡二叉树 */
function createBalanceBinaryTree(arr) {
  let root;

  let start = 1;
  const end = arr.length;

  if (end > 0) {
    root = new Node(arr[0]);
  }

  while (start < end) {
    let p = root;
    const val = arr[start];

    while (p) {
      if (p.val > val) {
        if (!p.left) {
          p.left = new Node(val);

          break;
        }

        p = p.left;
      } else {
        if (!p.right) {
          p.right = new Node(val);

          break;
        }

        p = p.right;
      }
    }

    start += 1;
  }

  console.log('root: ', root);
}

// /** 判断是否平衡 */
// function isBalance(root) {}

// /** 右旋转，左边的树高度高于右边 */
// function rightRotate(rotate, parent) {
//   const rotateRight = rotate.right;

//   rotate.right = parent;
//   parent.left = rotateRight;

//   return rotate;
// }

// /** 左旋转，左边的树高度低于右边 */
// function leftRotate(rotate, parent) {
//   const rotateLeft = rotate.left;

//   rotate.left = parent;
//   parent.right = rotateLeft;

//   return rotate;
// }

createBalanceBinaryTree([10, 12, 8, 6, 9, 5, 7]);
