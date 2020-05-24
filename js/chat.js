function myFunction() {
  var x = document.getElementById("myLinks");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}


document.getElementById(`logOut`).addEventListener(`click`, function () {
  firebase.auth().signOut().then((res) => {
    window.location.href = '../index.html'

  }), (err) => {
    console.log(err, `signout error`)


  }
})



var database = firebase.database().ref("/")


var recieverId = localStorage.getItem(`recieverID`)
recieverId = JSON.parse(recieverId)
// console.log(recieverId)

database.child(`User/${recieverId}`).on(`value`, value => {
  let reciever = value.val()
  // console.log(reciever)

  document.getElementById(`recieverUser`).innerHTML = `@` + reciever.userName.toLowerCase()

})



document.getElementById(`sendMessage`).addEventListener(`click`, function () {
  alert(`message sent !!!!`)


    let currentuser = localStorage.getItem(`Current_userID`)
    currentuser = JSON.parse(currentuser)

    console.log(currentuser)


    let yourMessage = document.getElementById(`textMessage`).value
    console.log(yourMessage)

    let messageObj = {
      message: yourMessage,
      senderId: currentuser,
      senderIs: `true`
    }
    
    database.child(`User/${currentuser}/${recieverId}/Messages`).push(messageObj);

    let messageObjRec = {
      message: yourMessage,
      senderId: currentuser,
      senderIs: `false`
    }

    database.child(`User/${recieverId}/${currentuser}/Messages`).push(messageObjRec);
    yourMessage = ""

    // console.log(messageObj)
    // console.log(messageObjRec)




})



// database.child(`Current_user`).on(`value`, currentUser1 => {
//   let currentuser1 = currentUser1.val()
// })

var currentuser = localStorage.getItem(`Current_userID`)
currentuser = JSON.parse(currentuser)
// console.log(currentuser)



database.child(`User/${currentuser}/${recieverId}/Messages`).on(`child_added`, messages => {

    let message = messages.val()
    // console.log(message.message)

    var messageDiv = document.getElementById(`mesages`)
    messageDiv.style =  `overflow: auto;`
    var mess = document.createElement(`h4`)
    mess.innerHTML = message.message
    messageDiv.appendChild(mess);
    if (message.senderIs === `true`) {
      mess.style = `text-align: right;color: black; font-family: impect;background-color: #BDBABA ` 

    }
    if (message.senderIs === `false`) {
      mess.style = `color: black; background-color: #DCDAF2; border-radius: 5px;  width: 200px; font-family: impect;`
    }
  })