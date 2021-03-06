import axios from 'axios'

import Noty from 'noty'

let addToCart = document.querySelectorAll('.add-to-cart')

let cartCounter = document.querySelector('#cartCounter')

function updateCart(food){
    axios.post('/update-cart', food).then(res => {
        console.log(res)
        cartCounter.innerText = res.data.totalQty
 
       new Noty({
           type: 'success',
           timeout: 1000,
           text: 'Items added to cart',
           layout: 'topLeft'
       }).show();
    }).catch(err => {
        new Noty({
            type: 'error',
            timeout: 1000,
            text: 'Something went wrong',
            layout: 'topLeft'
        }).show();
    })
}

addToCart.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        console.log(e)
        let food = JSON.parse(btn.dataset.food)
        updateCart(food)
       // console.log(food)
    })
})