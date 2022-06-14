<template>
  <div class="container">
    <router-view></router-view>
    <div class="container mt-10 mx-8">
      <p @click="addLocation" class="font-sans ... text-xl font-bold text-left">
       
          + Add new Location
      
      </p>

      <div class="container mb-3 w-3/4 mt-4">
        <p class="font-sans mb-3 ... text-md font-bold text-left">
          Current Location
        </p>
            <div>
              <p class="font-Inter ... text-md font-medium text-left mx-2">
                <!-- {{ location.address }} -->
              </p>
              <p class="text-left text-neutral-500 mx-2 text-sm font-bold">
                {{ state.currentLocation.lat}} {{state.currentLocation.long}}
              </p>
            </div>
      </div>

      <div class="container mb-3 w-3/4 mt-4">
        <p class="font-sans mb-3 ... text-md font-bold text-left">
          Previous Location
        </p>
        <ul>
          <li
            :v-bind="state.locations"
            v-for="(location) in state.locations"
            :key="location.id"
            class="flex mb-4"
          >
            <input type="checkbox" class="w-6 mt-1.5" />
            <div>
              <p class="font-Inter ... text-md font-medium text-left mx-2">
                {{ location.address }}
              </p>
              <p class="text-left text-neutral-500 mx-2 text-sm font-bold">
                {{ location.latitude}} {{location.longitude}}
              </p>
            </div>
           
            <button class="text-black w-16 bg-gray-200 b  font-sm rounded-full text-sm ml-4 mr-2 mb-2  ">Update</button>
           
            <button class="text-white w-16 bg-gray-900  font-sm rounded-full text-sm mr-2 mb-2  ">Delete</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, computed, onMounted } from "vue";
import moment from "moment";
import http from "../http-request";
// import ModalForm from '../components/modal.vue'
// import { useStore } from "vuex";
// import { useRouter } from "vue-router";

export default {
  name: "userLocation",
  components: {
    // ModalForm
  },
  setup() {
    const state = reactive({
    locations:'',
    currentLocation:{
        lat:'',
        long:''
    }
    });

    onMounted(() => {
      
        addLocation()
     loadData()
    });

    const time = computed(() => {
      return state.tasks.map(function (item) {
        return moment(item.due_at).calendar();
      });
    });

    const  loadData = async ()=>{
 const res = await http.get("/checkins");
      console.log(res.data.checkins);
       state.locations = res.data.checkins;
    };

    const addLocation = () => {
        if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(position => {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    state.currentLocation.lat=lat;
    state.currentLocation.long=long;
    console.log('Latitude: ', lat);
    console.log('Longitude: ', long);
  }, error => {
    console.log('Need access to get location.',error);
  });
}
      console.log("modal");
    };
    return {
      addLocation,
      state,
      time,
      onMounted,
      loadData
    };
  },
};
</script>
