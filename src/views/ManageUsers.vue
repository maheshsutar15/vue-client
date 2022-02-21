<template>
  <div>
    <h1>Manage Users</h1>
    <hr style="color: #222;">
    <b-button @click="$bvModal.show('regForm')"> Add new User</b-button>
    <hr>
    <b-list-group >
      <b-list-group-item >
        <div class="row">
          <div class="col-md-3">
            <h4>Username</h4>
          </div>
          <div class="col-md-3">
            <h4>Designation</h4>
          </div>
          <div class="col-md-3">
            <h4>Email</h4>
          </div>
          <div class="col-md-2">
            <b-button-group>
              <h4>Actions</h4>
            </b-button-group>
          </div>
        </div>
      </b-list-group-item>
      <b-list-group-item v-for="user in users" :key="user._id">
        <div class="row">
          <div class="col-md-3">
            {{ user.username }}
          </div>
          <div class="col-md-3">
            {{ user.designation }}
          </div>
          <div class="col-md-3">
            {{ user.email }}
          </div>
          <div class="col-md-2">
            <b-button @click="deleteUser(user)" variant="danger" v-b-tooltip.hover title="Delete User">
              <DeleteIcon class="icon"/>
            </b-button>
          </div>
        </div>
      </b-list-group-item>
    </b-list-group>
    <b-modal id='regForm' title="Add new user" hide-footer>
      <RegisterForm class="full_height" v-if="designation == 'admin' || designation == 'superadmin' || designation == 'user'"></RegisterForm>
      <div v-else>
        <b-alert show variant="warning">Only admins can add new users.</b-alert>
      </div>
    </b-modal>
  </div>

</template>

<script>
import { mapGetters } from 'vuex'
import RegisterForm from '../components/RegisterForm.vue'
import DeleteIcon from 'vue-material-design-icons/Delete.vue'

export default {
  name: 'ManageUsers',
  data() {
    return {
      users: []
    }
  },
  components: {
    RegisterForm,
    DeleteIcon
  },
  computed: {
    ...mapGetters({
      designation: 'getDesignation'
    })
  },
  mounted() {
    this.fetchUsers()
  },
  methods: {
    async fetchUsers() {
      this.$store.dispatch('createdUsers')
        .then(users => {
          this.users = users
        })
        .catch(e => {
          this.$bvToast.toast(e.message)
        })
    },
    async deleteUser(user) {
      const sure = await this.$bvModal.msgBoxConfirm("Are you sure you want to delete this user? " + user.username)
      if (sure) {
        this.$store.dispatch('deleteUser', user)
          .then(() => {
            this.$bvToast.toast("Deleted user " + user.username)
            this.fetchUsers()
          })
          .catch((e) => {
            console.log(e)
            this.$bvToast.toast("Could not delete user")
          })
      }
    }
  },


}
</script>

<style scoped>

.full_height {
  height: 100%;
}
</style>
