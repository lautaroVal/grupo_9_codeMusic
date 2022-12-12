let iconBurguer = document.getElementById('burguerMenu')
let menu = document.getElementById('NavBurguer')

iconBurguer.addEventListener('click', (e) => {
    menu.classList.toggle('active')
    menu.classList.toggle('opacity')
})