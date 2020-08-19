/**
 * @斐波那契数列 前两个数之和等于第三个数
 */

function * fibonacci () {
  let [prev, curr] = [0, 1]
  while (true) {
    yield curr; // 注意yield后面加分号
    [prev, curr] = [curr, prev + curr] // 利用数组结构赋值
  }
}

for (const n of fibonacci()) {
  if (n > 100) break
  console.log(n)
}
