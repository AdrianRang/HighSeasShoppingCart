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
        doubloon.src = "https://highseas.hackclub.com/doubloon.svg";
        doubloon.className = "doubloon";

        let lessButton = document.createElement("button");
        lessButton.innerHTML = "-"

        let amount = document.createElement("span");
        amount.innerHTML = 0;


        let plusButton = document.createElement("button");
        plusButton.innerHTML = "+"

        lessButton.onclick = () => {
            if(amount.innerHTML == 0) {return}
            amount.innerHTML = amount.innerHTML - 1;
        }

        plusButton.onclick = () => {
            amount.innerHTML = Number(amount.innerHTML) + 1;
        }
        
        newDiv.appendChild(name);
        newDiv.appendChild(description);
        newDiv.appendChild(divider);
        newDiv.appendChild(doubloon);
        newDiv.appendChild(lessButton);
        newDiv.appendChild(amount);
        newDiv.appendChild(plusButton);
     }
}

run()