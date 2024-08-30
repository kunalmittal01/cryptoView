let name = document.getElementById('crypto-name');
let rupee = document.getElementById('rupee');
let dollar = document.getElementById('dollar');
let pound = document.getElementById('pound');
let euro = document.getElementById('euro');
let descrip = document.getElementById('description');
let logo = document.getElementById('logo');

let params = new URLSearchParams(window.location.search);
let id = params.get('id');


async function displayDetails() {
    let resp = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
    let data = await resp.json();
    name.innerText = `${data.name} (${data.symbol})`;
    logo.src = `${data.image.large}`;
    rupee.innerText = `₹ ${data.market_data.current_price.inr}`;
    dollar.innerText = `$ ${data.market_data.current_price.usd}`;
    euro.innerText = `€  ${data.market_data.current_price.eur}`;
    pound.innerText = `£ ${data.market_data.current_price.gbp}`;
    if(data.description.en == '') {
        descrip.innerText = 'No description available.';
        return;
    }
    descrip.innerHTML = data.description.en;
}

window.onload = async()=> await displayDetails();

document.getElementById('searchBtn').addEventListener('click',() => {
    window.location.href = "../search/search.html";
});