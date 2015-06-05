// Wes Roberts
// 2015-06-03
//
angular

	// Club Angular
	.module('clubAngular', ['ngAnimate'])

	// Member directory
	.controller('memberDirectoryCtl', ['$scope', function($scope){

		// Import data.js
		$scope.nameFilter = '';
		$scope.stateFilter = '';
		$scope.members = memberDirectoryData;
		$scope.membersFiltered = $scope.members.slice();
		$scope.membersPaginated = $scope.members.slice(0,10);
		$scope.currentPage = 1;
		$scope.numPerPage = 10;

		$scope.$watch('nameFilter + stateFilter', function(){
			$scope.updateFilters();
			$scope.updatePagination();
		});
		$scope.$watch('currentPage + numPerPage', function(){
			$scope.updatePagination();
		});

		$scope.updateFilters = function() {
			var i, r = [];
			for (i=0; i<$scope.members.length; i++) {
				if ($scope.applyFilters($scope.members[i])) {
					r.push($scope.members[i]);
				}
			}
			$scope.membersFiltered = r;
		};
		$scope.updatePagination = function() {
			var begin, end;
			$scope.numPerPage = parseInt($scope.numPerPage);
			begin = (($scope.currentPage - 1) * $scope.numPerPage);
			end = begin + $scope.numPerPage;
			$scope.membersPaginated = $scope.membersFiltered.slice(begin, end);
		};

		$scope.maxPage = function() {
			return Math.ceil($scope.membersFiltered.length / $scope.numPerPage);
		};

		$scope.getPages = function () {
			var end = $scope.maxPage(), i, ret = [];
			for (i = 1; i <= end; i++) {
				ret.push(i);
			}
			return ret;
		};
		
		$scope.prevPage = function () {
			if ($scope.currentPage > 1) {
				$scope.currentPage--;
			}
		};
		
		$scope.nextPage = function () {
			if ($scope.currentPage < $scope.maxPage()) {
				$scope.currentPage++;
			}
		};
		
		$scope.setPage = function (n) {
			$scope.currentPage = n;
		};


		// Filter the directory
		$scope.applyFilters = function(member) {
			return true

				// First or last name match
				&& (member.first_name.match($scope.nameFilter) || member.last_name.match($scope.nameFilter))

				// State match required
				&& member.state.match($scope.stateFilter)
			;
		};
	}])
;