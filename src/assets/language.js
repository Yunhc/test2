var login = {
	lblUserID: {kr: "사용자ID", en: "User ID"},
	lblPassword:{kr: "비밀번호", en: "Password"},
	lblCheckID:{kr: "사용자ID 저장", en: "Save User ID"},
	lblLogin:{kr: "로그인", en: "Sing on"},
}

var mainheader = {
	lblTitle:{kr: "Dongwha | WMS", en: "Dongwha | WMS"},
	lblLogout:{kr: "로그아웃", en: "Sing off"},
}

var menupopup = {
	M000:{kr: "시스템 관리", en:"System Management"},
	M100:{kr: "기준정보 관리", en:"Master Data"},
	M200:{kr: "오더 관리", en:"Order Information System"},
	M250:{kr: "라벨 발행이력", en:"Label Print History"},
	M251:{kr: "자재라벨 발행", en:"Material Label print"},
	M252:{kr: "제품/상품라벨 발행", en:"FGs & Goods Label print"},
	M300:{kr: "입/출고 현황", en:"Goods Issue & receipt List"},
	M500:{kr: "재고정보", en:"Stock Overview"},
	M510:{kr: "로케이션 관리", en:"Location Management"},
	M520:{kr: "재고실사", en:"Stock Count"},
	M550:{kr: "품질 관리", en:"Quality Management"},
	M600:{kr: "품질 검사 관리", en:"Quality Inspection Management"},
	M900:{kr: "R/3 인터페이스", en:"R/3 SAP Interface"},
	M950:{kr: "생산실적", en:"Production Management"},
	M960:{kr: "강화마루 Tool 관리", en:""},
	M980:{kr: "MOBILE", en:"MOBILe"},
}

var usermanagement = {
	lblUserID: {kr: "사용자ID", en: "User ID"},
	lblUserName:{kr: "사용자명", en: "User Name"},
	lblUseFlag:{kr: "사용유무", en: "Usage"},
	lblSearch:{kr: "조회", en: "Display"},
	lblAdd:{kr: "추가", en: "Add"},
	lblDelete:{kr: "삭제", en: "Delete"},
	lblSave:{kr: "저장", en: "Save"},
	lblClose:{kr: "종료", en: "Close"},
	grid1:[
		{name:{kr: "선택", en: "Select"}},
		{name:{kr: "사용자ID", en: "User ID"}},
		{name:{kr: "사용자명", en: "User Name"}},
		{name:{kr: "패스워드", en: "Password"}},
		{name:{kr: "플랜트", en: "Plant"}},
		{name:{kr: "작업장", en: "Workcenter"}},
		{name:{kr: "창고", en: "Warehouse"}},
		{name:{kr: "조회그룹", en: "Display group"}},
		{name:{kr: "Role", en: "Role"}},
		{name:{kr: "Use Role", en: "Use Role"}},
		{name:{kr: "사용유무", en: "Usage"}},
		{name:{kr: "지게차 번호", en: "Forklift NO."}},
		{name:{kr: "비고", en: "Etc"}},
		{name:{kr: "수정자", en: "Changed by"}},
		{name:{kr: "수정일", en: "Changed on"}},
	]
}

var message = {
	lblNotice:{kr: "알림", en: "Notice"},
	lblLogoutMsg:{kr: "로그아웃 하시겠습니까?", en: "Do you want to sing off?"},
}

export default {
	message,
	login,
	mainheader,
	menupopup,
	usermanagement,
}