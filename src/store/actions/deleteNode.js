const deleteNode = async (state, uid) => {
  return new Promise((res, rej) => {
    fetch(process.env.VUE_APP_HOST + '/node/' + uid, {
      method: "DELETE",
      headers: new Headers({
        "Authorization": "Bearer " + state.getters.getAccessToken
      })
    }).then(resp => resp.json()).then(msg => {
      if(msg.message == "Deleted Successfully") {
        res()
      } else {
        rej()
      }
    })
  })
}
export default deleteNode
