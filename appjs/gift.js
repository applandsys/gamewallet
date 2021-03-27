// Gift Chips page init				
document.addEventListener('init', function(event) {
  if (event.target.matches('#gift_chips_page')) {
	  
	 // document.addEventListener("offline",NetproblemExit(), false);
	  
	  //alert(loginid);
	//	NetproblemExit();
	  
		
		loadAccountInfo();
	
		$("#gift_chips_form").one('submit',function(e) {
		   e.preventDefault(); // avoid to execute the actual submit of the form.
			///
			
					var to_playerid		= $("#gift_chips_playerid").val();
					var chips_amount	= $("#gift_chips_amount").val();
					var comments		= $("#gift_chips_comments").val();
	
							$.ajax({
									type:'POST',
									url:baseUrl+"gift/doGift",
									data:{"action":"gift_chips","to_player_id":to_playerid,"chips_amount":chips_amount,"comments":comments,"user_id":user_id,"loginid":loginid},
									dataType: 'json',
									beforeSend: function(){
												showModal();
											},
									complete: function(){
												hideModal();
											},
									success: function(data){
						
										if(data.status=="waiting_confirm"){
											
											 $("#gift_chips_wrapper").hide();
											 
											 $("#gift_id").val(data.gift_id);
											 $("#gift_chips_playerid_confirm_show").html(data.to_player_id);
											 $("#gift_chips_playerid_confirm").val(data.to_player_id);
											  
											 $("#gift_chips_amount_confirm_show").html(data.chips_amount);
											 $("#gift_chips_amount_confirm").val(data.chips_amount);
											 
											 $("#gift_chips_comments_confirm_show").html(comments);
											 $("#gift_chips_comments_confirm").val(data.comments);
											 
											 $("#gift_chips_confirm_wrapper").show();
											 
										}else if(data.status=="invalid"){
										
												ons.notification.alert({
																	title: 'Sorry!',
																	message: '<center>'+data.message+'</center>'
																  });
										}
										
									},
									error: function(data){
										ons.notification.alert("Internet Connection Problem.");
										
									}
								
								}); 
			
			
			///
		});	

	
// Gift Chips Confirm
		var n=0
		$("#gift_chips_form_confirm").one('submit',function(e) {
		   e.preventDefault(); // avoid to execute the actual submit of the form.
			///
			++n;	
				var to_playerid		= $("#gift_chips_playerid").val();
							var chips_amount	= $("#gift_chips_amount").val();
							var comments		= $("#gift_chips_comments").val();
							var gift_id			= $("#gift_id").val();
	
							$.ajax({
									type:'POST',
									url:baseUrl+"gift/confirmGift",
									data:{"action":"gift_chips","gift_id":gift_id,"to_player_id":to_playerid,"chips_amount":chips_amount,"comments":comments,"user_id":user_id,"loginid":loginid,"request":n},
									dataType: 'json',
									beforeSend: function(){
												showModal();
											},
									complete: function(){
												hideModal();
											},
									
									success: function(data){
														
										 if(data.status=="success"){
											
											$("#gift_chips_wrapper").show();
											$("#gift_chips_confirm_wrapper").hide();
											 
											ons.notification.alert({
													title: 'Congrates!',
													message: '<center>'+ data.message+ '</center>',
													callback: function(answer) {
														fn.load('home.html');
													}
												}); 
											
										}else if(data.status=="invalid"){
											ons.notification.alert({
																	title: 'Sorry!',
																	message: '<center>'+data.message+'</center>'
																  });
										}
										
									},
									error: function(data){
										
										ons.notification.alert({
											title: 'Sorry!',
											message: '<center>'+data.message+'</center>'
										});
										
									}
								
								}); 
			
			//
		});	

	
	
  }
}, false);
