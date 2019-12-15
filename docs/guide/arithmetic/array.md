# LetCode - 数组篇

1. [从排序数组中删除重复项](https://leetcode-cn.com/explore/interview/card/top-interview-questions-easy/1/array/21/)
```
/**
 * @param {number[]} nums
 * @return {number}
 */
    var removeDuplicates = function(nums) {
        for(let i = 0; i < nums.length-1; i ++) {
            if(nums[i] == nums[i +1]) {
                nums.splice(i, 1)
                i --
            }
        }
        return nums.length
    };
```

2. [买卖股票的最佳时机 II](https://leetcode-cn.com/explore/interview/card/top-interview-questions-easy/1/array/22/)
```
    /**
    * @param {number[]} prices
    * @return {number}
    */
    var maxProfit = function(prices) {
        var max = 0;
        var len = prices.length;
        for (var i=0; i<len-1; i++){
            if (prices[i+1]>prices[i]){
                max += prices[i+1]-prices[i];
            }
        }
        return max;
    };
```

3. [旋转数组](https://leetcode-cn.com/explore/interview/card/top-interview-questions-easy/1/array/23/)
```
1. var rotate = function(nums, k) {
    const len = nums.length;
    const moveIndex = len - k;
    for(let i = 0; i<k; i ++) {
        nums.unshift(nums.pop())
    }
}

2. var rotate = function(nums, k) {
    const len = nums.length;
    // 兼容 数组长度小于位置数目的情况（解释：移动元素数量为开始移动索引元素前的所有元素数量）
    // 例如：[1,2,3]   k = 4 
    const moveIndex = len > k ? len - k : len - (k - len)  
    for(let i = 0; i<moveIndex; i ++) {
         nums.push(nums[0])
         nums.splice(0, 1)
    }
}

3. 批量截断，插到数组前面 
var rotate = function(nums, k) {
    let len = nums.length
    return nums.unshift(...nums.splice(len-k,k))
}
```

4. [存在重复](https://leetcode-cn.com/explore/interview/card/top-interview-questions-easy/1/array/24/)
```
1. 11%
var containsDuplicate = function(nums) {
    const len = nums.length;
    var res;
    if(len < 2) return false
    for(let i =0; i < len; i ++) {
        const temp = nums[i]
        nums.splice(i, 1)
        if(nums.indexOf(temp) != -1 ) {
            res = true
            break;
        }else {
            res = false
        }
    }
    return res  
};

2. 24.48%
var containsDuplicate = function(nums) {
    const len = nums.length;
    if(len < 2) return false
    var res;
    for(let i = 0; i<len-1; i ++) {
        for(let j = i +1; j<len; j ++) {
            if(nums[i] === nums[j]) {
                return true
            }else {
                res = false
            }
        }
    }
    return res
};

3. 32%
var containsDuplicate = function(nums) {
    nums.sort();
    for(let i = 0; i < nums.length-1; i++) {
        if(nums[i] == nums[i+1]) {
            return true;
        }
    }
    return false;
}

4. 95%
var containsDuplicate = function(nums) {
    return !(new Set(nums).size === nums.length)
}
```