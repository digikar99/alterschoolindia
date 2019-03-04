 
<!DOCTYPE html>
<html>

<head>
	<meta charset="utf-8" name="viewport" content="width=device-width, initial-scale=1.0"/>
	 
	<!-- Latest compiled and minified CSS -->
	<link rel="stylesheet" href="./bootstrap-3.3.7-dist/css/bootstrap.min.css">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
	<link rel="stylesheet" href="./index.css"> 
	<link rel="stylesheet" href="./beginner.css"> 
	<link rel="shortcut icon" href="Meta/asi_logo.png" />
	<title>A Supplementary School Curriculum</title>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	<meta name="keywords" content="alternative education, supplementary education, after school activity, summer activity, teen development, additional learning, alternative school curriculum, education reform">
</head>

<body>

	<div class="section section-1">
		<div class="container">
			<div class="row">
				<div class="col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4"><img id="home-logo" src="Meta/asi_logo_big.png"></div>
			</div>
			<br>
			<div class="row">
				<div class="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 front-line bl">Didn't schools teach what they should have?</div>
			</div>
			<br>
			<div class="row">
				<div class="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 front-line hidden-xs">Spend some time on alterschoolindia to learn what must be known to everyone</div>
			</div>
			<br class="hidden-xs">
			<br>
			<div class="row">
				<div class="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 front-line">1500+ UNIQUE VISITORS since the start in 2018</div>
				<div class="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 front-line blinking">
				200+ UNIQUE VISITORS over the LAST MONTH</div>
				<br>
				<div class="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 front-line"><?php
						$file_name = "data/counter.txt";
						// Read counter
						$hit_count_file = fopen($file_name);
						$hit_count = file_get_contents($file_name);
						echo (int)($hit_count/100) ;
						echo "00+ HITS";
						fclose($hit_count_file);

						// Update counter
						$hit_count = $hit_count + 1;
						$hit_count_file = fopen($file_name, "w");
						fwrite($hit_count_file, $hit_count);
						fclose($hit_count_file);

					?>
				</div>
			</div>	
		</div>
		
	</div>

	<div class="section section-2">
		<div class="sole-front-line">Enough of complaints! Let's try to fix the problems.</div>
		<br>
		<div class="sole-front-line">Take responsibility. Educate yourself on what you should.</div>
		<br>
		<div class="sole-front-line">
			<div id="explanation-1">What does that mean?</div>
			<div id="explanation-2">Well...</div>
			<div id="explanation-3">We know there are some things that everyone must know.</div>
			<div id="explanation-4">And there are other things which some must know.</div>
			<div id="explanation-5">If no one knows these "other" things, our civilisation...</div>
			<div id="explanation-6">... as we know it, wouldn't exist. THINK DINOSAURS!</div>
			<div id="explanation-7">So, here, on this website, we have been trying to collect those things which everyone must know.</div>
			<div id="explanation-8">Once you know what everyone must know, start learning various things, and find out some things that interest you.</div>
			<div id="explanation-9">Find out some things that you can do tirelessly; and contribute towards a better society!</div>
		</div>
	</div>

	<div class="section section-3">
		<div class="sole-front-line">Firstly, learn things everyone must know.</div>
		<br>
		<div class="container">
			<div class="row">
				<div class="col-xs-12 col-sm-12 col-md-10 col-md-offset-1">
					<div class="panel-group visible-xs" id="accordion">
					  <div class="panel panel-default">
					    <div class="panel-heading ">
					      <h4 class="panel-title">
					        <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="#ss-accord">
					        Society</a>
					      </h4>
					    </div>
					    <div id="ss-accord" class="panel-collapse collapse in">
					      <div class="panel-body">
					      	<iframe src="Meta/Social Science.html"></iframe>
					      </div>
					    </div>
					  </div>
					  <div class="panel panel-default">
					    <div class="panel-heading">
					      <h4 class="panel-title">
					        <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="#math-accord">
					        Maths*</a>
					      </h4>
					    </div>
					    <div id="math-accord" class="panel-collapse collapse">
							<iframe src="Meta/Mathematics.html"></iframe>
					    </div>
					  </div>
					  <div class="panel panel-default">
					    <div class="panel-heading">
					      <h4 class="panel-title">
					        <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="#sci-accord">
					        Science</a>
					      </h4>
					    </div>
					    <div id="sci-accord" class="panel-collapse collapse">
							<iframe src="Meta/Science.html"></iframe>			      
					    </div>
						</div>
					      <div class="panel panel-default">
					        <div class="panel-heading">
					          <h4 class="panel-title">
					            <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="#ict-accord">
					            ICT</a>
					          </h4>
					        </div>
					        <div id="ict-accord" class="panel-collapse collapse">
					    		<iframe src="Meta/ICT.html"></iframe>			      
					        </div>
					        </div>
					    <div class="panel panel-default">
					        <div class="panel-heading">
					          <h4 class="panel-title">
					            <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="#health-accord">
					            Health*</a>
					          </h4>
					        </div>
					        <div id="health-accord" class="panel-collapse collapse">
					    		<iframe src="Meta/Health and Growing Up.html"></iframe>			      
					        </div>
					    </div>
					    <div class="panel panel-default">
					        <div class="panel-heading">
					          <h4 class="panel-title">
					            <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="#food-accord">
					            Food*</a>
					          </h4>
					        </div>
					        <div id="food-accord" class="panel-collapse collapse">
					    		<iframe src="Meta/Food.html"></iframe>			      
					        </div>
					    </div>
					    <div class="panel panel-default">
					        <div class="panel-heading">
					          <h4 class="panel-title">
					            <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="#first-accord">
					            First Aid*</a>
					          </h4>
					        </div>
					        <div id="first-accord" class="panel-collapse collapse">
					    		<iframe src="Meta/First Aid.html"></iframe>
					        </div>
					    </div>
					    <div class="panel panel-default">
				 	   		<div class="panel-heading">
				 	        	<h4 class="panel-title">
				 	            <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="#hist-accord">
				 	            History*</a>
				 	          </h4>
				 	        </div>
				 	        <div id="hist-accord" class="panel-collapse collapse">
				 	    		<iframe src="Meta/History.html"></iframe>			      
				 	        </div>
				 	 	</div>
					        <div class="panel panel-default">
					        <div class="panel-heading">
					          <h4 class="panel-title">
					            <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="#ssk-accord">
					            Edutainment*</a>
					          </h4>
					        </div>
					        <div id="ssk-accord" class="panel-collapse collapse">
					    		<iframe src="Meta/Empathy and Social Skills.html"></iframe>			      
					        </div>
					 	 </div>
					 	 <div class="panel panel-default">
					        <div class="panel-heading">
					          <h4 class="panel-title">
					            <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="#money-accord">
					            Money (Financial Literacy)</a>
					          </h4>
					        </div>
					        <div id="money-accord" class="panel-collapse collapse">
					    		<iframe src="Meta/Money.html"></iframe>			      
					        </div>
					 	 </div>
					 	 <div class="panel panel-default">
					        <div class="panel-heading">
					          <h4 class="panel-title">
					            <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="#why-accord">
					            Why</a>
					          </h4>
					        </div>
					        <div id="why-accord" class="panel-collapse collapse">
					    		<iframe src="Meta/why.html"></iframe>			      
					        </div>
					 	 </div>
					 	   	
					</div>

					<ul class="nav nav-tabs hidden-xs">
					  <li class="active"><a data-toggle="tab" href="#ss-tab">Society</a></li>
					  <li><a data-toggle="tab" href="#math-tab">Maths*</a></li>
					  <li><a data-toggle="tab" href="#sci-tab">Science</a></li>
					  <li><a data-toggle="tab" href="#ict-tab">ICT</a></li>
					  <li><a data-toggle="tab" href="#health-tab">Health*</a></li>
					  <li><a data-toggle="tab" href="#food-tab">Food*</a></li>
					  <li><a data-toggle="tab" href="#first-tab">First Aid*</a></li>
					  <li><a data-toggle="tab" href="#hist-tab">History*</a></li>
					  <li><a data-toggle="tab" href="#ssk-tab">Edutainment*</a></li>
					  <li><a data-toggle="tab" href="#money-tab">Money*</a></li>
					  <li><a data-toggle="tab" href="#why-tab">Why</a></li>
					</ul>

					<div class="tab-content hidden-xs">
					  <div id="ss-tab" class="tab-pane fade in active">
					    <iframe src="Meta/Social Science.html"></iframe>
					  </div>
					  <div id="math-tab" class="tab-pane fade">
						<iframe src="Meta/Mathematics.html"></iframe>
					  </div>
					  <div id="sci-tab" class="tab-pane fade">
						<iframe src="Meta/Science.html"></iframe>			    
					  </div>
					  <div id="ict-tab" class="tab-pane fade">
						<iframe src="Meta/ICT.html"></iframe>			    
					  </div>
					  <div id="health-tab" class="tab-pane fade">
						<iframe src="Meta/Health and Growing Up.html"></iframe>			    
					  </div>
					  <div id="food-tab" class="tab-pane fade">
						<iframe src="Meta/Food.html"></iframe>			    
					  </div>
					  <div id="first-tab" class="tab-pane fade">
						<iframe src="Meta/First Aid.html"></iframe>			    
					  </div>
					  <div id="hist-tab" class="tab-pane fade">
						<iframe src="Meta/History.html"></iframe>			    
					  </div>
					  <div id="ssk-tab" class="tab-pane fade">
						<iframe src="Meta/Empathy and Social Skills.html"></iframe>			    
					  </div>
					  <div id="money-tab" class="tab-pane fade">
						<iframe src="Meta/Money.html"></iframe>			    
					  </div>
					  <div id="why-tab" class="tab-pane fade">
						<iframe src="Meta/why.html"></iframe>			    
					  </div>

					</div>
				</div>
			</div>
		</div>
		<!-- The Modal -->
		<div class="modal" id="subscription">
		  <div class="modal-dialog">
		    <div class="modal-content">
		      <div class="modal-header">
		        <h3 class="modal-title">Too much to learn? And not enough time?</h3>		
		      </div>

		      <div class="modal-body">
		      	<ul>
		      		<li>Learn all the contents in a 6-month course, straight from your email</li> 
		      		<li>One email every Saturday</li>
		      	</ul>

	            <form action="send_data.php" method="post">
		        	<p class="text-center"><input type="email" name="email" placeholder="Your Email ID" id="user-email" required><br></p>
		        	<p class="text-center"><input type="name" placeholder="(Optional)" name="name"><br></p>
			        <p class="text-center"><input type="submit" name=""></p>
			    </form>
			    <ul>
		        	<li>We promise! We will not share your email with anyone!</li>
		        </ul>
		        <p class="text-center">
		        	<button id="close-subscription" class="btn btn-default" data-dismiss="subscription" type="button">Close</button>
		        </p>
		      </div>

		      <div class="modal-footer"></div>

		    </div>
		  </div>
		</div>
		<br>
		<div class="sole-front-line">Once you know the above.</div>
		<div class="container">
			<div class="row">
				<a href="intermediate.html">
					<div class="col-lg-6 col-lg-offset-3 col-md-8 col-md-offset-2 col-sm-8 col-sm-offset-2 col-xs-10 col-xs-offset-1 top-choices">
						<p>Learn things someone must know. Find your passion, and extend the human knowledge.</p>
					</div>
				</a>		
			</div>
		</div>
		<br>
		<br>
	</div>
	
	<div class="section section-4">
		<h2>Write to us at</h2>
		<a href="mailto:alterschoolindia@email.com"><h4>alterschoolindia@email.com</h4></a>
		<br>
		<br>
		<h2>Liked the above contents?</h2> 
		<h2>Let others learn.</h2>
		<p>Share this page on</p>
		<a href="https://www.facebook.com/sharer/sharer.php?u=alterschoolindia.com" target="_blank" class="fa fa-facebook"></a>
		<a class="fa fa-twitter" href="https://twitter.com/home?status=alterschoolindia.com"></a>
		<a class="fa fa-google-plus" href="https://plus.google.com/share?url=alterschoolindia.com"></a>
		<a class="fa fa-linkedin" href="https://www.linkedin.com/shareArticle?mini=true&url=alterschoolindia.com&title=alterschoolindia&summary=A%20supplementary%20syllabus%20for%20middle%20school%20and%20high%20school.&source="></a>
		<a class="fa fa-whatsapp" href="whatsapp://send?text=Hi! Just found this educational website: alterschoolindia.com. You may want to check it out. Looks great!" data-action="share/whatsapp/share"></a>

	</div>

	<div class="section section-5">
		<h2>Great Thanks to...</h2>		
		<ul>
			<li>Everyone for their continuous feedback on the ease of usage of the website.</li>
			<li>Rahul Ahire for pointing out the need for renovation.</li>
			<li>Arjun Jayaprakash, for science routes 06 to 11.</li>
			<li>Prathamesh Borse, for reviewing science routes 03-05 and making appropriate suggestions</li>
			<li>Kapil Vetrivel for science route 12-13.</li>
		</ul>
		<h2>Want to help us out?</h2>
		<p>Feel free to contact us at <a href="mailto:alterschoolindia@email.com">alterschoolindia@email.com</a> and/or check the <a href="https://github.com/digikar99/alterschoolindia/projects/1">github projects page</a>.</p>
		
	</div>

	<script src="bootstrap-3.3.7-dist/jquery-3.2.1/jquery.min.js"></script>
	<script src="bootstrap-3.3.7-dist/js/bootstrap.min.js"></script>
	<script type="text/javascript">
		function subscriptionShow(){
		    $("#subscription").fadeToggle(500);
		    return false;
		}

		function subscriptionHide(){
		    $("#subscription").toggle();
		    return false;
		}

		$(document).ready(function(){
			document.getElementById('user-email').autocomplete="on";
			$('#close-subscription').click(subscriptionHide);
			setTimeout(function() {
				subscriptionShow();		    	
			}, 60000);
		});
	</script>

</body>
</html>