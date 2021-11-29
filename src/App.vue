<template>
  <div v-if="false">

    <h1>一个人的信息</h1>
    <div>姓名：{{name}}</div>
    <div>年龄：{{age}}</div>
    <div>职位类型：{{job.type}}</div>
    <div>职位薪水：{{job.salary}}</div>
    <div>测试的数据：{{job.a.b.c}}</div>
    <div>性别：{{job.sex}}</div>
    <div>爱好：{{hobby}}</div>

    <button @click="sayHello">说话</button>
    <button @click="addSex">添加sex属性</button>

    <HelloWorld v-if="showHelloWorld" msg="Helloworld" @hello="showHelloMsg" />

    <button @click="showHelloWorld = !showHelloWorld">切换显示HelloWorld</button>
    <div>
      姓：<input type="text" v-model="firstName" />
    </div>
    <div>
      名：<input type="text" v-model="lastName" />
    </div>
    <div>
      全名：<input type="text" v-model="fullName" />
    </div>

    <CusRef />
    <PromiseVue />
    <Axios />
  </div>
  <v-md-editor v-model="text" height="400px"></v-md-editor>
</template>

<script>
import { computed, reactive, ref } from "@vue/reactivity";
import HelloWorld from "./components/HelloWorld.vue";
import CusRef from "./components/CusRef.vue";
import PromiseVue from "./components/PromiseVue.vue";
import { watch, watchEffect } from "@vue/runtime-core";
import Axios from "./components/Axios.vue";
export default {
  name: "App",
  components: {
    HelloWorld,
    CusRef,
    PromiseVue,
    Axios,
  },
  setup() {
    let text = ref('')
    let name = ref("张三");
    let age = ref(18);
    let job = reactive({
      type: "hwhw",
      salary: "30K",
      a: {
        b: {
          c: 666,
        },
      },
    });
    let hobby = reactive(["抽烟", "喝酒", "烫头"]);
    let firstName = ref("张");
    let lastName = ref("三");
    let fullName = computed(() => {
      return firstName.value + lastName.value;
    });

    let showHelloWorld = ref(true);

    watch([firstName, lastName], (newValue, oldValue) => {
      console.log("newValue", newValue, "oldValue", oldValue);
    });
    watch(job, (newValue, oldValue) => {
      console.log("newValue", newValue, "oldValue", oldValue);
    });
    watch(
      () => job.type,
      (newValue, oldValue) => {
        console.log("job.type", "newValue", newValue, "oldValue", oldValue);
      }
    );
    watchEffect(() => {
      const x = firstName.value;
      console.log("watchEffect被调用了");
    });
    function sayHello() {
      // alert(`${name}${age}`)
      name.value = "李四";
      age.value = 20;
      job.type = "bibiib";
      job.salary = "50k";
      job.a.b.c = 999;
      hobby[0] = "study";
    }

    function addSex() {
      job.sex = "男";
    }

    function showHelloMsg(msg) {
      console.log("showHelloMsg", msg);
    }
    return {
      name,
      age,
      job,
      hobby,
      firstName,
      lastName,
      fullName,
      showHelloWorld,
      sayHello,
      addSex,
      showHelloMsg,
      text
    };
  },
};
</script>

<style>
#app {
  
}
</style>
