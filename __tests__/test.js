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
} = require("../app/compute/utilities");

// test("test crossoverFunction with block inequality ", () => {
//   const phenome1 = {
//     "9:00": [{ allocations: { name: "test1" }, locations: {}, assets: {} }],
//   };
//   const phenome2 = {
//     "10:00": [{ allocations: { name: "test2" }, locations: {}, assets: {} }],
//   };
//   let res = crossoverFunction(phenome1, phenome2, { "10:00": {} });
//   expect(res).toStrictEqual([phenome1, phenome2]);
// });
// test("test crossoverFunction with timeline inequality ", () => {
//   const phenome1 = {
//     "9:00": [{ allocations: { name: "test1" }, locations: {}, assets: {} }],
//   };
//   const phenome2 = {
//     "9:00": [{ allocations: { name: "test2" }, locations: {}, assets: {} }],
//   };
//   let res = crossoverFunction(phenome1, phenome2, { "10:00": {} });
//   expect(res).toStrictEqual([phenome1, phenome2]);
// });

// test("test crossoverFunction ", () => {
//   const phenome1 = {
//     "9:00": [{ allocations: { name: "test1" }, locations: {}, assets: {} }],
//   };
//   const phenome2 = {
//     "9:00": [{ allocations: { name: "test2" }, locations: {}, assets: {} }],
//   };
//   let res = crossoverFunction(phenome1, phenome2, { "9:00": {} });
//   expect(res).not.toStrictEqual([phenome1, phenome2]);
// });

// test("test crossoverFunction, empty, strutured ", () => {
//   expect(
//     crossoverFunction(
//       { "9:00": [{ allocations: {}, locations: {}, assets: {} }] },
//       { "9:00": [{ allocations: {}, locations: {}, assets: {} }] },
//       {}
//     )
//   ).toEqual([
//     { "9:00": [{ allocations: {}, locations: {}, assets: {} }] },
//     { "9:00": [{ allocations: {}, locations: {}, assets: {} }] },
//   ]);
// });
// test("test crossoverFunction, empty ", () => {
//   expect(crossoverFunction({}, {}, {})).toStrictEqual([{}, {}]);
// });

// test("Initialize Population", () => {
//   const structured = structureData({
//     allocations: [
//       {
//         id: "allocation_test",
//         name: "test",
//         blocks: [
//           {
//             timeStart: "09:00",
//             timeEnd: "9:15",
//             ratio: [2, 1],
//             matrix: { "I+": { id: "allocationMatrixTest" } },
//           },
//           {
//             timeStart: "09:00",
//             timeEnd: "9:15",
//             ratio: [1, 1],
//             matrix: { "I+": { id: "allocationMatrixTest" } },
//           },
//         ],
//       },
//     ],
//     assets: [],
//     locations: [],
//   });
//   const timeSlots = [moment("09:00", "HH:mm"), moment("09:15", "HH:mm")];
//   expect(timelineStructuredData(structured, 15, timeSlots)).toStrictEqual({
//     "09:00": {
//       assets: [],
//       locations: [],
//       allocations: [
//         {
//           id: "allocation_test",
//           name: "test",
//           timeStart: "09:00",
//           timeEnd: "09:15",
//           ratio: [2, 1],
//           matrix: { "I+": { id: "allocationMatrixTest" } },
//         },
//         {
//           id: "allocation_test",
//           name: "test",
//           timeStart: "09:00",
//           timeEnd: "09:15",
//           ratio: [2, 1],
//           matrix: { "I+": { id: "allocationMatrixTest" } },
//         },
//         {
//           id: "allocation_test",
//           name: "test",
//           timeStart: "09:00",
//           timeEnd: "09:15",
//           ratio: [1, 1],
//           matrix: { "I+": { id: "allocationMatrixTest" } },
//         },
//       ],
//     },
//     "09:15": { assets: [], locations: [], allocations: [] },
//   });
// });

// --------------------------------------------------------------------------------
// Timeline Data Tests
//#region
// test("TimelineData Test: Empty data", () => {
//   const structured = structureData({
//     allocations: [],
//     assets: [],
//     locations: [],
//   });

//   expect(timelineStructuredData(structured)).toStrictEqual({});
// });
// test("TimelineData Test: Basic Pattern", () => {
//   const structured = structureData({
//     allocations: [
//       {
//         id: "allocation_test",
//         name: "test",
//         blocks: [
//           {
//             timeStart: "09:00",
//             timeEnd: "9:15",
//             ratio: [2, 1],
//             matrix: { "I+": { id: "allocationMatrixTest" } },
//           },
//           {
//             timeStart: "09:00",
//             timeEnd: "9:15",
//             ratio: [1, 1],
//             matrix: { "I+": { id: "allocationMatrixTest" } },
//           },
//         ],
//       },
//     ],
//     assets: [],
//     locations: [],
//   });
//   const timeSlots = [moment("09:00", "HH:mm"), moment("09:15", "HH:mm")];
//   expect(timelineStructuredData(structured, 15, timeSlots)).toStrictEqual({
//     "09:00": {
//       allocations: [
//         {
//           id: "allocation_test",
//           name: "test",
//           timeStart: "09:00",
//           timeEnd: "09:15",
//           ratio: [2, 1],
//           matrix: { "I+": { id: "allocationMatrixTest" } },
//         },
//         {
//           id: "allocation_test",
//           name: "test",
//           timeStart: "09:00",
//           timeEnd: "09:15",
//           ratio: [2, 1],
//           matrix: { "I+": { id: "allocationMatrixTest" } },
//         },
//         {
//           id: "allocation_test",
//           name: "test",
//           timeStart: "09:00",
//           timeEnd: "09:15",
//           ratio: [1, 1],
//           matrix: { "I+": { id: "allocationMatrixTest" } },
//         },
//       ],
//     },
//   });
// });

//#endregion
// ------------------------------------------------------------------------------
// //#region Structure Data Tests
// test("Structure Data Test, EMpty", () => {
//   expect(
//     structureData({
//       allocations: [],
//       assets: [],
//       locations: [],
//     })
//   ).toStrictEqual({
//     allocations: [],
//     assets: [],
//     locations: [],
//   });
// });
// test("Structure Data Test, with data entry error, no blocks", () => {
//   expect(
//     structureData({
//       allocations: [{}],
//       assets: [{}],
//       locations: [{}],
//     })
//   ).toStrictEqual({
//     allocations: [],
//     assets: [],
//     locations: [],
//   });
// });
// test("Structure Data Test, 2 allocation blocks", () => {
//   expect(
//     structureData({
//       allocations: [
//         {
//           name: "test",
//           id: "allocation_test",
//           blocks: [
//             { timeStart: "09:00", timeEnd: "10:00" },
//             { timeStart: "10:00", timeEnd: "11:00" },
//           ],
//         },
//       ],
//       assets: [{}],
//       locations: [{}],
//     })
//   ).toStrictEqual({
//     allocations: [
//       {
//         name: "test",
//         id: "allocation_test",
//         timeStart: "09:00",
//         timeEnd: "10:00",
//       },
//       {
//         name: "test",
//         id: "allocation_test",
//         timeStart: "10:00",
//         timeEnd: "11:00",
//       },
//     ],
//     assets: [],
//     locations: [],
//   });
// });
// test("Structure Data Test, 1 allocation blocks with allocation matrix", () => {
//   expect(
//     structureData({
//       allocations: [
//         {
//           name: "test",
//           id: "allocation_test",
//           matrix: [{ "I+": { id: "i+ID" } }],
//           blocks: [{ timeStart: "10:00", timeEnd: "11:00" }],
//         },
//       ],
//       assets: [{}],
//       locations: [{}],
//     })
//   ).toStrictEqual({
//     allocations: [
//       {
//         matrix: [{ "I+": { id: "i+ID" } }],
//         name: "test",
//         id: "allocation_test",
//         timeStart: "10:00",
//         timeEnd: "11:00",
//       },
//     ],
//     assets: [],
//     locations: [],
//   });
// });
// test("Structure Data Test, 1 allocation blocks with allocation and block matrix, (block matrix overrides allocation matrix)", () => {
//   expect(
//     structureData({
//       allocations: [
//         {
//           name: "test",
//           id: "allocation_test",
//           matrix: [{ "I+": { id: "i+ID" } }],
//           blocks: [
//             {
//               timeStart: "10:00",
//               timeEnd: "11:00",
//               matrix: [{ "I+": { id: "i+ID2" } }],
//             },
//           ],
//         },
//       ],
//       assets: [{}],
//       locations: [{}],
//     })
//   ).toStrictEqual({
//     allocations: [
//       {
//         matrix: [{ "I+": { id: "i+ID2" } }],
//         name: "test",
//         id: "allocation_test",
//         timeStart: "10:00",
//         timeEnd: "11:00",
//       },
//     ],
//     assets: [],
//     locations: [],
//   });
// });
// test("Structure Data Test, allocation ratio 2:1", () => {
//   expect(
//     structureData({
//       allocations: [
//         {
//           name: "test",
//           id: "allocation_test",
//           blocks: [{ timeStart: "09:00", timeEnd: "10:00", ratio: [2, 1] }],
//         },
//       ],
//       assets: [{}],
//       locations: [{}],
//     })
//   ).toStrictEqual({
//     allocations: [
//       {
//         name: "test",
//         id: "allocation_test",
//         timeStart: "09:00",
//         timeEnd: "10:00",
//         ratio: [2, 1],
//       },
//       {
//         ratio: [2, 1],
//         name: "test",
//         id: "allocation_test",
//         timeStart: "09:00",
//         timeEnd: "10:00",
//       },
//     ],
//     assets: [],
//     locations: [],
//   });
// });
// test("Structure Data Test, allocation ratio 1:1", () => {
//   expect(
//     structureData({
//       allocations: [
//         {
//           name: "test",
//           id: "allocation_test",
//           blocks: [{ timeStart: "09:00", timeEnd: "10:00", ratio: [1, 1] }],
//         },
//       ],
//       assets: [{}],
//       locations: [{}],
//     })
//   ).toStrictEqual({
//     allocations: [
//       {
//         name: "test",
//         id: "allocation_test",
//         timeStart: "09:00",
//         timeEnd: "10:00",
//         ratio: [1, 1],
//       },
//     ],
//     assets: [],
//     locations: [],
//   });
// });
// test("Structure Data Test, allocation ratios (b1: [1:2], b2: [2:1])", () => {
//   expect(
//     structureData({
//       allocations: [
//         {
//           name: "test",
//           id: "allocation_test",
//           blocks: [
//             { timeStart: "09:00", timeEnd: "10:00", ratio: [1, 2] },
//             { timeStart: "10:00", timeEnd: "11:00", ratio: [2, 1] },
//           ],
//         },
//       ],
//       assets: [{}],
//       locations: [{}],
//     })
//   ).toStrictEqual({
//     allocations: [
//       {
//         name: "test",
//         id: "allocation_test",
//         timeStart: "09:00",
//         timeEnd: "10:00",
//         ratio: [1, 2],
//       },
//       {
//         name: "test",
//         id: "allocation_test",
//         timeStart: "10:00",
//         timeEnd: "11:00",
//         ratio: [2, 1],
//       },
//       {
//         name: "test",
//         id: "allocation_test",
//         timeStart: "10:00",
//         timeEnd: "11:00",
//         ratio: [2, 1],
//       },
//     ],
//     assets: [],
//     locations: [],
//   });
// });
// //#endregion

// test("assessor test: 1", () => {
//   expect(assesors([() => 1])).toBe(1);
// });
// test("assessor test: 2", () => {
//   expect(assesors([() => 1, () => 2])).toBe(3);
// });
// test("assessor test: 3", () => {
//   expect(assesors([() => 0, () => 2])).toBe(0);
// });
// test("assessor test: 4", () => {
//   expect(assesors([() => false, () => 2])).toBe(0);
// });
// test("assessor test: 5", () => {
//   expect(assesors([() => 4, () => 8])).toBe(12);
// });

// test("1, 2, 3, 4", () => {
//   expect(
//     dateRangeValid(
//       moment("1:00", "HH:mm"),
//       moment("2:00", "HH:mm"),
//       moment("3:00", "HH:mm"),
//       moment("4:00", "HH:mm")
//     )
//   ).toBe(true);
// });
// test("1, 2, 2, 4", () => {
//   expect(
//     dateRangeValid(
//       moment("1:00", "HH:mm"),
//       moment("2:00", "HH:mm"),
//       moment("2:00", "HH:mm"),
//       moment("4:00", "HH:mm")
//     )
//   ).toBe(false);
// });
// test("2, 1, 2, 4", () => {
//   expect(
//     dateRangeValid(
//       moment("2:00", "HH:mm"),
//       moment("1:00", "HH:mm"),
//       moment("2:00", "HH:mm"),
//       moment("4:00", "HH:mm")
//     )
//   ).toBe(false);
// });
// test("1, 2, 5, 4", () => {
//   expect(
//     dateRangeValid(
//       moment("1:00", "HH:mm"),
//       moment("2:00", "HH:mm"),
//       moment("5:00", "HH:mm"),
//       moment("4:00", "HH:mm")
//     )
//   ).toBe(false);
// });
test("1, 1, 1, 1", () => {
  expect(
    dateRangeValid(
      moment("1:00", "HH:mm"),
      moment("1:00", "HH:mm"),
      moment("1:00", "HH:mm"),
      moment("1:00", "HH:mm")
    )
  ).toBe(false);
});
