'use strict';

/**
 * @ngdoc function
 * @name qiniuUploadApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the qiniuUploadApp
 */
angular.module('qiniuUploadApp', ['angularQFileUpload', 'LocalStorageModule'])
	.controller('MainCtrl', function ($scope, $log, $qupload) {

		$scope.selectFiles = [];

		var start = function (index) {
			$scope.selectFiles[index].progress = {
				p: 0
			};
			$scope.selectFiles[index].upload = $qupload.upload({
				key: '124/1414748783948772378/网站-首页-01.png',
				file: $scope.selectFiles[index].file,
				token: 'IT9iP3J9wdXXYsT1p8ns0gWD-CQOdLvIQuyE0FOK:ZM79I8EtrxY4T2n47p5rhCQiWDg=:eyJzY29wZSI6ImZvb29vb29vb29vbzoxMjQvMTQxNDc0ODc4Mzk0ODc3MjM3OC_nvZHnq5kt6aaW6aG1LTAxLnBuZyIsImRlYWRsaW5lIjoxNDE0ODM1MTgzLCJmc2l6ZUxpbWl0Ijo1MjQyODgwMH0='
			});
			$scope.selectFiles[index].upload.then(function (response) {
				$log.info(response);
			}, function (response) {
				$log.info(response);
			}, function (evt) {
				$scope.selectFiles[index].progress.p = Math.floor(100 * evt.loaded / evt.totalSize);
			});
		};

		$scope.abort = function (index) {
			$scope.selectFiles[index].upload.abort();
			$scope.selectFiles.splice(index, 1);
		};

		$scope.onFileSelect = function ($files) {
			var offsetx = $scope.selectFiles.length;
			for (var i = 0; i < $files.length; i++) {
				$scope.selectFiles[i + offsetx] = {
					file: $files[i]
				};
				start(i + offsetx);
			}
		};
	});