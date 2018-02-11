$(document).ready(function() {

	(function () {
		var width = screen.width,
		    height = screen.height;
		setInterval(function () {
		    if (screen.width !== width || screen.height !== height) {
		        width = screen.width;
		        height = screen.height;
		        $(window).trigger('resolutionchange');
		    }
		}, 50);
	}());
	
	$(window).bind('resolutionchange', function() {
		if(screen.width<768){
			document.getElementById('follow-questions').style.display="none";
			document.getElementsByTagName('footer')[0].style.borderTop="none";
			document.getElementsByTagName('footer')[0].style.height="0vh";
			document.getElementsByTagName('footer')[0].style.paddingTop="0px";
		}
		else {
			document.getElementById('follow-questions').style.display="block";
			document.getElementsByTagName('footer')[0].style.borderTop="20px none #000";
			document.getElementsByTagName('footer')[0].style.height="70vh";
			document.getElementsByTagName('footer')[0].style.paddingTop="15px";
		}
	})
	
	$('html').click(function(e) {                    
	   if (screen.width<768) {
		   if (e.target.id=='follow-question-btn') 
		   {
			   	if (document.getElementById('follow-questions').style.display=="none") {
			   		console.log("display was none");
					document.getElementById('follow-questions').style.display="block";
					document.getElementsByTagName('footer')[0].style.borderTop="20px solid #000";
					document.getElementsByTagName('footer')[0].style.height="70vh";
					document.getElementsByTagName('footer')[0].style.paddingTop="15px";
				}
				else{
					document.getElementById('follow-questions').style.display="none";
					document.getElementsByTagName('footer')[0].style.borderTop="20px none #000";
					document.getElementsByTagName('footer')[0].style.height="0vh";
					document.getElementsByTagName('footer')[0].style.paddingTop="0px";
				} 
		   }
		   else if(! (e.target.closest=='follow-questions'))
		   {
			   	document.getElementById('follow-questions').style.display="none";
				document.getElementsByTagName('footer')[0].style.borderTop="none";  
				document.getElementsByTagName('footer')[0].style.height="0vh";
				document.getElementsByTagName('footer')[0].style.paddingTop="0px";            
		   }
	   }
	})
	
});
