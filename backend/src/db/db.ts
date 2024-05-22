import { connect } from "mongoose";

const connectSportDB = async () => {
  try {
    const mongoURI: string = "mongodb+srv://activitybuddiess:hO2sOrrjaBIRtLDq@sports.mpzqmrl.mongodb.net/SportDB";
    await connect(mongoURI);
    console.log("MongoDB Connected...");
  } catch (err:any) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

// Om vi vill connecta till mer än en databas behöver vi egna funktioner för dem.
// export { connectSportDB, connectUserDB };

export default connectSportDB();