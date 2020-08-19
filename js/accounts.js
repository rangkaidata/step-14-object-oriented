'use strict';
// step 11: account
function Accounts(){
	// step 11-01:
	var html;
	var page;
	var url=global_url+'account/';
	
	// step 11-04:
	function readData(){
		modul.innerHTML='Accounts';	
		metode.innerHTML='Read Data';	
		app.innerHTML=pleaseWait();
		msg.innerHTML='';
		html='<button type="button" id="btn_create" onclick="objModul.createData();">Create Data</button>'
			+'<button type="button" id="btn_search" onclick="objModul.searchData(\'\');">Search Data</button>';
			//+'<button type="button" id="btn_export" onclick="exportData();">Export Data</button>'
			//+'<button type="button" id="btn_import" onclick="importData();">Import Data</button>';
		btn.innerHTML=html;	

		const obj= {"login_blok":login_blok,"kolom":0};
		if (page===undefined){
			loadXHR(url+"read_paging.php",obj,readShow);
		}
		else{
			loadXHR(page,obj,readShow);
		}
	}
	
	// step 11-05:
	function readShow(paket){		
		html ='<p>Total: '+paket.count+' rows</p>';

		html+=paging(paket);

		html+='<table border=1>'
			+'<tr>'
			+'<th>No.</th>'
			+'<th>Account ID</th>'
			+'<th>Account Name</th>'
			+'<th>Account Class</th>'
			+'<th>Account Balances</th>'
			+'<th>User Name</th>'
			+'<th>Date Created</th>'
			+'<th colspan=2>Action</th>'
			+'</tr>';			
		var tipe='';
		if (paket.err===0){
			for (var x in paket.data) {
				html+='<tr>'
					+'<td>'+paket.data[x].nomer+'</td>'
					+'<td>'+paket.data[x].account_id+'</td>'
					+'<td>'+paket.data[x].account_name+'</td>'
					+'<td>'+paket.data[x].account_class+'</td>'
					+'<td style="text-align:right;">'+formatSerebuan(paket.data[x].account_balance)+'</td>'
				
					+'<td>'+paket.data[x].user_name+'</td>'
					+'<td>'+tglIna(paket.data[x].date_created)+'</td>'
					+'<td><button type="button" id="btn_change" onclick="objModul.updateData(\''+paket.data[x].account_blok+'\');">Change data</button></td>'
					+'<td><button type="button" id="btn_delete" onclick="objModul.deleteData(\''+paket.data[x].account_blok+'\');">Delete data</button></td>'
					+'</tr>';
			}
		}
		html+='</table>';
		app.innerHTML=html;	
	}
	
	// step 11.06:
	function formulir(){
		html='<form autocomplete="off">'
			+'<ul>'
			+'<li><label for="account_id">Account ID</label>: '
				+'<input type="text" id="account_id" disabled></li>'
			+'<li><label for="account_name">Account Name</label>: '
				+'<input type="text" id="account_name" disabled></li>'
			+'<li><label  for="account_class">Account Class</label>: '
				+'<select id="account_class" disabled>'
				+'<option>Asset</option>'
				+'<option>Liability</option>'
				+'<option>Equity</option>'
				+'<option>Income</option>'
				+'<option>Cost of Sales</option>'
				+'<option>Expense</option>'
				+'<option>Other Income</option>'
				+'<option>Other Expense</option>'
				+'</select></li>'
			+'<li><label for="account_balance">Account Opening</label>: '
			+'<input type="text" id="account_opening" onfocus="this.select();" disabled></li>'
			+'<li><label for="account_balance">Account Balance</label>: '
			+'<span id="account_balance">0.00</span></li>'
			+'</ul>'
			+'</form>';
		app.innerHTML=html;	
		
		if (metode.innerHTML==='Create Data'){
			document.getElementById('account_id').disabled=false;
			document.getElementById('account_name').disabled=false;
			document.getElementById('account_class').disabled=false;
			document.getElementById('account_opening').disabled=false;
			document.getElementById('account_id').focus()
		}
		if (metode.innerHTML==='Update Data'){
			document.getElementById('account_name').disabled=false;
			document.getElementById('account_name').focus();
		}
	}

	// step 11.07:
	function createData(){
		metode.innerHTML='Create Data';	
		msg.innerHTML='';
		html='<button type="button" id="btn_back" onclick="objModul.readData(\'0\');">Back</button>'
			+'<button type="button" id="btn_save" onclick="objModul.createExecute();">Save Data</button>'
			+'<button type="button" id="btn_new" onclick="objModul.createData();" style="display:none;">Create New</button>'
		btn.innerHTML=html;	
		
		formulir();
	}
	
	// step 11.08:
	function createExecute(){
		msg.innerHTML=pleaseWait();
		const obj={
			"login_blok":login_blok
			,"account_id":document.getElementById("account_id").value
			,"account_name":document.getElementById("account_name").value
			,"account_class":document.getElementById("account_class").value
			,"account_balance":document.getElementById("account_opening").value
		}
		loadXHR(url+"create.php",obj,createMessage);

		function createMessage(paket){
			if (paket.err===0){			
				document.getElementById("btn_save").style.display="none";
				document.getElementById("btn_new").style.display="inline";
			}
			msg.innerHTML=paket.msg;
		}				
	}
	
	// step 11.09:
	function readOneData(blok_id){
		app.innerHTML=pleaseWait();
		const obj={
			"login_blok":login_blok,
			"account_blok":blok_id
		};
		loadXHR(url+"read_one.php",obj,readOneShow); 
	}

	// step 11.10:
	function readOneShow(paket){
		formulir();
		if (paket.err==0) {
			document.getElementById('account_id').value=paket.data[0].account_id;
			document.getElementById('account_name').value=paket.data[0].account_name;
			document.getElementById('account_class').value=paket.data[0].account_class;
			document.getElementById('account_opening').value=paket.data[0].account_opening;				
			document.getElementById('account_balance').innerHTML=formatSerebuan(paket.data[0].account_balance);				
		}else{
			msg.innerHTML=paket.msg;
		}
	}	

	// step 11.11:
	function deleteData(blok_id){
		metode.innerHTML='Delete Data';	
		html='<button type="button" id="btn_back" onclick="objModul.readData(\'0\');">Back</button>'
			+'<button type="button" id="btn_continue" onclick="objModul.deleteExecute(\''+blok_id+'\');">Continue</button>';
		btn.innerHTML=html;	
		msg.innerHTML='';
		
		readOneData(blok_id);
	}	

	// step 11.12:
	function deleteExecute(blok_id){
		msg.innerHTML=pleaseWait();
		const obj = {
			"login_blok":login_blok,
			"account_blok":blok_id
		};			
		loadXHR(url+"delete.php",obj,deleteMessage); 
	}
	
	// step 11.13:
	function deleteMessage(paket){
		if (paket.err===0){			
			document.getElementById("btn_continue").disabled=true;
		}
		msg.innerHTML=paket.msg;
	}
	
	// step 11.14:
	function updateData(blok_id){
		metode.innerHTML='Update Data';	
		msg.innerHTML='';
		app.innerHTML=pleaseWait();
		html='<button type="button" id="btn_back" onclick="objModul.readData(\'0\');">Back</button>'
			+'<button type="button" id="btn_save" onclick="objModul.updateExecute(\''+blok_id+'\');">Save Data</button>';
		btn.innerHTML=html;	
		
		readOneData(blok_id);
	}
	
	// step 11.15:
	function updateExecute(blok_id){
		msg.innerHTML=pleaseWait();
		const obj = {
			"login_blok":login_blok,
			"account_blok":blok_id,
			"account_name":document.getElementById("account_name").value
		};
		loadXHR(url+"update.php",obj,updateMessage);
	}
	
	// step 11.16:
	function updateMessage(paket){
		if (paket.err===0){			
			document.getElementById("btn_save").disabled=true;
		}
		msg.innerHTML=paket.msg;			
	}
	
	// step 11.17:
	function searchData(txt){
		metode.innerHTML='Search Data';
		msg.innerHTML='';
		
		html='<button type="button" id="btn_back" onclick="objModul.readData(\'0\');">Back</button>';
		btn.innerHTML=html;
		
		html='<input type="text" value="'+txt+'" id="txt_search" placeholder="Type text to search ..." onfocus="this.select();">'
			+'<button type="button" id="btn_search" onclick="objModul.searchExecute();">Search Start</button>';
		app.innerHTML=html;
		document.getElementById('txt_search').focus();
	}
	
	// step 11.18:
	function searchExecute(){
		metode.innerHTML='Search Result';
		const txt=document.getElementById('txt_search').value;
		
		html ='<button type="button" id="btn_back" onclick="objModul.searchData(\''+txt+'\');">Back</button>';
		btn.innerHTML=html;

		const obj={
			"login_blok":login_blok,
			"search":txt}
		loadXHR(url+"search.php",obj,readShow);
	}

	// step 11.19:
	function gotoPage(ini){
		page=ini;
		readData(0);
	}
	
	// step 11.20:	
	readData();
	
	// step 11.21
	this.gotoPage=function(ini){
		page=ini;
		readData();
	};
	
	// step 11.22
	this.createData=function(){
		createData();
	};
	
	// step 11.23
	this.createExecute=function(){
		createExecute();
	};
	
	// step 11.24
	this.readData=function(){
		readData();
	};
	
	// step 11.25
	this.deleteData=function(blok_id){
		deleteData(blok_id);
	};
	
	// step 11.26
	this.deleteExecute=function(blok_id){
		deleteExecute(blok_id);
	};
	
	// step 11.27
	this.updateData=function(blok_id){
		updateData(blok_id);
	};
	
	// step 11.28
	this.updateExecute=function(blok_id){
		updateExecute(blok_id);
	};
	
	// step 11.29
	this.searchData=function(txt){
		searchData(txt);
	};
	
	// step 11.30
	this.searchExecute=function(){
		searchExecute();
	}
	
}
