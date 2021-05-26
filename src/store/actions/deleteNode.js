const deleteNode = async (state, uid) => {
  let resp = await fetch(process.env.VUE_APP_HOST + '/node/' + uid, {
    method: "DELETE",
    headers: new Headers({
      "Authorization": "Bearer " + state.getters.getAccessToken
    })
  });
  let msg = await resp.json();
  if(msg.message == "Deleted Successfully") {
    window.location.reload()
  } else {
    alert("Could not delete");
  }
}
export default deleteNode
