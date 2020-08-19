// App Step 14: object-oriented
'use strict';
var global_url='https://datablok.id/v0/';

// function 01
function loadXHR(url,obj,callback){
	var request = new XMLHttpRequest();
	var dbParam = JSON.stringify(obj);

	request.onload=function(){		
		if (request.readyState===4){
			var paket = JSON.parse(request.responseText);
			// alert(paket.msg);
			callback(paket);
		}
		else {
			console.log('Network request failed with response ' + request.status + ': ' + request.statusText)
		}
	};
	request.open('POST', url);
	request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	request.send(dbParam);
}

// function 02
function blokID (blok){
	var blokend = blok;
	var blokend3 = blokend.split("-");
	return blokend3[2];
}

// function 03
function tglIna(tgl){
	var bulan = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nop", "Des"];
	return tgl.substr(8,2)+'-'+bulan[parseInt(tgl.substr(5,2))]+'-'+tgl.substr(2,2) +' ' +tgl.substr(11,5);
}

// function 04
function timeID(blok){
	var blokend = blok;
	var blokend3 = blokend.split("-");
	return blokend3[0];
}	

// function 05
function pleaseWait(){
	return "Please wait ...";
}

// function 06
function paging(paket){
	var html='';
	var x;
	if (paket.err===0){
		if (metode.innerHTML=="Read Data"){
			if (paket.paging.first!=""){
				html+= '<button type="button" onclick="objModul.gotoPage(\''+paket.paging.first+'\')">First</button>';
			}
			for (x in paket.paging.pages) {			
				if (paket.paging.pages[x].current_page=="yes"){
					html+= '<button type="button" onclick="objModul.gotoPage(\''+paket.paging.pages[x].url+'\')" disabled >'+paket.paging.pages[x].page +'</button>';	
				} else {
					html+= '<button type="button" onclick="objModul.gotoPage(\''+paket.paging.pages[x].url+'\')">'+paket.paging.pages[x].page+'</button>';	
				}
			}
			if (paket.paging.last!=""){
				html+='<button type="button" onclick="objModul.gotoPage(\''+paket.paging.last+'\')">Last</button>';
			}
		}
	}	
	return html;
}

// function 07
function tglInaFull(tgl){
	var bulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "Nopember", "Desember"];
	return tgl.substr(8,2)+' '+bulan[parseInt(tgl.substr(5,2))-1]+' '+tgl.substr(0,4) ;
}

// function 08
function formatSerebuan(num) {
	if (num===null){num=0;}
	if (num<0){
		return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
	}else{
		return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
	}
}

// function 09: format tanggal 
function tglIna2(tgl){
	var bulan = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nop", "Des"];
	return tgl.substr(8,2)+'-'+bulan[parseInt(tgl.substr(5,2))-1]+'-'+tgl.substr(2,2) ;
}

// function 10: tampilkan halaman input dan tombol untuk membuat data baru. 
function tglSekarang(){
	var n=new Date();
	var tglskrng=n.getFullYear()+"-"+("0"+parseInt(n.getMonth()+1)).slice(-2)+"-"+("0"+n.getDate()).slice(-2);
	return tglskrng;
}	
	
// function 11:
function load_modul(modul){
	sessionStorage.setItem("modul",modul);
	location.reload();
}


