'use strict';
// step 1: register
function Register(){
	// step 1.1:
	var html;
	var url=global_url+'administrator/';
	
	// step 0: HTML
	function formulir(){
		menu.style.display='none';
		metode.style.display='none';
		modul.innerHTML='Register';
		
		html='<ul>'
		+'<li>'
		+'<label for="user_name">User Name:</label>'
		+'<input type="text" id="user_name">'
		+'</li>'
		+'<li>'
		+'<label for="user_fullname">Full Name:</label>'
		+'<input type="text" id="user_fullname">'
		+'</li>'
		+'<li>'
		+'<label for="user_password">Password:</label>'
		+'<input type="password" id="user_password">'
		+'</li>'
		+'<li>'
		+'<label for="confirm_password">Confirm Password:</label>'
		+'<input type="password" id="confirm_password">'
		+'</li>'
		+'<li>'
		+'<label for="passcode_image">Passcode:</label>'
		+'<img src="https://datablok.id/v0/passcode/xyzimg.php" id="passcode_image" border=1>'
		+'</li>'
		+'<li>	'
		+'<label for="user_passcode">Retype Passcode:</label>'
		+'<input type="text" id="user_passcode">'
		+'</li>'
		+'</ul>'
		+'</form>';
		
		app.innerHTML=html;
		
		html='<button id="button_register" onclick="objModul.createData();">Submit</button>'
			+'<button id="button_login" onclick="load_modul(\'login\');">Log in</button>'
		btn.innerHTML=html;
		
		var user_name=document.getElementById("user_name");
		var user_fullname=document.getElementById("user_fullname");
		var user_password=document.getElementById("user_password");
		var confirm_password=document.getElementById("confirm_password");
		var passcode_image=document.getElementById("passcode_image");
		var user_passcode=document.getElementById("user_passcode");
		
		// step 1.2:
		user_name.focus();
	}
	
	// step 1.3:
	function createData(){
		if (button_register.innerHTML == "Reset"){
			location.replace(location.href);
		}
		msg.innerHTML=pleaseWait();
		const obj = {
			"home_folder":null,
			"user_name":user_name.value,
			"user_fullname":user_fullname.value,
			"user_password":user_password.value,
			"confirm_password":confirm_password.value,
			"user_passcode":user_passcode.value
		};

		loadXHR(url+'create.php',obj,createShow);
	}

	// step 1.4:
	function createShow(paket){
		if (paket.err==0){
			button_register.innerHTML = "Reset";
		}
		msg.innerHTML = "Message: "+paket.msg;
	}
	
	// step 1.5:
	formulir();
	
	// step 1.6:
	this.createData=function (){
		createData();
	};
	
}
