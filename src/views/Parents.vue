<template>
  <div :style="{ height:'630px'}">
    <h1>About page</h1>
    <Child>      
      <template v-slot:forFirst="props">
        <p>Here is the first {{props.fromHeader}} </p>
      </template>
      <template #forSecond>
        <p>Here is the second</p>
        <HelloWorld/>
      </template>
      <template >
        <p>Here is the third</p>
      </template>
    </Child>
    <!-- <Child>
      <h1>111</h1>
      <slolt></slolt>
      <h1>222</h1>
    </Child> -->
  </div>
</template>
<script> 
  import Child from './Child.vue' 
  import HelloWorld from '@/components/HelloWorld.vue'

  export default { 
    components: {
      Child,
      HelloWorld,
    }, 
    data: function() { 
      return { 
        AA: "안녕하세요", 
        BB: "반갑습니다." 
      } 
    } 
  } 
</script>

