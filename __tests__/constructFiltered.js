const {
  dateRangeValid,
  assesors,
  assessPhenotypeMatrix,
  assessPhenotypeLocations,
  params,
  structureData,
  timelineStructuredData,
  assessPhenotypeRatio,
  crossoverFunction,
  assessPhenotypeCapacity,
  constructFiltered,
} = require("../app/compute/utilities");

test("Construct Filtered test: Test Allocations", () => {
  const phenome = {
    "09:00": [
      {
        allocations: {
          name: "Rayan",
          timeStart: "09:00",
          timeEnd: "09:15",
        },
        locations: {
          name: "Amex",
          id: "location_amex",
          timeStart: "09:00",
          timeEnd: "09:15",
        },
        assets: {
          name: "Cameron",
          id: "asset_cameron",
          timeStart: "09:00",
          timeEnd: "09:15",
        },
      },
      {
        allocations: {
          name: "Rayan",
          id: "allocation_rayyan",
          timeStart: "09:00",
          timeEnd: "09:15",
        },
        locations: {
          name: "Amex",
          id: "location_amex",
          timeStart: "09:00",
          timeEnd: "09:15",
        },
        assets: {
          name: "Walker",
          id: "asset_walker",
          timeStart: "09:00",
          timeEnd: "09:15",
        },
      },
      {
        allocations: {
          name: "Rayan",
          id: "allocation_rayyan",
          timeStart: "09:00",
          timeEnd: "09:15",
        },
        locations: {
          name: "Amex",
          id: "location_amex",
          timeStart: "09:00",
          timeEnd: "09:15",
        },
        assets: {
          name: "Cameron",
          id: "asset_cameron",
          timeStart: "09:00",
          timeEnd: "09:15",
        },
      },
    ],
    "09:15": [
      {
        allocations: {
          name: "Rayan",
          id: "allocation_rayyan",
          timeStart: "09:15",
          timeEnd: "09:30",
        },
        locations: {
          name: "ICT",
          id: "location_ICT",
          timeStart: "09:15",
          timeEnd: "09:30",
        },
        assets: {
          name: "Cameron",
          id: "asset_cameron",
          timeStart: "09:15",
          timeEnd: "09:30",
        },
      },
    ],
  };

  expect(constructFiltered(phenome, "allocations", true)).toStrictEqual({
    Rayan: {
      allocations: [
        {
          id: "allocation_rayyan",
          name: "Rayan",
          timeEnd: "09:30",
          timeStart: "09:00",
        },
      ],
      locations: [
        {
          name: "Amex",
          id: "location_amex",
          timeStart: "09:00",
          timeEnd: "09:15",
        },
        {
          name: "ICT",
          id: "location_ICT",
          timeStart: "09:15",
          timeEnd: "09:30",
        },
      ],
      assets: [
        {
          name: "Cameron",
          id: "asset_cameron",
          timeStart: "09:00",
          timeEnd: "09:15",
        },
        {
          name: "Walker",
          id: "asset_walker",
          timeStart: "09:00",
          timeEnd: "09:15",
        },
        {
          name: "Cameron",
          id: "asset_cameron",
          timeStart: "09:15",
          timeEnd: "09:30",
        },
      ],
    },
  });
});
