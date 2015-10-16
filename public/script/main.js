$(function() {
	console.log("I am java");
	$('.title').click(function() {
		console.log("clicked");
		bb = $(this).attr("data");
		idbb = '#'+bb;
		console.log(idbb);
		$('.fcontent').addClass('hide');
		$(idbb).removeClass('hide');
	});
});