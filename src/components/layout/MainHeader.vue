<template>
  <div class="header">
    <div align="left" class="left-box">
      <p :style="{ margin:'8px 0 0 10px'}">
        Dongwha | WMS
      </p>
    </div>
    <div align="right" class="right-box">
      <button type="button" class="btn btn-outline-dark btn-sm"
        :style="{ margin:'3px', background:'rgb(31, 156, 93)', border:'rgb(31, 156, 93)', color:'white'}">
        Logout
      </button>
    </div>
  </div>
</template>
<script>
  export default{
    name:"header"
  };
</script>

<style lang="scss">
  .header{
    // background:rgb(31, 156, 93);
    height:40px;
    text-align:center;
    font-size:16px;
    // color:#41b883;
    color:white;
    // border-bottom:1px solid #070707;
  }
  .left-box {
    background:rgb(31, 156, 93);
    border-bottom:1px solid #35495e;
    // background:white;
    float: left;
    width: 50%;
    height: 38px;
  }
  .right-box {
    background:rgb(31, 156, 93);
    // background: white;
    float: right;
    width: 50%;
    height: 38px;
  }
</style>
