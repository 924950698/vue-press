# 🚲踩坑侠 --- 踩坑日记

# 努力💪加油⛽️


vuepress报错 Error: error:0308010C:digital envelope routines::unsupported

```
解决办法：
出现这个错误是因为 node.js V17版本中最近发布的OpenSSL3.0, 而OpenSSL3.0对允许算法和密钥大小增加了严格的限制，可能会对生态系统造成一些影响.
export NODE_OPTIONS=--openssl-legacy-provider
```
