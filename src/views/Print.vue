<template>
  <!-- <object id=factory style="display:none" classid="clsid:1663ed61-23eb-11d2-b92f-008048fdd814" codebase="/ScriptX.cab#Version=6,1,429,14">
  </object> -->
	<div id= "printTest" class="mng" :style="{ height:'630px'}">
		<button type="button" class="btn btn-outline-dark" @click="print_window">
			print_window
		</button>
    <!-- <button type="button" class="btn btn-outline-dark" @click="print_1"> -->
    <!-- <button type="button" class="btn btn-outline-dark" v-print>
      Print the entire page
		</button> -->
    <!-- <button type="button" class="btn btn-outline-dark" v-print="'#printMe'">
			print_1
		</button> -->
    <button type="button" class="btn btn-outline-dark" v-print="printObj">
			print_1
		</button>
    <!-- <button type="button" onclick="printJs({printable: someJSONdata, properties: ['name', 'email', 'phone'], type: 'json'})"> -->
    <button type="button" class="btn btn-outline-dark" @click="print_json">
      print_json
    </button>
    <button type="button" class="btn btn-outline-dark" v-on:click="print_TextOnly">
    <!-- <button type="button" class="btn btn-outline-dark" onclick="printJS('printMe', 'html')"> -->
      Generic/Text Only
    </button>
    <div id="printMe">
        <!-- <h1>Print me!</h1> -->
        ^XA^SEE:UHANGUL.DAT^FS^CWH,E:KFONT3.FNT^FS^CI26^FS^PRE^LH005,00^FS
        ^FO805,41^AHN,26,26^FD제조일자:^FS
        ^FO54,69^AHN,39,39^FD납품처명:^FS
        ^FO54,151^AHN,39,39^FD품    명:^FS
        ^FO53,269^AHN,39,39^FD수    량:^FS
        ^FO805,180^AHN,26,26^FD원 산 국:^FS
        ^FO53,335^AHN,39,39^FD배송일자:^FS
        ^FO53,375^AHN,39,39^FD업 체 명:^FS
        ^FO805,128^AHN,34,34^FD저장 Loc:^FS
        ^FO51,415^AHN,39,39^FD상품코드:^FS
        ^FO530,270^AHN,39,39^FD차량번호^FS
        ^FO66,607^AHN,26,26^FD본 배송분류표는 식품위생법상의 고지사항과는 무관합니다.^FS
        ^FO805,9^AHN,26,26^FD2016-01-16^FS
        ^FO240,62^AHN,53,30^FD블랙스톤 창원점^FS
        ^FO240,209^AHN,39,25^FD^FS
        ^FO238,120^AHN,53,30^FDDARLINGDOWN 소꾸리살^FS
        ^FO238,170^AHN,39,30^FD(MB4이상 구이용 17.32Kg/BOX)^FS
        ^FO238,248^AHN,93,93^FD17.32KG^FS
        ^FO528,246^AHN,26,26^FD체인00더1004^FS
        ^FO530,211^AHN,39,39^FD(호주)^FS
        ^FO238,335^AHN,39,39^FD2016-01-16^FS
        ^FO530,306^AHN,111,111^FD130^FS
        ^FO238,375^AHN,39,39^FD^FS
        ^FO575,14^AHN,31,31^FDSTD^FS
        ^FO530,404^AHN,71,71^FD1/1^FS
        ^FO238,415^AHN,39,39^FD425562^FS
        ^FO805,470^AHN,79,79^FD ^FS
        ^FO54,24,150^BY2,2^BCB,40,N,N,N^FD>;4238421016027970030001732001^FS
        ^FO67,506,270^BY2,2^BC,70,N,N,N^FD4238421016027970030001732001^FS
        ^FO107,580^AHN,26,26^FD42384 2101602797 0030 001732 001 F^FS
        ^FO805,85^AHN,26,26^FD저장조건:^FS
        ^FO499,14^AHN,31,31^FD냉장^FS
        ^FO51,456^AHN,39,39^FD특이사항:^FS
        ^FO238,456^AHN,39,39^FD^FS
        ^FO640,35^BQN,2,6^FDQA,1234567890^FS
        ^FO420,380^BQN,2,4^FDQA,1234567890^FS
        ^XZ

        <!-- ^XA
        ^FXTest ZPL^FS
        ^FO50,100
        ^A0N,89^FDHello ZPL WAVELINK^FS
        ^XZ -->
    </div>
    <div>
      <div>
        <button type="button" class="btn btn-outline-dark" @click="print_list">
          print_List
        </button>
      </div>
      <ul class="print-ul">
        <li v-for="(item,index) of items" :key="index"
          :id="'printDiv' + index" style="page-break-after:always;">
          <div>
            <p>{{item.remark}}</p>
            <p>{{item.date}}</p>
            <p>{{item.name + '(' + item.group + ')'}}</p>
          </div>
        </li>
      </ul>
    </div>
	</div>
</template>

<script>
// import * as printJs from 'print-js';
// import * as print_css from 'print-js/dist/print.css'

import printJs from 'print-js';
import * as print_css from 'print-js/dist/print.css';

// import java.io.BufferedReader;
// import java.io.ByteArrayInputStream;
// import java.io.IOException;
// import java.io.InputStream;
// import java.io.InputStreamReader;
// import javax.print.Doc;
// import javax.print.DocFlavor;
// import javax.print.DocPrintJob;
// import javax.print.PrintException;
// import javax.print.PrintService;
// import javax.print.PrintServiceLookup;
// import javax.print.SimpleDoc;


export default {
  name: 'print',
	data(){
    return {
      commands : '^XA\n\r^MNM\n\r^FO050,50\n\r^B8N,100,Y,N\n\r^FD1234567\n\r^FS\n\r^PQ3\n\r^XZ',
			items: [
        { date: '2019-01-01', name: '홍길동', item: '회비', group: '1기', amt: '30,000', remark: '2019 1월 회비'},
        { date: '2019-01-01', name: '김영일', item: '회비', group: '3기', amt: '30,000', remark: '2019 1월 회비'},
        { date: '2019-01-02', name: '전도일', item: '회비', group: '5기', amt: '30,000', remark: '2019 1월 회비'},
        { date: '2019-02-03', name: '박상도', item: '회비', group: '6기', amt: '30,000', remark: '2019 1월 회비'}
      ],
      someJSONdata : [
        {
          name: 'John Doe',
          email: 'john@doe.com',
          phone: '111-111-1111'
        },
        {
          name: 'Barry Allen',
          email: 'barry@flash.com',
          phone: '222-222-2222'
        },
        {
          name: 'Cool Dude',
          email: 'cool@dude.com',
          phone: '333-333-3333'
        }
      ],
      printObj: {
        // url: 'http://localhost:8080/',
        id:'printMe',
        preview: false,
        previewPrintBtnLabel:'인쇄',
        previewTitle: '인쇄 미리 보기', // The title of the preview window. The default is 打印预览
        popTitle: 'Print Test',
        previewBeforeOpenCallback () {
          console.log('previewBeforeOpenCallback')
        },
        previewOpenCallback () {
          console.log('previewOpenCallback')
        },
        beforeOpenCallback () {
          console.log('beforeOpenCallback')
        },
        openCallback () {
          console.log('openCallback')
        },
        closeCallback () {
          console.log('closeCallback')
        }
      },
    }
  },
  components :{
    // printJs,
    // print_css,
  },
	methods : {
		print_window(){
      window.print();
		},
    print_1() {
      // import java.io.BufferedReader;
      // import java.io.ByteArrayInputStream;
      // import java.io.IOException;
      // import java.io.InputStream;
      // import java.io.InputStreamReader;
      // import javax.print.Doc;
      // import javax.print.DocFlavor;
      // import javax.print.DocPrintJob;
      // import javax.print.PrintException;
      // import javax.print.PrintService;
      // import javax.print.PrintServiceLookup;
      // import javax.print.SimpleDoc;

      // pservice = printservicelookup.lookupPrintServices(null, null);//acquire print service of your printer

      // PrintService pservice = PrintServiceLookup.lookupPrintServices(null, null);//acquire print service of your printer
      // DocPrintJob job= pservice.createPrintJob();
      // String commands= "^XA\n\r^MNM\n\r^FO050,50\n\r^B8N,100,Y,N\n\r^FD1234567\n\r^FS\n\r^PQ3\n\r^XZ";
      // DocFlavor flavor= DocFlavor.BYTE_ARRAY.AUTOSENSE;
      // Doc doc= new SimpleDoc(commands.getBytes(), flavor, null);
      // job.print(doc, null);

      print();
    },
    print_driver : function (){
      // PrintService pservice = PrintServiceLookup.lookupPrintServices(null, null);//acquire print service of your printer
      // DocPrintJob job= pservice.createPrintJob();
      // DocFlavor flavor= DocFlavor.BYTE_ARRAY.AUTOSENSE;
      // Doc doc= new SimpleDoc(this.commands.getBytes(), flavor, null);
      // job.print(doc, null);
    },
    print_json() {
      printJs({
      printable: this.items,
      properties: [
        {field: 'date', displayName: '날짜'},
        {field: 'item', displayName: '항목'},
        {field: 'name', displayName: '이름'},
        {field: 'group', displayName: '기수'},
        {field: 'amt', displayName: '금액'},
        {field: 'remark', displayName: '비고'}
      ],
      type: 'json'});
    },
    print_TextOnly() {
      printJs({
        printable: "printMe",       //Id to print content
        type: "html",               //You can print html, img details can be found in the official document https://printjs.crabbly.com/
        style: print_css.printcss,  //The printed content does not have css style, here need string type css style
      });
    },
    print_list() {
      // console.log("1111");
      var newWin = window.open("");// 새로운 빈 창을 엽니 다
      for (var i = 0; i < this.items.length; i++) {
        var imageToPrint = document.getElementById("printDiv" + i); // 인쇄하는 데 필요한 콘텐츠를
        newWin.document.write(imageToPrint.outerHTML);// 컨텐츠를 추가하면 새 창에 인쇄해야
      }
      const styleSheet = '<style>li{list-style==none; border: 1px solid #e8e8e8;}</style>';
      newWin.document.head.innerHTML = styleSheet;
      newWin.document.close();
      newWin.focus();
      setTimeout(function() {
        newWin.print();//인쇄
        newWin.close();//창을 닫습니다
      }, 100);
    }
	}
}
</script>
<style>
  .print-ul {
    width: 600px;
    list-style: none;
    border: 1px solid #e8e8e8;
  }
</style>