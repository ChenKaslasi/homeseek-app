<template>
  <section class="list-filter">
    <h1 v-if="space.city">Stays in {{ space.city }}</h1>
    <h1 v-else>Places to stay for you</h1>
    <div class="buttons-container">
      <div class="btn-container">
        <button @click="togglePopper('cancel')">
          Cancellation flexibility
        </button>
        <div
          v-click-outside="emitFilter"
          v-if="isPopperOpen.cancel"
          class="popper cancel-popper"
        >
          <div class="popper-content">
            <p>Only show stays that offer cancellation flexibility</p>
            <el-switch
              @change="toggleDisable"
              v-model="filter.cancel"
              active-color="#222222"
              inactive-color="#717171"
            >
            </el-switch>
          </div>
          <div class="popper-footer">
            <button :class="checkCancelDisabled" @click="clear('cancel')">
              Clear
            </button>
            <button class="btn save-btn" @click="emitFilter">Save</button>
          </div>
        </div>
      </div>
      <div class="btn-container">
        <button @click="togglePopper('type')">Type of place</button>
        <div
          @change="toggleDisable"
          v-click-outside="emitFilter"
          v-if="isPopperOpen.type"
          class="popper type-popper"
        >
          <div class="popper-content">
            <el-checkbox class="checkBox" v-model="filter.entirePlace"
              ><h4>Entire place</h4>
              Have a place to yourself</el-checkbox
            >
            <el-checkbox class="checkBox" v-model="filter.privateRoom"
              ><h4>Private room</h4>
              Have your own room and share some <br />
              common spaces</el-checkbox
            >
          </div>
          <div class="popper-footer">
            <button :class="checkTypeDisabled" @click="clear('type')">
              Clear
            </button>
            <button class="btn save-btn" @click="emitFilter">Save</button>
          </div>
        </div>
      </div>
      <div class="btn-container">
        <button @click="togglePopper('price')">Price</button>
        <div
          v-click-outside="emitFilter"
          v-if="isPopperOpen.price"
          class="popper price-popper"
        >
          <div class="popper-content">
            <div @click="focusInput(1)" class="full-input">
              <div>
                <label for="maxP">min price</label>
              </div>
              <div class="input-section">
                <span class="dollar">$</span
                ><input
                  @input="toggleDisable"
                  ref="minInput"
                  type="number"
                  id="maxP"
                  name="maxP"
                  placeholder="10"
                  v-model="filter.minPrice"
                />
              </div>
            </div>
            <span class="hyphen">–</span>
            <div @click="focusInput(2)" class="full-input">
              <div>
                <label for="maxP">max price</label>
              </div>
              <div class="input-section">
                <span class="dollar">$</span
                ><input
                  @input="toggleDisable"
                  ref="maxInput"
                  type="number"
                  id="maxP"
                  name="maxP"
                  placeholder="1000+"
                  v-model="filter.maxPrice"
                />
              </div>
            </div>
          </div>
          <div class="popper-footer">
            <button :class="checkPriceDisabled" @click="clear('price')">
              Clear
            </button>
            <button class="btn save-btn" @click="emitFilter">Save</button>
          </div>
        </div>
      </div>
    </div>
    <div class="mobile-filter">
      <button class="filters-toggle-btn" @click="toggleFilters">Filters</button>
      <div v-show="isFiltersOpen" class="filters-modal">
        <header class="modal-header">
          <button class="close-btn" @click="toggleFilters">&#10005;</button>
          <h2>Filters</h2>
          <button :class="checkGeneralDisabled" @click="clear('general')">
            Clear
          </button>
        </header>
        <main class="modal-content">
          <div class="cancel-filter">
            <h2>Cancellation flexibility</h2>
            <div>
              <p>Only show stays that offer cancellation flexibility</p>
              <el-switch
                @change="toggleDisable"
                v-model="filter.cancel"
                active-color="#222222"
                inactive-color="#717171"
              >
              </el-switch>
            </div>
          </div>
          <div class="type-filter">
            <label class="container">
              <h2>Entire place</h2>
              <p>Have a place to yourself</p>
              <input type="checkbox" v-model="filter.entirePlace" @change="toggleDisable"/>
              <span class="checkmark"></span>
            </label>
            <label class="container">
              <h2>Private room</h2>
              <p>Have your own room and share some</p>
              <input type="checkbox" v-model="filter.privateRoom" @change="toggleDisable"/>
              <span class="checkmark"></span>
            </label>
          </div>
          <div class="price-filter">
            <h2>Price range</h2>
            <div class="input-container">
              <label class="price-label" for="minP#"
                ><p>min price</p>
                <div>
                  <span>$</span>
                  <input
                  @input="toggleDisable"
                    type="number"
                    id="minP#"
                    placeholder="10"
                    v-model="filter.minPrice"
                  />
                </div>
              </label>
              <span class="hyphen">–</span>
              <label class="price-label" for="maxP#"
                ><p>max price</p>
                <div>
                  <span>$</span>
                  <input
                  @input="toggleDisable"
                    type="number"
                    id="maxP#"
                    placeholder="1500+"
                    v-model="filter.maxPrice"
                  />
                </div>
              </label>
            </div>
          </div>
        </main>
        <footer class="modal-footer">
          <button
            @click="
              emitFilter();
              toggleFilters();
            "
            class="submit-btn"
          >
            Show results
          </button>
        </footer>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    space: Object,
  },
  data() {
    return {
      isFiltersOpen: false,
      isPopperOpen: {
        cancel: false,
        type: false,
        price: false,
      },
      isDisabled: {
        cancel: true,
        type: true,
        price: true,
        general: true,
      },
      filter: {
        cancel: false,
        entirePlace: false,
        privateRoom: false,
        minPrice: 0,
        maxPrice: null,
      },
    };
  },
  computed: {
    checkCancelDisabled() {
      if (this.isDisabled.cancel) return "clear-btn disabled";
      else return "clear-btn";
    },
    checkTypeDisabled() {
      if (this.isDisabled.type) return "clear-btn disabled";
      else return "clear-btn";
    },
    checkPriceDisabled() {
      if (this.isDisabled.price) return "clear-btn disabled";
      else return "clear-btn";
    },
    checkGeneralDisabled() {
      if (this.isDisabled.general) return "clear-btn disabled";
      else return "clear-btn";
    },
  },
  methods: {
    clear(value) {
      if (value === "cancel") {
        this.filter.cancel = false;
        this.isDisabled.cancel = true;
      }
      if (value === "type") {
        this.filter.entirePlace = false;
        this.filter.privateRoom = false;
        this.isDisabled.type = true;
      }
      if (value === "price") {
        this.filter.minPrice = 0;
        this.filter.maxPrice = null;
        this.isDisabled.price = true;
      }
      if (value === "general") {
        this.filter.cancel = false;
        this.filter.entirePlace = false;
        this.filter.privateRoom = false;
        this.filter.minPrice = 0;
        this.filter.maxPrice = null;
        this.isDisabled.general = true;
      }
    },
    toggleFilters() {
      this.isFiltersOpen = !this.isFiltersOpen;
    },
    emitFilter() {
      const filter = JSON.parse(JSON.stringify(this.filter));
      this.$emit("changeFilter", filter);
      this.isPopperOpen.cancel = false;
      this.isPopperOpen.type = false;
      this.isPopperOpen.price = false;
    },
    togglePopper(value) {
      if (value === "cancel") {
        this.isPopperOpen.cancel = !this.isPopperOpen.cancel;
        this.isPopperOpen.type = false;
        this.isPopperOpen.price = false;
      }
      if (value === "type") {
        this.isPopperOpen.type = !this.isPopperOpen.type;
        this.isPopperOpen.cancel = false;
        this.isPopperOpen.price = false;
      }
      if (value === "price") {
        this.isPopperOpen.price = !this.isPopperOpen.price;
        this.isPopperOpen.type = false;
        this.isPopperOpen.cancel = false;
      }
    },
    toggleDisable() {
      if (!this.filter.cancel) this.isDisabled.cancel = true;
      else this.isDisabled.cancel = false;
      if (!this.filter.entirePlace && !this.filter.privateRoom)
        this.isDisabled.type = true;
      else this.isDisabled.type = false;
      if (!this.filter.minPrice && !this.filter.maxPrice)
        this.isDisabled.price = true;
      else this.isDisabled.price = false;
      if(!this.filter.cancel && !this.filter.entirePlace && !this.filter.privateRoom && !this.filter.minPrice && !this.filter.maxPrice) this.isDisabled.general = true;
      else this.isDisabled.general = false;
    },
    focusInput(num) {
      if (num === 1) this.$refs.minInput.focus();
      else this.$refs.maxInput.focus();
    },
  },
};
</script>