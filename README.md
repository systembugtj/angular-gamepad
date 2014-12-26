angular-gamepad
===============
[![License](https://img.shields.io/badge/License-Apache_2.0-red.svg?style=flat-square)](https://github.com/pcx360/angular-gamepad/blob/master/LICENSE)
[![Language](https://img.shields.io/badge/Language-TypeScript-red.svg?style=flat-square)](http://www.typescriptlang.org/)
[![AngularJS](https://img.shields.io/badge/AngularJS-1.3.8-green.svg?style=flat-square)](https://angularjs.org/)

[angular-gamepad](https://github.com/pcx360/angular-gamepad/) is an [AngularJS](https://angularjs.org/) module written in [TypeScript](http://en.wikipedia.org/wiki/TypeScript). It provides access to gamepad information using the [Gamepad W3C API](https://dvcs.w3.org/hg/gamepad/raw-file/default/gamepad.html). It is designed to work like [angular-hotkeys](https://github.com/chieffancypants/angular-hotkeys/): configuration-centric gamepad shortcuts. There is also a small convenience controller that provides direct access to gamepad information.

**Requirements**: AngularJS 1.3+, Chrome 25+, Firefox 29+, Opera 24+

**Note**: Internet Explorer and Safari do not support the Gamepad API yet

## Installation

The module is not yet available through traditional package managers such as Bower, meaning the commands below will not work. Packages will start appearing once the library reaches a stable state.

### Bower

```
bower install angular-gamepad --save
```

Then add a reference to `angular-gamepad.min.js`.

### TypeScript Definition Manager

```
tsd install angular-gamepad --save
```

Then add a reference to `angular-gamepad/angular-gamepad.d.ts`.

## Usage

### Configuration

Reference the `ngGamepad` module and configure it.

```
angular.module('myModule', ['ngGamepad'])
  .config(['$gamepadProvider', function($gamepadProvider) {
    $gamepadProvider
      .manualPolling(false)
    ;
  }])
;
```

If manual polling is enabled, the application using this module is responsible for calling `$gamepad.poll()`, preferably from a `requestAnimationFrame` callback.

### Controller

The module provides a simple controller named `GamepadCtrl`.

This controller provides access to gamepad properties and is automatically updated whenever a gamepad's state changes.

```
<div ng-controller="GamepadCtrl">
  <div ng-repeat="(index, gamepad) in gamepads">

    <h2>#{{gamepad.index}} is {{gamepad.id}} ({{gamepad.mapping}} mapping)</h2>

    <h3>D-Pad</h3>
    <div ng-repeat="(name, value) in gamepad.DPad">
      {{name}} = {{value}}
    </div>

    <h3>Buttons</h3>
    <div ng-repeat="(name, value) in gamepad.buttons">
      {{name}} = {{value}}
    </div>

    <h3>Left Stick</h3>
    {{gamepad.LS.X}},{{gamepad.LS.Y}}

    <h3>Right Stick</h3>
    {{gamepad.RS.X}},{{gamepad.RS.Y}}

  </div>
</div>
```

### Routing

You can define gamepad shortcuts on routes. They will be (un)bound as you navigate the application.

```
angular.module('myModule', ['ngRoute', 'ngGamepad'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
      controller: 'MyController',
      templateUrl: 'views/myview.html',
      gamepad: [{
        combination: 'B',
        label: 'Go back to the previous screen',
        action: 'back()'
      }]
    });
  })
;
```

### Directive

You can define gamepad shortcuts on directives.

```
<dialog-box title="My Dialog Box" gamepad="{B: close}">
</dialog-box>
```

## Contribute

In order to work on this project, you need to first install its dependencies using [npm](https://www.npmjs.org/), [Bower](http://bower.io/) and [tsd](http://definitelytyped.org/tsd/).

```
npm install
bower install
tsd reinstall
```

Once all the dependencies are installed, [Grunt](http://gruntjs.com/) can be used to automatically build the project whenever files change.

```
grunt livereload
```

### Linking

In order to test the module directly, it is possible to link to it from another project.

```
cd angular-gamepad
bower link
cd ../other-project
bower link angular-gamepad
```

### Packaging

Grunt can be used to generate the JavaScript file used for distribution. It gets created in the ``dist`` folder.

```
grunt
```
