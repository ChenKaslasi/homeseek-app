<template>
  <div class="home-banner">
    <div class="banner-content">
      <h2>“The world belongs to those who let go.”</h2>
      <p>-Lao Tzu</p>
      <button @click="goToCity">Let's go</button>
    </div>
    <div class="banner-content2">
      <h2>“Don't forget your coat”</h2>
      <p>-The HomeSeek staff :)</p>
    </div>
  </div>
</template>

<script>
export default {
    methods:{
        goToCity(){
            this.$router.push('/city')
        }
    }
};
</script>

<style lang="scss" scoped>
.home-banner {
    margin-top: 40px;
    margin-bottom: 40px;
  background-image: url("https://images.contentstack.io/v3/assets/bltb428ce5d46f8efd8/blt304100c88b563ae5/5e72688401b3dc04d25c31dd/BeloRauschBG.png?crop=16:9&height=900&width=1600");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  height: 300px;
  width: 100%;
  color: #fff;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  .banner-content {
    p {
      padding-top: 10px;
      padding-left: 50px;
    }
    h2 {
      margin-top: 10px;
      font-size: 32px;
    }
    button {
      padding: 10px ;
      width: 40px;
      border-radius: 20px;
      margin-top: 60px;
      background-color: #fff;
      font-family: Circular;
      cursor: pointer;
      border: none;
      width: 20%;
      font-size: 18px;
    }
  }
  .banner-content2{
      display: flex;
      flex-direction: column;
      width: 100%;
      align-items: flex-end;
      text-align: left;
      p {
      padding-top: 10px;
      padding-left: 50px;
      text-align: left;
    }
    h2 {
      margin-top: 10px;
      font-size: 32px;
    }
  }
}
</style>