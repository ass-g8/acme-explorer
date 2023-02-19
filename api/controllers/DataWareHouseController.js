import DataWareHouse from '../models/DataWareHouseModel.js'
import Trip from "../models/TripModel.js";
import Application from "../models/ApplicationModel.js";
import Finder from "../models/FinderModel.js";

const listIndicators = (req, res) => {
    console.log("Listing indicators...")
    DataWareHouse.find().exec((err, indicators) => {
        if (err) {
            res.send(err)
        } else {
            res.json(indicators)
        }
    })
}

async function tripsManagedByManager(req, res) {
    const tripsManagedByManager = await Trip.aggregate([
        {
            $facet: {
                managers: [{
                    $group: { _id: "$manager_id" }
                },
                {
                    $group: { _id: null, totalManagers: { $sum: 1 } }
                }],
                trips: [
                    { $group: { _id: null, totalTrips: { $sum: 1 } } }
                ],
                tripsPerManager: [
                    { $group: { _id: "$manager_id", numTripsPerManager: { $sum: 1 } } }
                ]
            }
        },
        {
            $project: {
                averagePerManager: {
                    $divide: [
                        { $arrayElemAt: ["$trips.totalTrips", 0] },
                        { $arrayElemAt: ["$managers.totalManagers", 0] }
                    ]
                },
                minTripsPerManager: {
                    $min: "$tripsPerManager.numTripsPerManager"
                },
                maxTripsPerManager: {
                    $max: "$tripsPerManager.numTripsPerManager"
                },
                stdDevTripsPerManager: {
                    $stdDevSamp: "$tripsPerManager.numTripsPerManager"
                }
            }
        }
    ]);
    return tripsManagedByManager;
};

async function applicationsPerTrip(req, res) {
    const applicationsPerTrip = await Application.aggregate([
        {
            $facet: {
                trips: [{
                    $group: { _id: "$trip_id" }
                },
                {
                    $group: { _id: null, totalTrips: { $sum: 1 } }
                }],
                applications: [
                    { $group: { _id: null, totalApplications: { $sum: 1 } } }
                ],
                applicationsPerTrip: [
                    { $group: { _id: "$trip_id", numApplicationPerTrips: { $sum: 1 } } }
                ]
            }
        },
        {
            $project: {
                averagePerTrip: {
                    $divide: [
                        { $arrayElemAt: ["$applications.totalApplications", 0] },
                        { $arrayElemAt: ["$trips.totalTrips", 0] }
                    ]
                },
                minTripsPerManager: {
                    $min: "$applicationsPerTrip.numApplicationPerTrips"
                },
                maxTripsPerManager: {
                    $max: "$applicationsPerTrip.numApplicationPerTrips"
                },
                stdDevTripsPerManager: {
                    $stdDevSamp: "$applicationsPerTrip.numApplicationPerTrips"
                }
            }
        }
    ]);
    return applicationsPerTrip;
};

async function tripsPrice(req, res) {
    const tripsPrice = await Trip.aggregate([
        {
            $group: {
                _id: null,
                totalTrips: { $sum: 1 },
                totalPrice: { $sum: "$price" },
                minPrice: { $min: "$price" },
                maxPrice: { $max: "$price" },
                stdDevTripPrice: { $stdDevSamp: "$price" }
            }
        },
        {
            $project: {
                _id: 0,
                averagePrice: { $divide: ["$totalPrice", "$totalTrips"] },
                minPrice: "$minPrice",
                maxPrice: "$maxPrice",
                stdDevPrice: "$stdDevTripPrice"
            }
        }]);
    return tripsPrice;
};

async function ratioApplicationsByStatus(req, res) {
    const ratioApplicationsByStatus = await Application.aggregate([
        { $group: { _id: '$status', applications: { $sum: 1 } } }
    ]);
    return ratioApplicationsByStatus;
};

async function averagePriceRange(req, res) {
    const averagePriceRange = await Finder.aggregate([
        {
            $group: {
                _id: null,
                avgMinPrice: { $avg: "$minPrice" },
                avgMaxPrice: { $avg: "$maxPrice" }
            }
        }
    ]);
    return averagePriceRange;
};

async function topSearchedKeywords(req, res) {

    const topSearchedKeywords = await Finder.aggregate([
        {
            $group: {
                _id: "$keyword",
                totalSearch: { $sum: 1 }
            }
        },
        {
            $sort: { totalSearch: -1 }
        },
        {
            $limit: 10
        }
    ]);
    return topSearchedKeywords;
}

const generateIndicators = async (req, res) => {
    console.log("Generating indicators...")
    const tripsManager = await tripsManagedByManager(req, res);
    const applicationsTrip = await applicationsPerTrip(req, res);
    const price = await tripsPrice(req, res);
    const ratioApplicationsStatus = await ratioApplicationsByStatus(req, res);
    const averagePrice = await averagePriceRange(req, res);
    const topKeywords = await topSearchedKeywords(req, res);

    const indicators = new DataWareHouse({
        trips_managed_by_manager: tripsManager,
        applications_per_trip: applicationsTrip,
        trips_price: price,
        ratio_applications_by_status: ratioApplicationsStatus,
        average_price_range: averagePrice,
        top_searched_keywords: topKeywords
    });

    try {
        await indicators.save();
        res.status(201).json({ message: "Indicators generated successfully" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}


export { listIndicators, generateIndicators }