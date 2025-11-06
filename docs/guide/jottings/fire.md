# 火焰图 -- Linux下的性能监控

<b> 大家先看效果图： </b>
![](https://i.loli.net/2019/06/17/5d07adc78257730405.png)

[博客传送门](https://blog.csdn.net/gatieme/article/details/78885908)

1. 先查看Linux系统版本: ```cat /etc/centos-release```
2. 根据系统版本，安装perf： ```yum install perf```
3. 安装git: ```yum -y install git```
4. 查看git版本：``` git --version```
5. 注册gitHub账号，并给git添加用户名： ```useradd xxx```<br />
输入： ```passwd xxx```以后，就会提示用户输入密码
6. 创建项目文件夹： ```mkdir FlameGraph``` 
7. 进入文件夹，并克隆火焰图代码：```git clone https://github.com/brendangregg/FlameGraph.git```
8. 先查看进程号，查看cpu前10的进程号：```ps aux|head -1;ps aux|grep -v PID|sort -rn -k +3|head```
9. 执行：```perf record -F 99 -p 1941 -g -- sleep 30```
10. 在执行：```perf report -n --stdio```
### 参照下图
![](https://i.loli.net/2019/06/17/5d07b1a807b4021228.jpg)

### 生成火焰图：
11. 首选生成折叠后的调用栈：```perf script -i perf.data &> perf.unfold```
12. 然后生成火焰图： ```./stackcollapse-perf.pl perf.unfold &> perf.folded```
13. 最后生成 svg 图: ```./flamegraph.pl perf.folded > perf.svg```
14. 如下图所示：
![](https://i.loli.net/2019/06/17/5d07b2a37615277052.jpg)
15. 将Linux文件中的perf.svg下载到本地：```scp root@62.234.67.162:/root/FlameGraph/FlameGraph/perf.svg ./```

16. 操作完成。找到对应目录打开文件在浏览器查看即可。

![](https://i.loli.net/2019/06/17/5d07b3822558732366.png)