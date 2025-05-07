
// app.js
var app = angular.module('osceApp', []);
app.controller('SchedulerController', function($scope, $http) {
  $scope.schedule = {};

  $scope.handleFiles = function(files) {
    const formData = new FormData();
    for (let file of files) {
      formData.append("files", file);
    }
    $http.post("http://localhost:3000/upload", formData, {
      headers: { 'Content-Type': undefined }
    }).then(response => alert("Files uploaded successfully"));
  };

  $scope.generateSchedule = function() {
    $http.post("http://localhost:3000/generate-schedule").then(res => {
    $scope.schedule = res.data;
  });

  };
});
