let itmes = fetch('./items.json')
  .then(response => response.json())
  .then(json => {
	// console.log(json);    
    itmes = json;
    
})
.catch(error => console.error('Error fetching JSON:', error));


/*
<div class="item">
<span>Pile of Stickers</span>
<div class="divider"></div>
<button>-</button>
<span>0</span>
<button>+</button>
</div>
! Take this ^^^ and change the values to the ones in items array.
*/

async function run() {
    await itmes;
    console.log(itmes);
    
    for(let i = 0; i < itmes.items.length; i++) {
        let newDiv = document.getElementById("content").appendChild(document.createElement("div"));
        newDiv.className = "item";

        let name = document.createElement("span");
        name.innerHTML = itmes.items[i].name;

        let description = document.createElement("span");
        description.className = "description";

        let divider = document.createElement("div");
        divider.className = "divider";
        description.innerHTML = itmes.items[i].description;

        let doubloon = document.createElement("img");
        doubloon.src = "doubloon.svg";
        doubloon.className = "doubloon";

        let price = document.createElement("span");
        price.innerHTML = itmes.items[i].cost;
        price.className = "price";

        let lessButton = document.createElement("button");
        lessButton.innerHTML = "-"

        let amount = document.createElement("span");
        amount.innerHTML = 0;


        let plusButton = document.createElement("button");
        plusButton.innerHTML = "+"

        lessButton.onclick = () => {
            if(amount.innerHTML == 0) {return}
            amount.innerHTML = amount.innerHTML - 1;
            change();
        }

        plusButton.onclick = () => {
            amount.innerHTML = Number(amount.innerHTML) + 1;
            change();
        }
        
        newDiv.appendChild(name);
        newDiv.appendChild(description);
        newDiv.appendChild(divider);
        newDiv.appendChild(doubloon);
        newDiv.appendChild(price);
        newDiv.appendChild(lessButton);
        newDiv.appendChild(amount);
        newDiv.appendChild(plusButton);
     }
}

run()

let ticketDiv = document.getElementById("ticket");
function change() {
    ticketDiv = document.getElementById("ticket");
    let itemDiv = document.getElementById("content");

    ticketDiv.innerHTML = "";

    let count = 0;
    for(let i = 0; i < itemDiv.children.length; i++) {
        let item = itemDiv.children[i];
        if(item.children[6].innerHTML == '0') {
            continue;
        }

        /*
            <div class="ticket">
                <span>Raspberry Pi</span>
                <span>x5</span>
                <span style="align-items: center; display: flex; gap: 2px;"><img src="doubloon.svg" alt="" height="20"> 20</span>
            </div>
        */
        let newItem = document.createElement("div");
        newItem.className = "ticket";
        let name = document.createElement("span");
        name.innerHTML = itmes.items[i].name;
        let price = document.createElement("div");
        price.style = "align-items: center; display: flex; gap: 2px;";
        let doubloon = document.createElement("img");
        doubloon.src = "doubloon.svg";
        doubloon.height = "20";
        price.appendChild(doubloon);
        let priceSpan = document.createElement("span");
        priceSpan.innerHTML = itmes.items[i].cost;
        price.appendChild(priceSpan);
        let amount = document.createElement("span");
        amount.innerHTML = "x" + (itemDiv.children[i].children[6].innerHTML);
        count += Number(itemDiv.children[i].children[6].innerHTML) * itmes.items[i].cost;

        newItem.appendChild(name);
        newItem.appendChild(price);
        newItem.appendChild(amount)

        newItem.addEventListener("click", () => {
            let items = document.getElementById("content");
            for(let i = 0; i < items.children.length; i++) {
                if(items.children[i].children[0].innerHTML == newItem.children[0].innerHTML) {
                    items.children[i].children[6].innerHTML = 0;
                }
            }
            newItem.remove();
            change();
        })
        ticketDiv.appendChild(newItem);
    }
    
    console.log(count);
    document.getElementById("price").innerHTML = count;
}