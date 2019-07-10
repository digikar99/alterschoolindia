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
	    document.getElementsByTagName('footer')[0].style.borderTop="20px none #f00";
	    document.getElementsByTagName('footer')[0].style.height="70vh";
	    document.getElementsByTagName('footer')[0].style.paddingTop="15px";
	}
    })
    
    $('html').click(function(e) {                    
	if (screen.width<768) {
	    if (e.target.id=='fa-question-circle' || e.target.id=='follow-question-btn'
		|| e.target.id=='map-menu-btn') 
	    {
		if (document.getElementsByTagName('footer')[0].style.height=="0px") {
		    console.log("display was none");
		    document.getElementsByTagName('footer')[0].style.paddingTop="15px";
		    window.requestAnimationFrame(function(){
			document.getElementsByTagName('footer')[0].style.height
			    = String(document.documentElement.clientHeight * 0.7) + "px";
		    });
		}
		else{
		    console.log("height is not 0");
		    window.requestAnimationFrame(function(){
			document.getElementsByTagName('footer')[0].style.height="0px";
			document.getElementsByTagName('footer')[0].style.paddingTop="0px";
		    });

		    //document.getElementsByTagName('footer')[0].style.display="none";
		} 
	    }
	    else if(! (e.target.closest=='follow-questions'))
	    {
		window.requestAnimationFrame(function(){
		    document.getElementsByTagName('footer')[0].style.height="0px";
		    document.getElementsByTagName('footer')[0].style.paddingTop="0px";
		});

	    }
	}
    })

    $(function() {
	$("#startJourney").modal();
    });
    if (screen.width<768)
	document.getElementsByTagName('footer')[0].style.height="0px";
});

function goBack() {
    window.history.back();
}

