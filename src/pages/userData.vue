<template>
  <div class="container overflow-scroll">
    <div class="containe mt-8 mx-8">
      <p class="font-sans text-xl font-bold text-left">
        {{ route.params.name }}

        <!-- <router-link :to="{ name: 'addTask', params: { reqType: 'New' } }"
          >{{route.params.name}}
        </router-link> -->
      </p>

      <div
        class="container border border-slate-300 rounded p-5 bg-white mb-3 w-3/4 mt-4"
      >
        <div class="flex">
          <router-link
            :to="{
              name: 'tasks',
              params: { type: 'tasks', columns: state.tasksColumns },
            }"
          >
            <p class="font-sans mb-3 text-md font-bold text-left">
              All Tasks
            </p></router-link
          >
          <router-link
            :to="{
              name: 'checkins',
              params: { type: 'checkins', columns: state.locationsColumns },
            }"
          >
            <p class="font-sans mb-3 ml-3 text-md font-bold text-left">
              All Locations
            </p></router-link
          >
        </div>
        
        <router-view  v-slot="{ Component, route }">
  <component :is="Component" :key="route.path" />
</router-view>
       
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, computed, onBeforeMount } from "vue";
import { useRouter, useRoute } from "vue-router";
import moment from "moment";
import http from "../http-request";
export default {
  name: "userTask",
  components: {
    // ModalForm
  },
  setup() {
    const route = useRoute();
    const router = useRouter();

    const state = reactive({
      users: "",
      "address": "Karachi Pakistan",
			"latitude": "0.00000000",
			"longitude": "0.00000000",
			"created_at": "2021-03-27T11:29:58.000000Z",
      tasksColumns: ["title", "status", "due_at"],
      locationsColumns: ["address", "latitude", "created_at"],
    });

    onBeforeMount(() => {
      loadData();
      console.log("user task mount");
    });

    const time = computed(() => {
      return moment(state.users.updated_at).calendar();
    });

    const loadData = async () => {
      const res = await http.get("users");
      console.log(res.data.users);
      state.users = res.data.users;
    };

    const deleteuser = (id) => {
      const res = http.delete("/user/" + id);
      console.log(res.data);
    };

    const modal = () => {
      console.log("modal");
    };
    return {
      modal,
      state,
      time,
      route,
      router,
      onBeforeMount,
      loadData,
      deleteuser,
    };
  },
};
</script>
