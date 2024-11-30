angular.module('blog', [])
.controller('Rest', function($scope, $http, $location) {
  console.log("Controlador carregado");

  // Função para obter todas as postagens
  $http.get('https://api-fake-blog.onrender.com/postagens')
      .then(function(response) {
          console.log("Dados recebidos", response.data);
          $scope.publicacoes = response.data;
      }, function(error) {
          console.error("Erro ao obter postagens", error);
      });

  // Função para buscar uma postagem por ID
  $scope.buscarPostagem = function(id) {
      $http.get('https://api-fake-blog.onrender.com/postagem/' + id)
          .then(function(response) {
              console.log("Postagem recebida", response.data);
              $scope.postagem = response.data;
          }, function(error) {
              console.error("Erro ao obter postagem", error);
          });
  };

  // Função para carregar a postagem com base no ID na URL
  var queryParams = $location.absUrl().split('?')[1];
  if (queryParams) {
      var params = new URLSearchParams(queryParams);
      var id = params.get('id');
      if (id) {
          $scope.buscarPostagem(id);
      } else {
          console.error("ID não encontrado na URL");
      }
  } else {
      console.error("Parâmetros de consulta não encontrados na URL");
  }
});
