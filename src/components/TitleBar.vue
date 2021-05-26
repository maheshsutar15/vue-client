<template>
  <div>
    <b-navbar type="dark" class="titlebar">
      <b-navbar-brand href="#">Atechno Embedded Solutions Pvt Ltd</b-navbar-brand>
      <b-navbar-nav class="ml-auto operations" v-if="loggedIn">
        <strong class="hostname">{{ ip }}</strong>
        <HumanIcon class="ico" title="Add User" @click="$bvModal.show('regForm')"/> 
        <LogoutIcon class="ico" title="Logout" v-on:click="logout()"/>
      </b-navbar-nav>
    </b-navbar>
    <b-modal  id='regForm' title="Add new user" hide-footer>
      <RegisterForm class="full_height" v-if="designation == 'admin'"></RegisterForm>
      <div v-else>
        <b-alert show variant="warning">Only admins can add new users.</b-alert>
      </div>
    </b-modal>
  </div>
</template>

<script>

import RegisterForm from './RegisterForm.vue'

import LogoutIcon from 'vue-material-design-icons/Logout.vue';
import HumanIcon from 'vue-material-design-icons/HumanMale.vue'; 
import { mapGetters } from 'vuex';

export default {
  name: 'TitleBar',
  components: {
    RegisterForm,
    LogoutIcon,
    HumanIcon
  },
  computed: {
    ...mapGetters({
      loggedIn: 'getLogInStatus',
      designation: 'getDesignation'
    }),
  },
  methods: {
    async logout() {
      const confirmation = confirm("Are you sure you want to logout?")
      if(confirmation) {
        this.$store.dispatch('logout')
          .then(() => {
            this.$router.push({ name: "Home" })
          })
      }
    },
  },
  data() {
    return {
      ip: window.location.host
    }
  }
};

</script>


<style scoped>
.operations {
  margin: 0 5px;
}

.titlebar {
  background-color: #539;
}

.ico {
  color: white;
}
.full_height {
  height: 100%;
}
.hostname {
  color: white;
}
</style>
