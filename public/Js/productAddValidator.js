console.log("productAdd success!");
window.addEventListener('load', (e) => {

    let name = document.querySelector('#name');
    let image2 = $('image2');
    let image1 = $('image1');

    name.addEventListener('focus', (e) => {
        e.target.classList.add('validatorInput');
        console.log(e);
    })

    image1.addEventListener('change', (e) => {
        const file = e.target.files[0]
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            $('imageView').src = reader.result
        }
    })

    image2.addEventListener('change', (e) => {
        const files = e.target.files
        let img1 = $('imageView1');
        let img2 = $('imageView2');
        let img3 = $('imageView3');
        imgs = [img1,img2,img3]
        for (const file of files) {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                console.log(reader);
                for (let i = 0; i < imgs.length; i++) {
                        imgs[i].src = reader.result 
                }

            }
        }


    })



})
