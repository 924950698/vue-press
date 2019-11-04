# 定义接口

```
// 接口
interface Person{
  name: string;
  age: number;
}

function creatPerson(per: Person) {
    console.log(per.name)
}

let perNew = {name: "lily", age: 18};

creatPerson(perNew);


// 可选属性接口 (在声明属性时，后面加一个?问号就变成了可选属性)
interface Animal {
    color? : string;
    size? : number;
}

function createAnimal(ani: Animal):{color:string; size:number}{
    var aniTemp= {
        color: "yellow",
        size: 100
    }
    if(ani.color) {
        aniTemp.color = ani.color;
    }
    if(ani.size) {
        aniTemp.size = ani.size;
    }
    return aniTemp;
}

createAnimal({color: "red"}); 
```