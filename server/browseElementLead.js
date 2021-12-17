/* Database configuration */
const firebaseConfig = {
    apiKey: "AIzaSyDyhJPX5hGXmkVCjWiDYDgxW8Ongh0YZqU",
    authDomain: "capstone-d17ab.firebaseapp.com",
    projectId: "capstone-d17ab",
    storageBucket: "capstone-d17ab.appspot.com",
    messagingSenderId: "658315154433",
    appId: "1:658315154433:web:ee6855874b6ed722da1c00",
    databaseURL:"https://capstone-d17ab-default-rtdb.europe-west1.firebasedatabase.app"
};
/* Initialize Database  */
const app = firebase.initializeApp(firebaseConfig);
const database = app.database();
const auth = firebase.auth();
var userInfo = JSON.parse(localStorage.getItem('userInfo'));
console.log(userInfo);

//shoung userinfo

fillin('username',userInfo.Username);

// usefull varible
var interval = 9;

// if users is loggedin 
if(userInfo){
    if(userInfo.profile != null){
        setImage('profile',userInfo.photoURL);
    }
    addThisElement('profile-image');
}
else{
    removeThisElement('profile-image');
}

// Authenticating user
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

// function for showing blog
const bloglist = document.getElementById("blog-list");
const displayBlog = (inter = null) => {
    let limit = interval === null ? interval : interval + inter;
    var BlogTable = database.ref('Blogs').orderByChild('dateCreated').limitToFirst(limit);
    const removeNotification = showNotification(`!`,'Fetching blogs','success','noEnd');
    var htmlString = '';
   
    BlogTable.once('value', (snapshot) => {
        const data = snapshot.val();
        if (snapshot.exists()) {
            removeNotification();
            showNotification(`!`,'Blogs fetched','success');
            var childKey = snapshot.key;
            for(var i in data){
                console.log(data[i]);
                htmlString += `
                <div class="r-card">
                    <div class="top-image">
                        <img src="../images/rH8O0FHFpfw.jpg" alt="" srcset="">
                    </div>
                    <div class="r-card-body">
                        <div class="r-card-title ">
                            <h5 class="leon" >${data[i].Subtitle}</h5>
                        </div>
                        <div class="r-infomation">
                            <p>
                                ${data[i].info}
                            </p>
                        </div> 
                        `

                        htmlString += userInfo.userType == 'admin' ? `<div class="r-card-footer flexed-footer">`:`<div class="r-card-footer">`;
                        htmlString += userInfo.userType == 'admin' ? ` <button class="read-more update"  onClick="updateThisBlog('${data[i].id}')">
                                                                        <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M4.29163 10.4243L6.682 10.4155L11.8993 4.85051C12.1041 4.63001 12.2167 4.33718 12.2167 4.02568C12.2167 3.71418 12.1041 3.42135 11.8993 3.20085L11.0402 2.27568C10.6307 1.83468 9.91629 1.83701 9.51004 2.27393L4.29163 7.8401V10.4243V10.4243ZM10.2743 3.10051L11.135 4.02393L10.27 4.94676L9.41092 4.02218L10.2743 3.10051ZM5.37496 8.3266L8.64121 4.84235L9.50029 5.76751L6.23458 9.2506L5.37496 9.25351V8.3266Z" fill="white"/>
                                                                            <path d="M3.20833 12.75H10.7917C11.3891 12.75 11.875 12.2267 11.875 11.5833V6.527L10.7917 7.69367V11.5833H4.91892C4.90483 11.5833 4.89021 11.5892 4.87613 11.5892C4.85825 11.5892 4.84038 11.5839 4.82196 11.5833H3.20833V3.41667H6.91713L8.00046 2.25H3.20833C2.61087 2.25 2.125 2.77325 2.125 3.41667V11.5833C2.125 12.2267 2.61087 12.75 3.20833 12.75Z" fill="white"/>
                                                                        </svg> 
                                                                        </button>` : '';

                        htmlString += userInfo.userType == 'admin' ? ` <button class="read-more delete"  onClick="deleteThisBlog('${data[i].id}')">
                                                                            <svg width="11" height="10" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path d="M9.89214 0L5.5 3.99286L1.10786 0L0 1.00714L4.39214 5L0 8.99286L1.10786 10L5.5 6.00714L9.89214 10L11 8.99286L6.60786 5L11 1.00714L9.89214 0Z" fill="white"/>
                                                                            </svg>
                                                                        </button>` : '';
                      
                        htmlString += ` <button class="read-more" onClick="readThisBlog('${data[i].id}')">Read more</button>
                        </div>
                    </div>
                </div> 
                `; 
            }
            htmlString +=`<div class="more" >
                            <button class="browse-more" id="next-for-new-blog" onclick="displayBlog(3)" >Browse more blog</button>
                        </div>`;
            bloglist.innerHTML= htmlString;
        }        
        else{
            showNotification(`!`,'No blogs found','success');
        }
    });
}
displayBlog();

const blogForm = document.getElementById('new-blog-form');
blogForm.addEventListener('submit',(sub) => {
    sub.preventDefault();
    var BlogTable = database.ref('Blogs');
    const uniqueid = BlogTable.push().key;
    // gettinng information from input
    let title = blogForm.querySelector('#title').value;
    let Subtitle = blogForm.querySelector('#Subtitle').value;
    let Information = blogForm.querySelector('#blog-info').value;
   
    // getting unique id
    // getting date 
    const today = new Date();
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate() + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(); ;
    //Createing a blog
    BlogTable.push().set({
        "id" : uniqueid ,
        "creatorId": userInfo.id,
        "Title" : title,
        "Subtitle" : Subtitle,
        "dateCreated":date,
        "info" : Information,
        "rate" : 1,
    });
    document.getElementById('blog-model').classList.remove('blog-active');
    showNotification(`!`,'Fetched','success');
    displayBlog();
    blogForm.reset();   
})

const fetchBlogs = () => {
    var BlogTable = database.ref('Blogs').orderByChild('dateCreated').limitToFirst(interval);
    var htmlString = '';
   
    BlogTable.once('value', (snapshot) => {
        const data = snapshot.val();
        if (snapshot.exists()) {
            showNotification(`!`,'Blogs fetched','success');
            var childKey = snapshot.key;
            for(var i in data){
                console.log(data[i]);
                 htmlString += `
                <div class="r-card">
                    <div class="top-image">
                        <img src="../images/rH8O0FHFpfw.jpg" alt="" srcset="">
                    </div>
                    <div class="r-card-body">
                        <div class="r-card-title ">
                            <h5 class="leon" >${data[i].Subtitle}</h5>
                        </div>
                        <div class="r-infomation">
                            <p>
                                ${data[i].info}
                            </p>
                        </div> 
                        `

                        htmlString += userInfo.userType == 'admin' ? `<div class="r-card-footer flexed-footer">`:`<div class="r-card-footer">`;
                        htmlString += userInfo.userType == 'admin' ? ` <button class="read-more update"  onClick="updateThisBlog('${data[i].id}')">
                                                                            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path d="M7 17.513L11.413 17.498L21.045 7.95799C21.423 7.57999 21.631 7.07799 21.631 6.54399C21.631 6.00999 21.423 5.50799 21.045 5.12999L19.459 3.54399C18.703 2.78799 17.384 2.79199 16.634 3.54099L7 13.083V17.513V17.513ZM18.045 4.95799L19.634 6.54099L18.037 8.12299L16.451 6.53799L18.045 4.95799ZM9 13.917L15.03 7.94399L16.616 9.52999L10.587 15.501L9 15.506V13.917Z" fill="white"/>
                                                                                <path d="M5 21.5H19C20.103 21.5 21 20.603 21 19.5V10.832L19 12.832V19.5H8.158C8.132 19.5 8.105 19.51 8.079 19.51C8.046 19.51 8.013 19.501 7.979 19.5H5V5.5H11.847L13.847 3.5H5C3.897 3.5 3 4.397 3 5.5V19.5C3 20.603 3.897 21.5 5 21.5Z" fill="white"/>
                                                                            </svg>
                                                                        </button>` : '';
                                                                        
                        htmlString += userInfo.userType == 'admin' ? ` <button class="read-more delete"  onClick="deleteThisBlog('${data[i].id}')">
                                                                            <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path d="M4.29163 10.4243L6.682 10.4155L11.8993 4.85051C12.1041 4.63001 12.2167 4.33718 12.2167 4.02568C12.2167 3.71418 12.1041 3.42135 11.8993 3.20085L11.0402 2.27568C10.6307 1.83468 9.91629 1.83701 9.51004 2.27393L4.29163 7.8401V10.4243V10.4243ZM10.2743 3.10051L11.135 4.02393L10.27 4.94676L9.41092 4.02218L10.2743 3.10051ZM5.37496 8.3266L8.64121 4.84235L9.50029 5.76751L6.23458 9.2506L5.37496 9.25351V8.3266Z" fill="white"/>
                                                                                <path d="M3.20833 12.75H10.7917C11.3891 12.75 11.875 12.2267 11.875 11.5833V6.527L10.7917 7.69367V11.5833H4.91892C4.90483 11.5833 4.89021 11.5892 4.87613 11.5892C4.85825 11.5892 4.84038 11.5839 4.82196 11.5833H3.20833V3.41667H6.91713L8.00046 2.25H3.20833C2.61087 2.25 2.125 2.77325 2.125 3.41667V11.5833C2.125 12.2267 2.61087 12.75 3.20833 12.75Z" fill="white"/>
                                                                            </svg>                        
                                                                        </button>` : '';
                      
                        htmlString += ` <button class="read-more" blog-id="${data[i].id}" onclick = "readThisBlog(this)">Read more</button>
                        </div>
                    </div>
                </div> 
                `; 
            }
            htmlString +=`<div class="more" >
                            <button class="browse-more" id="next-for-new-blog" onclick="displayBlog(3)" >Browse more blog</button>
                        </div>`;
            bloglist.innerHTML= htmlString;
        }        
        else{
            showNotification(`!`,'No blogs found','success');
        }
    });
}

// removing function
const deleteThisBlog = (blogId) => {
    console.log('am running');
    // database.ref(`Blogs`).child(blogId).remove();
    
    var query =database.ref('Blogs').orderByChild('id').limitToFirst(1).equalTo(blogId);
    query.once("value", function(snapshot) {
        console.log(snapshot.val());
        snapshot.forEach(function(child) {
            child.ref.remove();
            fetchBlogs();
        })
    })     
    
}

const readThisBlog = (blogId) => {
    localStorage.setItem("blogId",blogId);
}

const updateThisBlog = (blogId) => {
    var query =database.ref('Blogs').orderByChild('id').limitToFirst(1).equalTo(blogId);
    query.once("value", function(snapshot) {
        console.log(snapshot.val());
        snapshot.forEach(function(child) {
            child.ref.update({
                id : blogId,
                name:'sezera'
            });
            location.href ='./blog.html';
        })
    })  
    fetchBlogs(9);
}
