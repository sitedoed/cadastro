var horoscope = {
	getBoard: function() {
		return $('div.horoscope-board');
	},
	getModal: function() {
		return $('div.sign-modal');
	},
	getMask: function() {
		return horoscope.getModal().find('div.mask');
	},
	getCancel: function() {
		return horoscope.getModal().find('img.cancel');
	},
	getAbout: function() {
		return horoscope.getModal().find('div.sign-about');
	},
	getSign: function(name) {
		return horoscope.getBoard().find('div.sign[name="'+name+'"]');
	},
	init: function() {
		//
		horoscope.getBoard().find('div.sign').click(function() {
			// prepare values
			var icon = $(this).find('img.icon');
			var name = $(this).find('p.name').html();
			var text = $(this).find('p.text').html();
			// load values
			horoscope.loadAbout(icon, name, text);
			// show modal
			horoscope.showModal();
		});
		//
		horoscope.getMask().click(function() {
			horoscope.closeModal();
		});
		horoscope.getCancel().click(function() {
			horoscope.closeModal();
		});
	},
	showModal: function() {
		var modal = horoscope.getModal();
		var mask = horoscope.getMask();
		var about = horoscope.getAbout();
		modal.css("display", "flex");
		mask.animate({ opacity: 0.8 }, "easy")
		about.animate({ opacity: 1 }, "easy")
	},
	closeModal: function() {
		var modal = horoscope.getModal();
		var mask = horoscope.getMask();
		var about = horoscope.getAbout();
		mask.animate({ opacity: 0 }, "fast");
		about.animate({ opacity: 0 }, "fast")
		setTimeout(function() {
			modal.hide();
		}, 300);
	},
	loadAbout: function(icon, name, text) {
		var about = horoscope.getAbout();
		var signIcon = about.find('div.sign-icon');
		var signTitle = about.find('p.sign-title');
		var signText = about.find('div.sign-text p');
		//
		signIcon.find('img').remove();
		// clone img
		icon.clone().appendTo(signIcon);
		//
		signTitle.html(name);
		//
		signText.html(text);
	}
};

//
$(window).load(function() {
	horoscope.init();
});