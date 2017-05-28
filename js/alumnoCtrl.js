app.controller('alumnoCtrl', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http ){
  
  $scope.setActive("mAlumnos");
  //capturando los parametros de la url
  var codigo = $routeParams.codigo;

  $scope.alumno = {};
  $scope.actualizado = false;

  $scope.creando = false;

  if( codigo == 'nuevo'){
    $scope.creando = true;

  } else {
    $http.get('php/servicios/alumnos.getAlumno.php?c=' + codigo ).success(function (data){

      if(data.err !== undefined ){
        window.location = "#/alumnos";
        return;
      }

      $scope.alumno = data;
    });
  }


  $scope.guardarAlumno = function(){
    var url;

    if($scope.creando) {
      url = 'php/servicios/alumnos.crear.php';

    } 
    else {
      url = 'php/servicios/alumnos.guardar.php';
    
    } 
    $http.post(url, $scope.alumno).success(function(data){
      // console.log(data);
      if( data.err === false ){
        $scope.actualizado = true;
        setTimeout( function(){
          $scope.actualizado = false;
          //como esta instrucción es asincrona necesitamos indicar a angularjs que aplique los cambios una vez ejecutadfa la intrucción con apply.
          $scope.$apply();
        }, 3500)
      }
    });

  }
}]);