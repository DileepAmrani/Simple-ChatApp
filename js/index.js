document.getElementById(`sign`).addEventListener(`click` , function(){
alert(`signup`)
document.getElementById(`logInForm`).style.display = `none`;
document.getElementById(`signUpForm`).style.display = `block`;


})

document.getElementById(`log`).addEventListener(`click` , function(){
    alert(`logIn`)
    document.getElementById(`logInForm`).style.display = `block`;
    document.getElementById(`signUpForm`).style.display = `none`;
    
    
})



var database = firebase.database().ref(`/`)


document.getElementById(`signUp`).addEventListener(`click` , function(){

    let userName = document.getElementById(`exampleInputName1`).value;
    let userEmail = document.getElementById(`exampleInputEmail1`).value;
    let userPassword = document.getElementById(`exampleInputPassword1`).value;
    
    const obj = {
        userName:userName,
        userEmail:userEmail,
        userPassword:userPassword
    }
    
    // console.log(obj)


    firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword).then(

        function(res){

        database.child(`User/${res.user.uid}`).set(obj);
        alert(`Sign Up Successful`)
        document.getElementById(`logInForm`).style.display = `block`;
        document.getElementById(`signUpForm`).style.display = `none`;
        

            }
        )
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(`Sign Up Un Successful`)
        
            // ...
          });

})




document.getElementById(`logIn`).addEventListener(`click`, function(){
    // alert(`click`)
    let userEmail1 = document.getElementById(`exampleInputEmail12`).value;
    let userPassword1 = document.getElementById(`exampleInputPassword12`).value;
    //    console.log(userEmail1)
    //    console.log(userPassword1)


    firebase.auth().signInWithEmailAndPassword(userEmail1, userPassword1 ).then(


        function(resObj){
            // console.log(resObj.user.uid)
            database.child(`User/${resObj.user.uid}`).once('value',(value) => {
            let usersObj = value.val()
            // console.log(usersObj)
            usersObj.id = value.key
            
            localStorage.setItem(`Current_user`,JSON.stringify(usersObj))
            localStorage.setItem(`Current_userID` ,JSON.stringify(usersObj.id))

            window.location.href= `./pages/home.html`


        // function(resObj){
        //     console.log(resObj)
        //     database.child(`User/${resObj.user.uid}`).once('value',(value) => {
        //         let usersObj = value.val()
        //         console.log(usersObj)
        //         usersObj.id = value.key
                
        //         const useroject = {
        //             userName:usersObj.userName,
        //             userEmail:usersObj.userEmail,
        //             userId:usersObj.id
        //         }

        //         localStorage.setItem(`Current_user` , JSON.stringify(useroject))
        //         localStorage.setItem(`Current_userID` ,JSON.stringify(usersObj.id))
                
        //         // database.child(`Current_user`).set(usersObj)
        //         alert(`Log In Successful`)
                
        //     window.location.href= `./pages/home.html`
        })

    })
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(`Log In Un Successful`)
        // console.log(errorMessage)
        // console.log(errorCode)
        // ...
    });
})