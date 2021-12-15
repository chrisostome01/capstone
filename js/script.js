/* ========= Adding click event for  bugger ========= */ 
var reveal =  document.getElementById('bugger');
var navbar =  document.getElementById('navbar');
reveal.addEventListener('click', function(){
    navbar.classList.toggle('showNav');
    reveal.classList.toggle('toggleBugger');
});

const contactForm = document.getElementById('contact-form-field');
contactForm.addEventListener('submit',(e) => {
    e.preventDefault();
    const isCommentValid = isEmpty('comment','Comment');
    const isSubjectValid = isEmpty('subject','Subject');
    const isEmailValid = validateContactEmail('email');
    if(isEmailValid.pass && isSubjectValid.pass && isCommentValid.pass){
        showNotification(`!`,'You form have been submited','success');
        contactForm.reset();
    }   
})