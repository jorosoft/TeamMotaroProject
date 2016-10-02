SystemJS.config({
    'transpiler': 'plugin-babel',
    'map': {
        'plugin-babel': '../lib/plugin-babel.js',
        'systemjs-babel-build': '../lib/systemjs-babel-browser.js',
        'jquery': '../lib/jquery-3.1.0.min.js',
        'bootstrap': '../lib/bootstrap.min.js',
        'firebase': '../lib/firebase.js',
        'jqueryUI': '../lib/jquery-ui.min.js',
        'main': '../scripts/common/main.js',
        'validator': '../scripts/common/validator.js',
        'users-authentication': '../scripts/common/users-authentication.js',
        'models': '../scripts/common/models.js',

        'blackjack': '../scripts/blackjack/ui.js',
        'blackjackEngine': '../scripts/blackjack/engine.js',
        'blackjackModels': '../scripts/blackjack/models.js',

        'roulette': '../scripts/roulette/ui.js',
        'rouletteEngine': '../scripts/roulette/engine.js',
        'rouletteModels': '../scripts/roulette/models.js',

        'slotMachine': '../scripts/slot-machine/ui.js',
        'slotMachineEngine': '../scripts/slot-machine/engine.js',
        'slotMachineModels': '../scripts/slot-machine/models.js'
    }
});

System.import('main');