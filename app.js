// **********fetch**********

const options = {
    headers: {
      'x-access-token': 'coinranking34b433502208780ff42dfa4308d73b2ded4113203e6a6d88',
    },
  };
  
  fetch('https://api.coinranking.com/v2/coins', options)
    .then((response) => response.json())
    .then((result) => console.log(result.data.coins));

// *******selectors********

const form = document.querySelector("form")
const input = document.querySelector("input")

// ******events******

form.addEventListener("submit", (e)=>{ 
    e.preventDefault()
    console.log(input.value);
    input.value = ""

})
