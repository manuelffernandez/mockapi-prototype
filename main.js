class Item {
	constructor(name, price, stock, desc) {
		this.name = name;
		this.price = price;
		this.stock = stock;
		this.desc = desc;
	}
}


let genericDescription = 'Lorem ipsum dolor sit amet, consectetur adipisicing.';

let defaultStore = [
	new Item('Coffee', 15, 10, genericDescription),
	new Item('Juice', 20, 10, genericDescription),
	new Item('Croissant', 20, 10, genericDescription),
	new Item('Sandwich', 30, 10, genericDescription)
];

let showBtn = document.getElementById('show-btn');
let resetBtn = document.getElementById('reset-btn');
let genProductBtn = document.getElementById('gen-prod-btn');