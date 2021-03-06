'use strict';

// step-9: company
function Company(){
	// step 9.1. deklarasi variabel
	var html;
	var page;
	var url=global_url+'company/';
	
	// step 9.4. meminta ke server, data paging company list
	function readData(){
		modul.innerHTML='Company';	
		metode.innerHTML='Read Data';	
		app.innerHTML=pleaseWait();
		html='<button type="button" id="btn_create" onclick="objModul.createData();">Create New</button>'
			+'<button type="button" id="btn_search" onclick="objModul.searchData(\'\');">Search</button>';
		btn.innerHTML=html;	
		const obj= {"login_blok":login_blok};
		if (page===undefined){
			loadXHR(url+"read_paging.php",obj,readShow);
		}
		else{
			loadXHR(page,obj,readShow);
		}
	}
	
	// step 9.5. menerima data dari server. lalu diproses untuk ditampilkan ke layar
	function readShow(paket){
		var x;
		msg.innerHTML='';
		html ='<p>Total: '+paket.count+' rows</p>'
		if (paket.err===0){
			if (metode.innerHTML=="Read Data"){
				if (paket.paging.first!=""){
					html+= '<button type="button" onclick="gotoPage(\''+paket.paging.first+'\')">First</button>';
				}
				for (x in paket.paging.pages) {			
					if (paket.paging.pages[x].current_page=="yes"){
						html+= '<button type="button" onclick="gotoPage(\''+paket.paging.pages[x].url+'\')" disabled >'+paket.paging.pages[x].page +'</button>';	
					} else {
						html+= '<button type="button" onclick="gotoPage(\''+paket.paging.pages[x].url+'\')">'+paket.paging.pages[x].page+'</button>';	
					}
				}
				if (paket.paging.last!=""){
					html+='<button type="button" onclick="gotoPage(\''+paket.paging.last+'\')">Last</button>';
				}
			}
		}
		
		html+='<table border=1>'
			+'<th style="display:none">Blok</th>'
			+'<th>No.</th>'
			+'<th>Image</th>'
			+'<th>Company Name</th>'
			+'<th>Address</th>'
			+'<th>Start Date</th>'
			+'<th>User Name</th>'
			+'<th>Date Created</th>'
			+'<th colspan=3>Action</th>';

		if (paket.err===0){
			for (x in paket.data) {
				html+='<tr>'
					+'<td>'+paket.data[x].nomer+'</td>'
					+'<td><img style="height:60px;width:60px;" src='+global_url_image+'uploads/'+paket.data[x].company_logo+'></td>'
					+'<td>'+paket.data[x].company_name+'</td>'
					+'<td>'+paket.data[x].company_address+'</td>'
					+'<td>'+tglIna2(paket.data[x].company_sdate)+'</td>'
				
					+'<td>'+paket.data[x].user_name+'</td>'
					+'<td>'+tglIna(paket.data[x].date_created)+'</td>'
					+'<td><input type="button" value="Delete" onclick="objModul.deleteData(\''+paket.data[x].company_blok+'\');"></td>'
					+'<td><input type="button" value="Update" onclick="objModul.updateData(\''+paket.data[x].company_blok+'\');"></td>'
					+'<td><input type="button" value="Open" onclick="objModul.openFolder(\''+paket.data[x].company_blok+'\');"></td>'
					+'</tr>';
			}
		}
		html+='</table>';
		app.innerHTML=html;
	}

	// step 9.6. mempersiapkan formulir. untuk input data, atau tampilkan isi data.
	function formulir(){
		html='<form autocomplete="off">'
			+'<span style="display:inline-block;">'
			+'<ul>'
			+'<li><label>Company Name</label>: <input type="text" id="company_name"></li>'
			+'<li><label>Address</label>: <input type="text" id="company_address"></li>'
			+'<li><label>Telephone</label>: <input type="text" id="company_telephone"></li>'
			+'<li><label>Fax</label>: <input type="text" id="company_fax"></li>'
			+'<li><label>Email</label>: <input type="text" id="company_email"></li>'
			+'<li><label>Start Date</label>: <input type="date" id="company_sdate"></li>'
			+'</ul>'
			+'</span>'

			+'<span style="display:inline-block;">'
			+'<input type="file" name="fileToUpload" id="fileToUpload" accept="image/*" onchange="loadFile(event)">'
			+'<p><img id="folder_image" width="150" height="150"/ src='+global_url_image+"uploads/no_image.jpg"+'></p>'
			+'<input type="text" id="name_image" value="no_image.jpg" disabled class="b-text" hidden>' 
			+'<button type="button" onclick="noImage()">No image</button></p>'
			+'</span>'
			+'</form>';
		app.innerHTML=html;				
		document.getElementById('company_sdate').value = tglSekarang();
		document.getElementById('company_name').focus();
	}

	// 9.07. tampilkan halaman input dan tombol untuk membuat data baru. 
	function createData(){
		metode.innerHTML="Create Data";
		html='<button type="button" id="btn_back" onclick="objModul.readData();">Back</button>'
			+'<button type="button" id="btn_save" onclick="objModul.createExecute();">Save</button>'
			+'<button type="button" id="btn_new" onclick="objModul.createData();" style="display:none;">New</button>'
		btn.innerHTML=html;
		msg.innerHTML='';
		formulir();
	}

	// 9.08. mengirim data ke server. Data inputan untuk membuat data baru.
	function createExecute(){
		msg.innerHTML=pleaseWait();
		const obj = {
			"login_blok":login_blok
			,"company_name":document.getElementById("company_name").value
			,"company_address":document.getElementById("company_address").value
			,"company_telephone":document.getElementById("company_telephone").value
			,"company_fax":document.getElementById("company_fax").value
			,"company_email":document.getElementById("company_email").value
			,"company_sdate":document.getElementById("company_sdate").value
			,"company_logo":document.getElementById("fileToUpload").value
		};
		loadXHR(url+"create.php",obj,createMessage); 
	}

	// 9.09. menerima pesan dari server. Hasil proses pembuatan data baru.
	// untuk melihat apakah ada error atau tidak.
	function createMessage(paket){
		if (paket.err===0){
			document.getElementById("btn_save").style.display="none";
			document.getElementById("btn_new").style.display="inline";
			uploadImageChange(paket);
		}
		msg.innerHTML=paket.msg;
	}
	
	// 9.10. meminta ke server satu data detil, dengan paramenter nomer blok.
	function readOneData(blok){
		app.innerHTML=pleaseWait();
		const obj={
			"login_blok":login_blok,
			"company_blok":blok
		};
		loadXHR(url+"read_one.php",obj,readOneShow); 	
	}

	// 9.11. menerima paket data dari server. lalu tampilkan ke layar user.
	function readOneShow(hope){
		formulir();
		if (hope.err==0) {
			document.getElementById('company_name').value=hope.data[0].company_name;
			document.getElementById('company_address').value=hope.data[0].company_address;
			document.getElementById('company_telephone').value=hope.data[0].company_telephone;
			document.getElementById('company_fax').value=hope.data[0].company_fax;
			document.getElementById('company_email').value=hope.data[0].company_email;
			document.getElementById('company_sdate').value=hope.data[0].company_sdate;
			
			document.getElementById("folder_image").src = global_url_image+"uploads/"+hope.data[0].company_logo;
			document.getElementById("name_image").value = hope.data[0].company_logo;

		}else{
			msg.innerHTML=hope.msg;
		}
	}

	// 9.12. tampilkan data ke layar. Data yang akan dihapus.
	function deleteData(blok_id){
		metode.innerHTML="Delete Data";	
		html='<button type="button" id="btn_back" onclick="objModul.readData();">Back</button>'
			+'<button type="button" id="btn_continue" onclick="objModul.deleteExecute(\''+blok_id+'\');">Continue</button>';
		btn.innerHTML=html;
		msg.innerHTML='';
		readOneData(blok_id)
	}

	// 9.13. mengirim data ke server. Data yang akan dihapus berdasarkan parameter nomer blok.
	function deleteExecute(blok_id){
		msg.innerHTML=pleaseWait();
		var obj = {
			"login_blok":login_blok,
			"company_blok":blok_id
		};			
		loadXHR(url+"delete.php",obj,deleteMessage); 
	}
	
	/* step-9.14. 
	 * menerima data pesan dari server. 
	 * apakah proses hapus berhasil atau ada error. 
	 */ 
	function deleteMessage(groot){
		if (groot.err==0){
			document.getElementById("btn_continue").disabled = true;
		}
		msg.innerHTML=groot.msg;
	}
	
	/* step-9.15. 
	 * tampilkan data ke layar. Data yang akan diupdate. 
	 */ 
	function updateData(blok_id){
		metode.innerHTML="Update Data";	
		html='<button type="button" id="btn_back" onclick="objModul.readData();">Back</button>'
			+'<button type="button" id="btn_save" onclick="objModul.updateExecute(\''+blok_id+'\');">Save</button>';
		btn.innerHTML=html;
		msg.innerHTML='';
		readOneData(blok_id);
	}
	
	/* step-9.16. 
	 * mengirim data ke server. 
	 * data yang akan diupdate berdasarkan paramenter nomer blok id.
	 */
	function updateExecute(blok_id){
		msg.innerHTML=pleaseWait();
		const obj = {
			"login_blok":login_blok
			,"company_blok":blok_id
			,"company_name":document.getElementById("company_name").value
			,"company_address":document.getElementById("company_address").value
			,"company_telephone":document.getElementById("company_telephone").value
			,"company_fax":document.getElementById("company_fax").value
			,"company_email":document.getElementById("company_email").value
			,"company_logo":document.getElementById("fileToUpload").value
			,"name_image":document.getElementById("name_image").value
		};
		loadXHR(url+"update.php",obj,updateMessage); 		
	}

	/* step-9.17
	 * menerima data pesan dari server. 
	 * apakah proses update berhasil atau ada error.
	 */ 
	function updateMessage(groot){
		if (groot.err==0){
			document.getElementById("btn_save").disabled=true;
			uploadImageChange(groot);
		}
		msg.innerHTML=groot.msg;
	}
	
	/* step-9.18
	 * tampilkan halaman search ke layar.
	 */ 
	function searchData(txt){
		metode.innerHTML='Search Data';
		msg.innerHTML='';
		
		html='<button type="button" id="btn_back" onclick="objModul.readData();">Back</button>';
		btn.innerHTML=html;
		
		html='<input type="text" value="'+txt+'" id="txt_search" placeholder="Type text to search ..." onfocus="this.select();">'
			+'<button type="button" id="btn_search" onclick="objModul.searchExecute();">Search Start</button>';
		app.innerHTML=html;
		document.getElementById('txt_search').focus();
	}
	
	/* step-9.19
	 * mengirim data ke server. data text yang akan di proses.
	 */ 
	function searchExecute(){
		metode.innerHTML='Search Result';
		const txt=document.getElementById('txt_search').value;
		
		html ='<button type="button" id="btn_back" onclick="objModul.searchData(\''+txt+'\');">Back</button>';
		btn.innerHTML=html;
		app.innerHTML=pleaseWait();

		const obj={
			"login_blok":login_blok,
			"search":txt}
		loadXHR(url+"search.php",obj,readShow);
	}

	// step 9.20: fungsi untuk pindah ke halaman. ketika nomer halaman diklik.
	function gotoPage(ini){
		page=ini;
		readData();
	}

	
	/* step-9.21
	 * mengirim data ke server. 
	 * meminta server untuk membuka folder company berdasarkan parameter blok id.
	 */ 
	function openFolder(blok_id){
		msg.innerHTML=pleaseWait();
		const obj={
			"login_blok":login_blok,
			"company_blok":blok_id
		};
		loadXHR(url+"open.php",obj,openMessage); 
	}
	
	/* step-9.22
	 * menerima data dari server.
	 * apakah proses permintaan open folder berhasil atau ada error.
	 */ 
	function openMessage(paket){
		// alert(paket.msg);
		if (paket.err==0) {				
			// location.reload();
			// window.location.href="home.html";
			load_modul('company_profile');
		}else{
			msg.innerHTML=paket.msg;		
		}
	}
	
	// step 9.23: initialize;
	readData();
	
	// deklarai fungsi dari private ke publik, agar bisa diakses di halaman utama.
	// step 9.24:
	this.createData=function(){
		createData();
	};
	
	// step 9.25:
	this.createExecute=function(){
		createExecute();
	};
	
	// step 9.26:
	this.readData=function(){
		readData();
	};
	
	// step 9.27:
	this.deleteData=function(blok_id){
		deleteData(blok_id);
	};
	
	// step 9.28:
	this.deleteExecute=function(blok_id){
		deleteExecute(blok_id);
	};
	
	// step 9.29:
	this.updateData=function(blok_id){
		updateData(blok_id);
	};
	
	// step 9.30:
	this.updateExecute=function(blok_id){
		updateExecute(blok_id);
	};
	
	// step 9.31:
	this.searchData=function(txt){
		searchData(txt);
	};
	
	// step 9.32:
	this.searchExecute=function(){
		searchExecute();
	};
	
	// step 9.33:
	this.openFolder=function(blok_id){
		openFolder(blok_id);
	};
}
