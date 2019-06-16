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

5. 比如，我昨天向仓库提交代码，但是用的不是我gitHub的账号，我想更改，应该怎么做呢？下面的教程就是把以前默认的用户push记录归到自己到名下：<br/>
oldName就是默认的本机器名称<br />
newName是gitHub账号名
``` js
  git filter-branch -f --env-filter '
  if [ "$GIT_AUTHOR_NAME" = "oldName" ]
  then
  export GIT_AUTHOR_NAME="newName"
  export GIT_AUTHOR_EMAIL="newEmail"
  fi
  ' HEAD
  
  git filter-branch -f --env-filter '
  if [ "$GIT_COMMITTER_NAME" = "oldName" ]
  then
  export GIT_COMMITTER_NAME="newName"
  export GIT_COMMITTER_EMAIL="newEmail"
  fi
  ' HEAD
```
6. 执行完以后：显示如下代码就是操作成功了。
``` js
Ref 'refs/heads/master' was rewritten.
```

7. 这个时候在执行：
``` js
git filter-branch -f --env-filter "
GIT_AUTHOR_NAME='newName';
GIT_AUTHOR_EMAIL='newEmail';
GIT_COMMITTER_NAME='newName';
GIT_COMMITTER_EMAIL='newEmail'
" HEAD
```

8. 然后重新提交代码：git push origin master。但是有冲突会报错。
<br />鉴于我是个人的项目，所以直接执行 git push origin master -f。强制push到远端。

9. 此时，gitHub上的commit记录都是你gitHub账号的name了。今天和昨天还有以前的都是如此。
![](https://i.loli.net/2019/06/15/5d0474550fa6413175.png)

10. 完成以后就可以看到昨天和今天commit记录的小绿点了。大家以后push的时候，记得先查看一下本地的name和email是否和仓库的一致。以免失误。
