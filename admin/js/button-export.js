var ExportButton = {
		exportCsv:function (tableId, formId, eliminateCol){
			var titles = "";
			var datas = "";
			$('#'+tableId+' tr').each(function(idx){
				var $this = $(this);
				if(idx == 0){
					$this.find('th').each(function(idxth){
						if(idxth >= eliminateCol){
							var $thisTh = $(this);
							if(titles != ''){
								titles = titles + '|' + ExportButton.filterHtmlTag($thisTh.html());
							} else {
								titles += ExportButton.filterHtmlTag($thisTh.html());
							}
						}
					});
				} else {
					var allTd = "";
					$this.find('td').each(function(idxtd){
						if(idxtd >= eliminateCol){
							var $thisTd = $(this);
							if(allTd != ''){
								allTd = allTd + '|' + ExportButton.filterHtmlTag($thisTd.html());
							} else {
								allTd = allTd + ExportButton.filterHtmlTag($thisTd.html());
							}
						}
					});
					if(datas != ''){
						datas += "><" + allTd;
					}else{
						datas += allTd;
					}
				}
			});
			if(titles != '' && datas != '') {
				$('#'+formId+' input[name="exportTitle"]').val(titles);
				$('#'+formId+' input[name="exportData"]').val(datas);
				$('#'+formId).submit();
			} else {
				alert("导出数据为空或格式不正确");
			}
		},
		filterHtmlTag:function (str) {
			str = str.replace(/<\/?[^>]*>/g,''); //去除HTML tag
			str = str.replace(/(^\s*)|(\s*$)/g, "");//去空格;
	        str = str.replace(/\n[\s| | ]*\r/g,'\n');//去除空行
			str = str.replace(/	/g,'');//去tab;
			str = str.replace(/\n/g,';');//注意：最后换行替换为“;”;
	        return str;
		}
};