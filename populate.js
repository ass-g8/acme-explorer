import mongoose from "mongoose";
import dotenv from "dotenv";
import Actor from "./api/models/ActorModel.js";
import Trip from "./api/models/TripModel.js";
dotenv.config();

mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE_URI ?? "mongodb://localhost:27017/test")
  .then(() => {
    populate().then(() => mongoose.disconnect());
  });

async function populate() {
  console.log("⌛ Populating database...");
  const headers = { Authorization: `Bearer ${process.env.JSON_GENERATOR_TOKEN}` };
  await Promise.all([
    fetch("https://api.json-generator.com/templates/ZxThbkp7hNNb/data", { headers }).then(response => response.json()),
    fetch("https://api.json-generator.com/templates/nVnYPxu_70X6/data", { headers }).then(response => response.json())
  ])
    .then(async ([actors, trips]) => {
      const actorsCopy = [...actors];
      const managers = actorsCopy.filter(actor => actor.role[0] === "MANAGER");
      const sponsors = actorsCopy.filter(actor => actor.role[0] === "SPONSOR");
      // const explorers = actorsCopy.filter(actor => actor.role[0] === "EXPLORER");

      trips.forEach(trip => {
        const randomOrderManagers = managers.sort(() => 0.5 - Math.random());
        const manager = randomOrderManagers.pop();
        if (manager) {
          trip.manager_id = manager._id;
        }

        const numberOfSponsoships = trip.sponsorships.length;
        const randomOrderSponsors = sponsors.sort(() => 0.5 - Math.random());
        const selectedSponsors = randomOrderSponsors.splice(0, numberOfSponsoships);
        if (selectedSponsors.length === numberOfSponsoships) {
          trip.sponsorships.forEach(sponsorship => {
            sponsorship.sponsor_id = selectedSponsors.pop()._id;
          });
        }
      });

      trips = trips.filter(trip => trip.manager_id && trip.sponsorships.every(sponsorship => sponsorship.sponsor_id));

      await Promise.all([
        Actor.deleteMany().then(() => Actor.insertMany(actors)),
        Trip.deleteMany().then(() => Trip.insertMany(trips))
      ]).then(() => console.log("Database populated successfully"))
        .catch(err => console.log("Could not populate database: " + err));
    })
    .catch(err => {
      console.log("Could not populate database: " + err);
    });
}
