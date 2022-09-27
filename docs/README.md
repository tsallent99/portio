## Portio App

![](https://media2.giphy.com/media/h43BdRKJc517rBWGHp/giphy.gif?cid=ecf05e47i37rboe5qq8jveuv2gnx656viy7l1b47j27sq4e9&rid=giphy.gif&ct=g)

## Description

---

Seamos sinceros. Tener una segunda residencia está al abasto de pocos. Y no solo por el precio de la vivienda, sino también por el derroche de dinero que comporta el mantenimiento de la misma. Y para qué? Para usarla 30 días al año?

Pues aquí es donde nace Portio. Comprar porciones de casas y pagar sólo la porción que te corresponde. Pongamos un ejemplo: Xavi, Clara, Jordi y Daniel quieren comprarse una segunda residencia en la Costa Brava. Pero nadie está dispuesto a pagar 200 mil euros, sabiendo que no la van aprovechar todo el año porque todos trabajan en Barcelona. Entonces Portio compra una casa en Begur y le vende 1/4 parte a cada uno. Felicidades Clara! Ya eres PROPIETARIA y podrás disfrutar de 1/4 del año tu nueva segunda residencia. Así mismo, no tendrás que soportar tú sola los gastos de mantenimiento. Si al cabo de unos años Clara se cansa de la Costa Brava y decide cambiar de aires y adquirir una segunda residencia en la montaña, Clara venderá su 1/4 parte.

Han pasado 5 años y definitivamente Clara se ha cansado y quiere cambiar de aires. Curiosamente su porción, que la compró por 50.000€, ahora se ha revalorizado en 60.000€!

## Functional Description

---

#### Use Cases

- User register/authentification
- Book a trip in a property that user owes
- Cancel bookings
- Check total invoices of your trip
- Chat with other owners that shares with user the same property

## Technologies

---

- React
- Express.js
- Node.js
- MongoDb

#### Data model

##### User

- Id (ObjectId)
- Name (String)
- Surname (String)
- Email (String)
- Password (String)
- Profile Picture (URL string)

##### Property

- Id (ObjectId)
- Title (String)
- Adress (String)
- Pictures (Array of URL strings)
- Portions (Array)
  - "n" objects
    - Owner (Object Id === userId)
    - Shares (number)
- Total Portions (number)

##### Booking

- Id (ObjectId)
- User (ObjectId === userId)
- Property (ObjectId === propertyId)
- State (String: "Active" || "Cancelled")
- Dates (Object)
  - From (Date)
  - To (Date)

##### Message

- Id (ObjectId)
- User (ObjectId)
- Property (ObjectId)
- Text (String)
- Sent At (Date)

foto
![](./imgs/landingPage.png)
![](./imgs/perfil.png)
![](./imgs/retrieveProperties.png)
![](./imgs/propertySelected.png)
![](./imgs/calendar.png)
![](./imgs/bookingSuccesful.png)
![](./imgs/chat.png)
![](./imgs/deleteBooking.png)

enlaces
![my figma]("http://...")
