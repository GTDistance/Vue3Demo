<template>
  <div>
    <input type="text" v-model="keyword" />
    <h3>{{keyword}}</h3>
  </div>
</template>
<script >
import { customRef, ref } from "@vue/reactivity";
export default {
  setup() {
    function myRef(value) {
      const x = customRef((track,trigger) => {
        return {
          get() {
            console.info('get',value)
            track()//通知vue追踪value的变化
            return value;
          },
          set(newValue,b) {
            console.info('set',newValue,b)
            value = newValue
            trigger()//通知vue去重新解析模板
          },
        };
      });
      return x;
    }
    let keyword = myRef("hello");
    return {
      keyword,
    };
  },
};
</script>
<style scoped>
</style>