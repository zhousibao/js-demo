/**
 * @快速排序算法
 *
 * @排序思想
 * 1、在数据集之中，选择一个元素作为'基准'（center）
 * 2、所有小于'基准'的元素，都移到'基准'的左边；所有大于'基准'的元素，都移到'基准'的右边。
 * 3、对"基准"左边和右边的两个子集，使用递归的方式，不断重复第一步和第二步，直到所有子集只剩下一个元素为止。
 */


function quickSort (nums) {
  if (nums.length <= 1) return nums

  const centerIndex = Math.floor(nums.length / 2)
  const center = nums.splice(centerIndex, 1)[0]

  const left = []
  const right = []
  for (let i = 0; i <= nums.length; i++) {
    if (nums[i] <= center) {
      left.push(nums[i])
    } else if (nums[i] > center) {
      right.push(nums[i])
    }
  }

  return quickSort(left).concat([center], quickSort(right))
}

// var nums = [1, 4, 5, 3, 2, 1, 2, 3, 0, 3, 2]
var nums = [20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
console.time('time')
console.log('nums', quickSort(nums))
console.timeEnd('time')
