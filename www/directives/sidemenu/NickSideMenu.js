function toggleSideMenu() {
	var sideMenu = document.querySelector('nick-side-menu');
	var overlay = document.querySelector('.nick-overlay');

	if (!sideMenu.classList.contains('nick-active')) {
		sideMenu.classList.add('nick-active');
		sideMenu.style.transition = 'transform .3s ease';
		sideMenu.style.transform = 'translateX(100%)';
		sideMenu.style.webkitTransition = 'transform .3s ease';
		sideMenu.style.webkitTransform = 'translateX(100%)';
		$timeout(function() {
			overlay.style.visibility = 'visible';
		}, 300);
		
	}

	else {
		sideMenu.classList.remove('nick-active');
		sideMenu.style.transition = 'transform .3s ease';
		sideMenu.style.transform = 'translateX(0%)';
		sideMenu.style.webkitTransition = 'transform .3s ease';
		sideMenu.style.webkitTransform = 'translateX(0%)';
		
		overlay.style.visibility = 'hidden';

	}
}

angular.module('nickff')
.directive('nickSideMenu', function () {

	return {

		link: function($scope, elem, attrs) {

			elem.css({
				position: 'absolute',
				// left: '0', // generates an open sidemenu for development, comment this out after
				 left: '-80%',
				height: '100%',
				width: '80%',
				marginTop: '20px',
				backgroundColor: 'white',
				zIndex: '5',
				paddingTop: '40px',
				paddingLeft: '16px',
			});

			var overlay = document.createElement('div');
			overlay.classList.add('nick-overlay');
			angular.element(overlay).css({
				height: '100%',
				width: '100%',
				position: 'absolute',
				backgroundColor: 'black',
				opacity: '0.3',
				visibility: 'hidden'
			});

			document.body.appendChild(overlay);

			angular.element(overlay).on('click', function(e) {
				elem.removeClass('nick-active');
				elem.css({
					transition: 'transform 0.3s ease',
					transform: 'translateX(0%)',
					webkitTransition: 'transform 0.3s ease',
					webkitTransform: 'translateX(0%)'
				});
				overlay.style.visibility = 'hidden';
			});

		},

	};
})

.directive('nickToggle', function($timeout) {

	return {
		link: function($scope, elem, attrs) {

			elem.on('click', function() {
				var sideMenu = document.querySelector('nick-side-menu');
				var overlay = document.querySelector('.nick-overlay');

				if (!sideMenu.classList.contains('nick-active')) {
					sideMenu.classList.add('nick-active');
					sideMenu.style.transition = 'transform .3s ease';
					sideMenu.style.transform = 'translateX(100%)';
					sideMenu.style.webkitTransition = 'transform .3s ease';
					sideMenu.style.webkitTransform = 'translateX(100%)';
					$timeout(function() {
						overlay.style.visibility = 'visible';
					}, 300);
					
				}

				else {
					sideMenu.classList.remove('nick-active');
					sideMenu.style.transition = 'transform .3s ease';
					sideMenu.style.transform = 'translateX(0%)';
					sideMenu.style.webkitTransition = 'transform .3s ease';
					sideMenu.style.webkitTransform = 'translateX(0%)';
					
					overlay.style.visibility = 'hidden';

				}

			});		

		}
	
	};

})
;


