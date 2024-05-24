const EventForm = () => {
  return (
    <>
      <h1>Skapa event</h1>
      <form className="mx-auto">
        <div className="mb-4">
          <label htmlFor="Aktivitet" className="block text-left">
            Aktivitet:
          </label>
          <input
            type="text"
            id="Aktivitet"
            name="Aktivitet"
            className="border-solid border-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="Plats" className="block text-left">
            Plats:
          </label>
          <input
            type="text"
            id="Plats"
            name="Plats"
            className="border-solid border-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="TidOchDatum" className="block text-left">
            Tid och datum:
          </label>
          <input
            type="time"
            id="Tid"
            name="Tid"
            className="border-solid border-2 w-1/2 mb-2"
          />
          <input
            type="date"
            id="Datum"
            name="Datum"
            className="border-solid border-2 w-1/2"
          />
        </div>
        <div className="flex">
          <div className="mb-4 w-1/2">
            <label htmlFor="MinDeltagare" className="block">
              Min/max deltagare:
            </label>
            <input
              type="number"
              id="MinDeltagare"
              name="min"
              min="1"
              max="30"
              inputMode="numeric"
              className="border-solid border-2 w-10 mr-2"
            />
            <input
              type="number"
              id="MaxDeltagare"
              name="max"
              min="1"
              max="30"
              className="border-solid border-2 w-10"
            />
          </div>

          <div className="mb-4 w-1/2">
            <div className="flex">
              <label htmlFor="Utrustning" className="block">
                Utrustning:
              </label>
              <label htmlFor="Ja">Ja</label>
              <input type="radio" name="Utrustning" className="mr-2" id="Ja" />
              <label htmlFor="Ja">Nej</label>
              <input type="radio" name="Utrustning" className="mr-2" id="Nej" />
            </div>
            <input
              type="text"
              id="Utrustning"
              name="Utrustning"
              className="border-solid border-2 w-20"
            />
          </div>
        </div>
        <div className="flex flex-col items-start">
          <label htmlFor="Ålder" className="">
            Ålder
          </label>
          <select
            id="Ålder"
            name="Ålder"
            className="border-solid border-2 w-1/2 items-left"
          >
            <option value="under18">15 - 20</option>
            <option value="18to30">20 - 25</option>
            <option value="31to50">25 - 30</option>
            <option value="over50">40 - 50</option>
            <option value="over50">50 - 100</option>
          </select>
        </div>
        <div className="flex flex-col items-start">
          <label htmlFor="Övrigt">Övrigt</label>
          <textarea
            rows={5}
            id="Övrigt"
            name="Övrigt"
            placeholder="Skriv här..."
            className="border-solid border-2 w-full items-left"
          />
        </div>
        <div className="pt-4">
          <button className="border border-black w-2/3">Skicka</button>
        </div>
      </form>
    </>
  );
};

export default EventForm;
