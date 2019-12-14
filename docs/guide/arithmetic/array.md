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