// *******selectors********

const form = document.querySelector("form");
const input = document.querySelector("input");
const main = document.querySelector("main");
const section = document.querySelector("section");
const del = document.getElementById("delete");


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

del.addEventListener("click", ()=>{
  main.innerHTML=""
  coins = []
})


// ******functions*******


// doma card basan veya hata basan fonksiyon

const writeDom = (result) => {
  let object = result.data.coins.filter(
    (obj) =>
      obj.name.toLowerCase().startsWith(input.value.toLowerCase().trim()) ||
      obj.symbol.toLowerCase().startsWith( input.value.toLowerCase().trim())  
  );

  console.log(object);

  console.log(result);


  if (object.length){ 

    if(coins.includes(object[0].symbol)){
      exist (object)

    }

    else{
      coins.push(object[0].symbol)
      
      console.log(coins);
      yaz(object)
      

    }
 
  }
  else {

    hataYaz()

  }
};

// cardı doma yazan fonksiyon

const yaz = (object) =>{

  let changeColor = ""
  let status = ""

  if (object[0].change>0) {
    changeColor = "green"
    status = "📈"
  }
  else {
    changeColor = "red"
    status = "📉"
  }



  main.innerHTML += `<div class="d-flex flex-column col bg-white p-3 rounded-4 shadow gap-2"  id ="${object[0].symbol}" style="min-width: 200px; max-width: 200px;">
  <div class="d-flex gap-1">
  
<div class="d-flex flex-column">
<h5 >${object[0].name} </h5>
<span class= "btn btn-warning">${object[0].symbol}</span>

</div>

  
  <button class="btn text-danger col-3 single fw-bold ms-auto" style="height: 30px ;" > X </button></div>
  <p>$${object[0].price}</p>
  <img class=""mt src="${object[0].iconUrl}" alt="" width = "100px">
  <div >
  <p style = "color : ${changeColor};">${ status + " " + "%" + object[0].change}</p>
  </div>
  
  </div>`;
  input.value = "";

// coinleri tek tek silme işlemi 
const singleDelete = document.querySelectorAll(".single")

singleDelete.forEach((button)=> {
  button.addEventListener("click", (e)=> { 
    e.target.closest(".col").remove()
    delete coins[coins.indexOf(e.target.closest(".col").id)]

  })
})

}

// aranan coin bulunamadığından hata yazan fonksiyon

const hataYaz = ()=> { 
  section.innerHTML = `<h5 class= "text-danger"> Aradığınız coin "${input.value}" bulunamadı. Coin ismini doğru yazdığınızdan emin olunuz.</h5>`;

    setTimeout(() => {
      section.innerHTML = "";
    }, 4000);
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

