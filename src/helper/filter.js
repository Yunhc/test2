// 스트링 처리를 한다.
export function getdata (data){
	let rtn = "";
	if (data != null){
		var npos1 = data.indexOf("[",0);
		var npos2 = data.indexOf("]",0);
		if (npos1 > -1 && npos2 > -1){
			rtn = data.substring(npos1 + 1, npos2 )
		}
		else{
			rtn = data;
		}
	}
	return rtn;
}