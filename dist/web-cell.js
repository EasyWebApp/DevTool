#! /usr/bin/env node

//
//  Generated by https://www.npmjs.com/package/amd-bundle
//
(function (factory) {

    if ((typeof define === 'function')  &&  define.amd)
        define('web-cell', ["child_process","stylus","fs-extra","path","jsdom","amd-bundle","less","sass","fs","commander","puppeteer-browser"], factory);
    else if (typeof module === 'object')
        return  module.exports = factory(require('child_process'),require('stylus'),require('fs-extra'),require('path'),require('jsdom'),require('amd-bundle'),require('less'),require('sass'),require('fs'),require('commander'),require('puppeteer-browser'));
    else
        return  this['web-cell'] = factory(this['child_process'],this['stylus'],this['fs-extra'],this['path'],this['jsdom'],this['amd-bundle'],this['less'],this['sass'],this['fs'],this['commander'],this['puppeteer-browser']);

})(function (child_process,stylus,fs_extra,path,jsdom,amd_bundle,less,sass,fs,commander,puppeteer_browser) {

function merge(base, path) {

    return (base + '/' + path).replace(/\/\//g, '/').replace(/[^/.]+\/\.\.\//g, '').replace(/\.\//g, function (match, index, input) {

        return input[index - 1] === '.' ? match : '';
    });
}

function outPackage(name) {
    return (/^[^./]/.test(name)
    );
}

    var require = _require_.bind(null, './');

    function _require_(base, path) {

        var module = _module_[
                outPackage( path )  ?  path  :  ('./' + merge(base, path))
            ],
            exports;

        if (! module.exports) {

            module.exports = { };

            var dependency = module.dependency;

            for (var i = 0;  dependency[i];  i++)
                module.dependency[i] = require( dependency[i] );

            exports = module.factory.apply(
                null,  module.dependency.concat(
                    _require_.bind(null, module.base),  module.exports,  module
                )
            );

            if (exports != null)  module.exports = exports;

            delete module.dependency;  delete module.factory;
        }

        return module.exports;
    }

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _module_ = {
    './utility': {
        base: '.',
        dependency: [],
        factory: function factory(require, exports, module) {
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.getNPMConfig = getNPMConfig;
            exports.setNPMConfig = setNPMConfig;
            exports.parseStylus = parseStylus;

            var _child_process = require('child_process');

            var _stylus = require('stylus');

            var _stylus2 = _interopRequireDefault(_stylus);

            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : { default: obj };
            }

            /**
             * @param {string} key
             *
             * @return {?*}
             */
            function getNPMConfig(key) {

                var value = ((0, _child_process.execSync)('npm get ' + key) + '').trim();

                if (value !== 'undefined') try {
                    return JSON.parse(value);
                } catch (error) {
                    return value;
                }
            }

            /**
             * @param {string} key
             * @param {*}      value
             */
            function setNPMConfig(key, value) {

                (0, _child_process.execSync)('npm set ' + key + ' ' + value);

                console.info(key + ' = ' + value);
            }

            /**
             * @param {string} source
             * @param {Object} [option] - https://github.com/stylus/stylus/blob/HEAD/docs/js.md
             *
             * @return {Promise<string>} CSS source code
             */
            function parseStylus(source) {
                var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


                return new Promise(function (resolve, reject) {
                    return _stylus2.default.render(source, option, function (error, CSS) {
                        return error ? reject(error) : resolve(CSS);
                    });
                });
            }
        }
    },
    './Component': {
        base: '.',
        dependency: [],
        factory: function factory(require, exports, module) {
            Object.defineProperty(exports, "__esModule", {
                value: true
            });

            var _fsExtra = require('fs-extra');

            var _path = require('path');

            var _jsdom = require('jsdom');

            var _amdBundle = require('amd-bundle');

            var _amdBundle2 = _interopRequireDefault(_amdBundle);

            var _less = require('less');

            var _less2 = _interopRequireDefault(_less);

            var _sass = require('sass');

            var SASS = _interopRequireWildcard(_sass);

            var _utility = require('./utility');

            function _interopRequireWildcard(obj) {
                if (obj && obj.__esModule) {
                    return obj;
                } else {
                    var newObj = {};if (obj != null) {
                        for (var key in obj) {
                            if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                        }
                    }newObj.default = obj;return newObj;
                }
            }

            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : { default: obj };
            }

            var document = new _jsdom.JSDOM().window.document;

            /**
             * Component packer
             */

            var Component = function () {
                /**
                 * @param {string} path - Component directory
                 */
                function Component(path) {
                    _classCallCheck(this, Component);

                    this.path = path;

                    this.name = (0, _path.basename)(path);

                    this.entry = (0, _path.join)(path, 'index');
                }

                /**
                 * @param {string} path
                 *
                 * @return {DocumentFragment}
                 */


                _createClass(Component, [{
                    key: 'toHTML',


                    /**
                     * @return {DocumentFragment} HTML version bundle of this component
                     */
                    value: function () {
                        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                            var _fragment$querySelect;

                            var fragment, CSS, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, sheet, style, script;

                            return regeneratorRuntime.wrap(function _callee$(_context) {
                                while (1) {
                                    switch (_context.prev = _context.next) {
                                        case 0:
                                            _context.next = 2;
                                            return Component.parseHTML(this.entry + '.html');

                                        case 2:
                                            fragment = _context.sent;
                                            CSS = [];
                                            _iteratorNormalCompletion = true;
                                            _didIteratorError = false;
                                            _iteratorError = undefined;
                                            _context.prev = 7;
                                            _iterator = Component.findStyle(fragment)[Symbol.iterator]();

                                        case 9:
                                            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                                                _context.next = 21;
                                                break;
                                            }

                                            sheet = _step.value;
                                            _context.next = 13;
                                            return Component.parseCSS(sheet.textContent || (0, _path.join)(this.path, sheet.getAttribute('href')), sheet.type, this.entry + '.css');

                                        case 13:
                                            style = _context.sent;

                                            if (style) {
                                                _context.next = 16;
                                                break;
                                            }

                                            return _context.abrupt('continue', 18);

                                        case 16:

                                            sheet.replaceWith(style);

                                            if (style.parentNode === fragment) CSS.push(style);

                                        case 18:
                                            _iteratorNormalCompletion = true;
                                            _context.next = 9;
                                            break;

                                        case 21:
                                            _context.next = 27;
                                            break;

                                        case 23:
                                            _context.prev = 23;
                                            _context.t0 = _context['catch'](7);
                                            _didIteratorError = true;
                                            _iteratorError = _context.t0;

                                        case 27:
                                            _context.prev = 27;
                                            _context.prev = 28;

                                            if (!_iteratorNormalCompletion && _iterator.return) {
                                                _iterator.return();
                                            }

                                        case 30:
                                            _context.prev = 30;

                                            if (!_didIteratorError) {
                                                _context.next = 33;
                                                break;
                                            }

                                            throw _iteratorError;

                                        case 33:
                                            return _context.finish(30);

                                        case 34:
                                            return _context.finish(27);

                                        case 35:

                                            (_fragment$querySelect = fragment.querySelector('template').content).prepend.apply(_fragment$querySelect, CSS);

                                            script = fragment.querySelector('script');


                                            if (script) script.replaceWith(Component.parseJS((0, _path.join)(this.path, script.getAttribute('src'))));

                                            return _context.abrupt('return', fragment);

                                        case 39:
                                        case 'end':
                                            return _context.stop();
                                    }
                                }
                            }, _callee, this, [[7, 23, 27, 35], [28,, 30, 34]]);
                        }));

                        function toHTML() {
                            return _ref.apply(this, arguments);
                        }

                        return toHTML;
                    }()

                    /**
                     * @return {string} JS version bundle of this component
                     */

                }, {
                    key: 'toJS',
                    value: function () {
                        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                            var temp_file, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, file, type, temp, source;

                            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                while (1) {
                                    switch (_context2.prev = _context2.next) {
                                        case 0:
                                            temp_file = [];
                                            _iteratorNormalCompletion2 = true;
                                            _didIteratorError2 = false;
                                            _iteratorError2 = undefined;
                                            _context2.prev = 4;
                                            _context2.next = 7;
                                            return (0, _fsExtra.readdir)(this.path);

                                        case 7:
                                            _context2.t0 = Symbol.iterator;
                                            _iterator2 = _context2.sent[_context2.t0]();

                                        case 9:
                                            if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                                                _context2.next = 43;
                                                break;
                                            }

                                            file = _step2.value;


                                            file = (0, _path.join)(this.path, file);

                                            if ((0, _fsExtra.statSync)(file).isFile()) {
                                                _context2.next = 14;
                                                break;
                                            }

                                            return _context2.abrupt('continue', 40);

                                        case 14:
                                            type = file.split('.').slice(-1)[0], temp = file + '.js';
                                            _context2.t1 = type;
                                            _context2.next = _context2.t1 === 'html' ? 18 : _context2.t1 === 'js' ? 26 : _context2.t1 === 'json' ? 27 : 32;
                                            break;

                                        case 18:
                                            _context2.t2 = JSON;
                                            _context2.t3 = Component;
                                            _context2.next = 22;
                                            return this.toHTML();

                                        case 22:
                                            _context2.t4 = _context2.sent;
                                            _context2.t5 = _context2.t3.stringOf.call(_context2.t3, _context2.t4);
                                            file = _context2.t2.stringify.call(_context2.t2, _context2.t5);
                                            return _context2.abrupt('break', 37);

                                        case 26:
                                            return _context2.abrupt('continue', 40);

                                        case 27:
                                            _context2.next = 29;
                                            return (0, _fsExtra.readFile)(file);

                                        case 29:
                                            _context2.t6 = _context2.sent;
                                            file = _context2.t6 + '';
                                            return _context2.abrupt('break', 37);

                                        case 32:
                                            _context2.t7 = JSON;
                                            _context2.next = 35;
                                            return Component.parseCSS(file);

                                        case 35:
                                            _context2.t8 = _context2.sent.textContent;
                                            file = _context2.t7.stringify.call(_context2.t7, _context2.t8);

                                        case 37:

                                            temp_file.push(temp);

                                            _context2.next = 40;
                                            return (0, _fsExtra.outputFile)(temp, 'export default ' + file);

                                        case 40:
                                            _iteratorNormalCompletion2 = true;
                                            _context2.next = 9;
                                            break;

                                        case 43:
                                            _context2.next = 49;
                                            break;

                                        case 45:
                                            _context2.prev = 45;
                                            _context2.t9 = _context2['catch'](4);
                                            _didIteratorError2 = true;
                                            _iteratorError2 = _context2.t9;

                                        case 49:
                                            _context2.prev = 49;
                                            _context2.prev = 50;

                                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                                _iterator2.return();
                                            }

                                        case 52:
                                            _context2.prev = 52;

                                            if (!_didIteratorError2) {
                                                _context2.next = 55;
                                                break;
                                            }

                                            throw _iteratorError2;

                                        case 55:
                                            return _context2.finish(52);

                                        case 56:
                                            return _context2.finish(49);

                                        case 57:
                                            source = new _amdBundle2.default(this.entry).bundle(Component.identifierOf(this.name));
                                            _context2.next = 60;
                                            return Promise.all(temp_file.map(function (file) {
                                                return (0, _fsExtra.remove)(file);
                                            }));

                                        case 60:
                                            return _context2.abrupt('return', source);

                                        case 61:
                                        case 'end':
                                            return _context2.stop();
                                    }
                                }
                            }, _callee2, this, [[4, 45, 49, 57], [50,, 52, 56]]);
                        }));

                        function toJS() {
                            return _ref2.apply(this, arguments);
                        }

                        return toJS;
                    }()
                }], [{
                    key: 'parseHTML',
                    value: function () {
                        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(path) {
                            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                                while (1) {
                                    switch (_context3.prev = _context3.next) {
                                        case 0:
                                            _context3.t0 = _jsdom.JSDOM;
                                            _context3.next = 3;
                                            return (0, _fsExtra.readFile)(path);

                                        case 3:
                                            _context3.t1 = _context3.sent;
                                            _context3.t2 = _context3.t1 + '';
                                            return _context3.abrupt('return', _context3.t0.fragment.call(_context3.t0, _context3.t2));

                                        case 6:
                                        case 'end':
                                            return _context3.stop();
                                    }
                                }
                            }, _callee3, this);
                        }));

                        function parseHTML(_x2) {
                            return _ref3.apply(this, arguments);
                        }

                        return parseHTML;
                    }()

                    /**
                     * @param {string}  source - File path or Style source code
                     * @param {?string} type   - MIME type
                     * @param {string}  [base] - Path of the file which `@import` located in
                     *
                     * @return {?Element} Style element
                     */

                }, {
                    key: 'parseCSS',
                    value: function () {
                        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(source, type, base) {
                            var style, paths;
                            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                                while (1) {
                                    switch (_context4.prev = _context4.next) {
                                        case 0:

                                            type = type ? type.split('/')[1] : (0, _path.extname)(source).slice(1);

                                            if (source.includes('\n')) {
                                                _context4.next = 6;
                                                break;
                                            }

                                            _context4.next = 4;
                                            return (0, _fsExtra.readFile)(base = source);

                                        case 4:
                                            _context4.t0 = _context4.sent;
                                            source = _context4.t0 + '';

                                        case 6:
                                            paths = [(0, _path.dirname)(base)];
                                            _context4.t1 = type;
                                            _context4.next = _context4.t1 === 'css' ? 10 : _context4.t1 === 'sass' ? 12 : _context4.t1 === 'scss' ? 12 : _context4.t1 === 'less' ? 14 : _context4.t1 === 'stylus' ? 18 : 21;
                                            break;

                                        case 10:
                                            style = source;return _context4.abrupt('break', 21);

                                        case 12:
                                            style = SASS.renderSync({
                                                data: source,
                                                includePaths: paths
                                            }).css;
                                            return _context4.abrupt('break', 21);

                                        case 14:
                                            _context4.next = 16;
                                            return _less2.default.render(source, { paths: paths });

                                        case 16:
                                            style = _context4.sent.css;
                                            return _context4.abrupt('break', 21);

                                        case 18:
                                            _context4.next = 20;
                                            return (0, _utility.parseStylus)(source, { paths: paths });

                                        case 20:
                                            style = _context4.sent;

                                        case 21:
                                            return _context4.abrupt('return', style && Object.assign(document.createElement('style'), { textContent: style }));

                                        case 22:
                                        case 'end':
                                            return _context4.stop();
                                    }
                                }
                            }, _callee4, this);
                        }));

                        function parseCSS(_x3, _x4, _x5) {
                            return _ref4.apply(this, arguments);
                        }

                        return parseCSS;
                    }()

                    /**
                     * @param {DocumentFragment} fragment
                     *
                     * @return {Element[]}
                     */

                }, {
                    key: 'findStyle',
                    value: function findStyle(fragment) {
                        var _ref5;

                        return [].concat(_toConsumableArray(fragment.querySelectorAll('link[rel="stylesheet"]')), _toConsumableArray((_ref5 = []).concat.apply(_ref5, _toConsumableArray(Array.from(fragment.querySelectorAll('template'), function (template) {
                            return [].concat(_toConsumableArray(template.content.querySelectorAll('style')));
                        })))));
                    }

                    /**
                     * @param {string} tagName
                     *
                     * @return {string}
                     */

                }, {
                    key: 'identifierOf',
                    value: function identifierOf(tagName) {

                        return tagName[0].toUpperCase() + tagName.replace(/-(\w)/g, function (_, char) {
                            return char.toUpperCase();
                        }).slice(1);
                    }

                    /**
                     * @param {string} path
                     *
                     * @return {Element}
                     */

                }, {
                    key: 'parseJS',
                    value: function parseJS(path) {

                        path = path.split('.').slice(0, -1).join('.');

                        return Object.assign(document.createElement('script'), {
                            text: '\n' + new _amdBundle2.default(path).bundle(this.identifierOf((0, _path.basename)((0, _path.dirname)(path)))) + '\n'
                        });
                    }

                    /**
                     * @param {DocumentFragment} fragment
                     *
                     * @return {string}
                     */

                }, {
                    key: 'stringOf',
                    value: function stringOf(fragment) {

                        return Array.from(fragment.childNodes, function (node) {
                            return node[node.nodeType === 1 ? 'outerHTML' : 'nodeValue'];
                        }).join('');
                    }
                }]);

                return Component;
            }();

            exports.default = Component;
        }
    },
    './command': {
        base: '.',
        dependency: [],
        factory: function factory(require, exports, module) {

            /**
             * Bundle components to JS modules (or HTML files)
             *
             * @param {string}  path   - Source directory
             * @param {boolean} [HTML] - Whether bundle as HTML
             *
             * @return {string[]} Component paths
             */
            var bundle = function () {
                var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(path, HTML) {
                    var _result;

                    var type, _type_, result, component;

                    return regeneratorRuntime.wrap(function _callee5$(_context5) {
                        while (1) {
                            switch (_context5.prev = _context5.next) {
                                case 0:
                                    type = HTML ? 'HTML' : 'JS';
                                    _type_ = type.toLowerCase(), result = [];

                                    if (!(0, _fsExtra.existsSync)((0, _path.join)(path, 'index.' + _type_))) {
                                        _context5.next = 12;
                                        break;
                                    }

                                    component = new _Component2.default(path);


                                    result[0] = 'dist/' + component.name + '.' + _type_;

                                    _context5.t0 = (0, _fsExtra.outputFile);
                                    _context5.t1 = result[0];
                                    _context5.next = 9;
                                    return component['to' + type]();

                                case 9:
                                    _context5.t2 = _context5.sent;
                                    _context5.next = 12;
                                    return (0, _context5.t0)(_context5.t1, _context5.t2);

                                case 12:
                                    if (!(0, _fsExtra.statSync)(path).isDirectory()) {
                                        _context5.next = 26;
                                        break;
                                    }

                                    _context5.t3 = (_result = result).concat;
                                    _context5.t4 = _result;
                                    _context5.t5 = _toConsumableArray;
                                    _context5.t6 = Promise;
                                    _context5.next = 19;
                                    return (0, _fsExtra.readdir)(path);

                                case 19:
                                    _context5.t7 = function (file) {
                                        return bundle((0, _path.join)(path, file), HTML);
                                    };

                                    _context5.t8 = _context5.sent.map(_context5.t7);
                                    _context5.next = 23;
                                    return _context5.t6.all.call(_context5.t6, _context5.t8);

                                case 23:
                                    _context5.t9 = _context5.sent;
                                    _context5.t10 = (0, _context5.t5)(_context5.t9);
                                    result = _context5.t3.apply.call(_context5.t3, _context5.t4, _context5.t10);

                                case 26:
                                    return _context5.abrupt('return', result);

                                case 27:
                                case 'end':
                                    return _context5.stop();
                            }
                        }
                    }, _callee5, this);
                }));

                return function bundle(_x6, _x7) {
                    return _ref6.apply(this, arguments);
                };
            }();

            /**
             * Bundle components into a JS or HTML package
             *
             * @param {string}  path   - Source directory
             * @param {boolean} [HTML] - Whether bundle as HTML
             *
             * @return {string[]} Component paths
             */


            var pack = function () {
                var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(path, HTML) {
                    var file;
                    return regeneratorRuntime.wrap(function _callee6$(_context6) {
                        while (1) {
                            switch (_context6.prev = _context6.next) {
                                case 0:
                                    _context6.prev = 0;
                                    _context6.next = 3;
                                    return bundle(path, HTML);

                                case 3:
                                    file = _context6.sent;
                                    _context6.next = 9;
                                    break;

                                case 6:
                                    _context6.prev = 6;
                                    _context6.t0 = _context6['catch'](0);

                                    console.error(_context6.t0);

                                case 9:
                                    _context6.next = 11;
                                    return (0, _fsExtra.outputFile)('dist/index.' + (HTML ? 'html' : 'js'), file.map(function (item) {

                                        item = (0, _path.basename)(item);

                                        console.info('\u221A Component "' + item + '" is packed in');

                                        return HTML ? '<link rel="import" href="' + item + '">' : 'export * from \'./' + item + '\';';
                                    }).join('\n'));

                                case 11:
                                    return _context6.abrupt('return', file);

                                case 12:
                                case 'end':
                                    return _context6.stop();
                            }
                        }
                    }, _callee6, this, [[0, 6]]);
                }));

                return function pack(_x8, _x9) {
                    return _ref7.apply(this, arguments);
                };
            }();

            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.bundle = bundle;
            exports.pack = pack;

            var _path = require('path');

            var _fsExtra = require('fs-extra');

            var _Component = require('./Component');

            var _Component2 = _interopRequireDefault(_Component);

            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : { default: obj };
            }
        }
    },
    './index': {
        base: '.',
        dependency: [],
        factory: function factory(require, exports, module) {
            var _this = this;

            var _fs = require('fs');

            var _command = require('./command');

            var _commander = require('commander');

            var _commander2 = _interopRequireDefault(_commander);

            var _puppeteerBrowser = require('puppeteer-browser');

            var _puppeteerBrowser2 = _interopRequireDefault(_puppeteerBrowser);

            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : { default: obj };
            }

            var manifest = JSON.parse((0, _fs.readFileSync)('package.json') + '');

            var folder = manifest.directories || '';

            _commander2.default.command('pack', 'Bundle components to a package with JS modules (or HTML files) in it').on('command:pack', function () {
                return (0, _command.pack)(folder.lib, _commander2.default.HTML);
            }).command('preview', 'Real-time preview during development').on('command:preview', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
                var command;
                return regeneratorRuntime.wrap(function _callee7$(_context7) {
                    while (1) {
                        switch (_context7.prev = _context7.next) {
                            case 0:
                                command = function command() {
                                    return (0, _command.pack)(folder.lib, _commander2.default.HTML);
                                };

                                _context7.next = 3;
                                return command();

                            case 3:
                                _context7.next = 5;
                                return _puppeteerBrowser2.default.getPage('.', folder.test || 'test/', command);

                            case 5:
                            case 'end':
                                return _context7.stop();
                        }
                    }
                }, _callee7, _this);
            }))).option('-H, --HTML', 'Bundle as HTML').parse(process.argv);
        }
    },
    'child_process': { exports: child_process },
    'stylus': { exports: stylus },
    'fs-extra': { exports: fs_extra },
    'path': { exports: path },
    'jsdom': { exports: jsdom },
    'amd-bundle': { exports: amd_bundle },
    'less': { exports: less },
    'sass': { exports: sass },
    'fs': { exports: fs },
    'commander': { exports: commander },
    'puppeteer-browser': { exports: puppeteer_browser }
};

    return require('./index');
});