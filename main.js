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
let genRandomProductBtn = document.getElementById('gen-prod-btn');

let url = 'https://634051e5e44b83bc73ce3ce4.mockapi.io/products';
let dataBaseStore = [];

showBtn.addEventListener('click', showProductsResource);
resetBtn.addEventListener('click', resetProductsResource);
genRandomProductBtn.addEventListener('click', postRandomProductsResourceItem);


function getProductsResource() {
    return fetch(url)
    .then(response => response.json())
}

function deleteProductsResourceItem(id) {
    return fetch(url + `/${id}`, {
        method: 'DELETE'
    })
}

function postProductsResourceItem(productObj = {}) {
    return fetch(url, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(productObj)
    })
}

async function updateDataBaseStoreArray() {
    dataBaseStore = await getProductsResource();
}

async function showProductsResource() {
    console.log(dataBaseStore);
}



async function deleteAll() {
    console.log('item deletion started');
    for(let i = 0; i < dataBaseStore.length; i++) {
        try {
            await console.log('product ' + dataBaseStore[i].id + ' deleted');
            await deleteProductsResourceItem(dataBaseStore[i].id);
        } catch(err) {
            console.log('cant be deleted');
            console.log(err);
            return
        }
    }
    console.log('deletion done');
}

async function postDefaultStore() {
    console.log('posting to Database started');
    for(product of defaultStore) {
        try {
            await postProductsResourceItem(product)
            console.log(`product ${product.name} posted`)
        } catch(err) {
            console.log('cant be posted')
            console.log(err)
            return
        }
    }
    console.log('posting to Database finished');
}

async function resetProductsResource() {
    console.log('reset started');
    await deleteAll()
    await postDefaultStore()
    await updateDataBaseStoreArray();
    console.log('reset finished');
}

async function postRandomProductsResourceItem() {
    try {
        await postProductsResourceItem({})
        await updateDataBaseStoreArray();
        console.log('post success');
    } catch(err) {
        console.log('cant be posted')
        console.log(err)
    }
}



async function init() {
    await updateDataBaseStoreArray();
    showProductsResource()
}

init();
