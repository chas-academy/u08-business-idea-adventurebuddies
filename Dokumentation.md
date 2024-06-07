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

Detta är en store som satts upp för att kunna skicka variabler mellan olika komponenter. userLocation och option är vaiablerna som kommer bli uppdaterade med värden i storen. updateUserLocation är funktionen i storen som används för att uppdatera variablerna med de nya värdenna för lat och lon. updateOpten är funktionen i storen som används för att uppdatera variabeln option med nya värden. Denna stor behöv som nämt för att kunna dela lon och lat mellan searchbaren och map2 för att kunna söka på ett område och att kartan ska kunna visa det området.

![alt text](frontend/DokumentationBilder/SearchBar/image-11.png)

Interfacen som används i storen är till för att deffinera typerna av värden som finns i storen.

![alt text](frontend/DokumentationBilder/SearchBar/image-12.png)

Maps2

När denna component skapas så körs denna useEffekt som triggar funktionen getUserLocation och sätter användarens värden i useState Latitude och Longitude användaren kommer också kunna se event som är skapade och markers på kartan. Detta för att denna komponent gör en fetch till databasen när den skapas och då går en loop igenom alla event som finns och lägger ut dom på kartan.

![alt text](frontend/DokumentationBilder/SearchBar/image-13.png)

För att uppdatera med en ny plats som användare söker efter så tar vi in latitude och longitude från storen genom att hämta variablerna.

![alt text](frontend/DokumentationBilder/SearchBar/image-14.png)

useEffekten har userLocation som dependensie så när den uppdateras med nya värden från storen så kommer denna att triggas och den kommer då att uppdatera useState Latitude och Longitude med nya värden.
![alt text](frontend/DokumentationBilder/SearchBar/image-15.png)

Option hämtas också från store och läggs in i variabeln option.

![alt text](frontend/DokumentationBilder/SearchBar/image-16.png)

Variablerna från usestate för lon. lat kommer sedan uppdatera esuEffekten för kartan. Kartan har Latitude, Longitude och option som dependesie och detta betyder att när något av dessa värden ändras så kommer denna att uppdateras. Lat och lon skulle då sättas in för arr uppdatera kartan och denna vy och option finns i if för att se om värdet är option 1 eller 2 som då bestämmer vilken kart vy som kommer visas
![alt text](frontend/DokumentationBilder/SearchBar/image-17.png)

För att adda Marker när en användare lägger till ett nytt event så gjorde jag en useEffekt som triggas varjegång komponenten skapas denna useEffekt har en fetch i sig som gör en get request till databasen för att hämta alla event.

![alt text](frontend/DokumentationBilder/Maps2/image-1.png)

I hamtaBackend så har jag en setBackendMarker som uppdaterar detta useState med all data från backend. För att sedan få ut en marker på kartan för varje event som har skapats så gjorde jag sedan en forEach på backendMarker för att sätta ut en pin för varje destination jag lade även till `binPopup()` för att lägga till aktivitet vid varje pin.

![alt text](frontend/DokumentationBilder/Maps2/image-2.png)

Föratt dölja API KEY i frontend så skapade jag en .env fil där jag satte in nyckeln och sedan hämtade jag nyckeln därifrån med hjälp av import för att sedan sätta in den i url:en.

![alt text](frontend/DokumentationBilder/Maps2/image-3.png)

EventForm:

Detta form tar in data om event och skall skicka över lon, lat till maps för att kunna trigga en funktion som lägger till en marker på användarens event destination.

![alt text](frontend/DokumentationBilder/EventForm/image-6.png)

Till detta form hade jag först ett interface men upptäckte att man intebehöer ha ett interface om typeerna tolkas korrekt. Detta sätt att typbestämma utan att använda interface heter inlined state initialization med detta menas att typescript aoutomatiskt försöker bestämma typerna utifrån de initiala värdenna som sätts.

![alt text](frontend/DokumentationBilder/EventForm/image-7.png)

Jag upprättade sedan en fetch funktion som skulle kunna skicka ordet som skrivs in på plats till API:t för att kunna få kordinater. För att bara skicka ett API call var jag tvungen att göra yttliggare en useState som inte uppdateras på onchange utan på sumbit. setFormdata uppdateras på onchanger varjegång användaren gör någonting med formet. När användaren känner sig klar och trycker på submit så kommer onsubmit att köras och i den funktionen finns preventDefault() som hindrar så att inte sidan laddas om och setPlace() som kommer att hämta location från formData och sätta den i SetPlace. Efter data är satt så omdirrigeras användaren till en annan sida med hjälp av navigate().

![alt text](frontend/DokumentationBilder/EventForm/image-8.png)

Min fetchData har jag satt i en useEffekt som har place som trigger och kommer när användare trycker på sumbit och place uppdateras att triggas och då göra ett api call.

![alt text](frontend/DokumentationBilder/EventForm/image-4.png)

I denna useEffekt har jag seddan tagit jsondatan med lon, lat och satt in dessa i formData för att sammla all info på en och samma plats.

För att säkerställa att place är satt innan ett försök att skicka formet tillbackend görs så var jag tvungen att lägga till ett nytt usestate för att ha koll på när formet är redo för att skickas

![alt text](frontend/DokumentationBilder/EventForm/image-9.png)

if sattsen som finns nedan kommer att köras om formIfylltOchKlart är false då kommer den sätta denna usestate till true och sätta fkordinaterna i setPlace()

![alt text](frontend/DokumentationBilder/EventForm/image-10.png)

efter detta så kommer sendDataBackend att köras på grund av att formData.lat och formdata.lon finns i dependesi arrayen på useEffekten. i denna finns en navigate som kommer köras och finally kommer att ändra formIfylltOchKlart till false.

![alt text](frontend/DokumentationBilder/EventForm/image-13.png)

---

<u>LoginPage:</u>

Denna komponent hanterar inloggningen genom att samla användarens inmatning --> skicka den till en server --> och om inloggningen är lyckad, navigeras användaren till sin profil.

Detta uppnås via olika funktioner som hanterar olika tillstånd. Nedan kommer en övergriplig beskrivning av koden:

I koden importeras `useState` som är en React Hook för att hantera komponentes tillstånd. Biblioteket `React` används för att bygga användar gränssnitt.
`Link`, `useNavigate` och `useOutletContext` är funktioner från `react-router-dom` som hanterar navigation och kontext inom en router.

I interface `ContextType` beskrivs även vilken kontexttyp som finns för `onLogin` funktionen som tar in `email`, `userId` och `token`.

I funktionen `LoginForm` möter vi `checked` och `setChecked` som hanterar tillståndet för checkbox.

`navigate` navigerar till en annan sida.

`onLogin` är en funktion som är hämtar från kontexten att hantera inloggning.

`formData` och `setFormData` hanterar tillståndet för formulärdatan från användaren (email och lösenord).

I `LogoinForm` komponenten har vi även funktioner som
`handleInputChange` som uppdaterar tillståndet för `formData` när användaren skriver in email eller lösenord.
`handleChange` finns för att kunna uppdatera tillståndet i checkbox för att komma ihåg användaren i formuläret.

Funktionen `handleSubmit` hanterar formulärets inmatning genom att skicka inloggningsuppgifterna till servern via en POST-förfrågan och behandlar svaren för att logga in samt navigera användaren till sin profil.

I returen framgår komponentens UI, det vill säga User Interface, vilket är själva formuläret som användaren ser framför sig. Den är för oss utvecklare, kopplad till en databas som tar in informationen från användaren.

---

<u>RegisterForm: </u>

Som föregående formulär tar även denna in olika data från användaren för registrering.

I komponenten `RegisterPage` har vi även här en `formData` och `setFormData` som hanterar tillståndet för all data som innehåller användaren registreringsuppgifter.

Funktionerna som framgår här är bland annat `handleInputChange` (uppdaterar `formData` när använder ger oss ett värde i textfälten), `handleSelectChange` (uppdaterar `formData` när användaren väljer ett visst värde i vår dropdown-meny).

Funktionen som hanterar formurlärets insändning av data är `handleSubmit` som också skickar allt, likt `LoginForm`, uppgifterna till servern via POST-förfrågan och behandlar svaren för att indikera om registreringen lyckades eller inte.

I vår retur, som blir användarens UI, har vi ett formulär som tar in data som `namn`, `användarnamn`, `email`, `lösenord`, `födelsedatum`, `kön` och `telefonnummer`. Knappen till formuläret triggar igång funktionen `handleSubmit`.

När detta är klart har vi en fullt registrerad användare i vår databas som är redo att logga in och skapa sina egna event samt få tillgång till sin profilsida.
