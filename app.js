
// *******selectors********

const form = document.querySelector("form")
const input = document.querySelector("input")
const main = document.querySelector("main")



// ******functions*******

const writeDom = (result)=>{
 
 let object = result.data.coins.filter(obj=> obj.name.toLowerCase().startsWith(input.value.toLowerCase())|| obj.symbol.toLowerCase() == input.value.toLowerCase());
 
 main.innerHTML += `<div class="d-flex flex-column col-3 bg-white p-3 rounded-4 shadow" style="min-width: 200px;">
 <h5>${object[0].name} <span class= "btn btn-warning">${object[0].symbol}</span></h5>
 <p>$${object[0].price}</p>
 <img src="${object[0].iconUrl}" alt="" width = "100px">
 <p>${object[0].change}</p>
</div>`
input.value = ""
}


// ******events******

form.addEventListener("submit", (e)=>{ 
    e.preventDefault()

    const options = {
      headers: {
        'x-access-token': 'coinranking34b433502208780ff42dfa4308d73b2ded4113203e6a6d88',
      },
    };
    fetch('https://api.coinranking.com/v2/coins', options)
    .then((response) => response.json())
    .then((result) => writeDom (result));

})

