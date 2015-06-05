// Wes Roberts
// 2015-06-04
//
angular

	// Club Angular
	.module('clubAngular', [])

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

		// Filter members from the directory
		$scope.applyFilters = function(member) {
			return true

				// First or last name match
				&& (member.first_name.match($scope.nameFilter) || member.last_name.match($scope.nameFilter))

				// State match required
				&& member.state.match($scope.stateFilter)
			;
		};

		// Pagination logic
		$scope.getPages = function () {
			var end = $scope.maxPage(), i, ret = [];
			for (i = 1; i <= end; i++) {
				ret.push(i);
			}
			return ret;
		};

		$scope.maxPage = function() {
			return Math.ceil($scope.membersFiltered.length / $scope.numPerPage) || 1;
		};

		$scope.nextPage = function () {
			if ($scope.currentPage < $scope.maxPage()) {
				$scope.currentPage++;
			}
		};
		
		$scope.prevPage = function () {
			if ($scope.currentPage > 1) {
				$scope.currentPage--;
			}
		};
		
		$scope.setPage = function (n) {
			$scope.currentPage = n;
		};

		// Update logic
		$scope.updateFilters = function() {
			var i, r = [];
			for (i=0; i<$scope.members.length; i++) {
				if ($scope.applyFilters($scope.members[i])) {
					r.push($scope.members[i]);
				}
			}
			$scope.membersFiltered = r;
			$scope.updatePagination();
		};

		$scope.updatePagination = function() {
			var begin, end;
			$scope.numPerPage = parseInt($scope.numPerPage);
			$scope.currentPage = Math.min($scope.currentPage, $scope.maxPage());
			begin = (($scope.currentPage - 1) * $scope.numPerPage);
			end = begin + $scope.numPerPage;
			$scope.membersPaginated = $scope.membersFiltered.slice(begin, end);
		};

		$scope.$watch('nameFilter + stateFilter', $scope.updateFilters);
		$scope.$watch('currentPage + numPerPage', $scope.updatePagination);

	}])
;