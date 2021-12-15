// if users is loggedin 
const userInfo = localStorage.getItem('userInfo');
if(userInfo){
    if(userInfo.profile != null){
        setImage('profile',userInfo.photoURL);
    }
    addThisElement('profile-image');
}
else{       
    removeThisElement('profile-image');
}
auth.onAuthStateChanged(user => {
    console.log(user);
    // Getting user info
    if(user){
        if(user.photoURL != null){
            setImage('profile',user.photoURL);
        }
        addThisElement('profile-image');
    }
    else{       
        removeThisElement('profile-image');
    }
});