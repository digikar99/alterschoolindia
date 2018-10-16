window.onload = function() {
	var vw = screen.width/100;
	var vh = screen.height/100;
	console.log(vw);
	var canvas = document.getElementById("intro");
	var ctx = canvas.getContext("2d");
	ctx.strokeStyle = 'black';
	ctx.lineWidth = 5;
	console.log(ctx.lineWidth);
	ctx.beginPath();
	ctx.moveTo(200,350);
	ctx.lineTo(200,450);
	ctx.closePath();
	console.log(ctx.stroke());
	console.log("line drawn");
};
