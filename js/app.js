// Wes Roberts
// 2015-06-04
//
angular

	// Club Angular
	.module('clubAngular', [])

	// Member directory
	.controller('memberDirectoryCtl', ['$scope', function($scope){

		// Pagination & Filters
		angular.extend($scope, {
			
			numPerPage: 10,
			currentPage: 1,
			
			members: memberDirectoryData,
			membersFiltered: memberDirectoryData,
			membersPaginated: memberDirectoryData.slice(0,10),

			nameFilter: '',
			stateFilter: '',

			applyFilters: function(member) {
				var i, j, keywords, nameMatch;

				// Match all words
				keywords = $scope.nameFilter.split(' ');
				nameMatch = true;
				for (i=0, j=keywords.length; i<j; i++) {
					nameMatch = nameMatch && [member.first_name, member.last_name].join(' ').match(keywords[i]);
				}

				return (j=0 || nameMatch) && member.state.match($scope.stateFilter);
			},

			getPages: function() {
				var end = $scope.maxPage(), i, ret = [];
				for (i = 1; i <= end; i++) {
					ret.push(i);
				}
				return ret;
			},

			maxPage: function() {
				return Math.ceil($scope.membersFiltered.length / $scope.numPerPage) || 1;
			},

			nextPage: function() {
				if ($scope.currentPage < $scope.maxPage()) {
					$scope.currentPage++;
				}
			},
			
			prevPage: function() {
				if ($scope.currentPage > 1) {
					$scope.currentPage--;
				}
			},
			
			setPage: function(n) {
				$scope.currentPage = n;
			},

			updateFilters: function() {
				var i, r = [];
				for (i=0; i<$scope.members.length; i++) {
					if ($scope.applyFilters($scope.members[i])) {
						r.push($scope.members[i]);
					}
				}
				$scope.membersFiltered = r;
				$scope.updatePagination();
			},

			updatePagination: function() {
				var begin, end;
				$scope.numPerPage = parseInt($scope.numPerPage);
				$scope.currentPage = Math.min($scope.currentPage, $scope.maxPage());
				begin = (($scope.currentPage - 1) * $scope.numPerPage);
				end = begin + $scope.numPerPage;
				$scope.membersPaginated = $scope.membersFiltered.slice(begin, end);
			},
		});
		
		// Observers
		$scope.$watch('nameFilter + stateFilter', $scope.updateFilters);
		$scope.$watch('currentPage + numPerPage', $scope.updatePagination);

	}])
;