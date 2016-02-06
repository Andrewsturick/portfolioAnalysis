angular.module("inspinia").run(["$templateCache", function($templateCache) {$templateCache.put("app/chain/chain.html","<h1 class=\"chain-header\">{{symbol}} Option Chain</h1><br><br><div class=\"table-holder\"><table class=\"table table-bordered\"><th ng-repeat=\"(i, header) in dataShown track by $index\"><div class=\"dropdown\"><div class=\"dropdown-toggle\" type=\"button\" id=\"header.title\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"true\">{{header.title}} <span class=\"caret\"></span></div><ul class=\"dropdown-menu\" aria-labelledby=\"header.title\"><li role=\"separator\" class=\"divider\">Greeks</li><li class=\"option-chain-dropdown\" ng-click=\"addToDataShown(i, data, \'call\')\" ng-repeat=\"data in headers.greeks\">{{data}}</li><li role=\"separator\" class=\"divider\">Price</li><li class=\"option-chain-dropdown\" ng-click=\"addToDataShown(i, data, \'call\')\" ng-repeat=\"data in headers.price\">{{data}}</li><li role=\"separator\" class=\"divider\">Volatility</li><li class=\"option-chain-dropdown\" ng-click=\"addToDataShown(i, data, \'call\')\" ng-repeat=\"data in headers.volatility\">{{data}}</li><li role=\"separator\" class=\"divider\">{{\"Expiration\"}}</li><li class=\"option-chain-dropdown\">{{headers.expiration}}</li></ul></div></th><th>Bid</th><th>Ask</th><th class=\"strike\">Strike</th><th>Bid</th><th>Ask</th><th ng-repeat=\"(i, header) in dataShown | reverse\"><div class=\"dropdown\"><div class=\"dropdown-toggle\" type=\"button\" id=\"header.title\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"true\">{{header.title}} <span class=\"caret\"></span></div><ul class=\"dropdown-menu\" aria-labelledby=\"header.title\"><li role=\"separator\" class=\"divider\">Greeks</li><li class=\"option-chain-dropdown\" ng-click=\"addToDataShown(i, data, \'put\')\" ng-repeat=\"data in headers.greeks track by $index\">{{data}}</li><li role=\"separator\" class=\"divider\">Price</li><li class=\"option-chain-dropdown\" ng-click=\"addToDataShown(i, data, \'put\')\" ng-repeat=\"data in headers.price track by $index\">{{data}}</li><li role=\"separator\" class=\"divider\">Volatility</li><li class=\"option-chain-dropdown\" ng-click=\"addToDataShown(i, data, \'put\')\" ng-repeat=\"data in headers.volatility track by $index\">{{data}}</li><li role=\"separator\" class=\"divider\">Expiration</li><li class=\"option-chain-dropdown\">{{headers.expiration}}</li></ul></div></th><tbody><tr ng-repeat=\"(i,strike) in chainArray | orderBy: \'numberStrike\'\"><td ng-repeat=\"(i, header) in dataShown track by $index\">{{ Math.round(strike.call[header.key]*100)/100 || strike.call[header.key] || \"N/A\"}}</td><td>{{Math.round(strike.call[\'bid\']*100)/100 || strike.call[\'bid\']}}</td><td>{{Math.round(strike.call[\'ask\']*100)/100 || strike.call[\'ask\']}}</td><td>{{strike.put[\'strike\'].replace(\"@\",\".\")}}</td><td>{{Math.round(strike.put[\'bid\']*100)/100 || strike.put[\'bid\']}}</td><td>{{Math.round(strike.put[\'ask\']*100)/100 || strike.put[\'ask\']}}</td><td ng-repeat=\"(i, header) in dataShown | reverse track by $index\">{{ Math.round(strike.put[header.key]*100)/100 || strike.call[header.key] || \"N/A\"}}</td></tr></tbody></table></div>");
$templateCache.put("app/main/login.html","<div class=\"middle-box text-center loginscreen animated fadeInDown\"><div><div><h1 class=\"logo-name\">RT+</h1></div><h3>Rooftop Trading</h3><p>See your Think or Swim Portfolio come alive:<br></p><div ng-hide=\"false\"><button ng-click=\"auth.$authWithOAuthPopup(\'google\')\" class=\"btn btn-primary block full-width m-b\">Login with Google</button></div><p class=\"m-t\"><small></small></p></div></div>");
$templateCache.put("app/table/table.html","<div ng-if=\"userRef.name\" id=\"portfolio-header\"><h1 id=\"portfolio-user-name\">{{userName}} \'s <span ng-if=\"isDisplaying.equities\">Equities</span> <span ng-if=\"isDisplaying.options\">Options</span> Portfolio</h1><br><div class=\"portfolio-chooser-buttons\"><button ng-click=\"showEquities()\">Equities</button><button ng-click=\"showOptions()\">Options</button></div></div><span ng-if=\"!userRef.name\"><div class=\"sk-spinner sk-spinner-three-bounce\"><div class=\"sk-bounce1\"></div><div class=\"sk-bounce2\"></div><div class=\"sk-bounce3\"></div></div></span><br><hr><div ng-if=\"isDisplaying.equities\" class=\"equities-holder\"><div class=\"col-sm-4 col-xs-12\" id=\"equities-dashboard-panel-1\"><div ng-if=\"symbolTracker[isShowing]\" class=\"panel-1-info-wrapper\"><div class=\"top-row-in-dashboard-1\"><span class=\"col-xs-3 dashboard-symbol-h1\">{{symbolTracker[isShowing].currentQuote.Symbol}}</span> <span class=\"col-xs-4 pull-right highs-and-lows\"><p class=\"pull-right\" id=\"hi\">Hi: {{symbolTracker[isShowing].currentQuote.DaysHigh}}</p><p class=\"pull-right\" id=\"low\">Low: {{symbolTracker[isShowing].currentQuote.DaysLow}}</p></span></div><span><h2 class=\"dashboard-quote-h2 col-center\">{{symbolTracker[isShowing].currentQuote.LastTradePriceOnly}}</h2></span><h3 class=\"current-symbol-change\" ng-class=\"{green : changeIsPositive(symbolTracker[isShowing].currentQuote.ChangeinPercent), red : changeIsNegative(symbolTracker[isShowing].currentQuote.ChangeinPercent)}\">{{symbolTracker[isShowing].currentQuote.Change}} <span>({{symbolTracker[isShowing].currentQuote.ChangeinPercent}})</span></h3><h2 id=\"company-description\">{{portfolio[isShowing].Description}}</h2></div></div><div ui-sref=\"index.options\" class=\"col-sm-8\"></div><table st-table=\"portfolio\" class=\"table equities-table\"><thead class=\"thead\"><th st-sort=\"Symbol\">Symbol</th><th st-sort=\"Change\">Change(%)</th><th st-sort=\"Mark\">Mark</th><th st-sort=\"Qty\">Qty</th><th st-sort=\"trade_price\">Trade Price</th><th st-sort=\"trade_price\">Total Exposure</th></thead><tbody><tr class=\"equities-portfolio-row\" ng-click=\"showPositionAndStock(v.Symbol)\" ng-repeat=\"(i, v) in portfolio\"><td><p class=\"table-text\">{{v.Symbol}}</p></td><td><p class=\"table-text\">{{symbolTracker[v.Symbol].currentQuote.Change}} ({{symbolTracker[v.Symbol].currentQuote.ChangeinPercent}})</p></td><td><p class=\"table-text\">{{symbolTracker[v.Symbol].currentQuote.LastTradePriceOnly}}</p></td><td><p class=\"table-text\">{{v.Qty}}</p></td><td><p class=\"table-text\">{{v.Trade_Price}}</p></td><td><p class=\"table-text\">{{(+v.Qty)*(+symbolTracker[v.Symbol].currentQuote.LastTradePriceOnly) | currency}}</p></td></tr></tbody></table></div><div ng-if=\"isDisplaying.options\" class=\"equities-holder\">fadfafad<div class=\"col-sm-4 col-xs-12\" id=\"equities-dashboard-panel-1\"><div ng-if=\"symbolTracker[isShowing]\" class=\"panel-1-info-wrapper\"><div class=\"top-row-in-dashboard-1\"><span class=\"col-xs-3 dashboard-symbol-h1\">{{symbolTracker[isShowing].currentQuote.Symbol}}</span> <span class=\"col-xs-4 pull-right highs-and-lows\"><p class=\"pull-right\" id=\"hi\">Hi: {{symbolTracker[isShowing].currentQuote.DaysHigh}}</p><p class=\"pull-right\" id=\"low\">Low: {{symbolTracker[isShowing].currentQuote.DaysLow}}</p></span></div><span><h2 class=\"dashboard-quote-h2 col-center\">{{symbolTracker[isShowing].currentQuote.LastTradePriceOnly}}</h2></span><h3 class=\"current-symbol-change\" ng-class=\"{green : changeIsPositive(symbolTracker[isShowing].currentQuote.ChangeinPercent), red : changeIsNegative(symbolTracker[isShowing].currentQuote.ChangeinPercent)}\">{{symbolTracker[isShowing].currentQuote.Change}} <span>({{symbolTracker[isShowing].currentQuote.ChangeinPercent}})</span></h3><h2 id=\"company-description\">{{portfolio[isShowing].Description}}</h2></div></div><div class=\"col-sm-8\">hello!</div><table st-table=\"portfolio\" class=\"table options-table\"><tbody><tr class=\"options-portfolio-row\" ng-click=\"showPositionAndStock(option.positions[0].Symbol)\" ng-repeat=\"(i, option) in optionsPortfolio\"><td class=\"options-table-stock-group\"><table class=\"inner-table\"><tr ng-repeat=\"position in option.positions\"><td>{{position.Symbol}}</td><td>{{position.Strike}}</td><td>{{position.Type}}</td><td>{{position.Qty}}</td><td>{{position.Trade_Price}}</td><td>{{position.Mark}}</td></tr></table></td></tr></tbody></table></div>");
$templateCache.put("app/threeviz/threeviz.html","<three-viz class=\"three-viz\" chart-types=\"{{charts}}\" data=\"{{symbolTracker}}\"></three-viz><three-js class=\"threejs\" portfolio=\"{{userPortRef}}\" data=\"{{symbolTracker}}\"></three-js>");
$templateCache.put("app/upload/upload.html","<div class=\"wrapper wrapper-content animated fadeInRight\"><div class=\"row\"><div class=\"col-lg-12\"><div class=\"text-center m-t-lg\"><div><ng-csv-import content=\"csv.content\" header=\"csv.header\" separator=\"csv.separator\" result=\"csv.result\" accept=\"csv.accept\"></ng-csv-import></div><button ng-click=\"uploadFile(csv.content)\" class=\"btn btn-primary block m-b\">Upload Portfolio</button></div><div class=\"text-center m-t-lg\"></div></div></div></div>");
$templateCache.put("app/viz/viz.html","<select ng-model=\"currentlySelected\" name=\"\" id=\"\"><option ng-repeat=\"option in chartOptions\" value=\"{{option.key}}\">{{option.title}}</option></select><d3-bars click-event=\"clickEvent(item)\" data=\"{{symbolTracker}}\" looking-at=\"{{currentlySelected}}\" class=\"test-hold\" bar-height=\"50px\" bar-padding=\"50px\"></d3-bars>{{detailItem}}");
$templateCache.put("components/common/content.html","<div id=\"wrapper\"><div ng-include=\"\'components/common/navigation.html\'\"></div><div id=\"page-wrapper\" class=\"gray-bg {{$state.current.name}}\"><div ng-include=\"\'components/common/topnavbar.html\'\"></div><div ui-view=\"\"></div><div ng-include=\"\'components/common/footer.html\'\"></div></div></div>");
$templateCache.put("components/common/footer.html","<div class=\"footer\"></div>");
$templateCache.put("components/common/ibox_tools.html","<div class=\"ibox-tools dropdown\" dropdown=\"\"><a ng-click=\"showhide()\"><i class=\"fa fa-chevron-up\"></i></a> <a class=\"dropdown-toggle\" href=\"\" dropdown-toggle=\"\"><i class=\"fa fa-wrench\"></i></a><ul class=\"dropdown-menu dropdown-user\"><li><a href=\"\">Config option 1</a></li><li><a href=\"\">Config option 2</a></li></ul><a ng-click=\"closebox()\"><i class=\"fa fa-times\"></i></a></div>");
$templateCache.put("components/common/login_two_columns.html","<div class=\"loginColumns animated fadeInDown\"><div class=\"row\"><div class=\"col-md-6\"><h2 class=\"font-bold\">Welcome to IN+</h2><p>Perfectly designed and precisely prepared admin theme with over 50 pages with extra new web app views.</p><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.</p><p>When an unknown printer took a galley of type and scrambled it to make a type specimen book.</p><p><small>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</small></p></div><div class=\"col-md-6\"><div class=\"ibox-content\"><form class=\"m-t\" role=\"form\" action=\"index.html\"><div class=\"form-group\"><input type=\"email\" class=\"form-control\" placeholder=\"Username\" required=\"\"></div><div class=\"form-group\"><input type=\"password\" class=\"form-control\" placeholder=\"Password\" required=\"\"></div><button type=\"submit\" class=\"btn btn-primary block full-width m-b\">Login</button> <a href=\"#\"><small>Forgot password?</small></a><p class=\"text-muted text-center\"><small>Do not have an account?</small></p><a class=\"btn btn-sm btn-white btn-block\" href=\"register.html\">Create an account</a></form><p class=\"m-t\"><small>Inspinia we app framework base on Bootstrap 3 &copy; 2014</small></p></div></div></div><hr><div class=\"row\"><div class=\"col-md-6\">Copyright Example Company</div><div class=\"col-md-6 text-right\"><small>© 2014-2015</small></div></div></div>");
$templateCache.put("components/common/navigation.html","<nav class=\"navbar-default navbar-static-side\" role=\"navigation\"><span ng-show=\"authData\"><div class=\"sidebar-collapse\"><ul side-navigation=\"\" class=\"nav metismenu\" id=\"side-menu\"><li class=\"nav-header\"><div class=\"dropdown profile-element\" dropdown=\"\"><img alt=\"image\" class=\"img-circle profile-img-google\" ng-src=\"{{userImage}}\"> <a class=\"dropdown-toggle\" dropdown-toggle=\"\" href=\"\"><span class=\"clear\"><span class=\"block m-t-xs\"><strong class=\"font-bold\">Howdy, {{userName}}</strong></span></span></a><ul class=\"dropdown-menu animated fadeInRight m-t-xs\"></ul></div><div class=\"logo-element\">RT+</div></li><li ui-sref-active=\"active\"><a ui-sref=\"index.table\"><i class=\"fa fa-laptop\"></i> <span class=\"nav-label\">Portfolio</span></a></li><li ui-sref-active=\"active\"><a ui-sref=\"index.upload\"><i class=\"fa fa-upload\"></i> <span class=\"nav-label\">Upload</span></a></li></ul></div></span></nav>");
$templateCache.put("components/common/topnavbar.html","<div class=\"row border-bottom\"><nav class=\"navbar navbar-static-top white-bg\" role=\"navigation\" style=\"margin-bottom: 0\"><div class=\"navbar-header\"><span minimaliza-sidebar=\"\"></span></div><ul class=\"nav navbar-top-links navbar-right\"><li><div ng-show=\"authData\"><button type=\"button\" class=\"btn btn-default navbar-btn navbar-right\" ng-click=\"logout()\">Logout</button></div></li></ul></nav></div>");}]);