var canv = document.getElementById("mygame");
var paint = canv.getContext('2d');

var platform = new Object();
platform.x = 0;
platform.changePos = function (nx) {
	platform.x = nx;
}

var ball = new Object();
ball.counter = 0;
ball.x = 25;
ball.y = 25;
ball.vx = 1;
ball.vy = 1;
ball.diam = 20;
ball.collision = function () {
    if (ball.x > canv.width - ball.diam || ball.x < 0) {
        ball.vx = -ball.vx;
    }
    if (ball.y < 0 + ball.diam) {
        ball.vy = -ball.vy;
    }
    if (ball.y > canv.height - ball.diam - 19) {
        if (ball.x >= platform.x && ball.x <= platform.x + 100) {
            ball.vy = -ball.vy;
			ball.counter += 1;
        }
        else {
            ball.x = 100;
            ball.y = 100;
            ball.vx = 0;
            ball.vy = 0;
			alert("Игра окончена");
        }
    }
}
ball.step = function () {
    ball.collision();
    ball.x += ball.vx;
    ball.y += ball.vy;
}


function gameStep() {
    ball.step();
    gameDraw();
}

var timer = window.setInterval("gameStep()", 5);


	   
var imgBallPlatform = new Image();
imgBallPlatform.src = 'images.png';
	   
	   
function gameDraw() {
	paint.clearRect(0, 0, canv.width, canv.height);
	   
	var my_gradient = paint.createLinearGradient(0, 0, 0, 600);
	my_gradient.addColorStop(0, "DeepSkyBlue");
	my_gradient.addColorStop(1, "white");
	paint.fillStyle = my_gradient;
	paint.fillRect(0, 20, canv.width, canv.height - 20);

	paint.strokeRect(0, 0, canv.width, canv.height);
	paint.strokeRect(0, 20, canv.width, canv.height - 20);
		   
	paint.drawImage(imgBallPlatform, 0, 0, 100, 20, platform.x, canv.height - 20, 100, 20);
		   
	paint.drawImage(imgBallPlatform, 0, 20, 20, 20, ball.x, ball.y, 20, 20);
			
	paint.fillStyle = "black";
	paint.font = "bold 12px sans-serif";
	paint.fillText("Счетчик ударов: " + ball.counter, 10, 15);
}

	   
canv.onmousemove = function (event) {
    var left = event.clientX - 50;
    if (left < 0) {
        left = 0;
    }
    if (left > canv.width - 100) {
        left = canv.width - 100;
    }
    platform.changePos(left);
    gameDraw();
}