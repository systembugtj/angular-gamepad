/// <reference path="../../typings/angular-gamepad/angular-gamepad.d.ts"/>

module ng.gamepad {
  'use strict';

  /**
   * Gamepad controller
   * @ngdoc controller
   */
  export class GamepadController implements IGamepadController {
    gamepads: IGamepad[];

    /**
     * Class constructor
     */
    static $inject = ['$rootScope'];
    constructor($rootScope: ng.IScope) {
      this.gamepads = [];

      $rootScope.$on('gamepad:connected', (event: ng.IAngularEvent, gamepad: IGamepad) => {
        while (this.gamepads.length <= gamepad.index) {
          this.gamepads.push();
        }

        console.log('gamepad connected at index ' + gamepad.index);
      });

      $rootScope.$on('gamepad:updated', (event: ng.IAngularEvent, gamepad: IGamepad) => {
        console.log('gamepad updated at index ' + gamepad.index);
      });

      $rootScope.$on('gamepad:disconnected', (event: ng.IAngularEvent, index: number) => {
        console.log('gamepad disconnected at index ' + index);
      });
    }
  }
}
