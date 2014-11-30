/// <reference path="../../typings/angular-gamepad/angular-gamepad.d.ts"/>
/// <reference path="provider.ts"/>
/// <reference path="controller.ts"/>

module ng.gamepad {
  'use strict';

  angular.module('ngGamepad', [])
    .provider('$gamepad', GamepadProvider)
    .controller('GamepadCtrl', GamepadController)
    .run(['$gamepad', function($gamepad) {
      if ($gamepad.isPollingManual() || !$gamepad.isSupported()) {
        return;
      }

      function pollingLoop() {
        $gamepad.poll();
        window.requestAnimationFrame(pollingLoop);
      }

      pollingLoop();

      window.addEventListener('gamepadconnected', function() {
        console.log('gamepad connected');
      });

      window.addEventListener('gamepaddisconnected', function() {
        console.log('gamepad disconnected');
      });
    }])
  ;
}
