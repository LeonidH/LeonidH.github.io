webpackJsonp([0],[
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.init = undefined;

var _game = __webpack_require__(5);

var _player = __webpack_require__(6);

var _audio = __webpack_require__(4);

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import '../css/style.css';
var init = window.onload = function () {

    var backgroundMusic = new _audio.AudioControl(['audio/theme.mp3']);

    var soundOnEvents = new _audio.AudioControl(['audio/success.mp3', 'audio/explosion.mp3', 'audio/game-over.mp3']);

    var player = new _player.GamePlayer(document.getElementById("gamePlayer"), backgroundMusic, soundOnEvents);

    player.initialization();

    document.getElementById('checkbox').addEventListener("change", function (event) {
        if (document.getElementById('checkbox').checked) {
            player.backgroundMusic.setVolume(0);
        } else {
            player.backgroundMusic.setVolume(0.5);
        }
    });

    window.addEventListener('resize', function (event) {
        player.fullscreenOnOff();
    });

    player.canvas.addEventListener('mousedown', function initGame(event) {
        player.canvas.removeEventListener('mousedown', initGame);
        (0, _game.Game)(player);
    });

    var fullscreen = document.getElementById("fullscreen");
    fullscreen.addEventListener('click', function (event) {
        player.fullscreenEnable = true;
        launchFullScreen(player);
    });
};

function launchFullScreen(player) {
    if (player.canvas.requestFullScreen) {
        player.canvas.requestFullScreen();
    } else if (player.canvas.mozRequestFullScreen) {
        player.canvas.mozRequestFullScreen();
    } else if (player.canvas.webkitRequestFullScreen) {
        player.canvas.webkitRequestFullScreen();
    }
}

exports.init = init;

/***/ }),
/* 2 */,
/* 3 */,
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AudioControl = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AudioControl = function () {
    function AudioControl(tracks, callbackOnEnded) {
        _classCallCheck(this, AudioControl);

        this.dom = document.createElement('audio');
        this.tracks = tracks;
        this.dom.volume = 0.5;
        this.selected = 0;
        this.state = 'stop';
        this.callbackOnEnded = callbackOnEnded || null;
        if (this.callbackOnEnded) {
            this.dom.addEventListener('ended', this.callbackOnEnded);
        }
    }

    _createClass(AudioControl, [{
        key: 'selectTrack',
        value: function selectTrack(num) {
            this.dom.src = this.tracks[num];
            this.selected = num;
            return this;
        }
    }, {
        key: 'play',
        value: function play() {
            this.dom.currentTime = 0;
            this.dom.play();
            this.state = 'play';
            return this;
        }
    }, {
        key: 'stop',
        value: function stop() {
            this.dom.pause();
            this.dom.currentTime = 0;
            this.state = 'stop';
            return this;
        }
    }, {
        key: 'setVolume',
        value: function setVolume(vol) {
            this.dom.volume = vol;
            return this;
        }
    }]);

    return AudioControl;
}();

exports.AudioControl = AudioControl;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Game = undefined;

var _factory = __webpack_require__(9);

var _runway = __webpack_require__(11);

var _statistic = __webpack_require__(12);

var _index = __webpack_require__(1);

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Game(player) {

    player.backgroundMusic.selectTrack(0).play();

    var planes = [];
    var clouds = [];

    var fabric = new _factory.Factory(player, planes, clouds);
    var statistic = new _statistic.GameStatistic(player);

    var choosen = null;

    var planeCount = 1;
    var interval = setInterval(function () {
        planeCount += 0.001;
        if (planes.length < _lodash2.default.round(planeCount + 0.01)) {
            fabric.createPlane();
        }
        if (clouds.length < 200) {
            fabric.createCloud();
        }
    }, 100);
    player.intervalIDArray.push(interval);

    var runways = [];
    runways.push(new _runway.Runway(player, 350, 350, -160, 330, 330));
    runways.push(new _runway.Runway(player, 162, 560, -70, 182, 530));
    runways.push(new _runway.Runway(player, 785, 122, 30, 805, 142));
    runways.push(new _runway.Runway(player, 850, 320, -15, 880, 320));

    player.canvas.addEventListener('mousedown', function (event) {
        var x = (event.pageX - player.canvas.offsetLeft) * player.coefWidthPlayerToWind,
            y = (event.pageY - player.canvas.offsetTop) * player.coefHeightPlayerToWind;

        planes.forEach(function (plane) {
            if (y > plane.currentXY.y - plane.planeRadius && y < plane.currentXY.y + plane.planeRadius && x > plane.currentXY.x - plane.planeRadius && x < plane.currentXY.x + plane.planeRadius) {

                if (!choosen) {
                    choosen = plane;
                    choosen.doAnimation = false;
                    choosen.landingPath.length = 0;
                }
            }
        });
    });

    player.canvas.addEventListener('mousemove', function (event) {
        if (choosen) {
            choosen.addPathPointsCoord((event.pageX - player.canvas.offsetLeft) * player.coefWidthPlayerToWind, (event.pageY - player.canvas.offsetTop) * player.coefHeightPlayerToWind);
        }
    });

    player.canvas.addEventListener('mouseup', function (event) {
        if (choosen) {
            choosen.landingPath.reverse();
            choosen.doAnimation = true;
            choosen = null;
        }
    });

    player.canvas.addEventListener('mouseout', function (event) {
        if (choosen) {
            choosen.landingPath.reverse();
            choosen.doAnimation = true;
            choosen = null;
        }
    });

    function draw() {
        player.context.clearRect(0, 0, player.canvas.width, player.canvas.height);

        _lodash2.default.each(planes, function (plane, index) {
            if (!plane.collided) {
                _lodash2.default.each(planes, function (planeToCheck, ind) {
                    if (index !== ind) {
                        plane.planeCollisionDetection(planeToCheck);
                    }
                });
            }
        });

        _lodash2.default.each(runways, function (runway) {
            runway.drawRunway();
        });

        _lodash2.default.each(planes, function (plane) {
            plane.drawPlane();
        });

        _lodash2.default.each(clouds, function (cloud) {
            cloud.drawCloud();
        });
        _lodash2.default.remove(clouds, function (cloud) {
            return cloud.toRealise;
        });

        _lodash2.default.remove(planes, function (plane) {
            if (plane.toRealise && plane.toLanding) {
                statistic.increaseScore();
                player.soundOnEvents.selectTrack(0).play();
            } else if (plane.toRealise) {
                statistic.miss();
            }
            return plane.toRealise;
        });

        if (statistic.missed > 8) {
            if (planes.length !== 0) {
                player.canvas.addEventListener('mousedown', function replay() {
                    player.canvas.removeEventListener('mousedown', replay);
                    Game(player);
                });
                player.onGameOver();
                _lodash2.default.each(player.intervalIDArray, function (intervalID) {
                    clearInterval(intervalID);
                });
                planes.length = 0;
            }
            player.drawGameOverImg();
        }

        statistic.draw();

        requestAnimationFrame(draw);
    }

    draw();
}

exports.Game = Game;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GamePlayer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GamePlayer = function () {
    function GamePlayer(canvas, backgroundMusic, soundOnEvents) {
        _classCallCheck(this, GamePlayer);

        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.backgroundMusic = backgroundMusic;
        this.soundOnEvents = soundOnEvents;

        this.intervalIDArray = [];

        this.imgPlay = new Image();
        this.imgPlay.src = 'img/play.png';

        this.imgGameOver = new Image();
        this.imgGameOver.src = 'img/game-over.png';

        this.coefWidthPlayerToWind = 1;
        this.coefHeightPlayerToWind = 1;

        this.fullscreenEnable = false;
    }

    _createClass(GamePlayer, [{
        key: 'initialization',
        value: function initialization() {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.context.beginPath();
            this.context.drawImage(this.imgPlay, this.canvas.width / 2 - 125, this.canvas.height / 2 - 125, 500 - 250, 500 - 250);
            this.context.closePath();
        }
    }, {
        key: 'fullscreenOnOff',
        value: function fullscreenOnOff() {
            if (this.fullscreenEnable) {
                this.canvas.style.width = '100%';
                this.canvas.style.height = '100%';
                this.coefWidthPlayerToWind = this.canvas.width / window.innerWidth;
                this.coefHeightPlayerToWind = this.canvas.height / window.innerHeight;
                this.fullscreenEnable = false;
            } else {
                this.canvas.style.width = '1170px';
                this.canvas.style.height = '730px';
                this.coefWidthPlayerToWind = 1;
                this.coefHeightPlayerToWind = 1;
            }
        }
    }, {
        key: 'onGameOver',
        value: function onGameOver() {
            this.backgroundMusic.stop();
            this.soundOnEvents.selectTrack(2).play();
        }
    }, {
        key: 'drawGameOverImg',
        value: function drawGameOverImg() {
            this.context.beginPath();
            this.context.drawImage(this.imgGameOver, 370, 180, 400, 206);
            this.context.font = 'bold 42px Courier New';
            this.context.fillStyle = "#ffffff";
            this.context.fillText('Click to continue', 370, 490);
            this.context.closePath();
        }
    }]);

    return GamePlayer;
}();

exports.GamePlayer = GamePlayer;

/***/ }),
/* 7 */,
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Cloud = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cloud = function () {
    function Cloud(player) {
        _classCallCheck(this, Cloud);

        this.player = player;

        this.cloudRadius = 200;
        this.currentXY = {
            x: this.player.canvas.width,
            y: _lodash2.default.random(0, this.player.canvas.height - this.cloudRadius)
        };

        this.velocityXY = { dx: _lodash2.default.random(-0.5, 0, true), dy: _lodash2.default.random(-0.5, 0.5, true) };

        this.imgCloud = new Image();
        this.imgCloud.src = 'img/cloud.png';

        this.toRealise = false;
    }

    _createClass(Cloud, [{
        key: 'drawCloud',
        value: function drawCloud() {
            this.player.context.beginPath();
            this.player.context.drawImage(this.imgCloud, this.currentXY.x, this.currentXY.y, this.cloudRadius, this.cloudRadius);
            this.player.context.closePath();
            this.exceed();
        }
    }, {
        key: 'exceed',
        value: function exceed() {
            if (this.currentXY.x > this.player.canvas.width || this.currentXY.x + this.velocityXY.dx < -this.cloudRadius) {
                this.toRealise = true;
            }
            if (this.currentXY.y + this.velocityXY.dy > this.player.canvas.height || this.currentXY.y + this.velocityXY.dy < -this.cloudRadius) {
                this.toRealise = true;
            }
            this.currentXY.x += this.velocityXY.dx;
            this.currentXY.y += this.velocityXY.dy;
        }
    }]);

    return Cloud;
}();

exports.Cloud = Cloud;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Factory = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _plane = __webpack_require__(10);

var _cloud = __webpack_require__(8);

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Factory = function () {
    function Factory(player, planes, clouds) {
        _classCallCheck(this, Factory);

        this.planes = planes;
        this.clouds = clouds;
        this.player = player;
        this.i = 1;
    }

    _createClass(Factory, [{
        key: 'createPlane',
        value: function createPlane() {
            switch (this.i % 3) {
                case 0:
                    var fighter = new _plane.Fighter(this.player);
                    fighter.setInitialCoord();
                    this.planes.push(fighter);
                    break;
                case 1:
                    var bomber = new _plane.Bomber(this.player);
                    bomber.setInitialCoord();
                    this.planes.push(bomber);
                    break;
                case 2:
                    var interceptor = new _plane.Interceptor(this.player);
                    interceptor.setInitialCoord();
                    this.planes.push(interceptor);
                    break;
            }
            this.i += 1;
        }
    }, {
        key: 'createCloud',
        value: function createCloud() {
            this.clouds.push(new _cloud.Cloud(this.player));
        }
    }]);

    return Factory;
}();

exports.Factory = Factory;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Interceptor = exports.Bomber = exports.Fighter = exports.Plane = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Plane = function () {
    function Plane(player) {
        _classCallCheck(this, Plane);

        this.player = player;

        this.velocityXY = { dx: 0, dy: 0 };
        this.directionAngle = this.calculateAngle();

        this.landingPath = [];
        this.nextCoord = null;
        this.isNextCoord = false;

        this.imgPlaneSpriteNum = 0;
        this.frequencyAngleCalc = 0;
        this.doAnimation = true;
        this.collided = false;
        this.imgExplosion = new Image();
        this.imgExplosion.src = 'img/explosion.png';
        this.imgExplSpriteNum = 0;

        this.toLanding = false;
        this.scaleRate = 1;

        this.toRealise = false;
    }

    _createClass(Plane, [{
        key: 'calculateAngle',
        value: function calculateAngle() {
            if (this.velocityXY.dx > 0 && this.velocityXY.dy > 0 || this.velocityXY.dx > 0 && this.velocityXY.dy <= 0) {
                return Math.atan(this.velocityXY.dy / this.velocityXY.dx) + Math.PI / 2;
            } else {
                return Math.atan(this.velocityXY.dy / this.velocityXY.dx) + 3 * Math.PI / 2;
            }
        }
    }, {
        key: 'addPathPointsCoord',
        value: function addPathPointsCoord(x, y) {
            if (x > this.player.canvas.width - this.planeRadius) {
                x = this.player.canvas.width - this.planeRadius;
            }
            if (x < this.planeRadius) {
                x = this.planeRadius;
            }
            if (y > this.player.canvas.height - this.planeRadius) {
                y = this.player.canvas.height - this.planeRadius;
            }
            if (y < this.planeRadius) {
                y = this.planeRadius;
            }

            /**
             * Exponential smoothing
             */
            if (Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)) > this.velocityFull) {
                var coefOfSmoothing = 0.3;
                var smoothedX = x;
                var smoothedY = y;
                if (this.landingPath.length) {
                    var lastSmoothedX = this.landingPath.slice(-1)[0].x;
                    var lastSmoothedY = this.landingPath.slice(-1)[0].y;
                    smoothedX = coefOfSmoothing * x + (1 - coefOfSmoothing) * lastSmoothedX;
                    smoothedY = coefOfSmoothing * y + (1 - coefOfSmoothing) * lastSmoothedY;
                }
                this.landingPath.push({ x: smoothedX, y: smoothedY });
            }
        }
    }, {
        key: 'drawPlane',
        value: function drawPlane() {
            if (this.doAnimation) {
                if (this.landingPath.length || this.nextCoord) {
                    if (!this.nextCoord) {
                        this.nextCoord = this.landingPath.pop();
                    }

                    var mouseVelocity = Plane.defineVelocity(this.nextCoord.x - this.currentXY.x, this.nextCoord.y - this.currentXY.y);

                    if (mouseVelocity > this.velocityFull && !this.isNextCoord) {
                        var modX = this.nextCoord.x - this.currentXY.x > 0 ? 1 : -1,
                            modY = this.nextCoord.y - this.currentXY.y > 0 ? 1 : -1,
                            cos = (this.nextCoord.x - this.currentXY.x) / mouseVelocity;

                        this.isNextCoord = true;
                        this.velocityXY.dx = modX * Math.abs(cos * this.velocityFull);
                        this.velocityXY.dy = modY * Math.abs(Math.sqrt(Math.pow(this.velocityFull, 2) - Math.pow(this.velocityXY.dx, 2)));
                    }

                    if (mouseVelocity <= this.velocityFull) {
                        this.nextCoord = null;
                        this.isNextCoord = false;
                    }

                    /**
                     * Check to landing
                     * @type {number}
                     */
                    var directionAnglelInDegrees = this.directionAngle * 180 / Math.PI;
                    if (Math.abs(directionAnglelInDegrees - 290) <= 10) {
                        if (Math.sqrt(Math.pow(this.currentXY.x - 330, 2) + Math.pow(this.currentXY.y - 330, 2)) <= 30) {
                            this.toLanding = true;
                        }
                    }
                    if (Math.abs(directionAnglelInDegrees - 20) <= 10) {
                        if (Math.sqrt(Math.pow(this.currentXY.x - 182, 2) + Math.pow(this.currentXY.y - 530, 2)) <= 30) {
                            this.toLanding = true;
                        }
                    }
                    if (Math.abs(directionAnglelInDegrees - 120) <= 10) {
                        if (Math.sqrt(Math.pow(this.currentXY.x - 805, 2) + Math.pow(this.currentXY.y - 142, 2)) <= 30) {
                            this.toLanding = true;
                        }
                    }
                    if (Math.abs(directionAnglelInDegrees - 75) <= 10) {
                        if (Math.sqrt(Math.pow(this.currentXY.x - 880, 2) + Math.pow(this.currentXY.y - 320, 2)) <= 30) {
                            this.toLanding = true;
                        }
                    }
                }
            }
            this.displayPlane();
        }
    }, {
        key: 'displayPlane',
        value: function displayPlane() {
            var _this = this;

            if (this.toLanding) {
                this.scaleRate -= 0.01;
                if (this.scaleRate <= 0.5) {
                    this.toRealise = true;
                }
            }
            this.player.context.beginPath();

            if (!this.collided) {
                if (this.doAnimation) {
                    this.exceed();
                }

                if (this.landingPath.length) {
                    this.player.context.arc(this.currentXY.x, this.currentXY.y, this.planeRadius, 0, Math.PI * 2);
                    this.player.context.lineWidth = 4;
                    this.player.context.strokeStyle = "#05ff00";
                    this.player.context.stroke();
                }

                if (this.landingPath.length && !this.doAnimation) {
                    this.player.context.moveTo(this.landingPath[0].x, this.landingPath[0].y);
                    this.player.context.lineWidth = 5;
                    this.player.context.strokeStyle = "#ff7a51";
                    this.player.context.lineCap = "round";
                    _lodash2.default.forEach(this.landingPath, function (coord) {
                        _this.player.context.lineTo(coord.x, coord.y);
                        _this.player.context.stroke();
                    });
                }

                this.player.context.save();
                this.player.context.translate(this.currentXY.x, this.currentXY.y);

                if (this.frequencyAngleCalc++ === 5) {
                    this.directionAngle = this.calculateAngle();
                    this.frequencyAngleCalc = 0;
                }

                this.player.context.rotate(this.directionAngle);
                this.player.context.drawImage(this.imgPlay, 66 * this.imgPlaneSpriteNum, 0, 65, 65, -33 * this.scaleRate, -33 * this.scaleRate, 65 * this.scaleRate, 65 * this.scaleRate);
                this.imgPlaneSpriteNum++;
                if (this.imgPlaneSpriteNum > 3) {
                    this.imgPlaneSpriteNum = 0;
                }

                this.player.context.restore();
            } else {
                var offsetX = Math.floor(this.imgExplSpriteNum % 8);
                var offsetY = Math.floor(this.imgExplSpriteNum / 8);
                this.player.context.drawImage(this.imgExplosion, 64 * offsetX, 64 * offsetY, 64, 64, this.currentXY.x - 32, this.currentXY.y - 32, 64, 64);
                this.imgExplSpriteNum += 0.15;
                if (this.imgExplSpriteNum > 20) {
                    this.toRealise = true;
                }
            }
            this.player.context.closePath();

            return this;
        }
    }, {
        key: 'exceed',
        value: function exceed() {
            if (this.currentXY.x + this.velocityXY.dx > this.player.canvas.width - this.planeRadius || this.currentXY.x + this.velocityXY.dx < this.planeRadius) {
                this.velocityXY.dx = -this.velocityXY.dx;
            }
            if (this.currentXY.y + this.velocityXY.dy > this.player.canvas.height - this.planeRadius || this.currentXY.y + this.velocityXY.dy < this.planeRadius) {
                this.velocityXY.dy = -this.velocityXY.dy;
            }
            this.currentXY.x += this.velocityXY.dx;
            this.currentXY.y += this.velocityXY.dy;
        }
    }, {
        key: 'planeCollisionDetection',
        value: function planeCollisionDetection(planeToCheck) {
            if (!this.collided && !planeToCheck.collided && !this.toLanding && !planeToCheck.toLanding) {
                var dx = this.currentXY.x - planeToCheck.currentXY.x;
                var dy = this.currentXY.y - planeToCheck.currentXY.y;
                var distance = Math.sqrt(dx * dx + dy * dy);
                var collision = distance < this.planeRadius / 1.5 + planeToCheck.planeRadius / 1.5;
                if (collision) {
                    this.collided = true;
                    planeToCheck.collided = true;
                    this.player.soundOnEvents.selectTrack(1).play();
                }
            }
        }
    }, {
        key: 'setInitialCoord',
        value: function setInitialCoord() {
            switch (_lodash2.default.random(0, 3)) {
                case 0:
                    this.currentXY.y = this.planeRadius;
                    this.currentXY.x = _lodash2.default.random(this.planeRadius, this.player.canvas.width - this.planeRadius);
                    this.velocityXY.dx = _lodash2.default.random(0.1, this.velocityFull - 0.1, true);
                    this.velocityXY.dy = Math.sqrt(Math.pow(this.velocityFull, 2) - Math.pow(this.velocityXY.dx, 2));
                    break;
                case 1:
                    this.currentXY.x = this.player.canvas.width - this.planeRadius;
                    this.currentXY.y = _lodash2.default.random(this.planeRadius, this.player.canvas.height - this.planeRadius);
                    this.velocityXY.dy = _lodash2.default.random(0.1, this.velocityFull - 0.1, true);
                    this.velocityXY.dx = Math.sqrt(Math.pow(this.velocityFull, 2) - Math.pow(this.velocityXY.dy, 2));
                    break;
                case 2:
                    this.currentXY.y = this.player.canvas.height - this.planeRadius;
                    this.currentXY.x = _lodash2.default.random(this.planeRadius, this.player.canvas.width - this.planeRadius);
                    this.velocityXY.dx = _lodash2.default.random(0.1, this.velocityFull - 0.1, true);
                    this.velocityXY.dy = Math.sqrt(Math.pow(this.velocityFull, 2) - Math.pow(this.velocityXY.dx, 2));
                    break;
                case 3:
                    this.currentXY.x = this.planeRadius;
                    this.currentXY.y = _lodash2.default.random(this.planeRadius, this.player.canvas.height - this.planeRadius);
                    this.velocityXY.dy = _lodash2.default.random(0.1, this.velocityFull - 0.1, true);
                    this.velocityXY.dx = Math.sqrt(Math.pow(this.velocityFull, 2) - Math.pow(this.velocityXY.dy, 2));
                    break;
            }
        }
    }], [{
        key: 'defineVelocity',
        value: function defineVelocity(dx, dy) {
            return Math.pow(Math.pow(dx, 2) + Math.pow(dy, 2), 0.5);
        }
    }]);

    return Plane;
}();

var Fighter = function (_Plane) {
    _inherits(Fighter, _Plane);

    function Fighter(player) {
        _classCallCheck(this, Fighter);

        var _this2 = _possibleConstructorReturn(this, (Fighter.__proto__ || Object.getPrototypeOf(Fighter)).call(this, player));

        _this2.planeRadius = 30;
        _this2.velocityFull = 1.8;
        _this2.currentXY = {
            x: _this2.planeRadius,
            y: _this2.planeRadius
        };

        _this2.imgPlay = new Image();
        _this2.imgPlay.src = 'img/fighter.png';
        return _this2;
    }

    return Fighter;
}(Plane);

var Bomber = function (_Plane2) {
    _inherits(Bomber, _Plane2);

    function Bomber(player) {
        _classCallCheck(this, Bomber);

        var _this3 = _possibleConstructorReturn(this, (Bomber.__proto__ || Object.getPrototypeOf(Bomber)).call(this, player));

        _this3.planeRadius = 30;
        _this3.velocityFull = 1.2;
        _this3.currentXY = {
            x: _this3.planeRadius,
            y: _this3.planeRadius
        };
        _this3.imgPlay = new Image();
        _this3.imgPlay.src = 'img/bomber.png';
        return _this3;
    }

    return Bomber;
}(Plane);

var Interceptor = function (_Plane3) {
    _inherits(Interceptor, _Plane3);

    function Interceptor(player) {
        _classCallCheck(this, Interceptor);

        var _this4 = _possibleConstructorReturn(this, (Interceptor.__proto__ || Object.getPrototypeOf(Interceptor)).call(this, player));

        _this4.planeRadius = 30;
        _this4.velocityFull = 2.5;
        _this4.currentXY = {
            x: _this4.planeRadius,
            y: _this4.planeRadius
        };

        _this4.imgPlay = new Image();
        _this4.imgPlay.src = 'img/interceptor.png';
        return _this4;
    }

    return Interceptor;
}(Plane);

exports.Plane = Plane;
exports.Fighter = Fighter;
exports.Bomber = Bomber;
exports.Interceptor = Interceptor;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Runway = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Runway = function () {
    function Runway(player, coordX, coordY, angle, circleX, circleY) {
        _classCallCheck(this, Runway);

        this.player = player;
        this.coordX = coordX;
        this.coordY = coordY;
        this.angle = angle;
        this.img = new Image();
        this.img.src = 'img/runway.png';
        this.imgNum = 0;
        this.skip = 0;
    }

    _createClass(Runway, [{
        key: 'drawRunway',
        value: function drawRunway() {
            if (!(this.skip % 4)) {
                this.player.context.beginPath();
                this.player.context.save();
                this.player.context.translate(this.coordX, this.coordY);
                this.player.context.rotate(this.angle * Math.PI / 180);
                try {
                    this.player.context.drawImage(this.img, 17.25 * (this.imgNum % 4), 0, 17.25, 20, 17.25 * (this.imgNum % 4), 0, 17.25, 20);
                } catch (e) {
                    console.log(e.message);
                }

                this.imgNum += 1;
                this.player.context.restore();
                this.player.context.closePath();
            }
            this.skip += 1;
        }
    }]);

    return Runway;
}();

exports.Runway = Runway;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameStatistic = function () {
    function GameStatistic(player) {
        _classCallCheck(this, GameStatistic);

        this.player = player;
        this.score = 0;
        this.missed = 0;
        this.missedImg = new Image();
        this.missedImg.src = 'img/missing.png';
    }

    _createClass(GameStatistic, [{
        key: 'increaseScore',
        value: function increaseScore() {
            this.score += 1;
        }
    }, {
        key: 'miss',
        value: function miss() {
            this.missed += 1;
        }
    }, {
        key: 'draw',
        value: function draw() {
            this.player.context.beginPath();

            if (this.missed) {
                for (var i = 0; i < this.missed; i++) {
                    this.player.context.drawImage(this.missedImg, 825 - i * 60, 670, 55, 55);
                }
            }

            this.player.context.font = 'bold 38px Courier New';
            this.player.context.fillStyle = "#ffffff";
            this.player.context.fillText('Score:' + this.score, 50, 50);

            this.player.context.closePath();
        }
    }]);

    return GameStatistic;
}();

exports.GameStatistic = GameStatistic;

/***/ })
],[1]);
//# sourceMappingURL=bundle.563bccd58656bf454f51.js.map