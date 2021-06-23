<template>
  <div class="container">
    <h1>Reset Password</h1>
    <bForm >
    <bFormGroup label="New Password: " label-for="pwd">
    <bFormInput type="password" id="pwd" v-model="pwd" placeholder="Enter New password" required></bFormInput>
    </bFormGroup>
    <bFormGroup label="Confirm New Password: " label-for="cpwd">
    <bFormInput type="password" id="cpwd" v-model="cpwd" placeholder="Re enter New password" v-on:keyup="checkMatch()" required></bFormInput>
    </bFormGroup>
    <small class="red" v-if="nomatch">
      <li>
        Passwords do not match
      </li>
    </small>

    <hr>
    <bButton v-on:click="changePwd()">Submit</bButton>
    </bForm>
  </div>
</template>

<script>
export default {
  name: 'Reset',
  data() {
    return {
      pwd: '',
      cpwd: '',
      token: this.$route.params.token,
      nomatch: false
    }
  },
  created() {
    console.log(window.location.pathname)

  },
  methods: {
    changePwd() {
      if(this.pwd === this.cpwd && this.pwd != '') {
        this.$store.dispatch('resetPassword', {
          token: this.token,
          pwd: this.pwd
        })
          .then(data => {
            if(data) {
              this.$router.push({"name": "Home"})
            }
          })
      } else {
        alert('Passwords do not match and cannot be empty')
        this.pwd = ''
        this.cpwd = ''
      }
    },
    checkMatch() {
      if(this.pwd != this.cpwd) {
        this.nomatch = true
      } else {
        this.nomatch = false
      }
    },
  }
}
</script>

<style scoped>
.container {
  margin: 10px auto;
  padding: 10px;
  text-align: left;
}
h1 {
  text-align: center;
}
.red {
  color: #dd1111;
}

</style>
