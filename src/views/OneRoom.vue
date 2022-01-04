<template>

  <div :style="{ height:'790px', margin:'2px 0px 0px 0px'}">
  <!-- <div v-scroll:#room="handleScroll" :style="{ height:'680px'}"> -->
    <div class="black-bg" v-if="popupisopen">
      <div class="white-bg">
        <h4>상세페이지임</h4>
        <P>상세페이지 내용임</P>
        <button @click="popupisopen=false">닫기</button>
      </div>
    </div>
    <div class="room-menu">
      <a class="menu-btn" v-for="(menu, i) in menus" :key="i">{{ menu }}</a>
    </div>
    <h4>원룸샵</h4>
    <ul
      ref="notification-list"
      class="list"
      @scroll="handleNotificationListScroll"
    >
      <div v-for="(pro, i) in onerooms" :key="i">
        <img :src="onerooms[i].image" class="room-img">
        <h4 >{{onerooms[i].title}}</h4>
        <p>{{onerooms[i].price}} 만원</p>
      </div>
    </ul>
  </div>
</template>
<script>
import data from '../assets/oneroom.js';

export default {
  name: 'room',
  data(){
    return {
      price1 : 50,
      price2 : 60,
      price3 : 70,
      menus : ['Home', 'Shop', 'About'],
      products : ['역삼동원룸', '천호동원룸', '마포구원룸'],
      onerooms : data,
      count : [0, 0, 0],
      popupisopen : false,
      scrollPostion : 0,
    }
  },
  methods : {
    increase(i){
      this.count[i]++;
    },
    // 무한 스크롤 정의
    handleNotificationListScroll(e) {
      const { scrollHeight, scrollTop, clientHeight } = e.target;
      const isAtTheBottom = scrollHeight === scrollTop + clientHeight;
      // 일정 한도 밑으로 내려오면 함수 실행
      if (isAtTheBottom) this.handleLoadMore();
    },
    // 내려오면 api 호출하여 아래에 더 추가, total값 최대이면 호출 안함
    handleLoadMore() {
      if (this.notifications.length < this.total) {
        const params = {
          limit: this.params.limit,
          page: this.params.page + 1
        };
        this.$store.commit(
          "notification/SET_PARAMS",
          this.filterValue ? { ...params, type: this.filterValue } : params
        );
        this.dispatchGetNotifications(false);
      }
    },
    // 스크롤을 맨위로 올리고 싶을 때
    handleClickTitle() {
      this.$refs["notification-list"].scroll({ top: 0, behavior: "smooth" });
    },
    // 새로고침
    handleClickRefresh() {
      this.$refs["notification-list"].scroll({ top: 0 });
      this.dispatchGetNotifications(true);
    },
    // 처음 렌더링시 이전 알림 불러오기 or reset=true시 새로고침, false시 이전 목록에 추가
    dispatchGetNotifications(reset) {
      this.$store.dispatch("notification/getNotifications", reset);
    },

  },
  components: {
    // HelloWorld
  }
}
</script>

<style>
body{
  margin : 0
}
div{
  box-sizing: border-box;
}
.black-bg{
  width: 100%; height: 100%;
  background: rgba(0,0,0,0.5);
  position: fixed; padding: 20px;
}
.white-bg{
  width: 100%;
  background: white;
  border-radius: 8px;
  padding: 20px;
}
.room-img{
  width:  259px;
  height: 194px;
  margin-top: 40px;
}

#room {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}

.list {
  /* height: calc(50vh - 70px); */
  height: 700px;
  overflow: auto;
}

.room-menu{
  background: darkslateblue;
  padding: 15px;
  border-radius: 5px;
}
.menu-btn {
  color:white;
  padding: 10px;
}
</style>
