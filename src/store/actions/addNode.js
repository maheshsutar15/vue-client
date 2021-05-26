const addNode = async (state, node) => {
  console.log(node)
  let resp = await fetch(process.env.VUE_APP_HOST + '/node/add', {
    headers: new Headers({
      'Authorization': 'Bearer ' + state.getters.getAccessToken,
      'Content-Type': 'application/json'
    }),
    mode: 'cors',
    cache: 'default',
    method: 'POST',
    body: "" + JSON.stringify(node) + ""
  })
  let data = await resp.json()
  if(resp.status == 201) {
    alert("Node Added")
  } else {
    alert(`Could Not Add Node ${data.msg}`)
  }
}
export default addNode;
