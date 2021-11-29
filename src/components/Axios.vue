<template>
  <div>
    <h1>Axios学习</h1>
    <button @click="getRequest">发送GET请求</button>
    <button @click="cancelRequest">取消GET请求</button>
    <button @click="postRequest">发送POST请求</button>
    <button @click="putRequest">发送PUT请求</button>
    <button @click="deleteRequest">发送DELETE请求</button>
  </div>
</template>
<script>
import axios from "axios";
export default {
  setup() {
    //这个很好，可以配置很多不同的项目，一个项目中可以通过这样来配置不同的默认参数
    let cancel = null;
    const defaultAxios = axios.create({
      method: "GET",
      baseURL: "http://localhost:3000",
      timeout: 3000,
    });
    defaultAxios.interceptors.request.use(
      function (conifg) {
        console.log("conifg-1", conifg);
        return conifg;
      },
      function (error) {
        return Promise.reject(error);
      }
    );
    defaultAxios.interceptors.request.use(
      function (conifg) {
        console.log("conifg-2", conifg);
        return conifg;
      },
      function (error) {
        return Promise.reject(error);
      }
    );
    defaultAxios.interceptors.response.use(
      function (response) {
        console.log("response-1", response);
        const { data, status } = response;
        return data;
      },
      function (error) {
        return Promise.reject(error);
      }
    );
    defaultAxios.interceptors.response.use(
      function (response) {
        console.log("response-2", response);
        return response;
      },
      function (error) {
        return Promise.reject(error);
      }
    );
    async function getRequest() {
      const result = await defaultAxios({
        url: "/posts",
        cancelToken: new axios.CancelToken(function (c) {
          cancel = c;
        }),
      });
      console.log("getReques", result);
    }
    function cancelRequest() {
      cancel();
    }
    async function postRequest() {
      const result = await axios({
        method: "POST",
        url: "http://localhost:3000/posts",
        data: { title: "天气很好", author: "thomas" },
      });
      console.log("postRequest", result);
    }
    async function putRequest() {
      const result = await axios({
        method: "PUT",
        url: "http://localhost:3000/posts/2",
        data: { title: "天气很好!!!!", author: "thomas" },
      });
      console.log("putRequest", result);
    }
    async function deleteRequest() {
      const result = await axios({
        method: "DELETE",
        url: "http://localhost:3000/posts/2",
      });
      console.log("deleteRequest", result);
    }

    console.log("a", a);
    let a = "a";
    return {
      getRequest,
      postRequest,
      putRequest,
      deleteRequest,
      cancelRequest,
    };
  },
};
</script>
<style scoped>
</style>