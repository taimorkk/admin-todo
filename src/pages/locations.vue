<template>
  <div class="container">
    <router-view></router-view>

    <div class="containe mt-8 mx-8">
      <p class="font-sans ... text-xl font-bold text-left">
        <!-- <router-link :to="{ name: 'addTask', params: { reqType: 'New' } }"
          >Users
        </router-link> -->
        {{route.params.name}}
      </p>

      <div
        class="container border border-slate-300 rounded h-96 p-5 bg-white mb-3 w-3/4 mt-4"
      >
        <p class="font-sans mb-3 ... text-md font-bold text-left">Tasks</p>
        <table
          class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
        >
          <thead
            class="text-xs border-b dark:bg-gray-800 dark:border-gray-700 text-gray-700 uppercase dark:text-gray-400"
          >
            <tr>
              <th scope="col" class="px-6 py-3">User Details</th>
              <th scope="col" class="px-6 py-3">Email</th>
              <th scope="col" class="px-6 py-3">Last Updated</th>
              <!--                 
                <th scope="col" class="px-6 py-3">
                    <span class="sr-only">Edit</span>
                </th> -->
            </tr>
          </thead>
          <tbody>
             
            <tr
              
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
              >
                {{ state.users.name }}
              </th>
              <td class="px-6 py-4">
                {{ state.users.email }}
              </td>
              <td class="px-6 py-4">{{ time }}</td>
            </tr>
          </tbody>
        </table>
<!--        
            <router-link
              :to="{
                name: 'updateTask',
                params: {
                  reqType: 'Update',
                  id: task.id,
                  title: task.title,
                  description: task.description,
                  due_at: task.due_at,
                },
              }"
            > -->
            
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
    });

    onBeforeMount(() => {
      loadData();
      console.log("user task mount");
    });

    const time = computed(() => {
      return moment(state.users.updated_at).calendar();
    });

    const loadData = async () => {
      const res = await http.get("/users");
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
