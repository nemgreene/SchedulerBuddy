var moment = require("moment"); // require
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

// test("assessPhenotypeCapacity: Duplciate allocation in the same room", () => {
//   expect(
//     assessPhenotypeCapacity([
//       {
//         allocations: {
//           name: "Rayan",
//           id: "allocation_rayyan",
//           ratio: [1, 2],
//           headCount: 8,
//         },
//         locations: {
//           name: "Hive",
//           id: "location_hive",
//           capacity: 8,
//         },
//         assets: {
//           name: "Riley",
//           id: "asset_riley",
//         },
//       },
//       {
//         allocations: {
//           name: "Rushani",
//           id: "allocation_rushani",
//           headCount: 2,
//           ratio: [2, 1],
//         },
//         locations: {
//           name: "Hive",
//           id: "location_hive",
//           capacity: 8,
//         },
//         assets: {
//           name: "Cameron",
//           id: "asset_cameron",
//         },
//       },
//       {
//         allocations: {
//           name: "Rushani",
//           id: "allocation_rushani",
//           headCount: 2,
//           ratio: [2, 1],
//         },
//         locations: {
//           name: "Hive",
//           id: "location_hive",
//           capacity: 8,
//         },
//         assets: {
//           name: "Walker",
//           id: "asset_walker",
//         },
//       },
//     ])
//   ).not.toBe(0);
// });

// test("assessPhenotypeCapacity: Duplciate allocation not in the same room", () => {
//   expect(
//     assessPhenotypeCapacity([
//       {
//         allocations: {
//           name: "Rayan",
//           id: "allocation_rayyan",
//           ratio: [1, 2],
//           headCount: 8,
//         },
//         locations: {
//           name: "Hive",
//           id: "location_hive",
//           capacity: 8,
//         },
//         assets: {
//           name: "Riley",
//           id: "asset_riley",
//         },
//       },
//       {
//         allocations: {
//           name: "Rushani",
//           id: "allocation_rushani",
//           headCount: 2,
//           ratio: [2, 1],
//         },
//         locations: {
//           name: "Hive",
//           id: "location_hive",
//           capacity: 8,
//         },
//         assets: {
//           name: "Cameron",
//           id: "asset_cameron",
//         },
//       },
//       {
//         allocations: {
//           name: "Rushani",
//           id: "allocation_rushani",
//           headCount: 2,
//           ratio: [2, 1],
//         },
//         locations: {
//           name: "Amex",
//           id: "location_amex",
//           capacity: 10,
//         },
//         assets: {
//           name: "Walker",
//           id: "asset_walker",
//         },
//       },
//     ])
//   ).toEqual(0);
// });

// test("Assesss Phenotype Locations null", () => {
//   expect(
//     assessPhenotypeLocations({ allocations: {}, locations: {}, assets: {} })
//   ).toBe(0);
// });

// test("Assesss Phenotype With acceptable time ranges", () => {
//   expect(
//     assessPhenotypeLocations({
//       allocations: { timeStart: "10:00", timeEnd: "12:00" },
//       locations: { timeStart: "10:00", timeEnd: "12:00" },
//       assets: { timeStart: "10:00", timeEnd: "12:00" },
//     })
//   ).toBe(2.25);
// });
// test("Assesss Phenotype allocation+ location+ asset-", () => {
//   expect(
//     assessPhenotypeLocations({
//       allocations: { timeStart: "10:00", timeEnd: "12:00" },
//       locations: { timeStart: "10:00", timeEnd: "12:00" },
//       assets: { timeStart: "10:00", timeEnd: "11:00" },
//     })
//   ).toBe(0);
// });
// test("Assesss Phenotype allocation- location+ asset+", () => {
//   expect(
//     assessPhenotypeLocations({
//       allocations: { timeStart: "9:00", timeEnd: "11:00" },
//       locations: { timeStart: "10:00", timeEnd: "12:00" },
//       assets: { timeStart: "10:00", timeEnd: "12:00" },
//     })
//   ).toBe(0);
// });
// test("Assesss Phenotype allocation+ location- asset+", () => {
//   expect(
//     assessPhenotypeLocations({
//       allocations: { timeStart: "10:00", timeEnd: "12:00" },
//       locations: { timeStart: "10:00", timeEnd: "11:00" },
//       assets: { timeStart: "10:00", timeEnd: "12:00" },
//     })
//   ).toBe(0);
// });
// test("Assesss Phenotype time range none", () => {
//   expect(
//     assessPhenotypeLocations({
//       allocations: { timeStart: "10:00", timeEnd: "10:00" },
//       locations: { timeStart: "10:00", timeEnd: "11:00" },
//       assets: { timeStart: "10:00", timeEnd: "12:00" },
//     })
//   ).toBe(0);
// });

// test("Assesss matrix: Allocation with I- location and I+ Asset", () => {
//   expect(
//     assessPhenotypeMatrix({
//       allocations: {
//         matrix: {
//           "I-": [{ id: "location_test" }],
//           "I+": [{ id: "asset_test" }],
//         },
//       },
//       locations: { id: "location_test" },
//       assets: { id: "asset_test" },
//     })
//   ).toBe(params.matrixScoring["I-"]);
// });
// test("Assesss matrix: Allocation with P- location and P+ Asset", () => {
//   expect(
//     assessPhenotypeMatrix({
//       allocations: {
//         matrix: {
//           "P-": [{ id: "location_test" }],
//           "P+": [{ id: "asset_test" }],
//         },
//       },
//       locations: { id: "location_test" },
//       assets: { id: "asset_test" },
//     })
//   ).toBe(params.matrixScoring["P-"] * params.matrixScoring["P+"]);
// });
// test("Assesss matrix: Location with P+ Asset", () => {
//   expect(
//     assessPhenotypeMatrix({
//       allocations: {},
//       locations: {
//         matrix: {
//           "P+": [{ id: "asset_test" }],
//         },
//         id: "location_test",
//       },
//       assets: { id: "asset_test" },
//     })
//   ).toBe(params.matrixScoring["P+"]);
// });
// test("Assesss matrix: Location with P- Asset", () => {
//   expect(
//     assessPhenotypeMatrix({
//       allocations: {},
//       locations: {
//         matrix: {
//           "P-": [{ id: "asset_test" }],
//         },
//         id: "location_test",
//       },
//       assets: { id: "asset_test" },
//     })
//   ).toBe(params.matrixScoring["P-"]);
// });
