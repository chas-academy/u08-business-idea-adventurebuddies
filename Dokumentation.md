SearchBar

I denna fil finns ett form som har en text input för att kunna söka på platser och två inputs för att kunna välja två olika stilar på kartan.

För att inte göra ett Api call vid varje bokstav som skrivs utan när ordet är klart och användaren trycker på submit så gjorde jag en ny useState som tar emot plats

![alt text](frontend/DokumentationBilder/SearchBar/image-2.png)

För att endast uppdatera denna när användaren klickar på knappen bredvid input så kopplade jag en funktion handleSubmit med en onClick.

![alt text](frontend/DokumentationBilder/SearchBar/image-3.png)

För att kunna skriva in ett sökord och se uppdateringar på ordet man skriver in i text inputen finns en useState

![alt text](frontend/DokumentationBilder/SearchBar/image-1.png)

Inputen har en onchange som är kopllad till handlechange denna funktionen uppdaterar en useState som heter setSearchWord som sätter in varjekonstav som skrivs i textrutan.

Funktionen handleSubmit har en funktion som heter `event.preventDefault();` som förhindrar att sidan laddas om sedan uppdaterar den en annan useState som heter place med searchWord.

![alt text](frontend/DokumentationBilder/SearchBar/image-4.png)

När place är satt kommer den att trigga useEffect där denna variabel finns som trigger som kommer att trigga funktionen `fetchData()` som finns i den som i sin tur kommer sätta in place i anropet och därmed hämta data i forma av json. Som till sist kommer att uppdatera useState LocationData med den hämtade jsonDatan.

![alt text](frontend/DokumentationBilder/SearchBar/image-5.png)

`updateUserLocation` variabel bundit funktionen för att kunna uppdatera store med värdena latitude och longitude som har hämtats från anropet. UseEffecten används för att trigga denna funktion och skicka dessa variabler till storen.

![alt text](frontend/DokumentationBilder/SearchBar/image-6.png)

För att kunna byta mellan två plika kartor finns två radio inputs med två olika value som har onChange som är kopllat till `handleChangeRadio`

![alt text](frontend/DokumentationBilder/SearchBar/image-7.png)

Denna funktion fungerar precis likadant som för sökordet och kommer i sin tur uppdatera en useState som heter SelectedValue
![alt text](frontend/DokumentationBilder/SearchBar/image-8.png)

Denna usestate har default value på option1 så att kartan alltid visar de valet från början.

![alt text](frontend/DokumentationBilder/SearchBar/image-9.png)

Variabeln updateOption är sedan kopplad till useMapsFormData funktionen som i sin tur triggar state.updateOption funktionen i storen. Denna variabel blir en funktion eller knuten till en funktion som sedan används i useEffekten för att sätta in och uppdatera selectedValue i storen.

![alt text](frontend/DokumentationBilder/SearchBar/image-10.png)

useMapsFormData

Detta är en store som satts upp för att kunna skicka variabler mellan olika komponenter. userLocation och option är vaiablerna som kommer bli uppdaterade med värden i storen. updateUserLocation är funktionen i storen som används för att uppdatera variablerna med de nya värdenna för lat och lon. updateOpten är funktionen i storen aom används för att uppdatera variabeln option med nya värden.

![alt text](frontend/DokumentationBilder/SearchBar/image-11.png)

Interfacen som används i storen är till för att deffinera typerna av värden som finns i storen.

![alt text](frontend/DokumentationBilder/SearchBar/image-12.png)

Maps2

När denna component skapas så körs denna useEffekt som triggar funktionen getUserLocation och sätter användarens värden i useState Latitude och Longitude

![alt text](frontend/DokumentationBilder/SearchBar/image-13.png)

För att uppdatera med en ny plats som användare söker efter så tar vi in latitude och longitude från storen genom att hämta variablerna.

![alt text](frontend/DokumentationBilder/SearchBar/image-14.png)

useEffekten har userLocation som dependensie så när den uppdateras med nua värden från storen så kommer denna att triggas och den kommer då att uppdatera useState Latitude och Longitude med nya värden.
![alt text](frontend/DokumentationBilder/SearchBar/image-15.png)

Option hämtas också från store och läggs in i variabeln option.

![alt text](frontend/DokumentationBilder/SearchBar/image-16.png)

Variablerna från usestate för lon. lat kommer sedan uppdatera esuEffekten för kartan. Kartan har Latitude, Longitude och option som dependesie och detta betyder att när något av dessa värden ändras så kommer denna att uppdateras. Lat och lon skulle då sättas in för arr uppdatera kartan och denna vy och option finns i if för att se om värdet är option 1 eller 2 som då bestämmer vilken kart vy som kommer visas
![alt text](frontend/DokumentationBilder/SearchBar/image-17.png)
