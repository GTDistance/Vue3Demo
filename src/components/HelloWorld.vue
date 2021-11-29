<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h1>{{ name }}</h1>
    <h1>{{ world }}</h1>
    <h1>{{ job.name }}</h1>
    <button @click="showHelloMsg">触发事件</button>
    <h1>显示屏幕坐标点x:{{point.x}},y:{{point.y}}</h1>
  </div>
</template>

<script>
import { toRefs } from "@vue/reactivity";
import usePoint from "../hooks/usePoint";
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  setup(props, context) {
    console.log("props", props, "context", context);
    let hello = {
      name: "hwha",
      world: "china",
      job:{
        name:'干活'
      }
    };
    let point = usePoint();
    function showHelloMsg() {
      hello.name = 'thomas'
      hello.world = '中国'
      hello.job.name = '好的'
      console.log('hello.name',hello,hello.name)
      context.emit("hello", "猜猜我是谁");
    }
    return {
      showHelloMsg,
      point,
      ...toRefs(hello),
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
