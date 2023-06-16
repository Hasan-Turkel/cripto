// *******selectors********

const form = document.querySelector("form");
const input = document.querySelector("input");
const main = document.querySelector("main");
const section = document.querySelector("section");


// ********variables***********

coins = []


// ******events******

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const options = {
    headers: {
      "x-access-token":
        "coinranking34b433502208780ff42dfa4308d73b2ded4113203e6a6d88",
    },
  };
  fetch("https://api.coinranking.com/v2/coins", options)
    .then((response) => {
      
      if(!response.ok){
      domHata()
      }
     return response.json() })
     .then((result) => writeDom(result));
}
);


// ******functions*******


// doma card basan veya hata basan fonksiyon

const writeDom = (result) => {
  let object = result.data.coins.filter(
    (obj) =>
      obj.name.toLowerCase().startsWith(input.value.toLowerCase().trim()) ||
      obj.symbol.toLowerCase() == input.value.toLowerCase().trim()
  );


 

  if (object.length){ 

    if(coins.includes(object[0].symbol)){
      exist (object)

    }

    else{
      coins.push(object[0].symbol)
      yaz(object)

    }

    
  
 
  }
  else {

    hataYaz()

  }
};

// cardı doma yazan fonksiyon

const yaz = (object) =>{
  main.innerHTML += `<div class="d-flex flex-column col bg-white p-3 rounded-4 shadow" style="min-width: 200px; max-width: 200px;">
  <h5>${object[0].name} <span class= "btn btn-warning">${object[0].symbol}</span></h5>
  <p>$${object[0].price}</p>
  <img src="${object[0].iconUrl}" alt="" width = "100px">
  <p>${object[0].change}</p>
  </div>`;
  input.value = "";
}

// aranan coin bulunamadığından hata yazan fonksiyon

const hataYaz = ()=> { 
  section.innerHTML = `<h5 class= "text-danger"> Aradığınız coin bulunamadı. Coin ismini doğru yazdığınızdan emin olunuz.</h5>`;

    setTimeout(() => {
      section.innerHTML = "";
    }, 3000);
    input.value = "";

}


// varsa hata veren fonksiyon

const exist = (object)=>{

  section.innerHTML = `<h5 class= "text-danger"> ${object[0].name} ${object[0].symbol} zaten var. </h5>`

  setTimeout(() => {
    section.innerHTML = "";
  }, 3000);
  input.value = "";

}

// urlye ulaşılamadığından doma hata basan fonksiyon

const domHata = () =>{

  section.innerHTML = `<h5 class= "text-danger"> Server hatası. </h5>`

}