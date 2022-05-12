const rightBtn=document.getElementById("rightBtn");
const leftBtn=document.getElementById("leftBtn");
const stillRow=document.getElementsByClassName("still-row");

 rightBtn.onclick = function(){
    stillRow[0].classList.add("still-transform");
 };
 leftBtn.onclick = function(){
    stillRow[0].classList.remove("still-transform");
 };

 const unvisible=document.querySelector(".unvisible__menu");
 const unvisibleMen=document.querySelector(".unvisible__menu-men");
 const closeBtn=document.getElementById("close");
 const closeBtnMen=document.getElementById("close-men");
 const barBtn=document.getElementById("bar");
 const menBtn=document.getElementById("men-btn");
 const menCategory=document.querySelector(".men-category");
 closeBtn.onclick=function(){
     unvisible.classList.add("transform-unvisible")
 };
 menCategory.onclick=function(){
  unvisibleMen.classList.add("transform-reverse")
};
 closeBtnMen.onclick=function(){
  unvisibleMen.classList.add("transform-reverse")
  unvisible.classList.add("transform-unvisible")
};
 barBtn.onclick=function(){
    unvisible.classList.remove("transform-unvisible")
};
menBtn.onclick=function(){
  unvisibleMen.classList.remove("transform-reverse")
};

const header=document.querySelector(".header");
window.onscroll=function(){
    
    if (document.documentElement.scrollTop > 50) {
        header.classList.add("transform-y");
      } else {
        header.classList.remove("transform-y");
      }
}

$(document).ready(function(){
  $('.owl-carousel').owlCarousel({
    loop:true,
    margin:10,
    nav:true,
    responsive:{
        0:{
            items:1
        },
        300:{
          items:2
      },
      500:{
        items:3
    },
        1000:{
            items:4
        },
        1300:{
          items:5
      },
     1500:{
        items:6
    }

    }
})
});

const newBtn=document.querySelector(".new-button");
const whatBtn=document.querySelector(".what-button");
const row1=document.querySelector(".row1");
const row2=document.querySelector(".row2");


newBtn.onclick=function(){
  row2.classList.add("product-none")
  row1.classList.remove("product-none")
  whatBtn.style.color="#666"
  newBtn.style.color="black"
  whatBtn.classList.remove("border-btn")
  newBtn.classList.add("border-btn")

}
whatBtn.onclick=function(){
  row1.classList.add("product-none")
  row2.classList.remove("product-none")
  newBtn.style.color="#666"
  whatBtn.style.color="black"
  newBtn.classList.remove("border-btn")
  whatBtn.classList.add("border-btn")

}


// basket starts /////////////////////////////////////////////////////////////////////////////////////////
const itemcount = document.querySelector("#itemscount");

(() => {
  const items = localStorage.getItem("items")
    ? JSON.parse(localStorage.getItem("items"))
    : [];

  if (items.length > 0) {
    const countspan = document.createElement("span");
    countspan.innerHTML = items.length;

    itemcount.appendChild(countspan);

    items.forEach((item) => {
      const icon = document.querySelector(`#${item.id} > i`);
if(icon!=null){

  icon.classList.add("fa-solid");
  icon.classList.remove("fa-regular");
}
    });
  }
})();

function toggleItemBasket(id, img, title, price) {
  const icon = document.querySelector(`#${id} > i`);
  const span =
    document.querySelector("#itemscount > span") ??
    document.createElement("span");

  let items = localStorage.getItem("items")
    ? JSON.parse(localStorage.getItem("items"))
    : [];

  if (items.length > 0) {
    if (items.some((item) => item.id === id)) {
      items = items.filter((item) => item.id !== id);

      icon.classList.remove("fa-solid");
      icon.classList.add("fa-regular");
    } else {
      items.push({
        item: {
          id,
          img: `https://assets.adidas.com/images/${img}`,
          title,
          price,
        },
        count: 1,
      });

      icon.classList.add("fa-solid");
      icon.classList.remove("fa-regular");
    }
  } else {
    items.push({
      item: {
        id,
        img: `https://assets.adidas.com/images/${img}`,
        title,
        price,
      },
      count: 1,
    });

    icon.classList.add("fa-solid");
    icon.classList.remove("fa-regular");
    itemcount.appendChild(span);
  }

  if (items.length === 0) {
    itemcount.removeChild(span);
  } else {
    span.innerHTML = items.length;
  }

  localStorage.setItem("items", JSON.stringify(items));
}
