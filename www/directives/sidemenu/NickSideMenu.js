angular.module('nickff')
.directive('nickSideMenu', function () {

	return {

		link: function($scope, elem, attrs) {

			elem.css({
				position: 'absolute',
				left: '-50%',
				height: '100%',
				width: '50%',
				marginTop: '20px',
				backgroundColor: 'blue',
				zIndex: '5'
			});

			var overlay = document.createElement('div');
			overlay.classList.add('nick-overlay');
			angular.element(overlay).css({
				height: '100%',
				width: '100%',
				marginLeft: '100%',
				backgroundColor: 'black',
				opacity: '0.3',
				visibility: 'hidden'

			});

			elem.prepend(overlay);



		},

		// templateUrl: "directives/sidemenu/nicksidemenu.html"
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
					
					// $timeout(function() {
						overlay.style.visibility = 'hidden';	
					// }, 500);

				}
				

			});		

		}
	
	};

})
;



// .nick-side-menu {
// 	position: absolute;
// 	left: 0;
// 	height: 100%;
// 	width: 50%;
// 	background-color: blue;
// }

// .nick-hide {
// 	transition: transform .5s linear;
// 	transform: translate3d(-100%);
// }

// .nick-show {
// 	transition: transform .5s linear;
// 	transform: translate3d(100%);
// }