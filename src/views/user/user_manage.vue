<!-- <template>
  <div class="s-canvas">
    <canvas id="s-canvas" :width="contentWidth" :height="contentHeight" @click="getnewcode()" :verficode='identifyCode'></canvas>
  </div>
</template>
<script>
 import Cookies from 'js-cookie';
  export default{
    name: 'SIdentify',
    props: {
      identifyCode:'0123456789',
      fontSizeMin: {
        type: Number,
        default: 20
      },
      fontSizeMax: {
        type: Number,
        default: 40
      },
      backgroundColorMin: {
        type: Number,
        default: 180
      },
      backgroundColorMax: {
        type: Number,
        default: 240
      },
      colorMin: {
        type: Number,
        default: 50
      },
      colorMax: {
        type: Number,
        default: 160
      },
      lineColorMin: {
        type: Number,
        default: 40
      },
      lineColorMax: {
        type: Number,
        default: 180
      },
      dotColorMin: {
        type: Number,
        default: 0
      },
      dotColorMax: {
        type: Number,
        default: 255
      },
      contentWidth: {
        type: Number,
        default: 112
      },
      contentHeight: {
        type: Number,
        default: 38
      }
    },
    methods: {
      // 生成一个随机数
      randomNum (min, max) {
        return Math.floor(Math.random() * (max - min) + min)
      },
      // 生成一个随机的颜色
      randomColor (min, max) {
        let r = this.randomNum(min, max)
        let g = this.randomNum(min, max)
        let b = this.randomNum(min, max)
        return 'rgb(' + r + ',' + g + ',' + b + ')'
      },

      drawPic () {
        let canvas = document.getElementById('s-canvas')
        let ctx = canvas.getContext('2d')
        ctx.textBaseline = 'bottom'
        // 绘制背景
         ctx.fillStyle = 'rgb('+200+','+200+','+204+')'  //this.randomColor(this.backgroundColorMin, this.backgroundColorMax)
        ctx.fillRect(0, 0, 112, 38)
        // 绘制文字
        //生成一个四位数的验证码 
        var $code = '';
        if(this.identifyCode != $code){
          var $Code_arr = [0,1,2,3,4,5,6,7,8,9];
          for (var i = 0; i < 4; i++) {
            var newcode = '';
            newcode = Math.floor((Math.random()*10)); 
            $code= $code+newcode;
            this.drawText(ctx, newcode, i)
          }
          this.drawLine(ctx)
          this.drawDot(ctx)
          this.identifyCode = $code;
          //存入此次的验证码数字到Cookie中
          Cookies.set('verficode',$code);
        }
        
      },
      drawText (ctx, txt, i) {
        ctx.fillStyle = this.randomColor(50, 160)
        ctx.font = this.randomNum(28, 36) + 'px SimHei'
        var x = (i + 1) * 22
        var y = this.randomNum(40, 36)
        var deg = this.randomNum(-35, 35)
        // 修改坐标原点和旋转角度
        ctx.translate(x, y)
        ctx.rotate(deg * Math.PI / 180)
        ctx.fillText(txt, 0, 0)
        // 恢复坐标原点和旋转角度
        ctx.rotate(-deg * Math.PI / 180)
        ctx.translate(-x, -y)
        x=0;y=0;
      },
      drawLine (ctx) {
        // 绘制干扰线
        for (var i = 0; i < 5; i++) {
          ctx.strokeStyle = this.randomColor(40, 180)
          ctx.beginPath()
          ctx.moveTo(this.randomNum(0, 112), this.randomNum(0, 38))
          ctx.lineTo(this.randomNum(0, 112), this.randomNum(0, 38))
          ctx.stroke()
        }
      },
      drawDot (ctx) {
        // 绘制干扰点
        for (var i = 0; i < 50; i++) {
          ctx.fillStyle = this.randomColor(0, 255)
          ctx.beginPath()
          ctx.arc(this.randomNum(0, 112), this.randomNum(0, 38), 1, 0, 2 * Math.PI)
          ctx.fill()
        }
      },
      getnewcode(){ 
            this.$emit("on-click");
            var date = new Date();
            this.identifyCode=date.getTime();
      }
    },
    watch:{
      identifyCode () {
        this.drawPic()
      }
    },
    mounted () {
      this.drawPic()
    }
  }
</script> -->