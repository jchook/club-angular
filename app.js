// Wes Roberts
// 2015-06-03
//
angular

	// The Club Angular Module
	.module('clubAngular', ['ngAnimate'])

	// Member Directory
	.controller('memberDirectoryCtl', ['$scope', function($scope){
		$scope.members = memberDirectoryData;
		$scope.findInName = function(member) {
			return member.first_name.match($scope.query) || member.last_name.match($scope.query);
		};
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
;