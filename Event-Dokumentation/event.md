**Event**


Vi änvänder oss av CRUD där vi kan skapa, läsa, uppdatera och radera ett event.

Skapa:

![Create Event](/Event-Dokumentation/img/create.png)

Se alla event:

![Se alla event](/Event-Dokumentation/img/allEvents.png)

Se ett event:

![Se ett event](/Event-Dokumentation/img/eventById.png)

Uppdatera:

![Uppdatera ett event](/Event-Dokumentation/img/update.png)

Radera: 

![Radera ett event](/Event-Dokumentation/img/delete.png)


Vi har använt oss av *Mongoose populate* för att automatiskt fylla i referenser mellan olika dokument inom MongoDB. 

*Populate* djälper dig att utföra en slags "join" operation, som är vanligt i relationsdatabaser, men på ett sätt som passar MongoDB dokumenterade natur.


När man anropar *.populate('user_id') med mongoose så instruerar vi det att ersätta det fältet som innehållet ObjectId, med det faktiskta *User* dokumentet som det refereras till. Och på så vis kan man hämta all data från ett användarobjekt.

Medan populate är mycket användbart, är det viktigt att vara medveten om dess prestanda. Varje populate innebär en separat fråga till databasen, vilket kan leda till högre belastning om du använder populate på många dokument eller stora mängder data. För komplexa frågor och stora dataset kan det vara bättre att optimera databasschemat eller använda aggregeringspipelines, såsom $lookup.


Mongoose populate har också avancerade funktioner som att populera inbäddade dokument, använda matcher och sortering inom populering, och mer. För mer detaljer kan du läsa den officiella dokumentationen för Mongoose populate.