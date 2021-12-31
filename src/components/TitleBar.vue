<template>
  <div>
    <b-navbar toggleable="lg" type="dark" class="titlebar">
      <b-navbar-toggle target="nav-collapse" v-if="loggedIn"></b-navbar-toggle>

      <b-navbar-brand href="/dashboard">
        <img src="../assets/logo.png" alt="ATechno Embedded Solutions" width="32px" height="32px">
        {{ isMobile ? 'ATES OPL' : 'ATechno Embedded Solutions' }}
      </b-navbar-brand>
      <b-collapse id="nav-collapse" is-nav v-if="loggedIn">
        <b-navbar-nav class="ml-auto operations" >
          <b-nav-item-dropdown right text="Options">
            <b-dropdown-item v-if="designation === 'admin' || designation === 'superadmin'" v-on:click="goToLogs()">
              <LogsIcon class="ico" title="Logs"  />
              <strong>Acitvity Logs</strong>
            </b-dropdown-item>
            <b-dropdown-item v-if="designation === 'admin' || designation === 'superadmin'" v-on:click="goToAdminDashboard()">
              <DashboardIcon class="ico" title="Logs"  />
              <strong>Admin Dashboard</strong>
            </b-dropdown-item>
            <b-dropdown-item v-on:click="goToManageUsers()">
              <ManageUsers class="ico" title="ManageUsers"  />
              <strong>Manage Users</strong>
            </b-dropdown-item>
            <b-dropdown-item v-on:click="goToProfile()">
              <FaceProfile class="ico" title="Profile"  />
              <strong>Profile</strong>
            </b-dropdown-item>
            <b-dropdown-item v-on:click="goToAboutUs()">
              <Info class="ico" title="About Us"></Info>
              <strong>About Us</strong>
            </b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item v-on:click="logout()">
            <LogoutIcon class="ico dark" title="Logout" />
            <strong>Logout</strong>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>

    </b-navbar>
  </div>
</template>

<script>

import LogoutIcon from 'vue-material-design-icons/Logout.vue';
import FaceProfile from 'vue-material-design-icons/Account.vue';
import Info from 'vue-material-design-icons/Information.vue';
import LogsIcon from 'vue-material-design-icons/Library.vue'
import DashboardIcon from 'vue-material-design-icons/ViewDashboard.vue'
import ManageUsers from 'vue-material-design-icons/AccountMultiple.vue'
import { mapGetters } from 'vuex';

export default {
  name: 'TitleBar',
  components: {
    LogoutIcon,
    FaceProfile,
    LogsIcon,
    DashboardIcon,
    ManageUsers,
    Info
  },
  mounted() {
    window.addEventListener('resize', () => {
      let size = window.screen.width;
      this.isMobile = size <= 760;
    });
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
    },
    goToLogs() {
      this.$router.push({ name: 'Logs' })
    },
    goToAboutUs() {
      this.$router.push({name: 'About'})
    },
    goToManageUsers() {
      this.$router.push({name: 'ManageUsers'})
    },
    goToAdminDashboard() {
      this.$router.push({name: 'AdminDashboard'})
    },
 },
  data() {
    return {
      ip: window.location.host,
      isMobile: false,
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
  background-color: maroon;

  background-color: #ccc;
  background-color: #FCFFDB;
  background-color: #539;
  box-shadow: #222 1px 1px 15px;
}

.ico {
  color: black;
}
.dark {
  color: white;
}
</style>
