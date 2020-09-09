/**
 * @二叉树 一种子节点不超过两个的树形结构
 * 在查询检索方面的性能还是不错的。比如对于敏感词信息的检索上，无论是链表还是map,其性能都无法跟二叉树相比较。
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
  this.length = 0 // 长度
  this.insert = fnInsert // 插入
  this.getMin = fnGetMin // 获取最小值
  this.getMax = fnGetMax // 获取最大值
  this.has = fnHas // 是否存在某个值
  this.for = fnFor // 遍历
  this.deep = fnDeep // 树深度
  // this.fnFind = fnFind// 检索查询
  // this.fnRemove = fnRemove// 删除
}


/**
 * @description 插入节点
 * 1 从根节点开始执行插入操作
 * 2 判断当前值与当前节点的大小
 * 3 如果比当前节点小，且左节点不存在，放置在左节点
 * 4 如果比当前节点大，且右节点不存在，放置在右节点
 */
const fnInsert = function (data) {
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
const fnGetMin = function () {
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
const fnGetMax = function () {
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
const fnHas = function (data) {
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

const fnFor = function (node) {
  if (node != null) {
    console.log(node.data)
    fnFor(node.left)
    fnFor(node.right)
  }
}

const fnDeep = function (node) {
  if (!node) {
    return 0
  }
  const left = fnDeep(node.left)
  const right = fnDeep(node.right)
  return left > right ? left + 1 : right + 1
}

const arr = [50, 20, 21, 18, 24, 47, 63, 76, 34, 75, 25, 55, 89, 72, 14, 26, 30, 51]
const bst = new BST()
for (const item of arr) {
  bst.insert(item)
}

console.time('bst')
console.log(bst.length)
console.log(bst.getMin())
console.log(bst.getMax())
console.log(bst.has(2))
console.log('deep', bst.deep(bst.root))
console.log(bst.for(bst.root))
console.timeEnd('bst')
