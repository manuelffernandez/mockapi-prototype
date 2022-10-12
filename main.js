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

let showDatabaseProductsBtn = document.getElementById('show-btn');
let genRandomProductBtn = document.getElementById('gen-prod-btn');
let resetDatabaseProductsBtn = document.getElementById('reset-btn');
let deleteDatabaseProductsBtn = document.getElementById('delete-btn');

let url = 'https://634051e5e44b83bc73ce3ce4.mockapi.io/products';
let dataBaseStore = [];

showDatabaseProductsBtn.addEventListener('click', showProductsResource);
resetDatabaseProductsBtn.addEventListener('click', resetProductsResource);
genRandomProductBtn.addEventListener('click', generateRandomProductsResourceItem);
deleteDatabaseProductsBtn.addEventListener('click', deleteAll);


function getProductsResource() {
    return fetch(url)
    .then(response => response.json())
    .catch(err => console.log(err))
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

// Because the showProductsResource() works showing dataBaseStore.
// So its a require to that array be synchronized with the database items
async function updateLocalDatabaseStoreArray() {
    console.log('loading items from database onto local array');
    dataBaseStore = await getProductsResource();
    console.log('loading complete');
}

async function showProductsResource() {
    console.log(dataBaseStore);
}


// Because the api doesn't have an apikey, therefore anyone can post items on it.

async function deleteAll() {
    console.log('item deletion started');
    for(let i = 0; i < dataBaseStore.length; i++) {
        try {
            console.log('product ' + dataBaseStore[i].id + ' deleted');
            await deleteProductsResourceItem(dataBaseStore[i].id);
        } catch(err) {
            console.log('cant be deleted');
            console.log(err);
            return
        }
    }
    console.log('deletion complete');
}

//Because the mockapi interface doesn't allow set specific field values.
async function postDefaultStoreItems() {
    console.log('posting items from local array to database started');
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
    console.log('posting to database finished');
}

// Because in case that the database has no items or there are items which were made by others
async function resetProductsResource() {
    console.log('reset started');
    await deleteAll()
    await postDefaultStoreItems()
    await updateLocalDatabaseStoreArray();
    console.log('reset finished');
}

async function generateRandomProductsResourceItem() {
    console.log('generating random product');
    try {
        await postProductsResourceItem({})
        await updateLocalDatabaseStoreArray();
        console.log('post success');
    } catch(err) {
        console.log('cant be posted');
        console.log(err);
    }
}



function init() {
    updateLocalDatabaseStoreArray();
}

init();
