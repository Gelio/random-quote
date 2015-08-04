(function() {
    var app = angular.module("quote", []);

    app.directive("showQuote", ["$http", function ($http) {
        return {
            restrict: "A",
            templateUrl: "quote.html",
            controller: function($scope, $element) {
                var quotes = [], pristineQuotes = [];
                $http.get("quotes.json")
                    .success(function(data) {
                        pristineQuotes = data.quotes;
                        quotes = pristineQuotes.slice(0);
                        $scope.nextQuote();
                    })
                    .error(function(data, status, headers, config) {
                        console.log("error", data, status, headers);
                    });

                $scope.nextQuote = function () {
                    if(quotes.length == 0)
                        quotes = pristineQuotes.slice(0);
                    var random = Math.floor(Math.random()*quotes.length);
                    $scope.quote = quotes[random];
                    quotes.splice(random, 1);
                };

                $scope.twitterShare = function() {
                    window.open("https://twitter.com/intent/tweet?text=" + $scope.quote.content + " --" + $scope.quote.author, "twitterShare", "height=300, width=600,toolbar=1,resizable=1");
                    return false;
                }
            },
            controllerAs: "quote"
        }
    }]);
})();