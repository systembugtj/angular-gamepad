/// <reference path="../../typings/angular-gamepad/angular-gamepad.d.ts"/>

module ng.gamepad {
  'use strict';

  /**
   * Gamepad service
   * @ngdoc service
   */
  export class GamepadService implements IGamepadService {
    private static BUTTON_MAPPING = {
      A: 0,
      B: 1,
      X: 2,
      Y: 3,
      L1: 4,
      L2: 6,
      LS: 10,
      R1: 5,
      R2: 7,
      RS: 11,
      Select: 8,
      Start: 9
    };
    private static DPAD_MAPPING = {
      Up: 12,
      Down: 13,
      Right: 15,
      Left: 14
    };
    private static AXIS_MAPPING = {
      LS: {
        X: 0,
        Y: 1
      },
      RS: {
        X: 2,
        Y: 3
      }
    };
    private static DEFAULT_BUTTONS: IGamepadButtons = {
      A: 0,
      B: 0,
      X: 0,
      Y: 0,
      L1: 0,
      L2: 0,
      LS: 0,
      R1: 0,
      R2: 0,
      RS: 0,
      Select: 0,
      Start: 0,
      Guide: 0
    };
    private static DEFAULT_DPAD: IGamepadDirectionalPad = {
      Up: 0,
      Down: 0,
      Left: 0,
      Right: 0
    };
    private static DEFAULT_AXIS: IGamepadAxis = {
      X: 0,
      Y: 0
    };
    private manual: boolean = false;
    private gamepads: {[s: number]: IGamepad} = {};
    private count: number = 0;

    /**
     * Class constructor
     * @param $rootScope Root scope
     */
    static $inject = ['$rootScope'];
    constructor(private $rootScope: ng.IRootScopeService) {

    }

    /**
     * Test whether gamepad support is available
     * @return true if the browser supports the Gamepad API
     */
    isSupported(): boolean {
      return !!('getGamepads' in navigator);
    }

    /**
     * Test whether manual polling is enabled
     * @return true if enabled
     */
    isPollingManual(): boolean {
      return this.manual;
    }

    /**
     * Enable/disable manual polling
     * @param enabled true if calls to poll() will be done manually
     * @return this
     */
    manualPolling(enabled: boolean): IGamepadService {
      this.manual = enabled;
      return this;
    }

    getGamepadCount(): number {
      return this.count;
    }

    getGamepad(index: number): IGamepad {
      return this.gamepads[index];
    }

    /**
     * Poll gamepad data and generate events
     */
    poll() {
      var gamepads = (<any>navigator).getGamepads();
      var existing = {};
      var i;

      for (i in this.gamepads) {
        existing[i] = null;
      }

      for (i = 0; i != gamepads.length; ++i) {
        var gamepadData = gamepads[i];

        if (gamepadData) {
          var buttons = gamepadData.buttons;
          var axes = gamepadData.axes;
          var changed = false;
          var connected = false;
          var gamepad;
          var name;

          if (!(gamepadData.index in this.gamepads)) {
            gamepad = this.gamepads[gamepadData.index] = {
              index: gamepadData.index,
              id: null,
              mapping: null,
              buttons: angular.copy(GamepadService.DEFAULT_BUTTONS),
              DPad: angular.copy(GamepadService.DEFAULT_DPAD),
              LS: angular.copy(GamepadService.DEFAULT_AXIS),
              RS: angular.copy(GamepadService.DEFAULT_AXIS)
            };

            connected = true;
          } else {
            gamepad = this.gamepads[gamepadData.index];
          }

          gamepad.id = gamepadData.id;

          for (name in GamepadService.BUTTON_MAPPING) {
            var buttonIndex = GamepadService.BUTTON_MAPPING[name];
            var value = (buttonIndex < buttons.length) ? buttons[buttonIndex].value : 0;

            if (gamepad.buttons[name] !== value) {
              gamepad.buttons[name] = value;
              changed = true;
            }
          }

          for (name in GamepadService.DPAD_MAPPING) {
            var buttonIndex = GamepadService.DPAD_MAPPING[name];
            var value = (buttonIndex < buttons.length) ? buttons[buttonIndex].value : 0;

            if (gamepad.DPad[name] !== value) {
              gamepad.DPad[name] = value;
              changed = true;
            }
          }

          for (name in GamepadService.AXIS_MAPPING) {
            var mapping = GamepadService.AXIS_MAPPING[name];

            for (var axis in mapping) {
              var axisIndex = mapping[axis];
              var value = (axisIndex < axes.length) ? axes[axisIndex] : 0;

              if (gamepad[name][axis] !== value) {
                gamepad[name][axis] = value;
                changed = true;
              }
            }
          }

          delete existing[gamepad.index];

          if (connected) {
            ++this.count;
            this.$rootScope.$broadcast('gamepad:connected', gamepad);
          }

          if (changed) {
            this.$rootScope.$broadcast('gamepad:updated', gamepad);
          }
        }
      }

      for (i in existing) {
        --this.count;
        this.$rootScope.$broadcast('gamepad:disconnected', i);
        delete this.gamepads[i];
      }
    }

    $get() {
      return this;
    }
  }
}
