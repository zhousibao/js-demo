/**
 * @深度遍历
 */

// 递归方法
const dfs = node => {
  const nodes = []
  const fn = node => {
    if (node) {
      nodes.push(node)
      for (const i of node.children) {
        fn(i) // 递归处理
      }
    }
  }
  fn(node)
  return nodes
}

// 栈 后进先出
const dfsStack = node => {
  const stack = [] // 栈数据
  const nodes = [] // 存放结果
  if (node) {
    stack.push(node)
    while (stack.length) {
      const item = stack.pop() // 后进先出
      nodes.push(item)

      for (let i = item.children.length - 1; i >= 0; i--) { // 从后向前遍历
        stack.push(item.children[i])
      }
    }
  }
  return nodes
}


/**
 * @广度遍历
 */
// 队列方法 // 先进先出
const bfs = node => {
  const queue = [] // 队列
  const nodes = [] // 存放结果

  if (node) {
    queue.push(node)
    while (queue.length) {
      const item = queue.shift() // 先进先出
      nodes.push(item)
      for (let i = 0; i < item.children.length; i++) {
        queue.push(item.children[i])
      }
    }
  }
  return nodes
}


// 数据源
const list = {
  name: '1',
  children: [{
    name: '1-1',
    children: [{
      name: '1-1-1',
      children: [],
    }],
  }, {
    name: '1-2',
    children: [{
      name: '1-2-1',
      children: [],
    }, {
      name: '1-2-2',
      children: [],
    }],
  }],
}

// dfs(list)
console.log('dfs', dfs(list))
console.log('dfsStack', dfsStack(list))
console.log('bfs', bfs(list))
