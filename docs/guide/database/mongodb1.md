# mongodb 如何在mac构建

推荐使用https://www.jianshu.com/p/fab47b974c54 这篇博客，个人搭建成功。<br />


补充两条：

1. .bash_profile 文件的内容：
```
# mongodb所在的目录
export MONGODB_HOME=/Users/lxd/mongodb-osx-x86_64-3.4.2
# mongodb bin所在的目录
export MONGODB=$MONGODB_HOME/bin
# maven所在的目录
export M2_HOME=/Users/lxd/apache-maven-3.6.3
# maven bin所在目录
export M2=$M2_HOME/bin
# 将maven bin加到PATH变量中
export PATH=$M2:$MONGODB:$PATH:.
# 配置JAVA_HOME所在目录，注意这个目录下应该有bin文件夹，bin下应该有java等命令
export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_251.jdk/Contents/Home
```

2. mongod.conf
```
dbpath=./data
logpath=./log/mongo.log
logappend=true
journal=true
quiet=true
port=27017
```