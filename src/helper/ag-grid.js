
export const BoldRenderer = function (param) {
	if (param.value == undefined){
		return "";
	}
	else{
		return '<b>' + param.value + '</b>';
	}
};

export function inputNumberFormat(param) {
	if(!param.value || param.value =='') return '';
	return String(param.value).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// 합계표시 컬럼의 색변경 -> 각각의 셀별로 설정 가능 -> getRowStyle에서 한번에 변경할 수 있으므로 주석처리함
export const rowPinnedRenderer = function (params) {
	if (params.node.rowPinned) {
		return '<div style="color:red; font-weight:bold; background:transparent;">' + params.value + '</div>';
	} else {
		// rows that are not pinned don't use any cell renderer
		return params.value;
	}
};

export function autoSizeAll(skipHeader, columnApi) {
	const allColumnIds = [];
	columnApi.value.getAllColumns().forEach((column) => {
		if (column.colId != 'sel'){
			allColumnIds.push(column.colId);
		}
	});
	columnApi.value.autoSizeColumns(allColumnIds, skipHeader);
}

export function refreshAll(gridApi) {
	var params = {
		force: true,
		suppressFlash: true,
	};
	gridApi.value.refreshCells(params);
}