/// <reference path="../../typings/angular-gamepad/angular-gamepad.d.ts"/>

module ng.gamepad {
  'use strict';

  /**
   * Gamepad provider
   * @ngdoc provider
   */
  export class GamepadProvider implements IGamepadProvider {
    private static BUTTON_MAPPING = {
      A: 0,
      B: 1,
      X: 2,
      Y: 3,
      LB: 4,
      RB: 5,
      LS: 10,
      RS: 11,
      Select: 8,
      Start: 9
    };
    private manual: boolean = false;
    private gamepads: IGamepad[] = [];

    /**
     * Class constructor
     */
    constructor() {

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
    manualPolling(enabled: boolean): IGamepadProvider {
      this.manual = enabled;
      return this;
    }

    getGamepadsCount(): number {
      return this.gamepads.length;
    }

    getGamepad(index: number): IGamepad {
      return this.gamepads[index];
    }

    /**
     * Poll gamepad data and generate events
     */
    poll() {
      var gamepads = (<any>navigator).getGamepads();

      if (gamepads.length < this.gamepads.length) {
        this.gamepads.length = gamepads;
      }

      for (var i = 0; i != gamepads.length; ++i) {
        var gamepadData = gamepads[i];
        var gamepad;

        if (this.gamepads.length <= i) {
          this.gamepads.push({
            index: i,
            id: '?',
            buttons: {
              A: 0,
              B: 0,
              X: 0,
              Y: 0
            }
          });
        }

        gamepad = this.gamepads[i];
        gamepad.id = gamepadData.id;

        for (var name in GamepadProvider.BUTTON_MAPPING) {
          var buttonIndex = GamepadProvider.BUTTON_MAPPING[name];
          gamepad.buttons[name] = (buttonIndex < gamepadData.buttons.length) ? gamepadData.buttons[buttonIndex] : 0;
          console.log('gamepad #' + i + ' (' + gamepadData.id + ') => ' + name + ' = ' + gamepad.buttons[name]);
        }
      }
    }

    $get(): IGamepadProvider {
      return this;
    }
  }
}
