// Wes Roberts
// 2015-06-03
//
angular

	// The Club Angular Module
	.module('clubAngular', ['ngAnimate'])

	// Member Directory
	.controller('memberDirectoryCtl', ['$scope', function($scope){
		$scope.members = memberDirectoryData;
	}])

	// Fancy Dancy
	.animation('.animation-slide', function() {
		return {
			beforeAddClass: function(element, className, done) {
				if (className === 'ng-hide') {
					element.slideUp(done);
				}
			},
			removeClass: function(element, className, done) {
				if (className === 'ng-hide') {
					element.hide().slideDown(done);
				}
			}
		};
	})

	.filter('yesno', function(val){
		return val ? 'true' : 'false';
	})
;