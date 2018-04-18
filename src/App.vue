<template>
  <div id="app">
    <input v-model="pic" placeholder="请输入可访问的图片url">
    <button @click="showImg">测试</button>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      pic: '',
    };
  },
  methods: {
    showImg() {
      this.$showImgView(this.pic);
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  input {
    width: 80%;
    height: 30px;
    border-radius: 5px;
    line-height: 30px;
    border: 1px solid #5a5a5a;
  }
}

h1,
h2 {
  font-weight: normal;
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
