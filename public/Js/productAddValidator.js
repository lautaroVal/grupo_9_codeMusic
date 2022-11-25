console.log("productAdd success!");
window.addEventListener('load', (e) => {

    let name = document.querySelector('#name');

    name.addEventListener('focus', () => {
        console.log('Hiciste foco en name');
    })

})