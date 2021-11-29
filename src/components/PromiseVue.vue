<template>
  <div>
    <h1>PromiseDemo</h1>
    <div>
      <h3>抽奖结果：{{choujiang.result}}</h3>
      <h3>抽奖值：{{choujiang.value}}</h3>
      <button @click="choujiangFun">点击抽奖</button>
    </div>
    <button @click="readFile">读取文件</button>
    <div>
      <button @click="promiseClick">promise点击</button>
    </div>
    <div>
      <button @click="promiseAllClick">promiseAll点击</button>
    </div>
    <div>
      <button @click="promiseRaceClick">promiseRace点击</button>
    </div>
    <div>
      <button @click="promise2Click">promise2点击</button>
    </div>
  </div>
</template>
<script>
import useChoujiang from "../hooks/useChoujiang";
import Promise from "../utils/promise";
export default {
  setup() {
    const { choujiang, choujiangFun } = useChoujiang();
    function readFile() {
      const fs = require("fs");
      fs.readFile("../hooks/usePoint.js", (err, data) => {
        if (err) throw err;
        console.log("data", data.toString());
      });
    }

    function promiseClick() {
      // const p = Promise.resolve(
      //   new Promise((resolve, reject) => {
      //     setTimeout(() => {
      //       reject("error");
      //     }, 2000);
      //   })
      // );
      // const p = new Promise((resolve, reject) => {
      //     setTimeout(() => {
      //       reject("error");
      //     }, 2000);
      //   })
      const p = Promise.resolve("555");
      console.log("pppp", p);
      p.then((value) => {
        console.log("ddd", value);
      });
    }

    function promiseRaceClick() {
      const p1 = Promise.resolve(
        new Promise((resolve) => {
          setTimeout(() => {
            resolve("ok");
          }, 1000);
        })
      );
      const p2 = Promise.resolve("ok2");
      const p3 = Promise.resolve("ok3");
      const p4 = Promise.reject("error4");

      const promiseRace = Promise.race([p1, p4, p2, p3]);
      promiseRace.then(
        (values) => {
          console.log("values", values);
        },
        (error) => {
          console.log("error", error);
        }
      );
    }

    function promise2Click() {
      // let p = new Promise((resolve,reject)=>{
      //   resolve('ok')
      // })
      // let result = p.then(value=>{
      //   return '333'
      // })
      // console.log('result',result)

      let p = new Promise((resolve, reject) => {
        // resolve('ok')
        setTimeout(() => {
          // throw "error";
          resolve("ok");
          // reject('reject')
        }, 1000);
      });
      console.log("myPromise", p);
      const pthen = p.then(
        (value) => {
          console.log("resolve", value);
        },
        (error) => {
          console.log("reject", error);
        }
      );
      console.log("pthen", pthen);
      p.then(
        (value) => {
          console.log("resolve", value);
        },
        (error) => {
          console.log("reject", error);
        }
      );
      p.catch((reason) => {
        console.log("reason", reason);
      });
    }
    function promiseAllClick() {
      const p1 = Promise.resolve("ok");
      const p2 = Promise.resolve("ok2");
      const p3 = Promise.resolve("ok3");
      const p4 = Promise.reject("error4");

      const promiseAll = Promise.all([p1, p2, p3, p4]);
      promiseAll.then(
        (values) => {
          console.log("values", values);
        },
        (error) => {
          console.log("error", error);
        }
      );
    }

    async function testAsync() {
      return "a";
    }
    const a = testAsync();
    console.log("aaaa", a);
    return {
      choujiang,
      choujiangFun,
      readFile,
      promiseClick,
      promiseAllClick,
      promiseRaceClick,
      promise2Click,
    };
  },
};
</script>
<style scoped>
</style>