console.log("productAdd success!")
window.addEventListener('load', (event) => {
    msgError = (element, msg, event) => {
        $(element).style.color = "red";
        $(element).innerHTML = msg;
        event.target.classList.add("is-invalid");
    }

})