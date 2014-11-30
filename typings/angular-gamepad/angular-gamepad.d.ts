// Type definitions for Angular Gamepad 0.1.0+
// Project: https://github.com/pcx360/angular-gamepad
// Definitions by: Michael Putters <https://github.com/mputters>

/// <reference path="../angularjs/angular.d.ts"/>

declare module ng.gamepad {
    interface IGamepadButtons {
      A: number;
      B: number;
      X: number;
      Y: number;
    }

    interface IGamepad {
      index: number;
      id: string;
      mapping: string;
      buttons: IGamepadButtons;
    }

    interface IGamepadProvider extends ng.IServiceProvider {
      isSupported(): boolean;
      isPollingManual(): boolean;
      manualPolling(enabled: boolean): IGamepadProvider;
      getGamepadsCount(): number;
      getGamepad(index: number): IGamepad;
    }

    interface IGamepadController {

    }
}
