# mockapi.io prototype :nut_and_bolt:
Very simply app to interact with an API using GET, DELETE and POST methods implementing fetch().

## How it works
Items are stored in "products" resource on the mockapi db emulating a list of e-shop products.
You have three buttons to interact:

* *RESET:*
Reset items stored in the mockapi db to the defaults items which are a coffe, juice, croissant and sandwich. These default items were stored in a local array.

* *SHOW:*
Shows in console the items stored on the resource "products".

* *GENERATE:*
Generates a new random product using Fakerjs to create the values of the properties. The implementing of Fakerjs library is a mockapi native functionality.

* *DELETE:*
Deletes all the database products.

## Link
To know more about mockapi.io visit --> **https://mockapi.io/** <--