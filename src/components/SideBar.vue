<template>

    <div class=" relative">
    <nav id="sidebar" class="sidebar fixed bg-black w-64  min-h-screen " >
      <ul class="lisst-unstyled my-5 components mt-10">
        
      <p class="font-bold text-gray-300 text-lg">Admin Panel</p>
         <li class="mt-4">
           <router-link to="/Users">Users</router-link> 
        </li>

        <li >
           <router-link to="/location">Location</router-link> 
        </li>
        
        <!-- <li v-if="isAdmin">
           <router-link :to="{ name: 'users'}">Users</router-link> 
        </li> -->
      </ul>
           <button @click="logout" class="text-black w-32 bg-white p-1 font-md rounded-full text-md mx-14 absolute inset-x-0 bottom-10  ">Logout</button>
    </nav>
  </div>
</template>

<script>
  import { useStore } from 'vuex'
  import { useRouter } from 'vue-router'
export default {
  name: 'SideBar',

  setup() {
     const store = useStore();
     const router = useRouter();

    
    const logout = () => {
     store.dispatch('logout');
     console.log(store.getters.isAuthenticated);
      if(!store.getters.isAuthenticated){
        router.replace('/')
      }
      try{
    // this.$store.dispatch('login');
      }
      catch(err){
        console.log(err)
      }
    };

    

    return {
     
      logout
    };
  },


}


</script>

<style scoped>


.router-link-active{
  background-color: #161515; 
   color: #ffffff !important;
   border-radius:  0  0;;
	
}
.router-link-active:hover {
  background-position: right;
}


/* .sidebar {
  min-width: 250px;
  max-width: 250px;
  min-height: 600px;
  background-color: #ffffff;
  color: #000000;
  
 cursor: pointer;
} */


#sidebar>ul>li>a {
      padding: 20px 10px;
      color: rgb(182, 182, 182);
      
      
}
.sidebar ul li a {
  
  text-decoration: none;
  padding: 10px;
  font-size: .9rem;
   color: #ffffff;
  display: block;
      border-bottom: 1px solid rgba(145, 147, 150, 0.19);
         
}

#sidebar ul li a:hover {
  color: #ffffff;
  background-color: #000000; 
   border-radius:  0 100em 100em 0;
}

</style>
