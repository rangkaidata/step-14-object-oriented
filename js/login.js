'use strict';
// step 2: login
function Login(){
	// step 2.1:
	var html;
	var url=global_url+'login/';
	var user_name;
	var user_password;

	// step : HTML
	function formulir(){
		menu.style.display='none';
		sub_menu.style.display='none';
		metode.style.display='none';
		
		modul.innerHTML='Login';
		html='<button onclick="objLogin.createData();">Login</button>'
			+'<button onclick="gotoRegister();">Register</button>'
			+'<button onclick="gotoForgot();">Forgot</button>';
		btn.innerHTML=html;
		html='<form autocomplete="off">'
			+'<ul>'
			+'<li><label>User Name</label> : '
			+'<input type="text" id="user_name">'
			+'<li><label>Password</label> : '
			+'<input type="password" id="user_password">'
			+'</ul>'
			+'</form>';
		app.innerHTML=html;
		
		user_name=document.getElementById('user_name');
		user_password=document.getElementById('user_password');
		user_name.focus();
	}
	
	// step 2.3:
	function createData(){
		msg.innerHTML=pleaseWait();
		var obj={
			"user_name":user_name.value,
			"user_password":user_password.value
		};
		loadXHR(url+'create.php',obj,createMessage);
	}
	
	// step 2.4:
	function createMessage(paket){
		if (paket.length==0){
			return messageBar('Server tidak terdapat API');
		}
		if (paket.err==0){
			sessionStorage.setItem("login_blok", paket.data.login_blok);
			sessionStorage.setItem("modul",'home');
			location.reload();
		}
		else{
			msg.innerHTML=paket.msg;
	    }
	}

	// global function	
	this.createData=function(){
		createData();
	}

	// initialize
	formulir();
}

function gotoRegister(){
	load_modul('register');
}

function gotoForgot(){
	alert('forgot');
}
