const archiveNode = async (state, uid) => {
  const node = {
    uid: uid,
    isArchived: true
  }
  return new Promise((res, rej) => {
    fetch(process.env.VUE_APP_HOST +  '/server/' + '/node/modify', {
      headers: new Headers({
        'Authorization': 'Bearer ' + state.getters.getAccessToken,
        'Content-Type': 'application/json'
      }),
      mode: 'cors',
      cache: 'default',
      method: 'POST',
      body: "" + JSON.stringify(node) + ""
    }).then(resp => {
      if(resp.status == 201) {
        res()
      } else {
        resp.json().then(data => {
          rej(data.msg)
        })
      }
    })
  })
}
export default archiveNode;
