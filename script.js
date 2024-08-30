let searchbtn = document.getElementById('searchBtn');
let disp = document.getElementsByClassName('coins-cont')[0];

async function fetchCoins() {
    let resp = await fetch('https://api.coingecko.com/api/v3/search/trending');
    let coinData = await resp.json();
    return coinData;
}

async function displayCoins() {
    let coinData = await fetchCoins();
    disp.innerHTML = coinData.coins.map(coin=>{
        let id = coin.item.id;
        return `
            <div class="card" onclick="moreDetails('${id}')">
                <img src="${coin.item.small}" alt="${coin.item.name}">
                 <div class="coin-info">
                    <p class="coin-name">${coin.item.name}</p>
                    <p class="coin-price">₹${coin.item.data.price*100}</p>
                </div>
            </div>
        `;
    }).join('');
}

window.onload = function() {
    displayCoins();
}

document.addEventListener('DOMContentLoaded', function() {
    const coinsCont = document.querySelector('.coins-cont');
    let direction = 'left';
    const distance = 100; // Distance to move in percentage
    const duration = 9000; // Duration of each animation in milliseconds

    function animate() {
        const startTime = performance.now();

        function move(timestamp) {
            const elapsedTime = timestamp - startTime;
            const progress = Math.min(elapsedTime / duration, 1);

            if (direction === 'left') {
                coinsCont.style.transform = `translateX(${-distance * progress}%)`;
            } else {
                coinsCont.style.transform = `translateX(${(-distance + distance * progress)}%)`;
            }

            if (progress < 1) {
                requestAnimationFrame(move);
            } else {
                direction = direction === 'left' ? 'right' : 'left';
                setTimeout(() => requestAnimationFrame(animate), 0); // Pause before reversing direction
            }
        }

        requestAnimationFrame(move);
    }

    animate();
});

searchbtn.addEventListener('click', (e)=>{
    window.location.href = 'search/search.html';
});

function moreDetails(id) {

    window.location.href = `details/details.html?id=${id}`;
}