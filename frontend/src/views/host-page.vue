<template>
  <section class="host-page main-layout main-content">
    <space-header />
    <div class="wrapper">

      <div class="text">
        <h4 >SEE WHAT’S POSSIBLE</h4>
        <h2>Share your passion for hospitality - Become a Host</h2>
      </div>

    <div class="form-container flex">
      <div class="form-hero"></div>
      <form class="form" @submit.prevent>
        <div class="form-header">Tell us more about your place</div>
        <div class="input-container">
          <input
            type="text"
            class="form-input"
            placeholder="Please input your Name"
            v-model="space.fullName"
          />

          <!-- delete after -->
            <!-- <input
            type="text"
            class="form-input"
            placeholder="Host Name"
            v-model="hostName"
          />
            <input
            type="number"
            class="form-input"
            placeholder="Review scores"
            v-model="reviewScores.rating"
          />
            <input
            type="text"
            class="form-input"
            placeholder="Street name"
            v-model="address.street"
          />
            <input
            type="text"
            class="form-input"
            placeholder="About host"
            v-model="aboutHost"
          />
            <input
            type="text"
            class="form-input"
            placeholder="Room type"
            v-model="roomType"
          />
            <input
            type="text"
            class="form-input"
            placeholder="Cancellation Policy"
            v-model="cancellationPolicy"
          /> -->

 -->



          <!-- delete after -->



          
          <input
            type="text"
            class="form-input"
            placeholder="Please enter location description"
            v-model="space.locationDesc"
          />
          <input
            type="text"
            class="form-input"
            placeholder="Please enter space Description"
            v-model="space.spaceDesc"
          />
          <input
            type="number"
            class="form-input input-num"
            placeholder="How much will you charge"
            v-model="space.price"
          />
          <input
            type="number input-num"
            class="form-input"
            placeholder="How many bedrooms?"
            v-model="space.bedrooms"
          />
          <select
            v-model="space.city"
            class="form-input select-input"
            placeholder="Location"
          >
            <option value="" disabled selected>Where is your place?</option>
            <option
              class="form-input"
              v-for="city in cities"
              :key="city"
              :label="city"
              :value="city"
            ></option>
          </select>
        </div>
        <button class="listing-btn" @click="addSpace">
          Start your listing
        </button>
      </form>
    </div>
    </div>
  </section>
</template>
<script>
import spaceHeader from "@/cmps/space-header.cmp.vue";
export default {
  components: {
    spaceHeader,
  },
  data() {
    return {
      space: {
        fullName: "",
        spaceDesc: "",
        bedrooms: null,
        price: null,
        city: "",
      },
      cities: ["Barcelona", "New York", "Sydney"],
      options: [1, 2, 3],
      // delete after
      hostName: "",
      reviewScores: {rating: null},
      address: {street: ""},
      locationDesc: "",
      aboutHost: "",
      roomType: "Entire place",
      cancellationPolicy: "flexible"
      // delete after
    };
  },
  computed: {
    getBeds() {
      let beds;
      if (this.bedrooms === 1) {
        return (beds = 1);
      } else if (this.bedrooms === 2) {
        return (beds = 2);
      } else if (this.bedrooms === 3) {
        return (beds = 3);
      } else {
        console.log(beds);
        return (beds = 1);
      }
    },
    getCountry() {
      if (this.space.city === "Barcelona") return "Spain";
      else if (this.space.city === "New York")
        return { lat: 40.67414, lng: -73.95667 };
      else return "Australia";
    },
    getCords() {
      if (this.space.city === "Barcelona") return { lat: 41.40082, lng: 2.16942 };
      else if (this.space.city === "New York") return  { lat: 40.67414, lng: -73.95667 };
      else return { lat: -33.865143, lng: 151.2099 };
    },
  },
  methods: {
    async addSpace() {
      if (!this.space.fullName) {
        console.log("no name added");
      }
      try {
        let newSpace = {
          name: this.space.fullName,
          spaceDesc: this.space.spaceDesc,
          bedrooms: this.space.bedrooms,
          beds: this.getBeds,
          bathrooms: 2, //CHANGE LATER
          capacity: 3,
          spaceType: "Apartment",
          amenities: [
            "Air conditioning",
            "Essentials",
            "Hangers",
            "Heating",
            "Iron",
            "Kitchen",
            "Parking",
            "TV",
            "Wifi"
          ],
          price: this.space.price,
          roomType: "Entire home",
          address: {
            city: this.space.city,
            country: this.getCountry,
            coordinates: this.getCords,
          },
          host: {
            id: "u101",
            url: "https://www.airbnb.com/users/show/2128778",
            // name: this.space.fullName,
            name: this.hostName,
            profileImg:
              "https://a0.muscache.com/im/pictures/user/f6c7bc12-dca4-48d1-8b1a-d6d0ad27e84c.jpg?im_w=240",
            isSuperhost: true,
            identityVerified: true,
          },
          imgs: [
            "https://www.pngitem.com/pimgs/m/176-1769258_01-airbnb-airbnb-art-direction-hd-png-download.png",
            "https://images.squarespace-cdn.com/content/v1/5909f768bf629a1fec7ad9fb/1546535306006-B8Z630M0BZCOZPNSY6TX/ke17ZwdGBToddI8pDm48kPTrHXgsMrSIMwe6YW3w1AZ7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0p52bY8kZn6Mpkp9xtPUVLhvLurswpbKwwoDWqBh58NLxQZMhB36LmtxTXHHtLwR3w/lorisalessandria_airbnb_home01.png?format=1500w",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3ckAc1MBJ46X_BialwmFLM2DMXX3YHGwgxA&usqp=CAU",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTAWifsTblKQ_nMH7024e1ouKnf_EncWG53w&usqp=CAU",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6mWqFEYl_YbRV_xWYqb-pcOGCyBDlKfufFQ&usqp=CAU",
          ],
        };
        console.log("new space", newSpace);
        this.$store.dispatch({
          type: "addSpace",
          space: newSpace,
        });
        this.$router.push("/");
      } catch (err) {
        console.log("ERR:", err);
      }
    },
    // async addSpace() {
    //   if (!this.space.fullName) {
    //     console.log("no name added");
    //   }
    //   try {
    //     let newSpace = {
    //       // added 
    //       reviewScores: {rating: this.reviewScores.rating} ,
    //       // added 
    //       name: this.space.fullName,
    //       spaceDesc: this.space.spaceDesc,
    //       locationDesc: this.space.locationDesc,
    //       bedrooms: this.space.bedrooms,
    //       beds: this.getBeds,
    //       bathrooms: 2, //CHANGE LATER
    //       capacity: 3,
    //       reviews: [
    //         {
    //         id : "70534343327772377",
    //         date : "2020-09-18T04:00:00.000Z",
    //         by : {
    //             id : "37843211as05",
    //             name : "David",
    //             img : "https://a0.muscache.com/im/pictures/user/af91fcd2-6faa-48bb-883d-3b9f86a1a7d3.jpg?im_w=240"
    //         },
    //         "txt" : "Incredible HomeSeek. Literally one of the best I've booked."
    //         }, 
    //         {
    //         id : "7054532212123677",
    //         date : "2019-10-18T04:00:00.000Z",
    //         by : {
    //             id : "378ds4320511",
    //             name : "Or",
    //             img : "https://a0.muscache.com/im/pictures/user/bffe5ad3-4877-4932-8918-ef6580529d8f.jpg?im_w=240"
    //         },
    //         "txt" : "Great place, freshly painted and well decorated, amazing location."
    //         }, 
    //         {
    //         id : "7053212236773390",
    //         date : "2016-04-20T04:00:00.000Z",
    //         by : {
    //             id : "37284sa3205",
    //             name : "Ben",
    //             img : "https://a0.muscache.com/im/pictures/user/d3dc08f5-7a35-40c8-9e9e-04c759aa51f0.jpg?im_w=240"
    //         },
    //         "txt" : "Excellent, secure, clean, well equipped apartment with lots of room and comfortable couch and so useful having a washing machine and drying area over rear balcony "
    //         }, 
    //         {
    //         id : "7053212236773390",
    //         date : "2016-04-20T04:00:00.000Z",
    //         by : {
    //             id : "37284sa3205",
    //             name : "Ben",
    //             img : "https://a0.muscache.com/im/pictures/user/d3dc08f5-7a35-40c8-9e9e-04c759aa51f0.jpg?im_w=240"
    //         },
    //         "txt" : "Excellent, secure, clean, well equipped apartment with lots of room and comfortable couch and so useful having a washing machine and drying area over rear balcony "
    //         }, 
    //       ],
    //       spaceType: "Apartment",
    //       roomType : this.roomType,
    //       cancellationPolicy : this.cancellationPolicy,
    //       amenities: [
    //         "Air conditioning",
    //         "Essentials",
    //         "Hangers",
    //         "Heating",
    //         "Iron",
    //         "Kitchen",
    //         "Parking",
    //         "TV",
    //         "Wifi"
    //       ],
    //       price: +this.space.price,
    //       address: {
    //         city: this.space.city,
    //         street: this.address.street,
    //         country: this.getCountry,
    //         coordinates: this.getCords,
    //       },
    //       host: {
    //         id: "u10127",
    //         url: "https://www.airbnb.com/users/show/2128778",
    //         // name: this.space.fullName,
    //         name: this.hostName,
    //         profileImg:
    //           "https://a0.muscache.com/im/pictures/user/b039a458-1dd5-4d46-951b-ab7ba1528fd1.jpg?im_w=240",
    //         isSuperhost: true,
    //         identityVerified: true,
    //         responseRate : 90,
    //         responseTime : "Within 24 hours",
    //         about: this.aboutHost
    //       },
    //       imgs: [
    //         "https://a0.muscache.com/im/pictures/04f93055-7b1a-48ad-a8ef-9abd29a0eed8.jpg?im_w=720",
    //         "https://a0.muscache.com/im/pictures/3007e044-9b47-4f43-85fc-f54bb5a0e11a.jpg?im_w=720",
    //         "https://a0.muscache.com/im/pictures/78c4e072-9437-41ba-bfed-dcfbd794da41.jpg?im_w=720",
    //         "https://a0.muscache.com/im/pictures/df0c056c-709b-46be-a03c-5f46c4e76d2c.jpg?im_w=720",
    //         "https://a0.muscache.com/im/pictures/9c67f112-a777-4a61-ada8-42199748adad.jpg?im_w=720",
    //       ],
    //     };
    //     console.log("new space", newSpace);
    //     this.$store.dispatch({
    //       type: "addSpace",
    //       space: newSpace,
    //     });
    //     this.$router.push("/");
    //   } catch (err) {
    //     console.log("ERR:", err);
    //   }
    // },
  },
};
</script>

<style lang="scss" scoped>
</style>
