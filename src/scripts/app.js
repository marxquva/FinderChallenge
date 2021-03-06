var app = angular.module('challengeApp', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('main', {
			url: '/:categorie',
			templateUrl: 'index.html',
			controller: 'MainController',
		})
	$urlRouterProvider.otherwise('/');
});

app.constant('CONFIG', {
	//APIURL: "http://localhost/FinderChallenge/public/books-schema.json",
	APIURL: "books-schema.json",
});

app.controller('MainController', function($scope, $filter, $stateParams, MainFactory) {
	$scope.name_logotipo = "Finder challenge";
	$scope.bookName = '';
	$scope.books = [];
	//Obtener datos json
	MainFactory.list().then(function(data) {
		if (data.status = 200) {
			//Categorias
			var categories = data.data.entities.categories;
			var vCategories = [];
			angular.forEach(categories[0], function(value, key) {
				vCategories.push({
					id: value.id,
					label: value.label,
					indice: key,
					active: false
				});
			});
			vCategories.unshift({
				id: 0,
				label: 'Todos',
				indice: '',
				active: true
			});
			$scope.categories = vCategories;

			//Presentaciones
			$scope.edition = data.data.entities.edition;

			//Idiomas
			var lang = data.data.entities.lang[0];
			var vLang = [{
				id: 0,
				label: 'Todos',
				indice: ''
			}];
			angular.forEach(lang, function(value, key) {
				vLang.push({
					id: value.id,
					label: value.label,
					indice: key
				});
			});
			$scope.lang = vLang;

			//Guardados
			$scope.saved = data.data.entities.saved;

			//Listado de libros primera pagina
			$scope.books = $filter('limitTo')(data.data.data, 9);
		}
	});

	//Publicaciones
	$scope.publications = MainFactory.getPublications();

	$scope.filtrarCategoria = function(item) {
		$scope.filter_categorie = item;

		angular.forEach($scope.categories, function(value) {
			value.active = false;
			if (item.id == value.id) {
				value.active = true;
			}
		});
	}

});

app.factory('MainFactory', function($http, CONFIG) {
	var publication = [{
		id: 1,
		label: 'Todos'
	}, {
		id: 2,
		label: 'Hoy'
	}, {
		id: 3,
		label: 'Hace una semana'
	}, {
		id: 4,
		label: 'Hace un mes'
	}, {
		id: 5,
		label: 'Hace un año'
	}];
	var books = [];
	return {
		list: function() {
			return $http.get(CONFIG.APIURL);
		},
		getPublications: function() {
			return publication;
		}
	}
});

app.filter("enlace", function() {
	return function(text) {
		if (text != null) {
			var item = cleanString(text);
			return item;
		}
	}
});

app.filter('categorieSel', function() {
	return function(books, item) {
		var salida = [];
		if (item != undefined) {
			if (item.id == 0) {
				salida = books;
			} else {
				angular.forEach(books, function(book) {
					if (book.categories[0] == item.indice) {
						salida.push(book);
					}
				});
			}

		} else {
			salida = books;
		}
		return salida;
	};
})

app.directive('ngFieldSearch', function() {
	function makeValidate(scope, element, attr) {
		scope.cleanSearch = function() {
			var texto = validateField(scope.ngModel);
			scope.ngModel = texto;
		}
	}
	return {
		scope: {
			ngModel: '=',
			cleanSearch: '&',
		},
		link: makeValidate,
		template: '<input type="text" placeholder="Ingrese nombre de libro..." ng-model="ngModel"  ng-change="cleanSearch()" class="pure-input-1-2"/>'
	};
});