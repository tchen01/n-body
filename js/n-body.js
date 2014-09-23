var l = [1,2,3,4,5,6]

var nodelist = []

var t = 1;
var m = 1;
var g = 10;
var k = 10;
var mu = .1;
var blank = {f_x:0, f_y:0, a_x:0, a_y:0, v_x:0, v_y:0, x:0, y:0}

//input x,y forces and old node
var node = function(fx,fy, n){
	//are these necesary?
	this.f_x = fx;
	this.f_y = fy;

	this.a_x = n.a_x;
	this.a_y = n.a_y;
	
	this.v_x = n.v_x;
	this.v_y = n.v_y;

	this.x = n.x;
	this.y = n.y;
}

//for testing 
function setup( nodes ){
	for( i=0; i<3; i++){
	for( j=0; j<3; j++){
	nodes.push( {f_x:0, f_y:0, a_x:0, a_y:0, v_x:0, v_y:0, x:i, y:j} )// clearly this has to take in fb data
	}}
	return nodes;
}

// a lot of stuff can be changed to +=
function physics( n ){ 
	n.x = n.x + n.v_x * t;
	n.y = n.y + n.v_y * t;
	n.v_x = n.v_x + n.a_x * t;
	n.v_y = n.v_y + n.a_y * t;
	n.a_x = n.f_x / m;
	n.a_y = n.f_y / m;
	return n
}


function move( l ){
	for( i=0; i<l.length; i++){
	l[i] = physics( l[i] );
	}
	return l;
}


function f_add(fx, fy, n ){
	n.f_x = n.f_x + fx;
	n.f_y = n.f_y + fy;
	return n;
}

function f_rep(fx, fy, n ){
	n.f_x = fx;
	n.f_y = fy;
	return n;
}

function looper( nodes ){
	for( i=0; i<nodes.length; i++){
		var f_x = 0;
		var f_y = 0;
		var n1 = nodes[i];
		
		for( j=0; j<i; j++){
		//console.log( i +">"+ j);
			var n2 = nodes[j];
			var dx = n2.x - n1.x;
			var dy = n2.y = n1.y;
			var rrr = (dx^2 + dy^2)^(3/2); //is this too slow?
			
			//gravity only for now.
			var F = g * m * m / rrr
			var fx = dx * F;
			var fy = dy * F;
			
			
			nodes[j] = f_add(fx,fy, nodes[j]);  //anonymous function?
		}
		nodes[i] = f_rep(f_x, f_y, nodes[i]);
	}
}