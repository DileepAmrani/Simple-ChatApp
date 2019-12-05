function myFunction() {
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
}


document.getElementById(`logOut`).addEventListener(`click`, function(){
    firebase.auth().signOut().then((res) => {
      window.location.href = '../index.html'
  
  }), (err) => {
      console.log(err, `signout error`)
  
  
  }
})
  


var database = firebase.database().ref("/")

database.child(`User`).on(`child_added`, value => {
    let alluser = value.val();
    alluser.id= value.key
    console.log(alluser)



var currentuser = localStorage.getItem(`Current_user`)
currentuser = JSON.parse(currentuser)

if(currentuser.id !== alluser.id){

  
  var mainDiv =  document.getElementById(`user`)
  
  var div = document.createElement(`div`)
  div.setAttribute(`id`, `divSizing`)
  
  let img = document.createElement(`img`)
  img.setAttribute(`id` , `profile`)
  img.setAttribute(`src`, `../images/dummy-profile.jpg`)
  div.appendChild(img)
  
  let name = document.createElement(`span`)
  name.setAttribute(`id`, `userName`)
  let nameText = document.createTextNode(`${alluser.userName.toUpperCase()}`)
  name.appendChild(nameText)
  div.appendChild(name)
  
  
  let email = document.createElement(`span`)
  email.setAttribute(`id`, `userEmail`)
  let emailText = document.createTextNode(alluser.userEmail)
  email.appendChild(emailText)
  div.appendChild(email)
  
  let chatBtn = document.createElement(`input`)
  chatBtn.setAttribute(`type`, `button`)
  chatBtn.setAttribute(`value`, `Chat`)
  chatBtn.setAttribute(`id`, alluser.id)
  chatBtn.setAttribute(`class`, `btn btn-primary`)
  chatBtn.style = `float: right; margin-top: 15px; margin-right: 5px`
  div.appendChild(chatBtn)
  
  
  chatBtn.addEventListener(`click`, function(){
    window.location.href = `../pages/chat.html`
    console.log(this.id)
    localStorage.setItem(`recieverID`, JSON.stringify(this.id))
  }) 
  
  mainDiv.appendChild(div)
}
  
})