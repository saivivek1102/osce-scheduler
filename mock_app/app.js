
// app.js
var app = angular.module('osceApp', []);
app.controller('SchedulerController', function($scope, $http) {
  $scope.schedule = {};

  $scope.handleFiles = function(files) {
    const formData = new FormData();
    for (let file of files) {
      formData.append("files", file);
    }
    $http.post("/upload", formData, {
      headers: { 'Content-Type': undefined }
    }).then(response => alert("Files uploaded successfully"));
  };

  $scope.generateSchedule = function() {
    $http.post("/generate-schedule").then(res => {
      $scope.schedule = res.data;
    });
  };
});
