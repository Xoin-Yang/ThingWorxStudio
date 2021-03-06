// $scope, $element, $attrs, $injector, $sce, $timeout, $http, $ionicPopup, and $ionicPopover services are available
//Front
// code below is for animating propellers
var timerId = -1;
var angleIncrement = 45; // degrees
var timingInterval = 30; // milliseconds

// increments by which to move the copter
var xdelta = 0;
var ydelta = 0;
var zdelta = 0;
var Bdelta = 0;

// invoked by the Power button 'Pressed' event
$scope.startCopter = function() {
  if (timerId > -1) {
    clearInterval(timerId);
  }

  timerId = setInterval(function() {

    // ensure there is a value for parameters
    if (!$scope.app.params.ry) {
      $scope.app.params.ry = 0;
    }
    if (!$scope.app.params.rx) {
      $scope.app.params.rx = 0;
    }
    if (!$scope.app.params.xpos) {
      $scope.app.params.xpos = 0;
    }
    if (!$scope.app.params.ypos) {
      $scope.app.params.ypos = 0.045;
    }
    if (!$scope.app.params.zpos) {
      $scope.app.params.zpos = 0;
    }
    
    if (!$scope.app.params.Bxpos) {
      $scope.app.params.Bxpos = -0.013;
    }
    if (!$scope.app.params.Bypos) {
      $scope.app.params.Bypos = -0.003;
    }
    if (!$scope.app.params.Bzpos) {
      $scope.app.params.Bypos = -0.005;
    }
    if ($scope.app.params.Bxpos>0.5) {
      $scope.app.params.Bxpos = -0.013;
    }

    // animates the copter
    $scope.$apply(function(){

      // spin the propeller
      $scope.app.params.ry += angleIncrement % 360;
      $scope.app.params.rx += angleIncrement % 360;
      //Rot
     // $scope.app.params.Rot += angleIncrement % 360;
      
      // tilt at a 5 degree angle if moving
      $scope.app.params.tiltX = 2500 * zdelta;
      $scope.app.params.tiltZ = 2500 * xdelta;
      
      // move
      $scope.app.params.xpos -= xdelta;
      $scope.app.params.ypos = Math.max(0.045, $scope.app.params.ypos + ydelta);
      $scope.app.params.zpos += zdelta;
      $scope.app.params.Bxpos += Bdelta;
    });
  }, timingInterval);
}

// invoked by the Power button 'Unpressed' event
$scope.stopCopter = function() {
  clearInterval(timerId);
  timerId = -1;
  
  // reset controls
  $scope.view.wdg['leftButton']['pressed'] = false;
  $scope.view.wdg['rightButton']['pressed'] = false;
  $scope.view.wdg['frontButton']['pressed'] = false;
  $scope.view.wdg['backButton']['pressed'] = false;
  $scope.view.wdg['upButton']['pressed'] = false;
  $scope.view.wdg['downButton']['pressed'] = false;
  $scope.view.wdg['StopBoomButton']['pressed'] = false;
  $scope.view.wdg['LeftRotButton']['pressed'] = false;
  $scope.view.wdg['RightRotButton']['pressed'] = false;
  //$scope.view.wdg['downButton']['pressed'] = false;
  //$scope.view.wdg['downButton']['pressed'] = false;

  // reset values;
  xdelta = 0;
  ydelta = 0;
  zdelta = 0;

  // reset position
  $scope.app.params.xpos = 0;
  $scope.app.params.ypos = 0.045;
  $scope.app.params.zpos = 0;
  $scope.app.params.tiltX = 0;
  $scope.app.params.tiltZ = 0;
  $scope.app.params.Bxpos = -0.013
}

// convenience functions used by the toggle Pressed and Unpressed events

$scope.goLeft	= function() { xdelta = 0.002; }
$scope.goRight	= function() { xdelta = -0.002; }
$scope.stopX	= function(){ xdelta = 0; }

$scope.goUp		= function() { ydelta = 0.002; }
$scope.goDown	= function() { ydelta = -0.002; }
$scope.stopY	= function(){ ydelta = 0; }

$scope.goFront	= function() { zdelta = -0.002; }
$scope.goBack	= function() { zdelta = 0.002; }
$scope.stopZ	= function() { zdelta = 0; }


$scope.goBoom	= function() {Bdelta = 0.05; }
$scope.stopBoom	= function() {Bdelta = 0; $scope.app.params.Bxpos = -0.013;}


//$scope.goLeftRot	= function() {Bdelta = 0.05; }
//$scope.goRightRot	= function() {Bdelta = 0.05; }
