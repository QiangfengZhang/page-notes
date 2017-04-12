/**
 *  张强锋编写，2017-04-04
 *  利用Chrome浏览器的localStorage（仅能存储字符串）存储键入的标签内容 
 */

window.onload = function () {
	init();
	changeBg();
	btnDelete();
}

function init() {
	var btnAdd = document.getElementById( "btn_1" );
	btnAdd.onclick = createNote;// 给 button 绑定点击添加事件	
	for ( var i = 0; i < localStorage.length; i++ ) {
		var key = localStorage.key( i );
		addNoteToDom( localStorage.getItem( key ) );
		// if ( key.substring( 0, 4 ) == "note" ) {
		// 	var value = localStorage.getItem( key );//  取出localStorage 中的数据
		// 	addNoteToDom( value );
		// }
	}
}

function btnDelete() {
	var btnDelete = document.getElementById( "btn_2" );
	btnDelete.onclick = function() {
		localStorage.clear();// 清除浏览器 localStorage 中的所有数据
		window.location.reload();// 刷新页面
	}
}

function changeBg() {
	var bg = document.getElementById( "img_bg" );
	bg.src = "image/bg_" + parseInt( Math.random()*4 ) + ".jpg";
	setTimeout( changeBg, 3000 );// 函数每 3 秒自调用 1 次，随机改变背景颜色
}

function createNote() {
	var text = document.getElementById( "text_note" ).value,// text 输入的便签内容
		key = "note" + localStorage.length;// text 存储在 localStorage 的键名	
	if ( text == "" ) {
		alert("键入便签内容不能为空");
	}else {
		localStorage.setItem( key, text );// 将 text 存储在 localStorage 中
		addNoteToDom( text );
	}	
}

function addNoteToDom( value ) {
	var stickies = document.getElementById( "note" ),
		sticky = document.createElement( "li" );
	sticky.setAttribute( "class", "li_note");
	noteTransform( sticky );
	setNoteColor( sticky );
	var span = document.createElement( "span" );
	span.setAttribute( "class", "span_note");
	span.innerHTML = value;
	sticky.appendChild( span );
	stickies.appendChild( sticky );
}

function noteTransform( note ) {
	var myRotate = "rotate("+parseInt((Math.random()*100)%15-15)+"deg)";
	note.style.transform = myRotate;
}

function setNoteColor( note ) {
	var strColor = [
        "rgba(219,112,147,0.75)",
        "rgba(169,169,169,0.75)",
        "rgba(255,165,0,0.75)",
        "rgba(95,158,160,0.75)",
        "rgba(255,192,203,0.75)"];
    var length = strColor.length;
    var myColor = strColor[parseInt(Math.random()*5)];
    note.style.backgroundColor = myColor;
}