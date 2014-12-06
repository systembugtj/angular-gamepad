/// <reference path="../../typings/angular-gamepad/angular-gamepad.d.ts"/>

module ng.gamepad {
  'use strict';

  /**
   * Gamepad controller
   * @ngdoc controller
   */
  export class GamepadController implements IGamepadController {
    /**
     * Class constructor
     */
    static $inject = ['$scope', '$gamepad'];
    constructor($scope: IGamepadScope, $gamepad: IGamepadService) {
      $scope.count = 0;
      $scope.gamepads = {};

      $scope.$on('gamepad:connected', (event: ng.IAngularEvent, gamepad: IGamepad) => {
        $scope.gamepads[gamepad.index] = angular.copy(gamepad);
        $scope.count = $gamepad.getGamepadCount();
        $scope.$apply();
      });

      $scope.$on('gamepad:updated', (event: ng.IAngularEvent, gamepad: IGamepad) => {
        $scope.gamepads[gamepad.index] = angular.copy(gamepad);
        $scope.count = $gamepad.getGamepadCount();
        $scope.$apply();
      });

      $scope.$on('gamepad:disconnected', (event: ng.IAngularEvent, index: number) => {
        delete $scope.gamepads[index];
        $scope.count = $gamepad.getGamepadCount();
        $scope.$apply();
      });
    }
  }
}
