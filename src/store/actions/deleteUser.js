const deleteUser = async (state, user) => {
  return new Promise((res, rej) => {
    fetch(process.env.VUE_APP_HOST + '/server/user/delete', {
      method: 'DELETE',
      headers: new Headers({
        "Authorization": "Bearer " + state.getters.getAccessToken,
        "Content-Type": 'application/json'
      }),
      mode: 'cors',
      cache: 'default',
      body: "" + JSON.stringify(user) + ""
    }).then(resp => resp.json()).then(msg => {
      console.log(msg)
      if(msg.msg == "Deleted") {
        res()
      } else {
        rej('lol')
      }
    })
  })
}
export default deleteUser

// const deleteNode = async (state, uid) => {
//   return new Promise((res, rej) => {
//     fetch(process.env.VUE_APP_HOST + '/node/' + uid, {
//       method: "DELETE",
//       headers: new Headers({
//         "Authorization": "Bearer " + state.getters.getAccessToken
//       })
//     }).then(resp => resp.json()).then(msg => {
//       if(msg.message == "Deleted Successfully") {
//         res()
//       } else {
//         rej()
//       }
//     })
//   })
// }
// export default deleteNode
