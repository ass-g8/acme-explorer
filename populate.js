import mongoose from "mongoose";
import dotenv from "dotenv";
import Actor from "./api/models/ActorModel.js";
import Trip from "./api/models/TripModel.js";
import Application from "./api/models/ApplicationModel.js";
dotenv.config();

mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE_URI ?? "mongodb://localhost:27017/test")
  .then(() => {
    populate().then(() => mongoose.disconnect());
  });

function _generateRandom(min, max) {
  const difference = max - min;
  let rand = Math.random();
  rand = Math.floor(rand * difference);
  return rand + min;
}

async function populate() {
  console.log("⌛ Populating database...");
  const headers = { Authorization: `Bearer ${process.env.JSON_GENERATOR_TOKEN}` };
  await Promise.all([
    fetch("https://api.json-generator.com/templates/ZxThbkp7hNNb/data", { headers }).then(response => response.json()),
    fetch("https://api.json-generator.com/templates/nVnYPxu_70X6/data", { headers }).then(response => response.json()),
    fetch("https://api.json-generator.com/templates/E1ZIW0JaYlxh/data", { headers }).then(response => response.json())
  ])
    .then(async ([actors, trips, applications]) => {
      const actorsCopy = [...actors];
      const managers = actorsCopy.filter(actor => actor.role[0] === "MANAGER");
      const sponsors = actorsCopy.filter(actor => actor.role[0] === "SPONSOR");
      const explorers = actorsCopy.filter(actor => actor.role[0] === "EXPLORER");

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
      const randomOrderApplications = [...applications];
      const publishedTrips = trips.filter(trip => trip.status === "PUBLISHED");
      const completedApplications = [];

      publishedTrips.forEach(trip => {
        randomOrderApplications.sort(() => 0.5 - Math.random());
        const randomOrderExplorers = explorers.sort(() => 0.5 - Math.random());
        const selectedApplications = randomOrderApplications.splice(0, Math.floor(randomOrderExplorers.length / 2));
        const selectedExplorers = randomOrderExplorers.slice(0, selectedApplications.length);
        if (selectedApplications.length === selectedExplorers.length) {
          selectedApplications.forEach(application => {
            const explorer = selectedExplorers.pop();
            const requestDate = new Date(trip.startDate);
            application.trip_id = trip._id;
            application.explorer_id = explorer._id;
            requestDate.setDate(requestDate.getDate() - _generateRandom(20, 30));
            application.requestDate = requestDate;
            if (application.status === "ACCEPTED") {
              requestDate.setDate(requestDate.getDate() + _generateRandom(5, 10));
              application.paidAt = requestDate;
            }
            completedApplications.push(application);
          });
        }
      });

      await Promise.all([
        Actor.deleteMany().then(() => Actor.insertMany(actors)),
        Trip.deleteMany().then(() => Trip.insertMany(trips)),
        Application.deleteMany().then(() => Application.insertMany(completedApplications))
      ]).then(() => console.log("Database populated successfully"))
        .catch(err => console.log("Could not populate database: " + err));
    })
    .catch(err => {
      console.log("Could not populate database: " + err);
    });
}
