import angular from 'angular';
import menusCtrl from './menus.js';
import addVersion from './addVersion.js';

export default angular.module('ControllerModule', [])
.controller('menusCtrl',menusCtrl)
.controller('addVersion',addVersion)
.name
