let
iconBurguer = document.getElementById('burguerMenu')
menu = document.getElementById('NavBurguer')

iconBurguer.addEventListener('click', (e) => {
    console.log('holA')
    menu.classList.toggle('.active')
    menu.classList.toggle('.opacity')
})