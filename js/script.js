/* ========= Adding click event for  bugger ========= */ 
var reveal =  document.getElementById('bugger');
var navbar =  document.getElementById('navbar');
reveal.addEventListener('click', function(){
    navbar.classList.toggle('showNav');
    reveal.classList.toggle('toggleBugger');
});