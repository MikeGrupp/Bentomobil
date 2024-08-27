let basketContents = [];

let deliveryCheck =["true"];

let BellaVita = [
    {
        "foodType": "Vorspeisen",
        "typeImg": "./assets/img/starter.jpg",
        "typeItems": [
            {
                "name": "Bruschetta",
                "price": 4.50,
                "description": "Frisches Brot mit Tomaten, Basilikum und Olivenöl",
                "amount": 1,
            },
            {
                "name": "Caprese",
                "price": 6.00,
                "description": "Tomaten, Mozzarella, frisches Basilikum und Balsamico",
                "amount": 1,
            },
            {
                "name": "Antipasto Misto",
                "price": 8.50,
                "description": "Auswahl an italienischen Wurstwaren und Käse",
                "amount": 1,
            },
            {
                "name": "Knoblauchbrot",
                "price": 3.50,
                "description": "Knuspriges Brot mit Knoblauch und Kräutern",
                "amount": 1,
            },
        ],
    },
    {
        "foodType": "Pizza",
        "typeImg": "./assets/img/pizza.jpg",
        "typeItems": [
            {
                "name": "Margherita",
                "price": 7.50,
                "description": "Tomatensauce, Mozzarella, frisches Basilikum",
                "amount": 1,
            },
            {
                "name": "Salami",
                "price": 8.50,
                "description": "Tomatensauce, Mozzarella, Salami",
                "amount": 1,
            },
            {
                "name": "Prosciutto e Funghi",
                "price": 9.00,
                "description": "Tomatensauce, Mozzarella, Schinken, Champignons",
                "amount": 1,
            },
            {
                "name": "Quattro Formaggi",
                "price": 10.00,
                "description": "Tomatensauce, Mozzarella, Gorgonzola, Parmesan, Pecorino",
                "amount": 1,
            },
            {
                "name": "Vegetariana",
                "price": 9.50,
                "description": "Tomatensauce, Mozzarella, saisonales Gemüse",
                "amount": 1,
            },
            {
                "name": "Diavola",
                "price": 9.50,
                "description": "Tomatensauce, Mozzarella, scharfe Salami, Peperoni",
                "amount": 1,
            },
            {
                "name": "Frutti di Mare",
                "price": 11.00,
                "description": "Tomatensauce, Mozzarella, Meeresfrüchte",
                "amount": 1,
            },
        ],
    },
    {
        "foodType": "Pasta",
        "typeImg": "./assets/img/pasta.jpg",
        "typeItems": [
            {
                "name": "Spaghetti Bolognese",
                "price": 9.00,
                "description": "Spaghetti mit Rindfleischsauce",
                "amount": 1,
            },
            {
                "name": "Penne Arrabbiata",
                "price": 8.00,
                "description": "Penne mit scharfer Tomatensauce",
                "amount": 1,
            },
            {
                "name": "Tagliatelle Alfredo",
                "price": 10.00,
                "description": "Tagliatelle mit Sahnesauce und Parmesan",
                "amount": 1,
            },
            {
                "name": "Lasagne al Forno",
                "price": 11.00,
                "description": "Hausgemachte Lasagne mit Fleischsauce",
                "amount": 1,
            },
            {
                "name": "Ravioli Ricotta e Spinaci",
                "price": 12.00,
                "description": "Ravioli gefüllt mit Ricotta und Spinat, Butter und Salbei",
                "amount": 1,
            },
        ],
    },
    {
        "foodType": "Nachspeisen",
        "typeImg": "./assets/img/dessert.jpg",
        "typeItems": [
            {
                "name": "Tiramisu",
                "price": 5.00,
                "description": "Klassisches italienisches Dessert mit Mascarpone und Kaffee",
                "amount": 1,
            },
            {
                "name": "Panna Cotta",
                "price": 4.50,
                "description": "Vanillepudding mit Beerensauce",
                "amount": 1,
            },
        ],
    },
    {
        "foodType": "Getränke",
        "typeImg": "./assets/img/drinks.jpg",
        "typeItems": [
            {
                "name": "Mineralwasser (0,5L)",
                "price": 2.50,
                "description": "Still, Sprudel",
                "amount": 1,
            },
            {
                "name": "Softdrinks (0,33L)",
                "price": 3.00,
                "description": "Cola, Fanta, Sprite",
                "amount": 1,
            },
            {
                "name": "Hausgemachte Limonade (0,5L)",
                "price": 4.00,
                "description": "Zitrone",
                "amount": 1,
            },
            {
                "name": "Bier (0,5L)",
                "price": 4.50,
                "description": "Italienisches Lager",
                "amount": 1,
            }
        ],
    },
]