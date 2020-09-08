/**
 * @冒泡排序
 *
 * @实现原理
 * 数组中有 n 个数，比较每相邻两个数，如果前者大于后者，就把两个数交换位置；
 * 这样一来，第一轮就可以选出一个最大的数放在最后面；那么经过 n-1轮，就完成了所有数的排序。
 */


/**
 * @实现过程
 * @外层for 循环控制循环次数
 * @内层for 循环进行两数交换，找每次的最大数，排到最后
 * @标志位 减少不必要的循环 // 当已完成排序后跳出循环
 */

function bubbleSort (nums) {
  const max = nums.length - 1
  for (var i = 0; i < max; i++) {
    // 声明一个变量，作为标志位
    var done = true
    for (var j = 0; j < max - i; j++) {
      if (nums[j] > nums[j + 1]) {
        [nums[j], nums[j + 1]] = [nums[j + 1], nums[j]]
        done = false
      }
    }
    if (done) {
      break
    }
  }
  return nums
}

// var nums = [1, 4, 5, 3, 2, 1, 2, 3, 0, 3, 2]
var nums = [20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
console.time('time')
console.log('nums', bubbleSort(nums))
console.timeEnd('time')
