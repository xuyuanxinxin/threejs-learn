<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <video ref="video"></video>
    <button @click="videoTest">开启摄像头</button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
  methods: {
    videoTest: function () {
      const video = this.$refs.video;
      navigator.mediaDevices
        .getUserMedia({
          video: { width: 1280, height: 720 },
          audio: true,
        })
        .then(function (stream) {
          console.log(stream);
          video.srcObject = stream;
          video.onloadedmetadata = function (e) {
            console.log(e);
            video.play();
          };
          // console.log(stream);
        });
    },
  },
  mounted: function () {},
};
</script>
