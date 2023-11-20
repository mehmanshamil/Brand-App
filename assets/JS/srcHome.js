let main = document.getElementById("product-view");
let viewtotal = document.getElementById("totalItm")
let dp
// Data view
function dataView() {
    main.innerHTML=''
    let data = JSON.parse(localStorage.getItem("srcResult"))
    dp = data
    console.log(data);
    viewtotal.innerHTML = data.length
    data.forEach((item) => {
        let div = document.createElement('div');
        div.className = "product"
        div.innerHTML = `
        <div class="img">
        <img src="${item.thumbnail}" alt="">
    </div>
    <div class="pro-content">
        <p class="itemTitle">${item.title}</p>
        <p>
            <span class="newPrice">$${item.price}</span>
            <span class="old-price">$1128.00</span>
        </p>
        <div class="content-detail">
            <div class="icons">
                <i class="active-star fa-solid fa-star"></i>
                <i class="active-star fa-solid fa-star"></i>
                <i class="active-star fa-solid fa-star"></i>
                <i class="active-star fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <span class="active-star">7.5</span>
            </div>
            <div class="detail-info">
                <p class="opacity-50"> 154 orders</p>
                <p class="freeshop"> Free shipping</p>
            </div>
        </div>
        <p class="w-75">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua
        </p>
        <a href="#">View details</a>
        <i onclick="favoriteAdd(${item.id})" class="pro-fav fa-regular fa-heart"></i>
    </div>
        `
        main.appendChild(div)

        let newIcon = div.querySelector('.pro-fav');
        newIcon.addEventListener("mouseover", function () {
            changeFavicon(newIcon);
        });
        newIcon.addEventListener("click", function () {
            colorchange(newIcon);
        });
    })
}
// search func

// search func
let inp = document.getElementById("inp");
let srcBtn = document.getElementById("srcBtn");
srcBtn.addEventListener("click", src);

function src() {
    let val = inp.value;
    let data = JSON.parse(localStorage.getItem("srcResult"));
    let totalItem=0;
    main.innerHTML = "";

    if (inp.value === "") {
        alert("Axtarmaq isdediyiniz mehsulun adini qeyd edin");
    } else {
        let found = false;

        data.forEach((item) => {
            if (item.title.toLowerCase().includes(val.toLowerCase())) {
                let div = document.createElement('div');
                div.className = "product";
                div.innerHTML = `
                <div class="img">
                    <img src="${item.thumbnail}" alt="">
                </div>
                <div class="pro-content">
                    <p class="itemTitle">${item.title}</p>
                    <p>
                        <span class="newPrice">$${item.price}</span>
                        <span class="old-price">$1128.00</span>
                    </p>
                    <div class="content-detail">
                        <div class="icons">
                            <i class="active-star fa-solid fa-star"></i>
                            <i class="active-star fa-solid fa-star"></i>
                            <i class="active-star fa-solid fa-star"></i>
                            <i class="active-star fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <span class="active-star">7.5</span>
                        </div>
                        <div class="detail-info">
                            <p class="opacity-50"> 154 orders</p>
                            <p class="freeshop"> Free shipping</p>
                        </div>
                    </div>
                    <p class="w-75">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua
                    </p>
                    <a href="#">View details</a>
                    <i onclick="favoriteAdd(${item.id})" class="pro-fav fa-regular fa-heart"></i>
                </div>
                `;

                main.appendChild(div);

                let newIcon = div.querySelector('.pro-fav');
                newIcon.addEventListener("mouseover", function () {
                    changeFavicon(newIcon);
                });
                newIcon.addEventListener("click", function () {
                    colorchange(newIcon);
                });

                found = true;
                totalItem ++
                viewtotal.innerHTML = totalItem
            }
        });

        if (!found) {
            document.getElementById("resultSrc").innerHTML = "Axtardığınız məhsul tapılmadı!";
        }

        inp.value = "";
    }
}

// favoriADd
function favoriteAdd(index) {
    let favList = JSON.parse(localStorage.getItem('favList')) || [];
    favList.push(dp.find((item) => item.id == index));
    localStorage.setItem("favList", JSON.stringify(favList))
    console.log(JSON.parse(localStorage.getItem("favList")));

}
function changeFavicon(icon) {
    icon.classList.remove('fa-regular')
    icon.classList.add("fa-solid");
    console.log("Fav icon deyisdi.");
}
function colorchange(icon) {
    icon.style.color = "red"
}


// checkbox active
let checkbox = document.querySelector(".inpview");
checkbox.checked = true;
window.onload = dataView; 