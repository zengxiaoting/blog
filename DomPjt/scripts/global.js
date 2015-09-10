function addLoadEvent(fnc){
	var oldonload = window.onload;
	if(typeof window.onload!="function"){
		window.onload = fnc;
	}else{
		window.onload = function(){
			oldonload();
			fnc();
		}
	}
}
function insertAfter(newElement,targetElement){
	var parent = targetElement.parentNode;
	if(parent.lastChild == targetElement){
		parent.appendChild(newElement);
	}else{
		parent.insertBefore(newElement,targetElement.nextSibling);
	}
}
function addClass(element,value){
	if(!element.className){
		element.className = value;
	}else{
		newClassName = element.className;
		newClassName += " ";
		newClassName += value;
		element.className = newClassName;
	}
}
function highlightPage(){
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById) return false;
	var headers = document.getElementsByTagName("header");
	if(headers.length == 0) return false;
	var navs = headers[0].getElementsByTagName("nav");
	if(navs.length == 0) return false;
	var links = navs[0].getElementsByTagName("a");
	var linkurl;
	for(var i=0;i<links.length;i++){
		linkurl = links[i].getAttribute("href");
		if(window.location.href.indexOf(linkurl)!=-1){
			addClass(links[i],"here");
			var linktext = links[i].lastChild.nodeValue.toLowerCase();
			document.body.setAttribute("id",linktext);
		}
	}
}
function moveElement(elementID,final_x,final_y,interval){
	if(!document.getElementById) return false;
	if(!document.getElementById(elementID)) return false;
	var elem = document.getElementById(elementID);
	if (elem.movement){
		clearTimeout(elem.movement);
	}
	if(!elem.style.left){
		elem.style.left = "0px";
	}
	if(!elem.style.top){
		elem.style.top = "0px";
	}
	var xpos = parseInt(elem.style.left);
	var ypos = parseInt(elem.style.top);
	if(xpos == final_x && xpos == final_y){
		return true;
	}
	if(xpos < final_x){
		var dist = Math.ceil((final_x-xpos)/10);
		xpos += dist;
	}
	if(xpos > final_x){
		var dist = Math.ceil((xpos-final_x)/10);
		xpos -= dist;
	}
	if(ypos < final_y){
		var dist = Math.ceil((final_y-ypos)/10);
		ypos += dist;
	}
	if(ypos > final_y){
		var dist = Math.ceil((ypos - final_y)/10);
		ypos -= dist;
	}
	elem.style.left = xpos + "px";
	elem.style.top = ypos + "px";
	var repeat = "moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
	elem.movement = setTimeout(repeat,interval);
}
function prepareSlideshow(){
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById) return false;
	if(!document.getElementById("intro")) return false;
	var intro = document.getElementById("intro");
	var slideshow = document.createElement("div");
	slideshow.setAttribute("id","slideshow");

	var frame = document.createElement("img");
	frame.setAttribute("src","images/frame.gif");
	frame.setAttribute("alt","");
	frame.setAttribute("id","frame");
	slideshow.appendChild(frame);

	var preview = document.createElement("img");
	preview.setAttribute("src","images/slideshow.gif");
	preview.setAttribute("alt","a glimpse of what awaaits you");
	preview.setAttribute("id","preview");
	slideshow.appendChild(preview);
	insertAfter(slideshow,intro);
	var links = document.getElementsByTagName("a");
	var destination;
	for(var i=0;i<links.length;i++){
		links[i].onmouseover = function(){
			destination = this.getAttribute("href");
			if(destination.indexOf("index.html")!=-1){
				moveElement("preview",0,0,5);
			}
			if(destination.indexOf("about.html")!=-1){
				moveElement("preview",-150,0,5);
			}
			if(destination.indexOf("photos.html")!=-1){
				moveElement("preview",-300,0,5);
			}
			if(destination.indexOf("live.html")!=-1){
				moveElement("preview",-450,0,5);
			}
			if(destination.indexOf("contact.html")!=-1){
				moveElement("preview",-600,0,5);
			}
		}
	}

}
function showSection(id){
	var sections = document.getElementsByTagName("section");
	for(var i=0;i<sections.length;i++){
		if(sections[i].getAttribute("id")==id){
			sections[i].style.display = "block";
		}
		else{
			sections[i].style.display = "none";
		}
	}
}
function prepareInternalnav(){
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById) return false;
	var articles = document.getElementsByTagName("article");
	if(articles.length==0) return false;
	var navs = articles[0].getElementsByTagName("nav");
	if(navs.length == 0) return false;
	var nav = navs[0];
	var links = nav.getElementsByTagName("a");
	for(var i=0;i<links.length;i++){
		var sectionId = links[i].getAttribute("href").split("#")[1];
		if(!document.getElementById(sectionId)) continue;
		document.getElementById(sectionId).style.display = "none";
		links[i].destination = sectionId;
		links[i].onclick = function(){
			showSection(this.destination);
			return false;
		}
	} 
}
function preparePlaceholder(){
	if(!document.getElementById) return false;
	if(!document.createElement) return false;
	if(!document.createTextNode) return false;
	if(!document.getElementById("imagegallery")) return false;
	var gallery = document.getElementById("imagegallery");
	var placeholder = document.createElement("img")
	placeholder.setAttribute("id","placeholder");
	placeholder.setAttribute("src","images/placeholder.gif");
	placeholder.setAttribute("alt","Gallery");
	var description = document.createElement("p");
	description.setAttribute("id","description");
	var describe = document.createTextNode("Click the Picture to show It");
	description.appendChild(describe);
	var gallery = document.getElementById("imagegallery");
	insertAfter(description,gallery);
	insertAfter(placeholder,description);
}
function showpic(whicpic){
	if(!document.getElementById("placeholder")) return false;
	var source = whicpic.getAttribute("href");
	var placeholder = document.getElementById("placeholder");
	placeholder.setAttribute("src",source);
	if(!document.getElementById("description")) return false;
	if(whicpic.getAttribute("title")){
		document.getElementById("description").firstChild.nodeValue = whicpic.getAttribute("title");
	}else{
		document.getElementById("description").firstChild.nodeValue = "";
	}
	return false;
}
function prepareGallery(){
	if(!document.getElementById) return false;
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById("imagegallery")) return false;
	var gallery = document.getElementById("imagegallery");
	var links = gallery.getElementsByTagName("a");
	for(var i=0;i<links.length;i++){
		links[i].onclick=function(){
			return showpic(this);
		}
	}
}
function highlightRows(){
	if(!document.getElementsByTagName) return false;
	var trs = document.getElementsByTagName("tr");
	for(var i=0;i<trs.length;i++){
		trs[i].oldClassName = trs[i].className;	
		trs[i].onmouseover = function(){
			var oldClass = trs.className;
			addClass(this,"highlight");
		}
		trs[i].onmouseout = function(){
			this.className = this.oldClassName;
		}
	}
}
function displayAbbreviations(){
	if(!document.getElementsByTagName || !document.createElement || !document.createTextNode) return false;
	var abbreviations = document.getElementsByTagName("abbr");
	var defs = new Array();
	for(var i =0;i<abbreviations.length;i++){
		var current_abbr = abbreviations[i];
		if (current_abbr.childNodes.length<1) continue;
		var definition = current_abbr.getAttribute("title");
		var key = current_abbr.lastChild.nodeValue;
		defs[key] = definition;
	}
	var dlist = document.createElement("dl");
	for(key in defs){
		var definition = defs[key];
		var dtitle = document.createElement("dt");
		var dtitle_text = document.createTextNode(key);
		dtitle.appendChild(dtitle_text);
		var ddesc = document.createElement("dd");
		var ddesc_text = document.createTextNode(defs[key]);
		ddesc.appendChild(ddesc_text);
		dlist.appendChild(dtitle);
		dlist.appendChild(ddesc);
	}
	if(dlist.childNodes.length<1) return false;
	var header = document.createElement("h3");
	var header_text = document.createTextNode("Abbreviations");
	header.appendChild(header_text);
	var articles = document.getElementsByTagName("article");
	if(articles.length == 0)return false;
	var container = articles[0];
	container.appendChild(header);
	container.appendChild(dlist);
}
function focuslabel(){
	if(!document.getElementsByTagName || !document.getElementById) return false;
	var labels = document.getElementsByTagName("label");
	for(var i=0;i<labels.length;i++){
		var foc = labels[i].getAttribute("for");
		if(!document.getElementById(foc)) return false;
		labels[i].onclick = function(){
			var ele = document.getElementById(foc);
			ele.focus();
		}
	}
}
function displayAjaxLoading(element){
	while(element.hasChildNodes()){
		element.removeChild(element.lastChild);
	}
	var content = document.createElement("img");
	content.setAttribute("src","images/loading.gif");
	content.setAttribute("alt","Loading..");
	element.appendChild(content);
}
function submitFormWithAjax(whicform,thetarget){
	var request;
	if(window.ActiveXObject){
		request = new ActiveXObject("Microsoft.XMLHTTP");
	}else if(window.XMLHttpRequest){
		request = new XMLHttpRequest();
	}else{ return false;}
	displayAjaxLoading(thetarget);
	var dataParas = [];
	var element;
	for(var i=0;i<whicform.elements;i++){
		element = whicform.elements[i];
		dataParas[i] = element.name + '=' + encodeURIComponent(element.value);
	}
	var data = dataParas.join("&");
	request.open("post",whicform.getAttribute("action"),true);
	request.setRequestHeader("Content-type","application/x-www-form-urlencode");
	request.onreadystatechange = function(){
		alert(789);
		if(request.readyState == 4){
			if(request.status == 200 || request.status==0){
				alert(1);
				var matches = request.responseText.match(/<article>([\s\S+])<\/article>/);
				if(matches.length>0){
					thetarget.innerHTML = matches[1];
				}else{
					thetarget.innerHTML = "<p>Oops,there was an error!Sorry</p>";
				}
			}else{
				thetarget.innerHTML = request.statusText;
			}
		}
	}
	request.send(data);
		alert(thetarget.innerHTML);
	return true;
}
function prepareForms(){
	for(var i=0;i<document.forms.length;i++){
		var thisform = document.forms[i];
		thisform.onsubmit = function(){
			var article = document.getElementsByTagName("article")[0];
			if(submitFormWithAjax(this,article)) return false;
			return false;
		}
	}
}

var provinceList = [
{name:'Beijing', cityList:[         
{name:'市辖区', areaList:['东城区','西城区','崇文区','宣武区','朝阳区','丰台区','石景山区','海淀区','门头沟区','房山区','通州区','顺义区','昌平区','大兴区','怀柔区','平谷区']},
{name:'县', areaList:['密云县','延庆县']}
]},
{name:'Guangdong', cityList:[         
{name:'市辖区', areaList:['黄浦区','卢湾区','徐汇区','长宁区','静安区','普陀区','闸北区','虹口区','杨浦区','闵行区','宝山区','金山区','松江区','青浦区','南汇区','奉贤区']},   
{name:'县', areaList:['崇明县']}
]}
];
function provinceChange(){
	if(!document.getElementById("Province")) return false;
	province = document.getElementById("Province");
	city = document.getElementById("City");
	province.onchange = function(){
		provinceName = province.options[province.selectedIndex].getAttribute("value");
		for(var i=0;i<provinceList.length;i++){
			if(provinceList[i].name!=provinceName) continue;
			else{
				citys = provinceList[i].cityList[0].areaList;
				city.options.length=0;
				for(var j=0;j<citys.length;j++){
					var option = document.createElement("option");
					option.setAttribute("value",citys[j]);
					option.innerHTML = citys[j];
					city.appendChild(option);
				}
				
			}
		}
		return true;
	}
}



addLoadEvent(highlightPage);
addLoadEvent(prepareSlideshow);
addLoadEvent(prepareInternalnav);
addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);
addLoadEvent(highlightRows);
addLoadEvent(displayAbbreviations);
addLoadEvent(focuslabel);
addLoadEvent(provinceChange);
addLoadEvent(prepareForms);