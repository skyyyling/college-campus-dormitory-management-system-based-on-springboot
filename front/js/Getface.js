
    $(function(){
        let mediaStreamTrack=null;
        openMedia();
        setTimeout("tishi()","1000");
        setTimeout("tishi2()","3000");
        setTimeout("takePhoto()","5000");
        
    })
    var number=0;
    function tishi(){
        $("#flag").html("正在打开摄像头")
    }
    function tishi2(){
        $("#flag").html("请正视摄像头")
    }
    function tishi3(){
        window.location.href="login.html";
    }
    function openMedia() {
        let constraints = {
            video: { width: 500, height: 500 },
            audio: false
        };
        //获得video摄像头
        let video = document.getElementById('video');     
        let promise = navigator.mediaDevices.getUserMedia(constraints);
        promise.then((mediaStream) => {
            mediaStreamTrack = typeof mediaStream.stop === 'function' ? mediaStream : mediaStream.getTracks()[1];
            video.srcObject = mediaStream;
            video.play();
        });
    }

    // 拍照
    function takePhoto() {
        //获得Canvas对象
        number++;
        let video = document.getElementById('video');
        let canvas = document.getElementById('canvas');
        let ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, 500, 500);
		// toDataURL  ---  可传入'image/png'---默认, 'image/jpeg'
        let img = document.getElementById('canvas').toDataURL();
        // 这里的img就是得到的图片
        console.log('img-----', img);
        document.getElementById('imgTag').src=img;
		$("#flag").html("正在识别");

        layui.use(['form','jquery','axios','layer','store'], function () {
            var axios = layui.axios;
            var store = layui.store;
            axios({
                method: 'post',
                url: '/faceLogin',
                data: {"imagebast64": img},
            }).then(function(data) {
                console.log(data);
                if(data.code !== 200){
                    $("#flag").html("识别失败，请保持人像处于框内 2秒后重新识别");
                    if(number<3){
                        setTimeout("takePhoto()","3000");
                    }else {
                        $("#flag").html("识别失败请使用账号密码登录 三秒后回到主页");
                        setTimeout("tishi3()","3000");
                    }
                } else {
                    store.setToken(data.data.token);
                    location.href='index.html';
                }
            })
        });
    }

    // 关闭摄像头
    function closeMedia() {
        mediaStreamTrack.stop();
    }