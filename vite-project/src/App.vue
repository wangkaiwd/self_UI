<template>
  <div class="app">
    <h3>vue3 vite ts</h3>
    <h4>{{ todos.result?.name }}</h4>
    <h3>{{ count }}</h3>
    <hello-world :info="info"></hello-world>
  </div>
</template>

<script lang="ts">

import { defineComponent, reactive, ref, watchEffect } from 'vue';
import HelloWorld, { IInfo } from './components/hello-world.vue';

interface IResult {
  id: number;
  name: string;
  completed: boolean; 
}

interface TodoProps {
  result: null | IResult
}

export default defineComponent({
  name: 'App',
  components: { HelloWorld },
  setup () {
    const todos = reactive<TodoProps>({ result: null });
    const info = reactive<IInfo>({ age: 10, name: 'AXXf1u' });
    const count = ref<number>(0);
    count.value.toFixed();
    // watchEffect(() => {
    //   // why log count not trigger page update
    //   console.log('count', count.value);
    // });
    setInterval(() => {
      count.value++;
    }, 1000);
    return {
      todos,
      count,
      info
    };
  }
});
</script>

<style lang="less" scoped>
</style>
