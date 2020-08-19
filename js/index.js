'use strict';
// step i.1:
var login_blok=sessionStorage.getItem('login_blok');
var login_blok_master=null;
var modul_aktif=sessionStorage.getItem('modul');
var data_login;
var modul=document.getElementById('modul');
var metode=document.getElementById('metode');
var msg=document.getElementById('msg');
var btn=document.getElementById('btn');
var menu=document.getElementById('menu');
var sub_menu=document.getElementById('sub_menu');
var list_menu;
var global_url='https://datablok.id/v0/';
var global_url_image='https://rangkaidata.com/image/';

var objHome;
var objModul;
var objPop;
var objLogin;

// step XX.2: 
function loginRead(){
	var url=global_url+'login/';
	var obj={"login_blok":login_blok}
	loadXHR(url+'read.php',obj,readMessage);

	// step XX.3: 
	function readMessage(paket){
		if (paket.err===0){
			// step XX.3.1: 
			sudahLogin(paket);
		}
		else{
			// step XX.3.2: 
			belumLogin(paket);
		}
	}
}

// step XX.3.1: 
function sudahLogin(paket){
	data_login=paket;
	if (paket.data[0].login_blok_master!=''){
		login_blok_master=paket.data[0].login_blok_master;
	}
	else{
		// nothing else
	}	
	objHome=new Home();
}

// step XX.3.2: 
function belumLogin(paket){
	msg.innerHTML='';		
	if (paket.err===24){
		login_expired_form(paket);
	}
	else{
		sessionStorage.removeItem('login_blok');
		if (modul_aktif==='register'){
			objModul=new Register();
		}
		else{
			objLogin=new Login();
		}
	}
}

// step XX.4: 
function goto_modul(modula){
	modul.innerHTML=modula;
	switch(modula){
		case 'logout':
			// step-3
			objModul=new Logout();
			break;
		case 'home':
			// step-4
			objModul=new Homepage();
			break;
			
		case 'user_profile': 
			// step-5
			objModul=new UserProfile();
			break;
		
		case 'blok': 
			// step-6
			objModul=new Blok();
			break;
		
		case 'notes': 
			// step-7
			objModul=new Notes();
			break;
			
		case 'default': 
			// step-8
			objModul=new Default();
			break;
			
		case 'company':
			// step-9
			objModul=new Company();
			break;			
			
		case 'company_profile': 
			// step-10
			objModul=new CompanyProfile();
			break;

		case 'accounts': 
			// step-11
			objModul=new Accounts();
			break;

		case 'manage_users': 
			// step-12
			objModul=new ManageUser();
			break;
			
		case 'join_user': 
			// step-13
			objModul=new JoinUser();
			break;
		default:
	}
}

// step XX.5: 
function login_expired_form(paket){
	msg.innerHTML=paket.msg;
	modul.innerHTML='Login Expired';
	metode.style.display='none';
	menu.style.display='none';
	btn.style.display='none';
	app.style.display='none';
}

// end.
