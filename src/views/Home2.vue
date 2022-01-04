<template>
  <div class="home" :style="{ height:'800px'}">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue3.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home2',
  components: {
    HelloWorld
  }
}
</script>
