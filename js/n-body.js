var l = [1,2,3,4,5,6]

var nodelist = []

var t = .1;
var m = 1;
var g = 1;
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
			//console.log( i +">"+ j);
			nodes.push( {f_x:0, f_y:0, a_x:0, a_y:0, v_x:0, v_y:0, x:i*10, y:j*10} )// clearly this has to take in fb data
		}
	}
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
	n.f_x = 0; 
	n.f_y = 0;
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


function f_calc( nodes ){
	for( i=0; i<nodes.length; i++){
		var fx1 = 0;
		var fy1 = 0;
		var n1 = nodes[i];
		
		for( j=0; j<i; j++){
			//console.log(f_x, f_y);
			console.log( i +">"+ j);
			var n2 = nodes[j];
			var dx = n2.x - n1.x;
			var dy = n2.y - n1.y;
			var rrr = Math.pow((dx*dx + dy*dy), 3/2); //is this too slow?
			//console.log( rrr );
			//gravity only for now.
			var F = g * m * m / rrr
			var fx2 = -dx * F;
			var fy2 = -dy * F;
			fx1 += -fx2;
			fy1 += -fy2;	
			
			nodes[j] = f_add(fx2,fy2, nodes[j]);  //anonymous function?
			//console.log( "FDSA" + nodes[j].f_x, nodes[j].f_y)
		}
		nodes[i] = f_add(fx1, fy1, nodes[i]);
	}
	return nodes;
}

function draw( l ){
	//clear old elements
	clear();
	//draw new ones
	for( i=0; i<l.length; i++){
		n = l[i];
		
		var div = document.createElement("div");
		div.className = "particle";
		div.style.top =  Math.round(100*n.y)/5 + "px";
		div.style.left =  Math.round(100*n.x)/5 + "px";
		var element = document.getElementById("container");
		element.appendChild(div);
	}
}

function clear(){
	var node = document.getElementById("container")
	while(node.firstChild) {
		node.removeChild(node.firstChild);
	}
}

function animate(n, l){
		f_calc( l );
		move( l );
		draw( l );
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}