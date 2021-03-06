'use strict';
// step 7: blockchain
function Blok(){
	// step 7-1:
	var html;
	var url=global_url+'blok/';
	var page=null;
	
	// step 7-4:
	function readData(){
		modul.innerHTML='Blokchain';
		metode.innerHTML='Read Data';
		btn.innerHTML='<button type="button" onclick="objModul.searchData(\'\');">Search</button>';
		msg.innerHTML='';
		app.innerHTML='Please wait...';
		const obj= {"login_blok":login_blok};
		if (page===null){
			loadXHR(url+"read_paging.php",obj,readShow);
		}
		else{
			loadXHR(page,obj,readShow);
		}
	}
	
	// step 7-5:
	function readShow(paket){
		var html;
		var x;
		let isi=[];
		let ke={};
		html='<p>Total : '+paket.count +' record.</p>';

		html+=paging(paket);
		
		html+='<table border=1 width=100%>'
			+'<tr>'
			+'<th style="display:none">Blok</th>'
			+'<th>No.</th>'
			+'<th>Hash</th>'
			+'<th>Modul</th>'
			+'<th>Metode</th>'
			+'<th>User Name</th>'
			+'<th>Date Created</th>'
			+'<th>Detail</th>'
			+'</tr>';
	    
		if (paket.err===0){
			for (x in paket.data) {
				html+='<tr>'
					+'<td>'+paket.data[x].nomer+'</td>'
					+'<td style="display:none">'+paket.data[x].blok+'</td>'
					+'<td>'+blokID(paket.data[x].blok)+'</td>'
					+'<td>'+paket.data[x].modul+'</td>'
					+'<td>'+paket.data[x].metode+'</td>'
				
					+'<td>'+paket.data[x].user_name+'</td>'
					+'<td>'+tglIna(paket.data[x].date_created)+'</td>'
					+'<td><button type="button" onclick="objModul.readOneData(\''+paket.data[x].blok+'\');">Detail</button></td>'
					+'</tr>';
			}
		}
		html+='</table>';
		app.innerHTML = html;	
	}
	
	// step 7-6:	
	function gotoPage(ini){
		page = ini;
		readData();
	}
	
	// step 7-7:
	function readOneData(blok_id){
		metode.innerHTML='Read One';
		btn.innerHTML='<button type="button" onclick="objModul.readData();">Back</button>';
		msg.innerHTML='';
		app.innerHTML='Please wait...';
		const obj = {"login_blok":login_blok,"blok":blok_id};
		loadXHR(url+"read_one.php",obj,readOneShow); 
	}
	
	// step 7-8:
	function readOneShow(batman){
		var html;
		var x;
		if (batman.err===0){
			var splt = batman.data[0].blok;
			var blok2=splt.split("-");
			var alfred = batman.data[0].json;
			var txt = '';
			
			// gunakan str.charAt(); 
			// ini detail data transaksi
			for (x =0;x<alfred.length;x++){
				if (alfred.charAt(x)=="{"){
					txt+=""+alfred.charAt(x)+"<br>&emsp;&emsp;";	
				}else if (alfred.charAt(x)==","){
					txt+=alfred.charAt(x)+"<br>&emsp;&emsp;";	
				}else if (alfred.charAt(x)=="}"){
					txt+="<br>"+alfred.charAt(x);	
				}else if (alfred.charAt(x)=="["){
					txt+="<br>"+alfred.charAt(x)+"<br>&emsp;&emsp;";	
				}else if (alfred.charAt(x)=="]"){
					txt+="<br>"+alfred.charAt(x);	
				}			
				else{
					txt+=alfred.charAt(x);	
				}
			}
			
			html='<ul>'
				+'<li><label>Hash</label>: '+blokID(batman.data[0].blok)+'</li>'
				+'<li><label>Timestamp</label>: '+timeID(batman.data[0].blok)+'</li>'
				+'<li><label>Date</label>: '+batman.data[0].tgl+'</li>'
				+'<li><label>Module</label>: '+batman.data[0].modul+'</li>'
				+'<li><label>Method</label>: '+batman.data[0].metode+'</li>'
				+'<li><label>Size</label>: '+batman.data[0].size+'</li>'
				+'<li><label>Index</label>: '+batman.data[0].indeks+'</li>'
				+'<li><label>Previous Hash</label>: '+blokID(batman.data[0].previous_blok)+'</li>'
				+'<li><label>Data</label>:<br>'+txt+'</li>' // letakkan isi data detail disini.
				+'</li>';
			app.innerHTML = html;	
		}
		else{
			msg.innerHTML = batman.msg
		}
	}
	
	// step 7-9:
	function searchData(txt){
		var html;
		metode.innerHTML='Search Data';
		btn.innerHTML='<button type="button" onclick="objModul.readData();">Back</button>';
		html='<input type="text" id="txtSearch" placeholder="Type text to search ..." value="'+txt+'" onfocus="this.select()">'
			+'<button type="button" onclick="objModul.searchExecute();">Search start</button>';
		app.innerHTML = html;	
		document.getElementById('txtSearch').focus();	
	}
	
	// step 7-10:
	function searchExecute(){
		var txt=document.getElementById('txtSearch').value;
		metode.innerHTML='Search Result';
		btn.innerHTML='<button type="button" onclick="objModul.searchData(\''+txt+'\');">Back</button>';
		app.innerHTML='Please wait ...';
		var obj = {"login_blok":login_blok,"search":txt};
		loadXHR(url+"search.php",obj,readShow); 
	}

	// step 7-11:
	readData();
	
	// step 7-12:
	this.readData=function(){
		readData();
	};
	
	// step 7-13:
	this.gotoPage=function(ini){
		gotoPage(ini);
	};
	
	// step 7-14:
	this.readOneData=function(blok_id){
		readOneData(blok_id);
	};
	
	// step 7-15:
	this.searchData=function(txt){
		searchData(txt);
	};
	
	// step 7-16:
	this.searchExecute=function(){
		searchExecute();
	};
}
