// application.js
import { MainService } from './main-service';
import { MainController } from './main-controller';
import { StatesProvider } from './state-provider';

angular.module('application', [])
    .service('MainService', MainService)
    .controller('MainController', MainController)
    .provider('StatesProvider', StatesProvider);
