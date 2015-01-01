angularQFileUpload
==================

[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/icattlecoder/angularQFileUpload?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

AngularJS qiniu cloud storage large file upload service with support resumble,progress based on html5 file blob reader

**Only woking under html5**

## Install

```
bower install angular-qiniu-upload
```

## Usage

- Add 'angularQFileUpload' to your main module's list of dependencies.

```
<script>
        var myApp = angular.module('myApp', ['angularQFileUpload']);
</script>
```

- Upload file 

```
	$scope.selectFiles = [];

	var start = function (index) {
		$scope.selectFiles[index].progress = {
			p: 0
		};
		$scope.selectFiles[index].upload = $qupload.upload({
			key: '<your qiniu file key>',
			file: $scope.selectFiles[index].file,
			token: '<your qiniu UpToken>'
		});
		$scope.selectFiles[index].upload.then(function (response) {
			// upload success
			$log.info(response);
		}, function (response) {
			// upload failure
			$log.info(response);
		}, function (evt) {
			// progress
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
```
-- reference, [http://developer.qiniu.com/docs/v6/api/reference/up/](http://developer.qiniu.com/docs/v6/api/reference/up/)
