"use strict";

function VerifyCode(canvas, codeLength){
   this._canvas = canvas;
   this._context = canvas.getContext('2d');
   this._canvasWidth = canvas.width;
   this._canvasHeight = canvas.height;
   this._codeLength = codeLength;
   this._code = null;
}

VerifyCode.prototype = {
   constructor : VerifyCode,

   _randCode : function(){
      var result = [];
      for(var i = 0;i < this._codeLength; i++){
         var randSeed = Math.random();
         if(randSeed < 0.5){//数字
            result.push(String.fromCharCode(48 + parseInt(Math.random() * 10)));
         }
         else if(randSeed < 0.8){//大写
            result.push(String.fromCharCode(65 + parseInt(Math.random() * 10)));
         }
         else{//小写
            result.push(String.fromCharCode(97 + parseInt(Math.random() * 10)));
         }
      }
      this._code = result.join('');
      return result;
   },


   _randPos : function(seeds){
      var midY = this._canvasHeight/2,
         that = this;
      seeds = seeds.map(function(v, i, a){
         var directionX = Math.random() < 0.5 ? -1 : 1,
            directionY = Math.random() < 0.5 ? -1 : 1,
            directionRotate = Math.random() < 0.5 ? -1 : 1,
            x = parseInt(that._canvasWidth/5*(i+1) + that._canvasWidth/32*directionX),//x坐标
            y = parseInt(that._canvasHeight*3/4 + that._canvasHeight/100*directionY),//y左边
            rotate = parseInt(5*Math.random()*directionRotate),//旋转角度
            fontSize = that._canvasHeight/2 + parseInt(10*Math.random()),//字体大小
            fontWeight = 3 + parseInt(5*Math.random()),//字体粗细
            r = parseInt(200*Math.random()),//red
            g = parseInt(200*Math.random()),//green
            b = parseInt(200*Math.random()),//blue
            a = 0.6 + 0.4*Math.random();//alpha
         return {
            x : x,
            y : y,
            rotate : rotate,
            r : r,
            g : g,
            b : b,
            a : a,
            fontSize : fontSize,
            fontWeight : fontWeight,
            value : v
         };
      });

      return seeds;

   },

   _addMosiac : function(){
      var type = Math.random(),
         ctx = this._context,
         r = parseInt(256*Math.random()),//red
         g = parseInt(256*Math.random()),//green
         b = parseInt(256*Math.random()),//blue
         a = 0.2*Math.random(),//alpha
         style = ['rgba(', r, ',', g, ',', b, ',', a, ')'].join(''),
         x1 = parseInt(Math.random()*this._canvasWidth),
         y1 = parseInt(Math.random()*this._canvasHeight),
         x2 = parseInt(Math.random()*this._canvasWidth),
         y2 = parseInt(Math.random()*this._canvasHeight),
         lineWidth = 1 + parseInt(5*Math.random());
      if(type < 0.3){
         //直线
         ctx.strokeStyle = style;
         ctx.lineWidth = lineWidth;
         ctx.beginPath();
         ctx.moveTo(x1, y1);
         ctx.lineTo(x2, y2);
         ctx.stroke();
      }
      else if(type < 0.7){
         //曲线
         var cpx = parseInt(Math.random()*this._canvasWidth),
            cpy = parseInt(Math.random()*this._canvasHeight);
         ctx.strokeStyle = style;
         ctx.lineWidth = lineWidth;
         ctx.beginPath();
         ctx.moveTo(x1, y1);
         ctx.quadraticCurveTo(cpx, cpy, x2, y2);
         ctx.stroke();
      }
      else{
         //圆
         var radius = 2 + parseInt(30*Math.random());
         ctx.fillStyle = style;
         ctx.beginPath()
         ctx.arc(x1, x2, radius, 0, Math.PI*2, true);
         ctx.closePath();
         ctx.fill();
      }
   },


   drawCode : function(){
      var ctx = this._context;
      //清除画布
      ctx.clearRect(0, 0, this._canvasWidth, this._canvasHeight);
      //增加背景斑点
      var initLen = 5 + parseInt(5*Math.random());
      for(var i = 0; i<initLen; i++)
         this._addMosiac();
      var seeds = this._randPos(this._randCode());
      for(var i in seeds){
         var s = seeds[i];

         ctx.save();
         ctx.rotate(s.rotate*Math.PI/180);

         ctx.fillStyle = ['rgba(', s.r, ',', s.g, ',', s.b, ',', s.a, ')'].join('')
         ctx.font = [s.fontSize, 'px arial'].join('');
         ctx.fillText(s.value, s.x, s.y);

         ctx.restore();
      }
      var afterLen = 5 + parseInt(5*Math.random());
      for(var i = 0; i<afterLen; i++)
         this._addMosiac();
   }


};


Array.prototype.map = Array.prototype.map || function(fn){
   var result = [];
   for(var i in this)
      result[i] = fn.call(this, this[i], i, this);
   return result;
};