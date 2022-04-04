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

var master_company = {
	lblCompanyID: {kr: "회사코드", en: "Company ID"},
	lblCompanyName:{kr: "회사명", en: "Company Name"},
	lblUseFlag:{kr: "사용유무", en: "Usage"},
	lblSearch:{kr: "조회", en: "Display"},
	lblAdd:{kr: "추가", en: "Add"},
	lblDelete:{kr: "삭제", en: "Delete"},
	lblSave:{kr: "저장", en: "Save"},
	lblClose:{kr: "종료", en: "Close"},
	grid1:[
		{name:{kr: "선택", en: "Select"}},
		{name:{kr: "회사코드", en: "Company ID"}},
		{name:{kr: "회사명", en: "Company Name"}},
		{name:{kr: "사용유무", en: "Usage"}},
		{name:{kr: "수정자", en: "Changed by"}},
		{name:{kr: "수정일", en: "Changed on"}},
	]
}

var master_material = {
	lblMatnr: {kr: "자재코드", en: "Material Code"},
	lblMaktx:{kr: "자재명", en: "Material Name"},
	lblMtart:{kr: "자재그룹", en: "Material Group"},
	lblUseFlag:{kr: "사용유무", en: "Usage"},
	lblSearch:{kr: "조회", en: "Display"},
	lblAdd:{kr: "추가", en: "Add"},
	lblDelete:{kr: "삭제", en: "Delete"},
	lblSave:{kr: "저장", en: "Save"},
	lblClose:{kr: "종료", en: "Close"},
	grid1:[
		{name:{kr: "선택", en: "Select"}},
		{name:{kr: "자재코드", en: "Material Code"}},
		{name:{kr: "자재유형", en: "Material Type"}},
		{name:{kr: "자재그룹", en: "Material Group"}},
		{name:{kr: "자재내역", en: "Material Disc."}},
		{name:{kr: "기존자재", en: "Old Material"}},
		{name:{kr: "기본단위", en: "Meins"}},
		{name:{kr: "등급", en: "Grade"}},
		{name:{kr: "사용유무", en: "Usage"}},
		{name:{kr: "수정자", en: "Changed by"}},
		{name:{kr: "수정일", en: "Changed on"}},
	]
}

var management_purchase_order = {
	lblMatnr: {kr: "자재코드", en: "Material Code"},
	lblMaktx:{kr: "자재명", en: "Material Name"},
	lblMtart:{kr: "자재그룹", en: "Material Group"},
	lblUseFlag:{kr: "사용유무", en: "Usage"},
	lblSearch:{kr: "조회", en: "Display"},
	lblAdd:{kr: "추가", en: "Add"},
	lblDelete:{kr: "삭제", en: "Delete"},
	lblSave:{kr: "저장", en: "Save"},
	lblClose:{kr: "종료", en: "Close"},
	grid1:[
		{name:{kr: "선택", en: "Select"}},
		{name:{kr: "자재코드", en: "Material Code"}},
		{name:{kr: "자재유형", en: "Material Type"}},
		{name:{kr: "자재그룹", en: "Material Group"}},
		{name:{kr: "자재내역", en: "Material Disc."}},
		{name:{kr: "기존자재", en: "Old Material"}},
		{name:{kr: "기본단위", en: "Meins"}},
		{name:{kr: "등급", en: "Grade"}},
		{name:{kr: "사용유무", en: "Usage"}},
		{name:{kr: "수정자", en: "Changed by"}},
		{name:{kr: "수정일", en: "Changed on"}},
	]
}

var quality_scrap = {
	titleBarNo: {kr: "바코드", en: "Barcode"},
	titleStatus:{kr: "재고상태", en: "Status"},
	titleMatnr:{kr: "자재코드", en: "Material"},
	lblMaktx:{kr: "자재 상세내역을 표시합니다.", en: "Display the material description."},
	titleQty:{kr: "수량", en: "Quantity"},
	lblSend:{kr: "전송", en: "Send"},
	lblDelete:{kr: "삭제", en: "Delete"},
	lblClear:{kr: "초기화", en: "Clear"},
	lblClose:{kr: "종료", en: "Close"},
	grid1:[
		// {name:{kr: "", en: ""}},
		{name:{kr: "선택", en: "Sel"}},
		{name:{kr: "바코드", en: "Barcode"}},
		{name:{kr: "재고상태", en: "Status"}},
		{name:{kr: "처리유형", en: "Proc. Type"}},
		{name:{kr: "라벨유형", en: "Label Type"}},
		{name:{kr: "수량", en: "Quantity"}},
		{name:{kr: "단위", en: "Unit"}},
		{name:{kr: "자재코드", en: "Material"}},
		{name:{kr: "자재명", en: "Material Description"}},
		{name:{kr: "그룹바코드", en: "Group Barcode"}},
		{name:{kr: "낱박스존재", en: "Box Barcode Existence"}},
		{name:{kr: "플랜트", en: "Plant"}},
		{name:{kr: "작업장", en: "Workcenter"}},		
		{name:{kr: "저장위치", en: "Stor. Loc"}},
		{name:{kr: "S/O 번호", en: "S/O No"}},
		{name:{kr: "S/O 품번", en: "S/O Item"}},
		{name:{kr: "이전바코드", en: "Pre Barcode"}},
		{name:{kr: "이전자재코드", en: "Pre Material"}},
		{name:{kr: "D/O 번호", en: "D/O No"}},
		{name:{kr: "D/O 품번", en: "D/O Item"}},
		{name:{kr: "Lot 번호", en: "Lot No"}},
		{name:{kr: "생산일자", en: "Prod. Date"}},
		{name:{kr: "LPM전면(내)", en: "LPM_FO"}},
		{name:{kr: "LPM전면(외)", en: "LPM_FI"}},
		{name:{kr: "LPM후면(내)", en: "LPM_BO"}},
		{name:{kr: "LPM후면(외)", en: "LPM_BI"}},
		{name:{kr: "경면판(전)", en: "Plate_F"}},
		{name:{kr: "경면판(후)", en: "Plate_B"}},
	]
}

var message = {
	lblNotice:{kr: "알림", en: "Notice"},
	lblLogoutMsg:{kr: "로그아웃 하시겠습니까?", en: "Do you want to sing off?"},

	msg_search:{kr: "조회되었습니다.", en: "Inquiry has been made."},
	msg_noinfo:{kr: "조회된 데이터가 없습니다.", en: "There is no data inquired."},
	msg_delete:{kr: "선택한 바코드가 삭제되었습니다.", en: "The selected barcode has been deleted."},
	msg_clear:{kr: "데이터가 초기화되었습니다.", en: "The data has been initialized."},
	msg_success:{kr: "정상 처리되었습니다.", en: "It has been processed normally."},
	msg_fail:{kr: "에러가 발생하였습니다.", en: "An error has occurred."},

	msg_que1:{kr: "전송하시겠습니까?", en: "Do you want to send it?"},
	msg_que2:{kr: "선택한 바코드를 삭제하시겠습니까?", en: "Are you sure you want to delete the selected barcode?"},
	msg_que3:{kr: "모든 데이터를 초기화하시겠습니까? \n전송하지 않은 데이터는 삭제됩니다.", 
						en: "Do you want to initialize all data? \nThe data that was not sent will be deleted."},
	msg_que4:{kr: "종료하시겠습니까? \n전송하지 않은 데이터는 삭제됩니다.", 
						en: "Do you want to end it? \nThe data that was not sent will be deleted."},						

	msg_war1:{kr: "전송할 데이터가 없습니다. 먼저 바코드를 스캔 후 전송하세요.",
						en: "There is no data to transfer. First, scan the barcode and send it."},
	msg_war2:{kr: "삭제할 바코드를 선택하세요.", en: "Please select the barcode you want to delete."},
	msg_war3:{kr: "삭제할 데이터가 없습니다.", en: "There is no data to delete."},

	msg_err1:{kr: "그룹바코드가 이미 스캔되었습니다.", en: "The group barcode has already been scanned."},
	msg_err2:{kr: "유효하지 않은 바코드번호입니다.", en: "Invalid barcode number."},
	msg_err3:{kr: "이미 스캔한 바코드입니다.", en: "This is a barcode that has already been scanned."},
	msg_err4:{kr: "그룹에 속한 낱바코드가 이미 스캔되었습니다.", en: "The barcode belonging to the group has already been scanned."},
	


}

export default {
	message,
	login,
	mainheader,
	menupopup,
	usermanagement,
	master_company,
	master_material,
	management_purchase_order,
}