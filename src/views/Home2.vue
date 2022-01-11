<template>
  <div class="home"
    :style="{
      'height': `calc(${window_height - 110}px)`
    }"
  >
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue3.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { ref, onMounted, onUnmounted } from 'vue'

export default {
  name: 'home2',
  components: {
    HelloWorld
  },
  setup(){
    let window_width = ref(window.innerWidth);
    let window_height = ref(window.innerHeight);

    onMounted(() => {
      console.log("[Home2] = ", "onMounted--");
      window.addEventListener('resize', handleResize);
    });

    onUnmounted(() =>{
      console.log("[Home2] = onUnmounted -- ");
      window.removeEventListener('resize', handleResize);
    });

    function handleResize() {
      window_width.value = window.innerWidth;
      window_height.value = window.innerHeight;
    }

    return{
      window_width,
      window_height,
    };
  }
}
</script>
