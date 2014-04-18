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

    matrixAnimation();
	
});

$(window).load(function(){

    /* # All loaded, hide spinner. */
	$('.spinner').hide();

});

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