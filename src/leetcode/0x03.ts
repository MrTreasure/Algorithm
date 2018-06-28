const twoSum = (nums: number[], target: number) => {
  const map = new Map()
  for (let i = 0; i < nums.length; i++) {
    map.set(nums[i], i)
  }
  for (let index = 0; index < nums.length; index++) {
    if (map.has(target - nums[index]) && map.get(target - nums[index]) !== index) {
      return [index, map.get(target - nums[index])]
    }
  }
}
