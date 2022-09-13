// Functions
function const_set() {
	WIDTH = document.body.clientWidth;
	HEIGHT = document.body.clientHeight;
	SHORTER = (WIDTH >= HEIGHT ? HEIGHT : WIDTH);
	X_ORIGIN = WIDTH * 0.5;
	Y_ORIGIN = HEIGHT * 0.5;
	EDGE_OUT_R = SHORTER * 0.346;
	EDGE_IN_R = SHORTER * 0.3287;
	CENTER_R = SHORTER * 0.00692;
	DOT_R = SHORTER * 0.0038;
	SEC_LEN = SHORTER * 0.2768;
	MIN_LEN = SHORTER * 0.2595;
	HRS_LEN = SHORTER * 0.173;
	DOT_DIST = SHORTER * 0.294;
}

function get_time() {
	time.sec = new Date().getSeconds();
	time.min = new Date().getMinutes();
	time.hrs = new Date().getHours();
	if(time.hrs == 24)
		time.hrs = 0;
}

function circle_set(id, fixed_x, fixed_y, radius) {
	document.getElementById(id).setAttribute("r", radius);
	document.getElementById(id).setAttribute("cx", X_ORIGIN - fixed_x);
	document.getElementById(id).setAttribute("cy", Y_ORIGIN - fixed_y);
}

function line_set(id, fixed_x2, fixed_y2) {
	document.getElementById(id).setAttribute("x2", X_ORIGIN - fixed_x2);
	document.getElementById(id).setAttribute("y2", Y_ORIGIN - fixed_y2);
}

function angle_trans(length, angle) {
	let fixed_num = {x: 0, y: 0};
	fixed_num.x = -1 * length * Math.cos(angle * PI / 180);
	fixed_num.y = length * Math.sin(angle * PI / 180);
	return fixed_num;
}

function initial() {
	get_time();
	if (time.hrs < 12) {
		document.getElementById("body").setAttribute("style", "background-color: #ffffaa;")
		document.getElementById("edge_out").setAttribute("fill", "#8888ff");
	} else {
		document.getElementById("body").setAttribute("style", "background-color: #aaaaff;")
		document.getElementById("edge_out").setAttribute("fill", "#ffff88");
	}
	circle_set('edge_out', 0, 0, EDGE_OUT_R);
	circle_set('edge_in', 0, 0, EDGE_IN_R);
	for (let i = 0; i < 12; i++) {
		circle_set('dot_' + i, angle_trans(DOT_DIST, 90 - i * 30).x, angle_trans(DOT_DIST, 90 - i * 30).y, DOT_R);
	}
	document.getElementById('hrs').setAttribute("x1", X_ORIGIN);
	document.getElementById('hrs').setAttribute("y1", Y_ORIGIN);
	document.getElementById('min').setAttribute("x1", X_ORIGIN);
	document.getElementById('min').setAttribute("y1", Y_ORIGIN);
	document.getElementById('sec').setAttribute("x1", X_ORIGIN);
	document.getElementById('sec').setAttribute("y1", Y_ORIGIN);
	line_set('hrs', 0, HRS_LEN);
	line_set('min', 0, MIN_LEN);
	line_set('sec', 0, SEC_LEN);
	circle_set('center', 0, 0, CENTER_R);
}

function update_clock() {
	if (WIDTH != document.body.clientWidth || HEIGHT != document.body.clientHeight) {
		const_set();
		initial();
	}
	get_time();
	if ((time.hrs == 0 || time.hrs == 12) && time.min == 0 && (time.sec == 0 || time.sec == 1 || time.sec == 2)) {
		initial();
	}
	time.min = time.min + time.sec / 60;
	time.hrs = time.hrs % 12 + time.min / 60 + time.sec / 3600;
	line_set('sec', angle_trans(SEC_LEN, 90 - time.sec * 6).x, angle_trans(SEC_LEN, 90 - time.sec * 6).y);
	line_set('min', angle_trans(MIN_LEN, 90 - time.min * 6).x, angle_trans(MIN_LEN, 90 - time.min * 6).y);
	line_set('hrs', angle_trans(HRS_LEN, 90 - time.hrs * 30).x, angle_trans(HRS_LEN, 90 - time.hrs * 30).y);
	setTimeout('update_clock()', 1000);
}

// Main
const PI = 3.14159265358979;
var time = {hrs: 0, min: 0, sec: 0};
var WIDTH, HEIGHT, Y_ORIGIN, EDGE_OUT_R, EDGE_IN_R, CENTER_R, DOT_R;
var SEC_LEN, MIN_LEN, HRS_LEN, DOT_DIST, SHORTER;
const_set();
initial();
update_clock();