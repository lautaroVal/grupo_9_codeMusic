const burguer = document.getElementById('burguerMenu')
const navBurguer = document.getElementById("navBurguer")

burguer.addEventListener('click', () =>{
    navBurguer.classList.toggle('active');
    navBurguer.classList.toggle('opacity')


})