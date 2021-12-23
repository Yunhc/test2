<template>
  <div>  
    <slot name= "forFirst" :fromHeader="title"></slot>
    <p> first</p>      
    <slot name= "forSecond"></slot>
    <p> second </p>
    <slot></slot>
    <p> third </p>      
  <br>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title : 'Vue.js study~'
    }
  },
}
</script>

