$(document).ready(function(){

    /* # Show spinner untill everything's loaded. */
    $('.spinner').show();

    /* # Make videos responsive. */
    $('.post').fitVids();

    /* # Open/close menu. */
	$('.nav-control').click(function(){
		$('body').toggleClass('nav-open');
	});

    /* Make specific links open in a new window in a HTML5 valid way */
	$('a[rel*="external"]').click(function(){
		$(this).attr('target', '_blank');
	})
	
    /* Since Ghost does not support a post featured image yet, make an specific image the featured one. Thanks to Thomas Cullen (@ThomasCullen92) for this workaround. */ 
	mainImage = $('img[alt="cover-image"]');
    if ( mainImage.length > 0){
        mainImageSource = mainImage.attr('src');
        $('#main-sidebar').css('background', 'url('+mainImageSource+')');
        mainImage.remove();
    }

    //matrixAnimation();
    drawDragon(dragonCurveIter([1],15),0);
    drawDragon(dragonCurveIter([1],15),2);
	
});

$(window).load(function(){

    /* # All loaded, hide spinner. */
	$('.spinner').hide();

});

function hslToRgb(h, s, l){
    var r, g, b;

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}
function dragonCurveIter(seq,iterations) {
    // 0 - L , 1 - R
    for(var i = 0; i < iterations; i++) {
        var a = seq.reverse().map(function(x){return Number(!x)})
        seq.reverse().push(1);
        seq.push.apply(seq,a)
    }
    return seq
}

function drawDragon(seq,startDir) {
    var context = $('#matrix')[0].getContext('2d');
    var x = Math.floor($('#matrix')[0].width/2);
    var y = Math.floor($('#matrix')[0].height/2);
    var aspectRatio =  $('#matrix')[0].width/ $('#matrix')[0].height
    var directions = [{x:0,y:1},{x:aspectRatio,y:0},{x:0,y:-1},{x:-aspectRatio,y:0}]
    var iter = 0;
    var dir = startDir;
    var color = hslToRgb(0,0.5,0.5);
    console.log("X: " + x);
    var maxLength = seq.length
    var draw = function () {
        if (iter < maxLength) {
            context.beginPath();
            color = hslToRgb((iter%256)/256,0.5,0.5);
            //console.log(color);
            context.strokeStyle= "rgb("+color[0]+","+color[1]+","+color[2]+")";
            context.moveTo(x,y);
            if (seq[iter] == 0) { // Right
                dir = (dir + 1) % 4;
                x += directions[dir].x; 
                y += directions[dir].y;
            } else { // Left
                dir = (dir - 1) < 0 ? 3 : (dir - 1) % 4;
                x += directions[dir].x; 
                y += directions[dir].y;
            }
            context.lineTo(x,y);
            context.stroke();
            iter += 1;
        }
    }
    setInterval(draw, 10);
}


function matrixAnimation() {
    var width = $('#matrix')[0].width;
    var height = $('#matrix')[0].height;
    var letters = [];
    for (var i = 0, l = 20; i < l; i++) {
        letters.push(Math.round(Math.random() * height/5))
    }
    var context = $('#matrix')[0].getContext('2d');
    context.font="10px Play";

    var draw = function () {
        context.fillStyle = "rgba(0, 0, 0, 0.05)";
        context.fillRect(0, 0, width, height);
        context.fillStyle='#0F0';
        letters.map(function(y_pos, index){
            text = String.fromCharCode(3e4+Math.random()*33);
            x_pos = index * 20;
            context.fillText(text, x_pos, y_pos, 10);
            letters[index] = (y_pos > height + Math.random() * 1e4) ? 0 : y_pos + 2;
        });
    };
    setInterval(draw, 33);
}