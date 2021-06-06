<template>
  <div>
    <b-navbar toggleable="lg" type="dark" class="titlebar">
      <b-navbar-toggle target="nav-collapse" v-if="loggedIn"></b-navbar-toggle>

      <b-navbar-brand href="/dashboard">Atechno Embedded Solutions </b-navbar-brand>
      <b-collapse id="nav-collapse" is-nav v-if="loggedIn">
        <b-navbar-nav class="ml-auto operations" >
          <b-nav-item>
            <strong class="hostname">{{ ip }}</strong>
          </b-nav-item>
          <b-nav-item-dropdown right text="Options">
            <b-dropdown-item @click="$bvModal.show('regForm')">
              <HumanIcon class="ico" title="Add User"/> 
              <strong>Add User</strong>
            </b-dropdown-item>
            <b-dropdown-item v-on:click="goToProfile()">
              <FaceProfile class="ico" title="Profile"  />
              <strong>Profile</strong>
            </b-dropdown-item>
            <b-dropdown-item v-on:click="logout()">
              <LogoutIcon class="ico" title="Logout" />
              <strong>Logout</strong>
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>

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
import FaceProfile from 'vue-material-design-icons/Account.vue'; 
import { mapGetters } from 'vuex';

export default {
  name: 'TitleBar',
  components: {
    RegisterForm,
    LogoutIcon,
    HumanIcon,
    FaceProfile
  },
  computed: {
    ...mapGetters({
      loggedIn: 'getLogInStatus',
      designation: 'getDesignation'
    }),
  },
  methods: {
    async logout() {
      this.$bvModal.msgBoxConfirm("Are you sure you want to logout?")
        .then(confirmation => {
          if(confirmation) {
            this.$store.dispatch('logout')
              .then(() => {
                this.$router.push({ name: "Home" })
              })
          }
        })
        .catch(e => {
          this.message = e.message
          this.$bvModal.msgBoxOk(e.message)
        })

    },
    goToProfile() {
      this.$router.push({name: 'Profile'})
    }
  },
  data() {
    return {
      ip: window.location.host,
      message: ''

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
  color: black;
}
.full_height {
  height: 100%;
}
.hostname {
  color: white;
}
</style>
