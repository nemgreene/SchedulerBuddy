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
} = require("../app/compute/utilities");

test("Assesss null matrix", () => {
  expect(
    assessPhenotypeMatrix({ allocations: {}, locations: {}, assets: {} })
  ).toBe(1);
});

test("Assesss matrix: Allocation with I+ location", () => {
  expect(
    assessPhenotypeMatrix({
      allocations: { matrix: { "I+": [{ id: "location_test" }] } },
      locations: { id: "location_test" },
      assets: {},
    })
  ).toBe(params.matrixScoring["I+"]);
});
test("Assesss matrix: Allocation with P+ location", () => {
  expect(
    assessPhenotypeMatrix({
      allocations: { matrix: { "P+": [{ id: "location_test" }] } },
      locations: { id: "location_test" },
      assets: {},
    })
  ).toBe(params.matrixScoring["P+"]);
});
test("Assesss matrix: Allocation with I- location", () => {
  expect(
    assessPhenotypeMatrix({
      allocations: { matrix: { "I-": [{ id: "location_test" }] } },
      locations: { id: "location_test" },
      assets: {},
    })
  ).toBe(params.matrixScoring["I-"]);
});
test("Assesss matrix: Allocation with I- asset", () => {
  expect(
    assessPhenotypeMatrix({
      allocations: { matrix: { "I-": [{ id: "asset_test" }] } },
      locations: {},
      assets: { id: "asset_test" },
    })
  ).toBe(params.matrixScoring["I-"]);
});
test("Assesss matrix: Allocation with P- location", () => {
  expect(
    assessPhenotypeMatrix({
      allocations: { matrix: { "P-": [{ id: "location_test" }] } },
      locations: { id: "location_test" },
      assets: {},
    })
  ).toBe(params.matrixScoring["P-"]);
});
test("Assesss matrix: Asset with I- allocation", () => {
  expect(
    assessPhenotypeMatrix({
      allocations: {
        id: "allocation_rayyan",
      },
      locations: {
        id: "location_hive",
      },
      assets: {
        name: "Riley",
        id: "asset_riley",
        matrix: {
          "I+": [],
          "I-": [{ id: "allocation_rayyan", name: "Rayan" }],
          "P+": [],
          "P-": [],
        },
      },
    })
  ).toBe(params.matrixScoring["I-"]);
});
