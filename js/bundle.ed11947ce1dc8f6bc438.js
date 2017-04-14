webpackJsonp([0],[function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i={canvasID:"gamePlayer",audioChBoxID:"checkbox",fullscreenID:"fullscreen",imgPlaneSpriteNum:0,frequencyAngleCalc:5,imgExplSpriteNum:0,scaleRate:1,imgExplosionSRC:"img/explosion.png",explosionTrackNum:1,fighterPlaneRadius:27,fighterVelocityFull:1.8,imgFighterPlaneSRC:"img/fighter.png",bomberPlaneRadius:33,bomberVelocityFull:1.2,imgBomberPlaneSRC:"img/bomber.png",interceptorPlaneRadius:30,interceptorVelocityFull:2.4,imgInterceptorPlaneSRC:"img/interceptor.png",coefficientCoordinateFilter:8,coefOfSmoothing:.9,planeCycleStrokeStyle:"#05ff00",planeCycleLineWidth:4,landingPathLineStrokeStyle:"#ff7a51",landingPathLineWidth:5,landingPathLineCap:"round",collisionCoefficient:1.5,planeScaleRate:.01,planeReductionLimit:.5,backgroundSoundSRC:"audio/theme.mp3",backgroundSound:0,soundOnSuccessSRC:"audio/success.mp3",soundOnExplosionSRC:"audio/explosion.mp3",soundOnGameOverSRC:"audio/game-over.mp3",soundOnSuccess:0,soundOnExplosion:1,soundOnGameOver:2,cloudRadius:200,imgCloudSRC:"img/cloud.png",minVelocityX:-.5,maxVelocityX:0,minVelocityY:-.5,maxVelocityY:.5,imgPlaySRC:"img/play.png",imgGameOverSRC:"img/game-over.png",coefWidthPlayerToWind:1,coefHeightPlayerToWind:1,defaultCanvasWidth:"1170px",defaultCanvasHeight:"730px",fullscreenCanvasWidth:"100%",fullscreenCanvasHeight:"100%",playerContextFont:"bold 42px Courier New",playerFillStyle:"#ffffff",volumeLevel:.5,stopState:"stop",playState:"play",imgMissedSRC:"img/missing.png",coefIncreaseNumOfPlane:.002,numberOfCloud:100,interval:500};e.constant=i},,,,function(t,e,n){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0}),e.AudioControl=void 0;var a=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),o=n(0),s=function(){function t(e,n){i(this,t),this.dom=document.createElement("audio"),this.tracks=e,this.dom.volume=o.constant.volumeLevel,this.selected=0,this.state=o.constant.stopState,this.callbackOnEnded=n||null,this.callbackOnEnded&&this.dom.addEventListener("ended",this.callbackOnEnded)}return a(t,[{key:"selectTrack",value:function(t){return this.dom.src=this.tracks[t],this.selected=t,this}},{key:"play",value:function(){return this.dom.currentTime=0,this.dom.play(),this.state=o.constant.playState,this}},{key:"stop",value:function(){return this.dom.pause(),this.dom.currentTime=0,this.state=o.constant.stopState,this}},{key:"setVolume",value:function(t){return this.dom.volume=t,this}}]),t}();e.AudioControl=s},function(t,e,n){"use strict";function i(t){function e(){t.context.clearRect(0,0,t.canvas.width,t.canvas.height),o.default.each(n,function(t,e){t.collided||o.default.each(n,function(n,i){e!==i&&t.planeCollisionDetection(n)})}),o.default.each(d,function(t){t.drawRunway()}),o.default.each(n,function(t){t.drawPlane()}),o.default.each(a,function(t){t.drawCloud()}),o.default.remove(a,function(t){return t.toRealise}),o.default.remove(n,function(e){return e.toRealise&&e.toLanding?(f.increaseScore(),t.soundOnEvents.selectTrack(0).play()):e.toRealise&&f.miss(),e.toRealise}),f.missed>8&&(n.length&&(t.canvas.addEventListener("mousedown",function e(){t.canvas.removeEventListener("mousedown",e),i(t)}),t.onGameOver(),o.default.each(t.intervalIDArray,function(t){clearInterval(t)}),n.length=0),t.drawGameOverImg()),f.draw(),requestAnimationFrame(e)}t.backgroundMusic.selectTrack(s.constant.backgroundSound).play();var n=[],a=[],u=null,h=2,d=[];d.push(new l.Runway(t,350,350,-160)),d.push(new l.Runway(t,162,560,-70)),d.push(new l.Runway(t,785,122,30)),d.push(new l.Runway(t,850,320,-15));var y=new r.Factory(t,n,a),f=new c.GameStatistic(t),p=setInterval(function(){h+=s.constant.coefIncreaseNumOfPlane;var t=o.default.round(h);n.length<t&&n.push(y.createPlane()),a.length<s.constant.numberOfCloud&&a.push(y.createCloud())},s.constant.interval);t.intervalIDArray.push(p),t.canvas.addEventListener("mousedown",function(e){var i=(e.pageX-t.canvas.offsetLeft)*t.coefWidthPlayerToWind,a=(e.pageY-t.canvas.offsetTop)*t.coefHeightPlayerToWind;n.forEach(function(t){a>t.currentXY.y-t.planeRadius&&a<t.currentXY.y+t.planeRadius&&i>t.currentXY.x-t.planeRadius&&i<t.currentXY.x+t.planeRadius&&(u||(u=t,u.doAnimation=!1,u.landingPath.length=0))})}),t.canvas.addEventListener("mousemove",function(e){u&&u.addPathPointsCoord((e.pageX-t.canvas.offsetLeft)*t.coefWidthPlayerToWind,(e.pageY-t.canvas.offsetTop)*t.coefHeightPlayerToWind)});var v=function(){u&&(u.landingPath.reverse(),u.doAnimation=!0,u=null)};t.canvas.addEventListener("mouseup",v),t.canvas.addEventListener("mouseout",v),e()}Object.defineProperty(e,"__esModule",{value:!0}),e.game=void 0;var a=n(1),o=function(t){return t&&t.__esModule?t:{default:t}}(a),s=n(0),r=n(9),l=n(12),c=n(13);e.game=i},function(t,e,n){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0}),e.GamePlayer=void 0;var a=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),o=n(0),s=function(){function t(e,n,a){i(this,t),this.canvas=e,this.context=e.getContext("2d"),this.backgroundMusic=n,this.soundOnEvents=a,this.intervalIDArray=[],this.imgPlay=new Image,this.imgPlay.src=o.constant.imgPlaySRC,this.imgGameOver=new Image,this.imgGameOver.src=o.constant.imgGameOverSRC,this.coefWidthPlayerToWind=o.constant.coefWidthPlayerToWind,this.coefHeightPlayerToWind=o.constant.coefHeightPlayerToWind}return a(t,[{key:"initialization",value:function(){this.context.beginPath(),this.context.drawImage(this.imgPlay,this.canvas.width/2-150,this.canvas.height/2-150,300,300),this.context.closePath()}},{key:"fullscreenOnOff",value:function(t){t?(this.canvas.style.width=o.constant.fullscreenCanvasWidth,this.canvas.style.height=o.constant.fullscreenCanvasHeight,this.coefWidthPlayerToWind=this.canvas.width/window.innerWidth,this.coefHeightPlayerToWind=this.canvas.height/window.innerHeight):(this.canvas.style.width=o.constant.defaultCanvasWidth,this.canvas.style.height=o.constant.defaultCanvasHeight,this.coefWidthPlayerToWind=o.constant.coefWidthPlayerToWind,this.coefHeightPlayerToWind=o.constant.coefHeightPlayerToWind)}},{key:"onGameOver",value:function(){this.backgroundMusic.stop(),this.soundOnEvents.selectTrack(o.constant.soundOnGameOver).play()}},{key:"drawGameOverImg",value:function(){this.context.beginPath(),this.context.drawImage(this.imgGameOver,370,180,400,206),this.context.font=o.constant.playerContextFont,this.context.fillStyle=o.constant.playerFillStyle,this.context.fillText("Click to continue",370,490),this.context.closePath()}}]),t}();e.GamePlayer=s},,function(t,e,n){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0}),e.Cloud=void 0;var a=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),o=n(0),s=function(){function t(e){i(this,t),this.player=e,this.cloudRadius=o.constant.cloudRadius,this.currentXY={x:this.cloudRadius,y:this.cloudRadius},this.velocityXY={dx:0,dy:0},this.imgCloud=new Image,this.imgCloud.src=o.constant.imgCloudSRC,this.toRealise=!1}return a(t,[{key:"drawCloud",value:function(){this.player.context.beginPath(),this.player.context.drawImage(this.imgCloud,this.currentXY.x,this.currentXY.y,this.cloudRadius,this.cloudRadius),this.player.context.closePath(),this.exceed()}},{key:"exceed",value:function(){this.currentXY.x+this.velocityXY.dx<-this.cloudRadius&&(this.toRealise=!0);var t=this.currentXY.y+this.velocityXY.dy>this.player.canvas.height,e=this.currentXY.y+this.velocityXY.dy<-this.cloudRadius;(t||e)&&(this.toRealise=!0),this.currentXY.x+=this.velocityXY.dx,this.currentXY.y+=this.velocityXY.dy}}]),t}();e.Cloud=s},function(t,e,n){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0}),e.Factory=void 0;var a=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),o=n(1),s=function(t){return t&&t.__esModule?t:{default:t}}(o),r=n(0),l=n(8),c=n(11),u=function(){function t(e){i(this,t),this.player=e}return a(t,[{key:"createPlane",value:function(){switch(s.default.random(0,2)){case 0:return t.setPlaneInitialCoord(new c.Fighter(this.player));case 1:return t.setPlaneInitialCoord(new c.Bomber(this.player));case 2:return t.setPlaneInitialCoord(new c.Interceptor(this.player))}}},{key:"createCloud",value:function(){return t.setCloudInitialCoord(new l.Cloud(this.player))}}],[{key:"setPlaneInitialCoord",value:function(t){switch(s.default.random(0,3)){case 0:return t.currentXY.y=t.planeRadius,t.currentXY.x=s.default.random(t.planeRadius,t.player.canvas.width-t.planeRadius),t.velocityXY.dx=s.default.random(.1,t.velocityFull-.1,!0),t.velocityXY.dy=Math.sqrt(Math.pow(t.velocityFull,2)-Math.pow(t.velocityXY.dx,2)),t;case 1:return t.currentXY.x=t.player.canvas.width-t.planeRadius,t.currentXY.y=s.default.random(t.planeRadius,t.player.canvas.height-t.planeRadius),t.velocityXY.dy=s.default.random(.1,t.velocityFull-.1,!0),t.velocityXY.dx=Math.sqrt(Math.pow(t.velocityFull,2)-Math.pow(t.velocityXY.dy,2)),t;case 2:return t.currentXY.y=t.player.canvas.height-t.planeRadius,t.currentXY.x=s.default.random(t.planeRadius,t.player.canvas.width-t.planeRadius),t.velocityXY.dx=s.default.random(.1,t.velocityFull-.1,!0),t.velocityXY.dy=Math.sqrt(Math.pow(t.velocityFull,2)-Math.pow(t.velocityXY.dx,2)),t;case 3:return t.currentXY.x=t.planeRadius,t.currentXY.y=s.default.random(t.planeRadius,t.player.canvas.height-t.planeRadius),t.velocityXY.dy=s.default.random(.1,t.velocityFull-.1,!0),t.velocityXY.dx=Math.sqrt(Math.pow(t.velocityFull,2)-Math.pow(t.velocityXY.dy,2)),t}}},{key:"setCloudInitialCoord",value:function(t){return t.currentXY.x=t.player.canvas.width,t.currentXY.y=s.default.random(0,t.player.canvas.height-t.cloudRadius),t.velocityXY.dx=s.default.random(r.constant.minVelocityX,r.constant.maxVelocityX,!0),t.velocityXY.dy=s.default.random(r.constant.minVelocityY,r.constant.maxVelocityY,!0),t}}]),t}();e.Factory=u},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.init=void 0;var i=n(0),a=n(5),o=n(6),s=n(4),r=window.onload=function(){var t=new s.AudioControl([i.constant.backgroundSoundSRC],function(){t.selectTrack(0).play()}),e=new s.AudioControl([i.constant.soundOnSuccessSRC,i.constant.soundOnExplosionSRC,i.constant.soundOnGameOverSRC]),n=new o.GamePlayer(document.getElementById(i.constant.canvasID),t,e);n.initialization();var r=function(t){t.canvas.requestFullScreen?t.canvas.requestFullScreen():t.canvas.mozRequestFullScreen?t.canvas.mozRequestFullScreen():t.canvas.webkitRequestFullScreen&&t.canvas.webkitRequestFullScreen()};document.getElementById(i.constant.fullscreenID).addEventListener("click",function(){r(n)}),window.addEventListener("resize",function(){var t=document.fullScreen||document.mozFullScreen||document.webkitIsFullScreen;n.fullscreenOnOff(t)}),document.getElementById(i.constant.audioChBoxID).addEventListener("change",function(){document.getElementById(i.constant.audioChBoxID).checked?n.backgroundMusic.setVolume(0):n.backgroundMusic.setVolume(.5)}),n.canvas.addEventListener("mousedown",function t(){n.canvas.removeEventListener("mousedown",t),(0,a.game)(n)})};e.init=r},function(t,e,n){"use strict";function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0}),e.Interceptor=e.Bomber=e.Fighter=e.Plane=void 0;var s=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),r=n(1),l=function(t){return t&&t.__esModule?t:{default:t}}(r),c=n(0),u=function(){function t(e){o(this,t),this.player=e,this.currentXY={x:0,y:0},this.velocityXY={dx:0,dy:0},this.directionAngle=this.calculateAngle(),this.landingPath=[],this.imgExplosion=new Image,this.imgExplosion.src=c.constant.imgExplosionSRC,this.imgPlaneSpriteNum=c.constant.imgPlaneSpriteNum,this.frequencyAngleCalc=c.constant.frequencyAngleCalc,this.imgExplSpriteNum=c.constant.imgExplSpriteNum,this.scaleRate=c.constant.scaleRate,this.nextCoord=null,this.isNextCoord=!1,this.doAnimation=!0,this.collided=!1,this.toLanding=!1,this.toRealise=!1}return s(t,[{key:"calculateAngle",value:function(){return this.velocityXY.dx>0&&this.velocityXY.dy>0||this.velocityXY.dx>0&&this.velocityXY.dy<=0?Math.atan(this.velocityXY.dy/this.velocityXY.dx)+Math.PI/2:Math.atan(this.velocityXY.dy/this.velocityXY.dx)+3*Math.PI/2}},{key:"addPathPointsCoord",value:function(t,e){t>this.player.canvas.width-this.planeRadius&&(t=this.player.canvas.width-this.planeRadius),t<this.planeRadius&&(t=this.planeRadius),e>this.player.canvas.height-this.planeRadius&&(e=this.player.canvas.height-this.planeRadius),e<this.planeRadius&&(e=this.planeRadius);var n=this.landingPath.length?l.default.last(this.landingPath):this.currentXY;if(Math.sqrt(Math.pow(n.x-t,2)+Math.pow(n.y-e,2))>c.constant.coefficientCoordinateFilter*this.velocityFull){var i=c.constant.coefOfSmoothing*t+(1-c.constant.coefOfSmoothing)*n.x,a=c.constant.coefOfSmoothing*e+(1-c.constant.coefOfSmoothing)*n.y;this.landingPath.push({x:i,y:a})}}},{key:"drawPlane",value:function(){if(this.doAnimation&&(this.landingPath.length||this.nextCoord)){this.nextCoord||(this.nextCoord=this.landingPath.pop());var e=t.defineVelocity(this.nextCoord.x-this.currentXY.x,this.nextCoord.y-this.currentXY.y);if(e>this.velocityFull&&!this.isNextCoord){var n=this.nextCoord.x-this.currentXY.x>0?1:-1,i=this.nextCoord.y-this.currentXY.y>0?1:-1,a=(this.nextCoord.x-this.currentXY.x)/e;this.isNextCoord=!0,this.velocityXY.dx=n*Math.abs(a*this.velocityFull),this.velocityXY.dy=i*Math.abs(Math.sqrt(Math.pow(this.velocityFull,2)-Math.pow(this.velocityXY.dx,2)))}e<=this.velocityFull&&(this.nextCoord=null,this.isNextCoord=!1);var o=180*this.directionAngle/Math.PI;Math.abs(o-290)<=10&&Math.sqrt(Math.pow(this.currentXY.x-330,2)+Math.pow(this.currentXY.y-330,2))<=30&&(this.toLanding=!0),Math.abs(o-20)<=10&&Math.sqrt(Math.pow(this.currentXY.x-182,2)+Math.pow(this.currentXY.y-530,2))<=30&&(this.toLanding=!0),Math.abs(o-120)<=10&&Math.sqrt(Math.pow(this.currentXY.x-805,2)+Math.pow(this.currentXY.y-142,2))<=30&&(this.toLanding=!0),Math.abs(o-75)<=10&&Math.sqrt(Math.pow(this.currentXY.x-880,2)+Math.pow(this.currentXY.y-320,2))<=30&&(this.toLanding=!0)}this.displayPlane()}},{key:"displayPlane",value:function(){var t=this;if(this.toLanding&&(this.scaleRate-=c.constant.planeScaleRate,this.scaleRate<=c.constant.planeReductionLimit&&(this.toRealise=!0)),this.player.context.beginPath(),this.collided){var e=Math.floor(this.imgExplSpriteNum%8),n=Math.floor(this.imgExplSpriteNum/8);this.player.context.drawImage(this.imgExplosion,64*e,64*n,64,64,this.currentXY.x-32,this.currentXY.y-32,64,64),this.imgExplSpriteNum+=.15,this.imgExplSpriteNum>20&&(this.toRealise=!0)}else this.doAnimation&&this.exceed(),this.landingPath.length&&(this.player.context.arc(this.currentXY.x,this.currentXY.y,this.planeRadius,0,2*Math.PI),this.player.context.lineWidth=c.constant.planeCycleLineWidth,this.player.context.strokeStyle=c.constant.planeCycleStrokeStyle,this.player.context.stroke()),this.landingPath.length&&!this.doAnimation&&(this.player.context.moveTo(this.landingPath[0].x,this.landingPath[0].y),this.player.context.lineWidth=c.constant.landingPathLineWidth,this.player.context.strokeStyle=c.constant.landingPathLineStrokeStyle,this.player.context.lineCap=c.constant.landingPathLineCap,l.default.forEach(this.landingPath,function(e){t.player.context.lineTo(e.x,e.y),t.player.context.stroke()})),this.player.context.save(),this.player.context.translate(this.currentXY.x,this.currentXY.y),0==this.frequencyAngleCalc--&&(this.directionAngle=this.calculateAngle(),this.frequencyAngleCalc=c.constant.frequencyAngleCalc),this.player.context.rotate(this.directionAngle),this.player.context.drawImage(this.imgPlane,66*this.imgPlaneSpriteNum,0,66,66,-33*this.scaleRate,-33*this.scaleRate,66*this.scaleRate,66*this.scaleRate),this.imgPlaneSpriteNum++,this.imgPlaneSpriteNum>3&&(this.imgPlaneSpriteNum=0),this.player.context.restore();this.player.context.closePath()}},{key:"exceed",value:function(){var t=this.currentXY.x+this.velocityXY.dx>this.player.canvas.width-this.planeRadius,e=this.currentXY.x+this.velocityXY.dx<this.planeRadius;(t||e)&&(this.velocityXY.dx=-this.velocityXY.dx);var n=this.currentXY.y+this.velocityXY.dy<this.planeRadius,i=this.currentXY.y+this.velocityXY.dy>this.player.canvas.height-this.planeRadius;(n||i)&&(this.velocityXY.dy=-this.velocityXY.dy),this.currentXY.x+=this.velocityXY.dx,this.currentXY.y+=this.velocityXY.dy}},{key:"planeCollisionDetection",value:function(t){if(!(this.collided||t.collided||this.toLanding||t.toLanding)){var e=this.currentXY.x-t.currentXY.x,n=this.currentXY.y-t.currentXY.y;Math.sqrt(e*e+n*n)<this.planeRadius/c.constant.collisionCoefficient+t.planeRadius/c.constant.collisionCoefficient&&(this.collided=!0,t.collided=!0,this.player.soundOnEvents.selectTrack(c.constant.explosionTrackNum).play())}}}],[{key:"defineVelocity",value:function(t,e){return Math.pow(Math.pow(t,2)+Math.pow(e,2),.5)}}]),t}(),h=function(t){function e(t){o(this,e);var n=i(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));return n.planeRadius=c.constant.fighterPlaneRadius,n.velocityFull=c.constant.fighterVelocityFull,n.imgPlane=new Image,n.imgPlane.src=c.constant.imgFighterPlaneSRC,n}return a(e,t),e}(u),d=function(t){function e(t){o(this,e);var n=i(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));return n.planeRadius=c.constant.bomberPlaneRadius,n.velocityFull=c.constant.bomberVelocityFull,n.imgPlane=new Image,n.imgPlane.src=c.constant.imgBomberPlaneSRC,n}return a(e,t),e}(u),y=function(t){function e(t){o(this,e);var n=i(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));return n.planeRadius=c.constant.interceptorPlaneRadius,n.velocityFull=c.constant.interceptorVelocityFull,n.imgPlane=new Image,n.imgPlane.src=c.constant.imgInterceptorPlaneSRC,n}return a(e,t),e}(u);e.Plane=u,e.Fighter=h,e.Bomber=d,e.Interceptor=y},function(t,e,n){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var a=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),o=function(){function t(e,n,a,o){i(this,t),this.player=e,this.coordX=n,this.coordY=a,this.angle=o,this.img=new Image,this.img.src="img/runway.png",this.imgNum=0,this.skip=0}return a(t,[{key:"drawRunway",value:function(){this.skip%4||(this.player.context.beginPath(),this.player.context.save(),this.player.context.translate(this.coordX,this.coordY),this.player.context.rotate(this.angle*Math.PI/180),this.player.context.drawImage(this.img,this.imgNum%4*17.25,0,17.25,20,this.imgNum%4*17.25,0,17.25,20),this.imgNum+=1,this.player.context.restore(),this.player.context.closePath()),this.skip+=1}}]),t}();e.Runway=o},function(t,e,n){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0}),e.GameStatistic=void 0;var a=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),o=n(0),s=function(){function t(e){i(this,t),this.player=e,this.score=0,this.missed=0,this.missedImg=new Image,this.missedImg.src=o.constant.imgMissedSRC}return a(t,[{key:"increaseScore",value:function(){this.score+=1}},{key:"miss",value:function(){this.missed+=1}},{key:"draw",value:function(){if(this.player.context.beginPath(),this.missed)for(var t=0;t<this.missed;t++)this.player.context.drawImage(this.missedImg,825-60*t,670,55,55);this.player.context.font=o.constant.playerContextFont,this.player.context.fillStyle=o.constant.playerFillStyle,this.player.context.fillText("Score:"+this.score,50,50),this.player.context.closePath()}}]),t}();e.GameStatistic=s}],[10]);