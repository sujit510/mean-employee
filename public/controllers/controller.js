// function AppCtrl(){
	// //console.log("This is controller!!");
// }


var app = angular.module('myApp', []);
app.controller('AppCtrl', function($scope, $http) {
    // console.log("This is controller!!");
	$scope.basePath = "http://localhost:3000/public/uploads/"
	var refresh = function(){
		$http.get("/employeelist").success(function(response){
			console.log("I got the requested data.");
			$scope.employeelist = response;
			$scope.employee = '';
		});
	}
	
	refresh();
	
	$scope.addEmployee = function(){
		console.log($scope.employee);
		
		$http.post('/employeelist', $scope.employee).success(function(res){
			console.log(res);
			if(res.error != undefined && res.error) {
				
			} else {
				refresh();
			}
		});
	}
	
	$scope.removeEmployee = function(id){
		console.log("Delete id:" + id);
		$http.delete("/employeelist/" + id).success(function(res){
			refresh();
		});
	};
	
	//This will fetch employee record to EDIT.
	$scope.editEmployee = function(id){
		console.log("Edit id:" + id);
		$http.get("/employeelist/" + id).success(function(res){
			$scope.employee = res;
		});
	};
	
	//This will save the edited employee record.
	$scope.updateEmployee = function(id){
		console.log("Hello>>");
		console.log($scope.employee);
		$http.put("/employeelist/" + $scope.employee._id, $scope.employee).success(function(res){
			$scope.employee = '';
			refresh();
		});
	};
	
	$scope.add = function(){
	  var f = document.getElementById('file').files[0],
		  r = new FileReader();
	  r.onloadend = function(e){
		var data = e.target.result;
		//send your binary data via $http or $resource or do anything else with it
		$http.post("/upload", data).success(function(res){
			console.log("Res>>");
			console.log(res);
		});
	  }
	  r.readAsBinaryString(f);
	}
	
	$scope.uploadFile = function(files) {
		var fd = new FormData();
		//Take the first selected file
		fd.append("file", files[0]);

		$http.post("/upload", fd, {
			withCredentials: true,
			headers: {'Content-Type': undefined },
			transformRequest: angular.identity
		}).success( function(res){
			console.log("Uploaded successfully!", res);
			$scope.employee.employee_img = res.filename;
		}).error( function(){
			console.log("Error while uploading.");
		});

	};
	
	
});