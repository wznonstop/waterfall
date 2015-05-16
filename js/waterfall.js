window.onload = function(){
	waterfall("main","box");
	window.onscroll = function(){
		var request;
		if (window.XMLHttpRequest) {
			request = new XMLHttpRequest();
		}else{
			request = new ActiveXObject("Microsoft XMLHTTP");
		}
		request.open("GET","waterfall.json");
		request.send();
		request.onreadystatechange = function(){
			if (request.readyState == 4 && request.status == 200) {
				var dataInt = JSON.parse(request.responseText);
				console.log(typeof dataInt);
				console.log(dataInt);
				var chk = check();
				if (chk) {
					for(var i = 0, len = dataInt.data.length; i < len; i++){
						var box = document.createElement("div");
						box.className = "box";
						document.getElementById("main").appendChild(box);
						var pic = document.createElement("div");
						pic.className = "pic";
						box.appendChild(pic);
						var img = document.createElement("img");
						img.src = "img/"+dataInt.data[i].src;
						pic.appendChild(img);
					}
					console.log(getByClass("main","box").length);
					waterfall("main","box");
				};
			};
		}
	}
}

function check(){
	var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
	var clientH = document.body.clientHeight || document.documentElement.clientHeight;
	var oBoxs = getByClass("main","box");
	var checkH = oBoxs[oBoxs.length-1].offsetTop + oBoxs[oBoxs.length-1].offsetHeight/2;
	return (checkH < scrollTop + clientH)?true:false;
}

function waterfall(Parent,className){
	var oParent = document.getElementById(Parent);
	var oBoxs = getByClass(Parent,className);
	var oBoxW = oBoxs[0].offsetWidth;

	//获取每行的列数
	var cols=Math.floor(document.documentElement.clientWidth/oBoxW);

	//注意此处cssText的写法，后面是字符串，不是带括号的函数
	oParent.style.cssText="width:"+oBoxW*cols+"px;margin:0 auto";

	//存储每列的高的数组
	var hArr = [];
	for(var i = 0,len = oBoxs.length; i < len; i++){
		var oBoxH = oBoxs[i].offsetHeight;
		if (i<cols) {
			hArr.push(oBoxH);
		}else{
			var minH = Math.min.apply(null,hArr);
			var index = getByIndex(hArr,minH);
			oBoxs[i].style.position = "absolute";
			oBoxs[i].style.top = minH+"px";
			oBoxs[i].style.left = oBoxs[index].offsetLeft+"px";
			hArr[index] += oBoxH;
		}
	}

}

//通过具体元素获取其在数组中的索引
function getByIndex(arr,val){
	for(var i = 0, len = arr.length; i < len; i++){
		if (arr[i]==val) {
			return i;
		};
	}
}

//通过class获取元素
function getByClass(oParent,clsName){
	var oParent = document.getElementById(oParent);
	var classArr =[];
	var tagArr = oParent.getElementsByTagName("*");
	for(var i = 0, len = tagArr.length; i < len; i++){
		if (tagArr[i].className==clsName) {
			classArr.push(tagArr[i]);
		};
	}
	return classArr;
}