const register = async (state, regUserForm) => {
  let usr = {
    username: regUserForm.username,
    password: regUserForm.password,
    email: regUserForm.email,
    institute: regUserForm.institute,
    designation: regUserForm.designation
  }
  console.log(usr)

  fetch(process.env.VUE_APP_HOST + '/user/register', {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "Accept": "*/*"
    },
    body: JSON.stringify(usr)
  }).then(r => {
    if(r.status === 200) {
      alert("User Registered")
      window.location.reload()
    }
  }).catch(e => {
    alert(e)
  })
}
export default register;
