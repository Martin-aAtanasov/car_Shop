
let data = {};
let currentCategory = "sedans";
let filtered = [];
let visible = 20;

fetch('cars.json')
    .then(res=>res.json())
    .then(json=>{
    data=json;
    loadCategory('sedans');
});

function loadCategory(cat){

    currentCategory = cat;
    visible = 20;
    filtered = [...data[cat]];

    document.getElementById("categoryTitle").innerText = cat.toUpperCase();
    document.getElementById("categoryDescription").innerText =
    "Browse our collection of " + cat;

render();

}

function render(){

    let grid = document.getElementById("carGrid");
    grid.innerHTML = "";

    let show = filtered.slice(0, visible);

    show.forEach(car=>{

    let card = document.createElement("div");
    card.className="card";

    let priceHTML = car.discount
    ? `<span class="old">$${car.price}</span> $${car.discount}`
    : `$${car.price}`;

    card.innerHTML=`
    <img src="${car.image}">
    <h4>${car.name}</h4>
    <p>${car.description}</p>
    <p class="price">${priceHTML}</p>
    <p>${"⭐".repeat(car.rating)}</p>
    <button onclick="addToGarage('${car.name}')">Add to Garage</button>
    `;

    grid.appendChild(card);

    });

    document.getElementById("productCounter").innerText =
    show.length + " of " + filtered.length + " cars displayed";

}

function loadMore(){
    visible += 20;
    render();
}

function addToGarage(name){
    alert(name + " added to garage!");
}

function applyFilters(){

    let colors=[...document.querySelectorAll(".filters input[type=checkbox]:checked")].map(c=>c.value);

    let max=document.getElementById("priceRange").value;
    document.getElementById("priceValue").innerText=max;

    filtered=data[currentCategory].filter(car=>{

    let price=car.discount || car.price;

    let colorMatch=colors.length===0 || colors.includes(car.color);
    let priceMatch=price<=max;

    return colorMatch && priceMatch;

});

render();

}

function sortCars(){

    let type=document.getElementById("sortSelect").value;

    if(type==="az") filtered.sort((a,b)=>a.name.localeCompare(b.name));
    if(type==="za") filtered.sort((a,b)=>b.name.localeCompare(a.name));
    if(type==="low") filtered.sort((a,b)=>(a.discount||a.price)-(b.discount||b.price));
    if(type==="high") filtered.sort((a,b)=>(b.discount||b.price)-(a.discount||a.price));

    render();

}
