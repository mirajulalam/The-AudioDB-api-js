const elementById = (id) => {
    return document.getElementById(id);
}
const loadSearch = () => {
    const searchText = elementById('input-field');
    const cardContainer = elementById('card-container');
    const singleContainer = elementById('single-container');
    const url = `https://theaudiodb.com/api/v1/json/2/search.php?s=${searchText.value}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearch(data))
    // clear data
    searchText.value = '';
    cardContainer.innerHTML = '';
    singleContainer.innerHTML = "";
}

const displaySearch = ({ artists }) => {
    const cardContainer = elementById('card-container');
    artists?.forEach(artist => {
        console.log(artist)
        const div = document.createElement('div')
        div.classList.add('col')
        div.innerHTML = `
        <div class="col">
        <div class="card">
                <img src="${artist.strArtistThumb ? artist.strArtistThumb : "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h2>${artist.strArtist}</h2>
                    <h4 class="card-title">Country: ${artist.strCountry ? artist.strCountry : 'Not Available'}</h4>
                    <h5 class="card-title">Style: ${artist.strStyle ? artist.strStyle : 'Not Available'}</h5>
                    <button onclick="loadDetails('${artist.idArtist}')" class="p-2 px-5 my-3 bg-primary text-white border-0 fs-5 rounded">Details</button>
                </div>
            </div>
    </div>`;
        cardContainer.appendChild(div)
    })
}
const loadDetails = id => {
    const url = `https://theaudiodb.com/api/v1/json/2/artist.php?i=${id}`;
    console.log(url)
    fetch(url)
        .then((res) => res.json())
        .then((data) => displayDetails(data.artists));
}
const displayDetails = info => {
    console.log(info)
    const singleContainer = elementById('single-container');
    info.forEach(infos => {
        console.log(infos)
        const div = document.createElement('div');
        div.classList.add('card')
        div.innerHTML = `
    <img src="${infos.strArtistThumb ? infos.strArtistThumb : 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${infos.strArtist}</h5>
            <h3>Gender: ${infos.strGender ? infos.strGender : 'Not Available'}</h3>
        </div>
    `;
        singleContainer.appendChild(div);
    })
}