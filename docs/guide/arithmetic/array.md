# LetCode - 数组篇

### 写在前面
空间复杂度：占用的内存大小<br>
时间复杂度：消耗的次数多少 

#### 1. [从排序数组中删除重复项](https://leetcode-cn.com/explore/interview/card/top-interview-questions-easy/1/array/21/)
```
/**
 * @param {number[]} nums
 * @return {number}
 */
    var removeDuplicates = function(nums) {
        for(let i = 0; i < nums.length; i ++) {
            if(nums[i] == nums[i +1]) {
                nums.splice(i, 1)
                i --
            }
        }
        return nums.length
    };
```

#### 2. [买卖股票的最佳时机 II](https://leetcode-cn.com/explore/interview/card/top-interview-questions-easy/1/array/22/)
```
    /**
    * @param {number[]} prices
    * @return {number}
    */
    var maxProfit = function(prices) {
        var max = 0;
        var len = prices.length;
        for (var i=0; i<len; i++){
            if (prices[i+1]>prices[i]){
                max += prices[i+1]-prices[i];
            }
        }
        return max;
    };
```

#### 3. [旋转数组](https://leetcode-cn.com/explore/interview/card/top-interview-questions-easy/1/array/23/)
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

#### 4. [存在重复](https://leetcode-cn.com/explore/interview/card/top-interview-questions-easy/1/array/24/)
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
    for(let i = 0; i<len; i ++) {
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
    for(let i = 0; i < nums.length; i++) {
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

#### 5. [只出现一次的数字](https://leetcode-cn.com/problems/single-number/submissions/)
```
1. 104 ms   36.5 MB    先排序，相邻项一致，执行i+2 操作
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
    nums.sort()
    for (let i = 0; i < nums.length;) {
        if(nums[i] === nums[i +1]) {
            i += 2
        } else{
            return nums[i]
        }
    }
}

2.  96 ms        36.9 MB   先排序，然后前中后三项对比
var singleNumber = function(nums) {
  nums = nums.sort();
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== nums[i - 1] && nums[i] !== nums[i + 1]) {
        return nums[i];
    }
  }
};

3.   404 ms      35.1 MB      利用indexOf 和 lastIndexOf特性查找
var singleNumber = function(nums) {
    let len = nums.length;
    for(let i =0; i<len; i ++) {
        if( nums.indexOf(nums[i]) === nums.lastIndexOf(nums[i]) ) {
            return nums[i]
        }
    }
}

4. 96 ms        37.2 MB    哈希对比，先存入对象中，如若还有重复元素，就在对象中删除
var singleNumber = function(nums) {
  let numsObj = {};
  for (let i = 0; i < nums.length; i++) {
    if (numsObj[nums[i]]) delete numsObj[nums[i]];
    else numsObj[nums[i]] = 1;
  }
  return Object.keys(numsObj)[0];
};

5. 72 ms    35.5 MB         ^= 是异或运算，相同取0，不同取1. 原理是将数组中所有数都一起异或之后值相同的项异或为0,0异或那个只出现一次的项结果为那个项本身
标签：位运算
本题根据题意，线性时间复杂度 O(n)O(n)，很容易想到使用 Hash 映射来进行计算，遍历一次后结束得到结果，
但是在空间复杂度上会达到 O(n)O(n)，需要使用较多的额外空间
既满足时间复杂度又满足空间复杂度，就要提到位运算中的异或运算 XOR，主要因为异或运算有以下几个特点：
一个数和 0 做 XOR 运算等于本身：a⊕0 = a
一个数和其本身做 XOR 运算等于 0：a⊕a = 0
XOR 运算满足交换律和结合律：a⊕b⊕a = (a⊕a)⊕b = 0⊕b = b （这句是重点 例如：1+1+2 => 0 +2 => 2 实现查找唯一元素）
故而在以上的基础条件上，将所有数字按照顺序做异或运算，最后剩下的结果即为唯一的数字
时间复杂度：O(n)O(n)，空间复杂度：O(1)O(1)

var singleNumber = function(nums) {
  let temp = 0;
  for (let i = 0; i < nums.length; i++) {
    temp ^= nums[i];
    return temp;
  }
};

```

6. [两个数组的交集 II](https://leetcode-cn.com/explore/interview/card/top-interview-questions-easy/1/array/26/) 
```
1. 76 ms     34.4 MB
var intersect = function(nums1, nums2) {
    const len2 = nums2.length;
    let newArr = [];
    for(let j = 0; j < len2; j ++) {
        const indexs = nums1.indexOf(nums2[j]);
        if(indexs !== -1) {
            newArr.push(nums2[j]);
            nums1.splice(indexs, 1)
        }
    }     
     return newArr
};

```

7. [加一](https://leetcode-cn.com/problems/plus-one/submissions/)

```
var plusOne = function(digits) {
    const len = digits.length;
    for(let i = len - 1; i >= 0; i--) {        // 末尾+1，倒序执行
        digits[i]++;
        digits[i] %= 10;                       // 求运算后的余数。如果上一步的digits[i] ++ 为10 ，则这一步的digits[i]为0
        if(digits[i] != 0)                     // 判断运算后的余数是否为0，不是则直接返回该数组
            return digits;
    }
    digits = [...Array(len + 1)].map(_=>0);     // 数组中的每一个元素都替换为0
    digits[0] = 1;                              // 第一个元素替换为1
    return digits;
};

/*

    难点：这里并没有用类型转换。
    不涉及到末位为9的数字时，可以正常加减。 当有一位为9时，需要执行前一位进1时，则不满足。
    1. [...Array(len + 1)].map(_=>0)是将数组中的每一项替换为0。
    2. len+1 则是执行+1操作时，需要补位的操作。99 + 1= 100
    3. Array(size) 创建一个长度为size的数组，此时每一项元素为undefied；遍历则是将每一项替换为0
    4. 当函数作为构造函数被调用时，new Array()的new可以省略，效果不变。
    5. [...Array()]则是将其继续存到数组中

*/ 

```