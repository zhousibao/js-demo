/**
 * @二叉树 一种子节点不超过两个的树形结构
 * 在查询检索方面的性能还是不错的。比如对于敏感词信息的检索上，无论是链表还是map,其性能都无法跟二叉树相比较。
 *
 * @博客 https://segmentfault.com/a/1190000016914803
 *
 * @特性 左节点的值<父节点的值<右节点的值
 *
 * @根节点 没有父节点的节点
 * @叶子节点 没有子节点的节点
 * @中间节点 既有子节点又有父节点的节点
 */


// 定义节点对象
const Node = function (data, left, right) {
  this.data = data
  this.left = left
  this.right = right
}

// 二叉树对象
var BST = function () {
  this.root = null
  this.length = 0 // 多少个元素
}


/**
 * @description 插入节点
 * 1 从根节点开始执行插入操作
 * 2 判断当前值与当前节点的大小
 * 3 如果比当前节点小，且左节点不存在，放置在左节点
 * 4 如果比当前节点大，且右节点不存在，放置在右节点
 */
BST.prototype.insert = function (data) {
  this.length += 1
  var node = new Node(data, null, null)
  if (this.root === null) {
    this.root = node
  } else {
    var current = this.root
    var parent
    while (true) {
      parent = current
      if (data > parent.data) {
        if (parent.right === null) {
          parent.right = node
          break
        }
        current = parent.right
      } else {
        if (parent.left == null) {
          parent.left = node
          break
        }
        current = parent.left
      }
    }
  }
}


/**
 * @获取最小节点
 */
BST.prototype.getMin = function () {
  if (!this.root) {
    return this.root
  }

  var current = this.root
  while (current.left !== null) {
    current = current.left
  }
  return current.data
}

/**
 * @获取最大节点
 */
BST.prototype.getMax = function () {
  if (!this.root) {
    return this.root
  }

  var current = this.root
  while (current.right !== null) {
    current = current.right
  }
  return current.data
}


/**
 * @是否存在某个值
 */
BST.prototype.has = function (data) {
  if (!this.root) {
    return false
  }
  let node = this.root
  while (node) {
    if (data < node.data) {
      node = node.left
    } else if (data > node.data) {
      node = node.right
    } else {
      return true
    }
  }
  return false
}


/**
 * @获取二叉树的深度
 */
BST.prototype.deep = function () {
  function fnDeep (node) {
    if (!node) {
      return 0
    }
    const left = fnDeep(node.left)
    const right = fnDeep(node.right)
    return left > right ? left + 1 : right + 1
  }

  return fnDeep(this.root)
}

/**
 * @获取二叉树某一层的最大宽度
 */
BST.prototype.width = function () {
  if (!this.root) return 0

  const queue = [this.root]
  let max = 1
  let deep = 1

  while (queue.length) {
    while (deep--) {
      const item = queue.shift()

      if (item.left) {
        queue.push(item.left)
      }
      if (item.right) {
        queue.push(item.right)
      }
    }
    deep = queue.length
    max = max > deep ? max : deep
  }
  return max
}

/**
 * @翻转二叉树
 */
BST.prototype.reverse = function () {
  function fnReverse (node) {
    if (node) {
      [node.left, node.right] = [node.right, node.left]
      fnReverse(node.left)
      fnReverse(node.right)
    }
  }
  fnReverse(this.root)
}

/**
 * @判断二叉树是否左右对称
 */
BST.prototype.symmetrical = function () {
  function funC (left, right) {
    if (!left) return right === null
    if (!right) return false
    if (left.data !== right.data) return false
    return funC(left.left, right.right) && funC(left.right, right.left)
  }

  if (!this.root) {
    return true
  }
  return funC(this.root.left, this.root.right)
}


/**
 * @前序遍历
 */
BST.prototype.preface = function () {
  const res = []
  function fn (node) {
    if (node != null) {
      res.push(node.data)
      fn(node.left)
      fn(node.right)
    }
  }
  fn(this.root)
  return res
}

/**
 * @中序遍历
 */
BST.prototype.middlePreface = function () {
  function fn (node, res) {
    if (!node) return
    fn(node.left, res)
    res.push(node.data)
    fn(node.right, res)
  }
  const res = []
  if (this.root) {
    fn(this.root, res)
  }
  return res
}

/**
 * @后序遍历
 */
BST.prototype.afterPreface = function () {
  function fn (node, res) {
    if (!node) return
    fn(node.left, res)
    fn(node.right, res)
    res.push(node.data)
  }
  const res = []
  if (this.root) {
    fn(this.root, res)
  }
  return res
}


const arr = [50, 20, 21, 18, 24, 47, 63, 76, 34, 75, 25, 55, 89, 72, 14, 26, 30, 51]
const bst = new BST()
for (const item of arr) {
  bst.insert(item)
}

console.time('bst')
console.log('length', bst.length)
console.log('min', bst.getMin())
console.log('max', bst.getMax())
console.log('has', bst.has(63))
console.log('deep', bst.deep())
console.log('width', bst.width())
console.log('symmetrical', bst.symmetrical())

console.log('preface', bst.preface())
console.log('middlePreface', bst.middlePreface())
console.log('afterPreface', bst.afterPreface())

console.timeEnd('bst')
