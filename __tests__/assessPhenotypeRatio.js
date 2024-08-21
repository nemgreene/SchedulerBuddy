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

test("Assesss matrix: Asset assigned to allocation with [1:1] ratio also assigned to another child", () => {
  expect(
    assessPhenotypeRatio([
      {
        assets: { name: "asset1" },
        allocations: { name: "allocation1", ratio: [1, 1] },
        locations: {},
      },
      {
        assets: { name: "asset2" },
        allocations: { name: "allocation1", ratio: [2, 1] },
        locations: {},
      },
      {
        assets: { name: "asset1" },
        allocations: { name: "allocation2", ratio: [1, 1] },
        locations: {},
      },
    ])
  ).toBeCloseTo(0);
});

test("test assessPhenotypeRatio ratio [2:1]+", () => {
  expect(
    assessPhenotypeRatio([
      {
        assets: { name: "asset1" },
        allocations: { name: "allocation1", ratio: [2, 1] },
        locations: {},
      },
      {
        assets: { name: "asset2" },
        allocations: { name: "allocation1", ratio: [2, 1] },
        locations: {},
      },
      {
        assets: { name: "asset3" },
        allocations: { name: "allocation2", ratio: [1, 1] },
        locations: {},
      },
    ])
  ).toBeCloseTo(1.1 ** 6, 5);
});
test("test assessPhenotypeRatio ratio [2:1]-", () => {
  expect(
    assessPhenotypeRatio([
      {
        assets: { name: "asset1" },
        allocations: { name: "allocation1", ratio: [2, 1] },
        locations: {},
      },
      {
        assets: { name: "asset2" },
        allocations: { name: "allocation1", ratio: [2, 1] },
        locations: {},
      },
      {
        assets: { name: "asset2" },
        allocations: { name: "allocation2", ratio: [1, 1] },
        locations: {},
      },
    ])
  ).toBe(0);
});
test("test assessPhenotypeRatio ratio [2:1]-", () => {
  expect(
    assessPhenotypeRatio([
      {
        assets: { name: "asset1" },
        allocations: { name: "allocation1", ratio: [2, 1] },
        locations: {},
      },
      {
        assets: { name: "asset1" },
        allocations: { name: "allocation1", ratio: [2, 1] },
        locations: {},
      },
      {
        assets: { name: "asset2" },
        allocations: { name: "allocation2", ratio: [1, 1] },
        locations: {},
      },
    ])
  ).toBe(0);
});
test("test assessPhenotypeRatio ratio [2:1]-", () => {
  expect(
    assessPhenotypeRatio([
      {
        assets: { name: "asset1" },
        allocations: { name: "allocation1", ratio: [2, 1] },
        locations: {},
      },
      {
        assets: { name: "asset2" },
        allocations: { name: "allocation2", ratio: [1, 1] },
        locations: {},
      },
    ])
  ).toBe(0);
});
test("test assessPhenotypeRatio ratio [1:1]-", () => {
  expect(
    assessPhenotypeRatio([
      {
        assets: { name: "asset1" },
        allocations: { name: "allocation1", ratio: [1, 1] },
        locations: {},
      },
      {
        assets: { name: "asset1" },
        allocations: { name: "allocation2", ratio: [1, 1] },
        locations: {},
      },
    ])
  ).toBe(0);
});

test("test assessPhenotypeRatio ratio [1:1]+", () => {
  expect(
    assessPhenotypeRatio([
      {
        assets: { name: "asset" },
        allocations: { name: "allocation", ratio: [1, 1] },
        locations: {},
      },
    ])
  ).toBe(1.1 * 1.1);
});
test("test assessPhenotypeRatio Only Allocation", () => {
  expect(
    assessPhenotypeRatio([
      {
        assets: {},
        allocations: { name: "allocation", ratio: [1, 1] },
        locations: {},
      },
    ])
  ).toBe(0);
});
test("test assessPhenotypeRatio Invalid Entry", () => {
  expect(
    assessPhenotypeRatio([{ assets: {}, allocations: {}, locations: {} }])
  ).toBe(0);
});

test("test assessPhenotypeRatio Empty", () => {
  expect(assessPhenotypeRatio([])).toBe(1);
});
