'use strict';
// step 3: logout
function Logout(){
	// step 3.1
	var html;
	
	// step 3.3:
	function init(){
		var paket=data_login;
		if (login_blok_master===null){
			html='<button onclick="objModul.logoutCreate();">Log out</button>';
			modul.innerHTML='User Login';
			metode.innerHTML='Home';
			msg.innerHTML='Klik tombol logout untuk keluar';
		}
		else{
			html='<button onclick="objModul.switchCreate();">Switch to my home</button>';
			modul.innerHTML=paket.data[0].company_name ;
			metode.innerHTML='Join Folder';
			msg.innerHTML='Klik tombol switch to my home,<br>untuk kembali ke folder pribadi.';
		}
		btn.innerHTML=html;
		
		html='<ul>'
			+'<li><label>Login Blok (ID)</label>: '+login_blok+'</li>'
			+'<li><label>User Blok (ID)</label>: '+paket.data[0].user_blok+'</li>'
			+'<li><label>User Name</label>: '+paket.data[0].user_name+'</li>'
			+'<li><label>Full Name</label>: '+paket.data[0].user_fullname+'</li>'
			+'<li><h2>Company</h2></li>'
			+'<li><label>Company Name</label>: '+paket.data[0].company_name+'</li>'
			+'<li><label>Owner/Home</label>: '+paket.data[0].admin_name+'</li>'
			+'</ul>';
		app.innerHTML=html;
	}
	
	// step 3.4:
	function logoutCreate(){
		msg.innerHTML=pleaseWait();
		var obj={"login_blok":login_blok}
		loadXHR(global_url+'logout/create.php',obj,logoutMessage);
		
		// step 3.5:
		function logoutMessage(paket){
			if (paket.err===0){
				sessionStorage.removeItem('login_blok');
				location.reload();
			}
			else{
				msg.innerHTML=paket.msg;
			}
		}
	}

	// step 3.6:
	function switchCreate(){
		msg.innerHTML=pleaseWait();
		sessionStorage.setItem("login_blok",login_blok_master);
		var obj={"login_blok":login_blok};
		loadXHR(global_url+'logout/create.php',obj,switchMessage);

		// step 3.7:
		function switchMessage(paket){
			if (paket.err == 0){
				load_modul('logout');
				// location.reload(); //kembali ke master	
			}
			else{
				msg.innerHTML = paket.msg;	
			}
		}
	}
	
	// step 3.8:
	init();
	
	// step 3.9:
	this.logoutCreate=function(){
		logoutCreate();
	};
	
	// step 3.10:
	this.switchCreate=function(){
		switchCreate();
	};


}
