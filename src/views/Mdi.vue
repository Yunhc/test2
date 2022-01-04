<template>
  <div>
    <!-- <app-tabs :tabList="tabList">
      <template v-slot:tabPanel-1>
        <HelloWorld msg="Welcome to Your Vue.js App"/>
      </template>
      <template v-slot:tabPanel-2>
        <QRCode/>
      </template>
      <template v-slot:tabPanel-3> <Print/> </template>
      <template v-slot:tabPanel-4> Content 4 </template>
    </app-tabs> -->

    <!-- <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'4px 10px 0px 0px', width:'70px'}"
      @click="changeComponent('QRCode')">btn1</button>
    <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'4px 10px 0px 0px', width:'70px'}"
    @click="changeComponent('HelloWorld')">btn2</button>
    <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'4px 5px 0px 0px', width:'70px'}"
    @click="changeComponent('Print')">btn3</button>

    <keep-alive>
      <component v-bind:is="comp"></component>
    </keep-alive> -->

    <button
      v-for="tab in tabs"
      :key="tab"
      :class="['mdi-tab-button', { active: currentTab===tab}]"
      @click="changeComponent(tab)"
    >
      {{ tab }}
    </button>
    <keep-alive>
      <component v-bind:is="comp" class="tab"></component>
    </keep-alive>
  </div>
</template>

<script>
import { ref } from 'vue'
import AppTabs from "../components/Tabs";
import HelloWorld from '@/components/HelloWorld.vue'
import QRCode from '@/views/QRCode.vue'
import Print from '@/views/Print.vue'

export default {
  name: 'mdi',
  components: {
    AppTabs,
    HelloWorld,
    QRCode,
    Print,
  },
  setup() {
    let comp = ref(HelloWorld);
    let currentTab = ref("HelloWorld");

    function changeComponent(componentName) {
      console.log("[Mdi] = changeComponent -- ", componentName);
      comp.value = componentName;
      currentTab.value = componentName;
      console.log("[Mdi] = currentTab -- ", currentTab.value);
    }

    return {
      tabs: ["HelloWorld", "QRCode", "Print"],
      changeComponent,
      comp,
      currentTab,
    };
  },
};
</script>
<style lang="scss">
.demo {
  font-family: sans-serif;
  border: 1px solid #eee;
  border-radius: 2px;
  padding: 20px 30px;
  margin-top: 1em;
  margin-bottom: 40px;
  user-select: none;
  overflow-x: auto;
}

.mdi-tab-button {
  padding: 6px 10px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  border: 1px solid #ccc;
  cursor: pointer;
  background: #f0f0f0;
  margin-bottom: -1px;
  margin-right: -1px;
}
.mdi-tab-button:hover {
  background: #e0e0e0;
}
.mdi-tab-button.active {
  background: #e0e0e0;
}
.demo-tab {
  border: 1px solid #ccc;
  padding: 10px;
}
</style>