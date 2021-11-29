import { reactive } from 'vue'

export default function() {
  const choujiang = reactive({
    value: null,
    result: '',
  })
  function rand(m, n) {
    return Math.ceil(Math.random() * (n - m + 1)) + m - 1;
  }

  function choujiangFun(){
    const p = new Promise((resolve, reject) => {
      setTimeout(() => {
        const n = rand(1, 100);
        if (n < 30) {
          resolve(n);
        } else {
          reject(n);
        }
      }, 1000);
    });
    p.then(
      (value) => {
        console.log("中奖了", value);
        choujiang.value = value
        choujiang.result = '中奖了'
      },
      (reason) => {
        console.log("继续加油", reason);
        choujiang.value = reason
        choujiang.result = '继续加油'
      }
    );
  }
  
  return {
    choujiang,
    choujiangFun
  }
}
