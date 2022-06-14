<template>
  <table class="w-full text-sm text-left h-48 text-gray-500 dark:text-gray-400">
    <thead
      class="text-xs border-b dark:bg-gray-800 dark:border-gray-700 text-gray-700 uppercase dark:text-gray-400"
    >
      <tr>
        <th v-for="(column, index) in state.columns" :key="index"> {{column}}</th>
        <!--                 
                <th scope="col" class="px-6 py-3">
                    <span class="sr-only">Edit</span>
                </th> -->
      </tr>
    </thead>
    <tbody>
      <tr :v-bind="state.data"
            v-for="(item) in state.data"
            :key="item.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <th v-for="(column, indexColumn) in state.columns" :key="indexColumn">{{item[column]}}</th>
      </tr>
    </tbody>
  </table>
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
      data: "",
      columns:''
    });

    onBeforeMount(() => {
      state.columns=route.params.columns;
      loadData();
      console.log("user table mount columns are",state.columns);
    });

    const time = computed(() => {
      return moment(state.users.updated_at).calendar();
    });

    const loadData = async () => {
      const res = await http.get(route.name);
      console.log(res.data[route.name]);
      state.data=res.data[route.name];
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
      onBeforeMount,
      loadData,
      deleteuser,
      route,
      router,
    };
  },
};
</script>
