
// basket  //////////////////////////////////////////
 
// const purchase=document.querySelector(".purchase");
// const recomendation=document.querySelector(".recomendations");



// function addBasket(id){
  
//   const product=document.getElementsByClassName(id)
//   recomendation.appendChild(product[0]);
//   purchase.appendChild(product[0]);
//   var items=localStorage.getItem("items")
// ? JSON.parse(localStorage.getItem("items"))
// : [];
// const button=document.querySelector(`#${id} > i`);
// button.classList.remove("fa-cart-arrow-down")
// button.classList.add("fa-x") 


// if(items.length>0){
 
//   if(items.some((item)=>item.id===id)){
//     const defined=items.some((item)=>item.id===id);
//     if(defined.count>=1){const button=document.querySelector(`#${id} > i`);
//     button.classList.remove("fa-cart-arrow-down")
//     button.classList.add("fa-x")

//     }
//     else{
//       const button=document.querySelector(`#${id} > i`);
// button.classList.add("fa-cart-arrow-down")
// button.classList.remove("fa-x")
//     }
//     items=items.filter((item)=>item.id!==id)
//     items.some((item)=>item.count++)
    
//   }
//   else{
//      items.push({
//       id,
//       count:1,
//      })
//     }
 
// }
// else{
// items.push({
//   id,
//   count:1,
// })
// }

// localStorage.setItem("items",JSON.stringify(items));
// }

const container = document.querySelector(".purchase");
const totalPriceContainer = document.querySelector(".total");

const itemParser = () =>
  localStorage.getItem("items")
    ? JSON.parse(localStorage.getItem("items"))
    : [];

const decreaseItemCount = (id) => {
  let items = itemParser();

  items = items
    .map((item) => {
      if (item.item.id === id) {
        if (item.count > 1) {
          return {
            ...item,
            count: item.count - 1,
          };
        }
      } else {
        return item;
      }
    })
    .filter(Boolean);

  localStorage.setItem("items", JSON.stringify(items));

  renderContent();
};

const increaseItemCount = (id) => {
  let items = itemParser();

  items = items.map((item) => {
    if (item.item.id === id) {
      if (item.count < 10) {
        return {
          ...item,
          count: item.count + 1,
        };
      }
    }

    return item;
  });

  localStorage.setItem("items", JSON.stringify(items));

  renderContent();
};

const renderCounter = (parentElement, id, count) => {
  const counterContainer = document.createElement("div");
  const minus = document.createElement("button");
  const plus = document.createElement("button");
  const countSpan = document.createElement("span");
  countSpan.classList.add("count-design")

  counterContainer.classList.add("counter");
  minus.classList.add("plus-minus")
  plus.classList.add("plus-minus")
  minus.innerHTML = "-";
  plus.innerHTML = "+";

  minus.addEventListener("click", () => {
    decreaseItemCount(id);
  });

  plus.addEventListener("click", () => {
    increaseItemCount(id);
  });

  countSpan.innerHTML = count;

  counterContainer.appendChild(minus);
  counterContainer.appendChild(countSpan);
  counterContainer.appendChild(plus);

  parentElement.appendChild(counterContainer);
};

const renderContent = () => {
  const items = itemParser();

  if (items.length > 0) {
    let totalPrice = 0;
    container.innerHTML = "";

    items.forEach(({ count, item: { img, title, id, price } }) => {
      const divItem = document.createElement("div");
      const imgElement = document.createElement("img");
      const text = document.createElement("span");
      const priceText = document.createElement("span");
      divItem.classList.add('bas-info2')

      imgElement.src = img;
      text.innerHTML = title;
      priceText.innerHTML = `${price} AZN`;

      totalPrice += price * count;

      divItem.classList.add("item");

      divItem.appendChild(imgElement);
      divItem.appendChild(text);
      divItem.appendChild(priceText);

      container.appendChild(divItem);

      renderCounter(divItem, id, count);
    });

    totalPriceContainer.innerHTML = `${totalPrice} AZN`;
  } else {
    container.innerHTML = "Your basket is empty";
    totalPriceContainer.innerHTML = ``;
  }
};

renderContent();

window.addEventListener("storage", renderContent);
