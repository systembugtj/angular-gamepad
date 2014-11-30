
[angular-gamepad](https://github.com/pcx360/angular-gamepad/) is an [AngularJS](https://angularjs.org/) module written in [TypeScript](http://en.wikipedia.org/wiki/TypeScript). It provides access to gamepad information using the [Gamepad W3C API](https://dvcs.w3.org/hg/gamepad/raw-file/default/gamepad.html). It is designed to work like [angular-hotkeys](https://github.com/chieffancypants/angular-hotkeys/): configuration-centric gamepad shortcuts. There is also a small convenience controller that provides direct access to gamepad information.

**Requirements**: AngularJS 1.3+, Chrome 25+, Firefox 29+, Opera 24+

**Note**: Internet Explorer and Safari do not support the Gamepad API yet

# License

angular-gamepad is available under an [MIT license](https://github.com/pcx360/angular-gamepad/blob/master/LICENSE).

# Installation

The module is not yet available through traditional package managers such as Bower, meaning the commands below will not work. Packages will start appearing once the library reaches a stable state.

## Bower

```
bower install angular-gamepad --save
```

Then add a reference to `angular-gamepad.min.js`.

## TypeScript Definition Manager

```
tsd install angular-gamepad --save
```

Then add a reference to `angular-gamepad/angular-gamepad.d.ts`.

# Usage

## Configuration

Reference the `ngGamepad` module and configure it.

```
angular.module('myModule', ['ngGamepad'])
  .config(['$gamepadProvider', function($gamepadProvider) {

  }])
;
```

## Controller

You can define gamepad shortcuts on controllers.

```
angular.module('myModule', ['ngGamepad'])
  .controller('VolumeCtrl', ['$scope', '$gamepad', function($scope, $gamepad) {
    $scope.volume = 10;
    $gamepad.add({
      combination: 'Select+RT',
      label: 'Increase volume',
      callback: function() {
        ++$scope.volume;
      }
    });

    $gamepad.bindTo($scope)
      .add({
        combination: 'B',
        label: 'Go back',
        callback: function() {
        }
      })
    ;
  }])
;
```

## Routing

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

## Directive

You can define gamepad shortcuts on directives.

```
<dialog-box title="My Dialog Box" gamepad="{B: close}">
</dialog-box>
```

# Contribute

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

## Linking

In order to test the module directly, it is possible to link to it from another project.

```
cd angular-gamepad
bower link
cd ../other-project
bower link angular-gamepad
```

## Packaging

Grunt can be used to generate the JavaScript file used for distribution. It gets created in the ``dist`` folder.

```
grunt
```
