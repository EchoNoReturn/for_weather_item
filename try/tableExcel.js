
// https://github.com/Zheng-Changfu/table-exporter#8  插件地址
	import {ElMapExportTable} from "table-excel";
export const  handleExport = function(data,Base64Image,title) {
	const column = [
		{
			title: "",
			dataIndex: "",
			children: [
				{
					title: "呼叫时间", //表头名字
					dataIndex: "ed_CrateDate" //数据的kye
				},
			]
		}
	];
		const instance = new ElMapExportTable({  
				column,
				data,
				setRowStyle({ data, columnIndex, rowIndex, type }) {
							if (type === "header" && rowIndex === 0 && columnIndex === 0) {
							  return {
								height: 200,
							  };
							}
							if (type === "main") {
							  return {
								height: 30,
							  };
							}
						  },
				setWorkSheet:  ({ worksheet, sheetIndex }) => {
						const img =	worksheet.workbook.addImage({
							  base64: Base64Image,
							  extension: 'png',
						});
                                                //tl 表格开始位置
                                                //ext 格式
                                                //editAs 位置
                                               // 具体参考   https://github.com/exceljs/exceljs/blob/master/README_zh.md#图片
						worksheet.addImage(img, {
						  tl: { col: 0, row: 0 },
						  ext: { width: 1600, height: 265 },
						  editAs: 'absolute'
						});
	
				},
			},
		);
		instance.download(title + formatDate());
}


 function formatDate(){
	let date = new Date();
	let year = date.getFullYear(); // 年
	let month = date.getMonth() + 1; // 月
	let day = date.getDate(); // 日
	let hour = date.getHours(); // 时
	hour = hour < 10 ? "0" + hour : hour; // 如果只有一位，则前面补零
	let minute = date.getMinutes(); // 分
	minute = minute < 10 ? "0" + minute : minute; // 如果只有一位，则前面补零
	let second = date.getSeconds(); // 秒
	second = second < 10 ? "0" + second : second; // 如果只有一位，则前面补零
	let nowTime  = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
	return  nowTime
}
