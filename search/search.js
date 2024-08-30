let btn = document.getElementById('searchbtn');
let searchbox = document.getElementById('search_field');
let form = document.querySelector('form');
let disp = document.getElementsByClassName('results')[0];
let loader = document.getElementsByClassName('loader')[0];
form.addEventListener('submit', (e) => {
    e.preventDefault();
});

async function displaySearchResults(query) {
    loader.style.display = 'none';
    let resp = await fetch(`https://api.coingecko.com/api/v3/search?query=${query}`)
    let data = await resp.json();
    data.coins.forEach((coin,num) => {
        let div = document.createElement('div');
        div.innerHTML = `
            <div class="name">
                <span>${num + 1}</span>
                <img src="${coin.thumb}">
                <span class="coin-name">${coin.name} ${coin.symbol}</span>
            </div>
            <div class="more">
                <button class="more-btn" onclick="showDetails('${coin.id}')">More Info</button>
            </div>
            `
            div.classList.add('coin-card','animate__animated','animate__rotateIn');
            disp.appendChild(div);
    })
    if(disp.innerHTML == '') {
        disp.innerHTML = "No more information available"
    }
}

btn.addEventListener('click', async(e) => {
    let query = searchbox.value;
    disp.innerHTML = ''; 
    loader.style.display = 'flex';
    debounce(displaySearchResults,1100)
});

document.getElementById('searchBtn').addEventListener('click', ()=>{
    window.location.href = 'search.html';
});

function debounce(fn,delay) {
    let debounceTimer;
    return (function() {
        if (debounceTimer) {
            clearTimeout(debounceTimer);
        }   
        debounceTimer = setTimeout(async() => {
            await fn(searchbox.value);
        }, delay);
    })();
}

function showDetails(id) {
    window.location.href = `../details/details.html?id=${id}`;
}