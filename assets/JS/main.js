let inp = document.getElementById("inp");
let srcBtn = document.getElementById("srcBtn");

srcBtn.addEventListener("click", searchProduct);
// srcFunc
async function searchProduct() {
    document.getElementById("resultSrc").innerHTML = "";

    let val = inp.value;
    let data = await (await fetch(`https://dummyjson.com/products`)).json();
    let dp = data.products;

    if (inp.value === "") {
        alert("Axtarmaq isdediyiniz mehsulun adini qeyd edin");
    } else {
        let found = false;
        localStorage.removeItem("srcResult")
        dp.forEach((item) => {
            if (item.title.toLowerCase().includes(val.toLowerCase())) {
                console.log(item);
                let srcres = JSON.parse(localStorage.getItem("srcResult")) || [];
                srcres.push(item);
                localStorage.setItem("srcResult", JSON.stringify(srcres));
                found = true;
                window.location = "/assets/pages/srcHome.html"
            }
        });

        if (!found) {
            document.getElementById("resultSrc").innerHTML = "Axtardığınız məhsul tapılmadı!";
        }
        inp.value = ""
    }
}

// Load More
let main = document.getElementById('produtc');
let lmBtn = document.getElementById('lmBtn');
let dp
let page = 1;
let limit = 10;

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
}

// FavADD
function favoriteAdd(index) {
    let favList = JSON.parse(localStorage.getItem('favList')) || [];
    favList.push(dp.find((item) => item.id == index));
    localStorage.setItem("favList", JSON.stringify(favList))
    console.log(JSON.parse(localStorage.getItem("favList")));

}

// menu list active
let menulist = document.querySelectorAll(".menuList");

function menulistActive() {
    menulist.forEach((item) => {
        item.addEventListener("click", function () {
            menulist.forEach((otherItem) => {
                otherItem.classList.remove("active-list");
            });

            item.classList.toggle("active-list");
        });
    });
}

menulistActive();



// fav icon change 
function changeFavicon(icon) {
    icon.classList.remove('fa-regular')
    icon.classList.add("fa-solid");
    console.log("Fav icon deyisdi.");
}
function colorchange(icon) {
    icon.style.color = "red"
}
// Time
function updateDateTime() {
    var now = new Date();

    var day = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();

    document.getElementById('day').innerHTML = day;
    document.getElementById('hour').innerHTML = hour;
    document.getElementById('min').innerHTML = minute;
    document.getElementById('sec').innerHTML = second;
  }

  updateDateTime();
  setInterval(updateDateTime, 1000);
