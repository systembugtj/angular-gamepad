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
      L1: number;
      L2: number;
      LS: number;
      R1: number;
      R2: number;
      RS: number;
      Select: number;
      Start: number;
      Guide: number;
    }

    interface IGamepadAxis {
      X: number;
      Y: number;
    }

    interface IGamepadDirectionalPad {
      Left: number;
      Right: number;
      Up: number;
      Down: number;
    }

    interface IGamepad {
      index: number;
      id: string;
      mapping: string;
      buttons: IGamepadButtons;
      DPad: IGamepadDirectionalPad;
      LS: IGamepadAxis;
      RS: IGamepadAxis;
    }

    interface IGamepadService extends ng.IServiceProvider {
      isSupported(): boolean;
      isPollingManual(): boolean;
      manualPolling(enabled: boolean): IGamepadService;
      getGamepadCount(): number;
      getGamepad(index: number): IGamepad;
    }

    interface IGamepadScope extends ng.IScope {
      count: number;
      gamepads: {[index: number]: IGamepad};
    }

    interface IGamepadController {

    }
}
