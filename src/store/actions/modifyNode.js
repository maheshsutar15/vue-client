const modifyNode = async (state, node) => {
  return new Promise((res, rej) => {
    fetch(process.env.VUE_APP_HOST + '/server/node/modify', {
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
export default modifyNode;
