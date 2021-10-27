<template>
  <section
    class="header-container main-layout"
    :class="{
      scrollDisplay: isScrolled,
      homePageDisplay: isHomePage,
      mobileSearch: isMobileSearch,
      noShadow: !isScrolled,
    }"
  >
    <div class="content flex align-center justify-between">
      <div class="logo flex">
        <a href="/" class="logo flex align-center">
          <img class="logo-svg" src="../assets/icons/‏‏logo-pink.svg" />
          <span class="txt">HomeSeek</span>
        </a>
      </div>

      <div class="search">
        <div
          @click="toggleFilter"
          :class="[{ searchNarrow: headerNarrow }]"
          v-if="headerNarrow"
        >
          <button v-if="!isMobileSearch" class="btn flex align-center">
            <div v-if="cityName" class="txt">{{ cityName }}</div>
            <div v-else class="txt">{{ "Start your search" }}</div>
            <div class="search-icon">
              <img src="../assets/icons/search_m.svg" />
            </div>
          </button>
        </div>

        <div v-if="!headerNarrow" class="filter">
          <space-filter :isHomePage="isHomePage" />
        </div>

        <div class="mobile-search" v-if="isMobileSearch">
          <div class="search-bar flex">
            <div ref="backBtn" class="back-btn" @click="toggleMobileSearch">
              <img src="../assets/icons/back-btn-mobile.svg" />
            </div>
            <input type="text" placeholder="Where are you going?" />
          </div>
          <div class="search-boxes">
            <div @click="selectCity('Barcelona')" class="box flex">
              <div class="image">
                <img src="../assets/img/mobile-city-bgc-1.jpg" />
              </div>
              <div class="txt flex column justify-center">
                <div class="top">Barcelona</div>
                <div class="bottom">Catalunya, Spain</div>
              </div>
            </div>
            <div @click="selectCity('New York')" class="box flex">
              <div class="image">
                <img src="../assets/img/mobile-city-bgc-2.jpg" />
              </div>
              <div class="txt flex column justify-center">
                <div class="top">New York</div>
                <div class="bottom">NY, United States</div>
              </div>
            </div>
            <div @click="selectCity('Sydney')" class="box flex">
              <div class="image">
                <img src="../assets/img/mobile-city-bgc-3.jpg" />
              </div>
              <div class="txt flex column justify-center">
                <div class="top">Sydney</div>
                <div class="bottom">NSW, Australia</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        ref="overlayEl"
        @click="toggleFilter"
        v-if="!headerNarrow"
        class="overlay"
      ></div>

      <div class="link-container flex">
        <a class="explore" href="/#/Barcelona">Explore</a>
        <a class="become-host" href="/#/host">Become a Host</a>
        <div class="user-dropdown flex">
          <button
            @click="toggleDropdown"
            class="btn flex justify-around align-center"
          >
            <img class="hamburger-img" src="../assets/icons/hamburger.svg" />
            <img v-if="loggedInUser" class="guest-img" :src="loggedInUser.userImg" />
            <img v-else class="guest-img" src="../assets/icons/guest.svg" />
            <div :class="{ notifictionAlert: notifictionStatus }"></div>
            <div
              v-click-outside="toggleDropdown"
              v-if="isDropdownOpen"
              class="login-container"
            >
              <ul class="login-dropdown">
                <li v-if="!loggedInUser">
                  <button class="sign-up" @click="openModal('signUp')">
                    Sign up
                  </button>
                </li>
                <li v-if="!loggedInUser">
                  <button @click="openModal('login')">Log in</button>
                </li>
                <li v-if="loggedInUser">
                  <button @click="logout">Log out</button>
                </li>
                <li v-if="loggedInUser">
                  <button @click="goToTrips">Trips</button>
                </li>
                <li v-if="loggedInUser">
                  <button @click="hostDashboard">Dashboard</button>
                </li>
              </ul>
            </div>
          </button>
        </div>
      </div>
    </div>
    <login
      v-if="isModalOpen"
      :isLogin="isLogin"
      @close="closeModal"
      @setUser="setLoggedInUser"
    ></login>
  </section>
</template>



<script>
import login from "../cmps/login.cmp.vue";
import spaceFilter from "../cmps/space-filter.cmp";

export default {
  components: {
    login,
    spaceFilter,
  },
  props: {
    notifictionStatus: Boolean,
  },
  data() {
    return {
      isScrolled: false,
      lastScrollPosition: 0,
      isHomePage: false,
      isDropdownOpen: false,
      isModalOpen: false,
      isLogin: true,
      isMobileSearch: false,
      headerNarrow: true,
      cityName: "Start your search",
      loggedInUser: null,
    };
  },
  methods: {
    goToTrips() {
      this.$router.push('/trips');
    },
    onScroll() {
      this.headerNarrow = true;
      const currentScrollPosition =
        window.pageYOffset || document.documentElement.scrollTop;
      if (currentScrollPosition === 0) {
        this.headerNarrow = true;
      }

      this.isScrolled = currentScrollPosition !== 0 || window.innerWidth < 800;
    },
    setLoggedInUser(user) {
      this.loggedInUser = user;
      console.log(this.loggedInUser);
    },
    setIsHomePage() {
      this.isHomePage = this.$route.path === "/";
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    openModal(action) {
      this.isLogin = action === "login" ? true : false;
      this.isModalOpen = true;
    },
    closeModal() {
      console.log("close modal ?");
      this.isModalOpen = false;
    },
    toggleFilter() {
      if (window.innerWidth > 800) {
        this.headerNarrow = !this.headerNarrow;
      } else {
        this.isMobileSearch = !this.isMobileSearch;
      }
    },
    toggleMobileSearch() {
      this.isMobileSearch = !this.isMobileSearch;
    },
    async logout() {
      await this.$store.dispatch({ type: "logout" });
      this.loggedInUser = null;
      // await this.$router.push("/");
    },
    hostDashboard() {
      this.$router.push("/host-dashboard");
    },

    // --------------------------------------------
    // methods:
    selectCity(cityName) {
      this.$router.push({ path: "/city", query: { city: cityName }});
      this.$refs.backBtn.click();
    },
    setCityName() {
      this.cityName = this.$route.query.city;
    },
  },
  watch: {
    $route() {
      this.setCityName();
      this.setIsHomePage();
    },
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll);

    // --------------------------------------------

    if (window.innerWidth < 800) {
      this.isScrolled = true;
    }
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  },
  created() {
    if (sessionStorage.user) {
      this.loggedInUser = JSON.parse(sessionStorage.user);
    }
    this.setIsHomePage();
    if (this.$route.query.city) {
      this.setCityName();
    }
  },

  // -------------------------------------------------------
};
</script>