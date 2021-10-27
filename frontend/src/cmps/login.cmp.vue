<template>
  <section class="login-cmp">
    <div class="screen" @click="emitClose"></div>
    <div class="login-container">
      <header class="login-header">
        <button @click="emitClose">&#10005;</button>
        <h2 v-if="isLogin">Log in</h2>
        <h2 v-else>Sign up</h2>
      </header>
      <main>
        <img src="@/assets/img/login-profile.png" />
        <div class="form-container">
          <form @submit.prevent="sendUserCred">
            <div class="input-container">
              <div v-if="!isLogin" class="username-container">
                <input
                  v-model="user.fullName"
                  type="text"
                  placeholder="Username"
                />
              </div>
              <div class="email-container">
                <input v-model="user.email" type="text" placeholder="Email" />
              </div>
              <input 
                v-model="user.password"
                type="password"
                placeholder="Password"
              />
            </div>
            <button>Continue</button>
          </form>
        </div>
      </main>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    isLogin: Boolean,
  },
  data() {
    return {
      user: {
        fullName: "",
        email: "",
        password: "",
      },
      loggedInUser: "",
    };
  },
  methods: {
    async sendUserCred() {
      if (
        (!this.isLogin && !this.user.fullName) ||
        !this.user.password ||
        !this.user.email
      ) {
        console.log("Fill all cred");
        return;
      }
      const res = await this.$store.dispatch({
        type: this.isLogin ? "login" : "signup",
        userCred: this.user,
      });
      this.$emit('setUser')
      if (res.err) {
        console.log("err", res.err);
      }
      await this.emitClose()
    },
    emitClose() {
      this.$emit("close");
    },
  },
};
</script>