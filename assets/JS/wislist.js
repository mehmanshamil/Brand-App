let products = document.getElementById("productlists");
let totalview = document.getElementById("totalNum");
let priceView = document.getElementById("priceView");


function dataView() {
    priceView.innerHTML = `$${0}`
    products.innerHTML = ''
    let data = JSON.parse(localStorage.getItem("myChoose"))
    console.log(data);
    let total = 0;
    let price = 0;
  if(data){
    data.forEach((item, index) => {
        let div = document.createElement('div');
        div.className = "product"
        div.innerHTML = `
       <div class="img">
       <img src="${item.thumbnail}" alt="">
   </div>
   <div class="textContent">
       <div class="contnt">
           <p class="h5">${item.title}</p>
           <p class="opacity-50">Size : ${item.description}</p>
           <p class="opacity-50">Seller :${item.category}</p>
           <button onclick="removefunc(${index})">Remove</button>
       </div>
       <div class="price">
           <p>$${item.price}</p>
           <select id="select" name="" id="">
               <option value="">qyt 1</option>
               <option value="">qyt 2</option>
               <option value="">qyt 3</option>
               <option value="">qyt 4</option>
               <option value="">qyt 5</option>
               <option value="">qyt 6</option>
           </select>
       </div>
   </div>
       `
        price += item.price
        products.appendChild(div)
        total++
    })
  }
    totalview.innerHTML = total
    priceView.innerHTML = `$${price}`
}



window.onload = dataView


// remove  func
function removefunc(index) {
    let myChoose = JSON.parse(localStorage.getItem('myChoose')) || [];
    myChoose.splice(index, 1);
    localStorage.setItem("myChoose", JSON.stringify(myChoose))
    console.log("sdad");
    dataView()
}









// Load More
let main = document.getElementById('produtc');
let lmBtn = document.getElementById('lmBtn');
let dp
let page = 1;
let limit = 5;

lmBtn.addEventListener('click', leadmore)

async function leadmore() {
    let skip = (page - 1) * limit
    let data = await (await fetch(`https://dummyjson.com/products?page=${page}&limit=${limit}&skip=${skip}`)).json()
    dp = data.products
    dp.forEach((item) => {
        let div = document.createElement('div');
        div.className = "data-product"
        div.innerHTML = `
        <i onclick="favoriteAdd(${item.id})" class="pro-fav fa-regular fa-heart"></i>
        <img src="${item.thumbnail}" alt="">
        <p class='my-2'>${item.price} $</p>
        <button onclick="addToCart(${item.id})">
        <i class="shop-icon fa-solid fa-cart-shopping"></i>
        Move to cart
        </button>
        `
        main.appendChild(div);

        let newIcon = div.querySelector('.pro-fav');
        newIcon.addEventListener("mouseover", function () {
            changeFavicon(newIcon);
        });
        newIcon.addEventListener("click", function () {
            colorchange(newIcon);
        });
    })
    page++
}
leadmore();
// AddToCart
function addToCart(index) {
    let myChoose = JSON.parse(localStorage.getItem("myChoose")) || [];
    myChoose.push(dp.find((item) => item.id == index));
    localStorage.setItem("myChoose", JSON.stringify(myChoose))
    console.log(JSON.parse(localStorage.getItem("myChoose")));
    dataView()
}

// FavADD
function favoriteAdd(index) {
    let favList = JSON.parse(localStorage.getItem('favList')) || [];
    favList.push(dp.find((item) => item.id == index));
    localStorage.setItem("favList", JSON.stringify(favList))
    console.log(JSON.parse(localStorage.getItem("favList")));
}
// fav icon change 
function changeFavicon(icon) {
    products.innerHTML = ''
    icon.classList.remove('fa-regular')
    icon.classList.add("fa-solid");
    console.log("Fav icon deyisdi.");
}
function colorchange(icon) {
    icon.style.color = "red"
}
// back history
document.getElementById("bck").addEventListener("click", () => {
    window.history.back()
})
// remove all 
document.getElementById("rmv").addEventListener("click", () => {
    localStorage.removeItem("myChoose");
    totalview.innerHTML = 0
    priceView.innerHTML = 0
    dataView()
})