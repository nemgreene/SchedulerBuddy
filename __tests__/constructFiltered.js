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

test("Construct Filtered Test: Normal Data is reduced", () => {
  const phenome = {
    "09:00": [
      {
        allocations: {
          name: "Rayan",
          id: "allocation_rayyan",
          timeStart: "09:00",
          timeEnd: "09:15",
        },
        locations: {
          name: "ICT",
          id: "location_ICT",
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

  const ret = constructFiltered(phenome, "allocations");
  expect(ret).toStrictEqual({
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
          name: "ICT",
          id: "location_ICT",
          timeStart: "09:00",
          timeEnd: "09:30",
        },
      ],
      assets: [
        {
          name: "Cameron",
          id: "asset_cameron",
          timeStart: "09:00",
          timeEnd: "09:30",
        },
      ],
    },
  });
});

test("Construct Filtered Test: Normal Data(Skinny) is reduced", () => {
  const phenome = {
    "09:00": [
      {
        allocations: {
          name: "Rayan",
          id: "allocation_rayyan",
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
      },
    ],
  };

  expect(constructFiltered(phenome, "allocations")).toStrictEqual({
    Rayan: {
      allocations: [
        {
          id: "allocation_rayyan",
          name: "Rayan",
          timeEnd: "09:30",
          timeStart: "09:00",
        },
      ],
      locations: [],
      assets: [],
    },
  });
});
test("Construct Filtered Test: Normal Data(Skinny) is reduced, with gap in data", () => {
  const phenome = {
    "09:00": [
      {
        allocations: {
          name: "Rayan",
          id: "allocation_rayyan",
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
      },
    ],
    "09:45": [
      {
        allocations: {
          name: "Rayan",
          id: "allocation_rayyan",
          timeStart: "09:45",
          timeEnd: "10:00",
        },
      },
    ],
  };

  expect(constructFiltered(phenome, "allocations")).toStrictEqual({
    Rayan: {
      allocations: [
        {
          id: "allocation_rayyan",
          name: "Rayan",
          timeEnd: "09:30",
          timeStart: "09:00",
        },
        {
          name: "Rayan",
          id: "allocation_rayyan",
          timeStart: "09:45",
          timeEnd: "10:00",
        },
      ],
      locations: [],
      assets: [],
    },
  });
});

test("Construct Filtered Test: Normal Data is out of date order", () => {
  const phenome = {
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
    "09:00": [
      {
        allocations: {
          name: "Rayan",
          id: "allocation_rayyan",
          timeStart: "09:00",
          timeEnd: "09:15",
        },
        locations: {
          name: "ICT",
          id: "location_ICT",
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
  };

  const ret = constructFiltered(phenome, "allocations");
  expect(ret).toStrictEqual({
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
          name: "ICT",
          id: "location_ICT",
          timeStart: "09:00",
          timeEnd: "09:30",
        },
      ],
      assets: [
        {
          name: "Cameron",
          id: "asset_cameron",
          timeStart: "09:00",
          timeEnd: "09:30",
        },
      ],
    },
  });
});

test("Construct Filtered Test: Different Matrices should not be reuced", () => {
  const phenome = {
    "09:00": [
      {
        allocations: {
          name: "Rayan",
          id: "allocation_rayyan",
          timeStart: "09:00",
          timeEnd: "09:15",
          matrix: [1, 2, 3, 4],
        },
        locations: {
          name: "ICT",
          id: "location_ICT",
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
          matrix: [1, 2, 3],
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

  const ret = constructFiltered(phenome, "allocations");
  expect(ret).toStrictEqual({
    Rayan: {
      allocations: [
        {
          id: "allocation_rayyan",
          name: "Rayan",
          timeEnd: "09:15",
          timeStart: "09:00",
          matrix: [1, 2, 3, 4],
        },
        {
          id: "allocation_rayyan",
          name: "Rayan",
          timeEnd: "09:30",
          timeStart: "09:15",
          matrix: [1, 2, 3],
        },
      ],
      locations: [
        {
          name: "ICT",
          id: "location_ICT",
          timeStart: "09:00",
          timeEnd: "09:30",
        },
      ],
      assets: [
        {
          name: "Cameron",
          id: "asset_cameron",
          timeStart: "09:00",
          timeEnd: "09:30",
        },
      ],
    },
  });
});

test("Construct Filtered Test: Test that construction works with missing data, when requesting present data. ", () => {
  const phenome = {
    "09:00": [
      {
        allocations: {
          name: "Rayan",
          id: "allocation_rayyan",
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
      },
    ],
  };

  const ret = constructFiltered(phenome, "allocations");
  expect(ret).toStrictEqual({
    Rayan: {
      allocations: [
        {
          id: "allocation_rayyan",
          name: "Rayan",
          timeEnd: "09:30",
          timeStart: "09:00",
        },
      ],
      assets: [],
      locations: [],
    },
  });
});

test("Construct Filtered Test: Test that construction works with missing data, when requesting missing data (locations) ", () => {
  const phenome = {
    "09:00": [
      {
        allocations: {
          name: "Rayan",
          id: "allocation_rayyan",
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
      },
    ],
  };

  const ret = constructFiltered(phenome, "locations");
  expect(ret).toStrictEqual({});
});
test("Construct Filtered Test: Test that construction works with missing data, when requesting missing data (assets) ", () => {
  const phenome = {
    "09:00": [
      {
        allocations: {
          name: "Rayan",
          id: "allocation_rayyan",
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
      },
    ],
  };

  const ret = constructFiltered(phenome, "locations");
  expect(ret).toStrictEqual({});
});
test("Construct Filtered Test: Test that incomplete construction disposes of extra data(locations) ", () => {
  const phenome = {
    "09:00": [
      {
        allocations: {
          name: "Rayan",
          id: "allocation_rayyan",
          timeStart: "09:00",
          timeEnd: "09:15",
        },
        locations: {
          name: "ICT",
          id: "location_ICT",
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
      },
    ],
  };

  const ret = constructFiltered(phenome, "locations");
  expect(ret).toStrictEqual({
    ICT: {
      allocations: [
        {
          name: "Rayan",
          id: "allocation_rayyan",
          timeStart: "09:00",
          timeEnd: "09:15",
        },
      ],
      assets: [],
      locations: [
        {
          name: "ICT",
          id: "location_ICT",
          timeStart: "09:00",
          timeEnd: "09:15",
        },
      ],
    },
  });
});
