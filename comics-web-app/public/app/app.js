/**
 * Created by anastasiya on 5.11.16.
 */

import angular from 'angular';
import {sliderCtrl} from './app.controller';

var appName = angular.module("comicsapp", ['ngRoute', 'ngResource'])
    .config(['$routeProvider', function($routeProvider) {


        $routeProvider
            .when('/', {
                controller: sliderCtrl,
                templateUrl: "components/slider/slider.html"

            });

    }]);