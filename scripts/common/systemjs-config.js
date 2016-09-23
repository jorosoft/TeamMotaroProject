SystemJS.config({
    'transpiler': 'plugin-babel',
    'map': {
        'plugin-babel': 'lib/plugin-babel.js',
        'systemjs-babel-build': 'lib/systemjs-babel-browser.js',
        'jquery': '../../lib/jquery-3.1.0.min.js',
        'bootstrap': '../../lib/bootstrap.min.js',
        'main': 'scripts/common/main.js',
        'validator': 'scripts/common/validator.js'
    }
});

System.import('main');