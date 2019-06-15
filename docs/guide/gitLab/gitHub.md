# gitHub 

## gitHub小绿点不出现的问题
### 解决办法：
1. git config user.name 查看本地项目的用户名 <br />
  git config user.email  查看本地项目的邮箱
2. 打开自己的gitHub --> Settings --> email，检查本地的用户名和邮箱是否与gitHub上的绑定的一致。
<br />如下图所示：
![](https://i.loli.net/2019/06/15/5d046c37eea9247345.png)
3. 一致则小绿点能正常显示。<br />
如果不一致，则使用命令：<br />git config --global user.name <gitHub,s name><br />git config --global user.email <gitHub,s email>
4. 设置完成以后，可用git config user.name 和 git config user.email来查看。
