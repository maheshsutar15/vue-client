const register = async (state, regUserForm) => {
  return new Promise((resolve, reject) => {
    let usr = {
      username: regUserForm.username,
      email: regUserForm.email,
      institute: regUserForm.institute,
      designation: regUserForm.designation
    }
    console.log(usr)

    fetch(process.env.VUE_APP_HOST + '/server/user/register', {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Accept": "*/*",
        "Authorization": "Bearer " + state.getters.getAccessToken
      },
      body: JSON.stringify(usr)
    }).then(r => r.json())
      .then(data => {
        console.log({data})
        if (data.msg) {
          resolve(data.msg)
        } else {
          resolve(data.message)
        }
      }).catch(e => {
        reject(e)
      })
  })
}
export default register;
