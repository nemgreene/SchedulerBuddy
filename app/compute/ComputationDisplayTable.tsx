"use client";

import React, { useState } from "react";
import {
  Phenome,
  PhenomeBlock,
  ComputeInterface,
  AllocationBlockInterface,
  KeyInterface,
} from "../utilities/interfaces";
import { Grid } from "@mui/material";
import DayContainer from "../timetable/DayContainer";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
// import { constructFiltered } from "./utilities";

export default function ComputationDisplayTable({
  phenome,
}: {
  phenome: Phenome;
}) {
  const [filterKey, setFilterKey] = useState<KeyInterface>("allocations");

  const constructFiltered = (
    phenome: Phenome,
    key: KeyInterface,
    test: boolean = false
  ) => {
    const keys = ["assets", "allocations", "locations"];

    console.log(phenome);
    //flatten data into single array
    let timeSteps = Object.keys(phenome);
    const flat = timeSteps
      .reduce((acc, curr) => [...acc, ...phenome[curr]], [])
      .map((v) => v)
      .sort((a, b) => (a.name > b.name ? 1 : -1));
    //get unique Assets/Allocations/Locations
    const uniqueKey = Array.from(new Set(flat.map((v) => v[key].name)));

    //Construct dict for referencing, removing duplicates created by elevated ratio
    const ret: { [key: KeyInterface]: AllocationBlockInterface[] } | {} = {};
    uniqueKey.forEach((keyName) => {
      ret[keyName] = {};
      keys.forEach((localKeyname) => {
        ret[keyName][localKeyname] = Array.from(
          new Set(
            flat
              .filter((v) => v[key].name === keyName)
              .map((v) => JSON.stringify(v[localKeyname]))
          )
        )
          .map((v) => JSON.parse(v))
          //find concurrent time blocks and reduce down
          .reduce((acc, curr) => {
            const prev = { ...acc.slice(-1)[0] } || undefined;
            const {
              timeStart: prevTimeStart,
              timeEnd: prevTimeEnd,
              ...prevRest
            } = prev;
            const {
              timeStart: currTimeStart,
              timeEnd: currTimeEnd,
              ...currRest
            } = curr;

            if (
              prev &&
              prevTimeEnd === currTimeStart &&
              JSON.stringify(prevRest) == JSON.stringify(currRest)
            ) {
              const ret = [
                ...acc.slice(0, -1),
                { ...prev, timeEnd: currTimeEnd },
              ];
              return ret;
            }
            return [...acc, curr];
          }, []);
      });
    });
    console.log(ret);
    if (test) {
      return ret;
    }

    return Object.keys(ret).map((name, i) => {
      return (
        <Grid item container xs={12} key={i}>
          <Grid item xs={12}>
            {name}
          </Grid>
          {keys.map((keyName, index) => {
            return Array.from(
              new Set(ret[name][keyName].map((v) => v.name))
            ).map((rowName, index) => {
              // console.log(name, rowName, keyName, ret[name][keyName]);
              const blocks = ret[name][keyName].filter(
                (v) => v.name === rowName
              );
              console.log(rowName, keyName, blocks);
              return (
                <DayContainer
                  key={index}
                  disabled={true}
                  data={{
                    blocks,
                  }}
                  niceNames={[]}
                />
              );
            });
          })}
        </Grid>
      );
    });
  };
  // constructFiltered(phenome, filterKey);
  const testPhenome = {
    "09:00": [
      {
        allocations: {
          name: "Rayan",
          id: "allocation_rayyan",
          ratio: [1, 2],
          timeStart: "09:00",
          timeEnd: "09:15",
          headCount: 8,
          matrix: {
            "I+": [],
            "I-": [],
            "P+": [
              { id: "asset_cameron", name: "Cameron" },
              { id: "asset_riley", name: "Riley" },
              { id: "location_amex", name: "Amex" },
            ],
            "P-": [],
          },
        },
        locations: {
          name: "Amex",
          id: "location_amex",
          timeStart: "09:00",
          timeEnd: "09:15",
          capacity: 10,
          matrix: { "I+": [], "I-": [], "P+": [], "P-": [] },
        },
        assets: {
          name: "Cameron",
          id: "asset_cameron",
          timeStart: "09:00",
          timeEnd: "09:15",
          matrix: {
            "I+": [],
            "I-": [],
            "P+": [{ id: "allocation_rayyan", name: "Rayan" }],
            "P-": [],
          },
        },
      },
      {
        allocations: {
          name: "Rayan",
          id: "allocation_rayyan",
          ratio: [1, 2],
          timeStart: "09:00",
          timeEnd: "09:15",
          headCount: 8,
          matrix: {
            "I+": [],
            "I-": [],
            "P+": [
              { id: "asset_cameron", name: "Cameron" },
              { id: "asset_riley", name: "Riley" },
              { id: "location_amex", name: "Amex" },
            ],
            "P-": [],
          },
        },
        locations: {
          name: "Amex",
          id: "location_amex",
          timeStart: "09:00",
          timeEnd: "09:15",
          capacity: 10,
          matrix: { "I+": [], "I-": [], "P+": [], "P-": [] },
        },
        assets: {
          name: "Walker",
          id: "asset_walker",
          timeStart: "09:00",
          timeEnd: "09:15",
          matrix: {
            "I+": [],
            "I-": [],
            "P+": [{ id: "allocation_nkhaius", name: "N'khaius" }],
            "P-": [],
          },
        },
      },
      {
        allocations: {
          name: "Rayan",
          id: "allocation_rayyan",
          ratio: [1, 2],
          timeStart: "09:00",
          timeEnd: "09:15",
          headCount: 8,
          matrix: {
            "I+": [],
            "I-": [],
            "P+": [
              { id: "asset_cameron", name: "Cameron" },
              { id: "asset_riley", name: "Riley" },
              { id: "location_amex", name: "Amex" },
            ],
            "P-": [],
          },
        },
        locations: {
          name: "Amex",
          id: "location_amex",
          timeStart: "09:00",
          timeEnd: "09:15",
          capacity: 10,
          matrix: { "I+": [], "I-": [], "P+": [], "P-": [] },
        },
        assets: {
          name: "Cameron",
          id: "asset_cameron",
          timeStart: "09:00",
          timeEnd: "09:15",
          matrix: {
            "I+": [],
            "I-": [],
            "P+": [{ id: "allocation_rayyan", name: "Rayan" }],
            "P-": [],
          },
        },
      },
    ],
    "09:15": [
      {
        allocations: {
          name: "Rushani",
          id: "allocation_rushani",
          headCount: 2,
          ratio: [2, 1],
          timeStart: "09:15",
          timeEnd: "09:30",
          matrix: {
            "I+": [],
            "I-": [],
            "P+": [
              { id: "asset_obrien", name: "O'Brien" },
              { id: "asset_riley", name: "Riley" },
              { id: "location_y6", name: "Y6" },
            ],
            "P-": [],
          },
        },
        locations: {
          name: "Amex",
          id: "location_amex",
          timeStart: "09:15",
          timeEnd: "09:30",
          capacity: 10,
          matrix: { "I+": [], "I-": [], "P+": [], "P-": [] },
        },
        assets: {
          name: "Riley",
          id: "asset_riley",
          timeStart: "09:15",
          timeEnd: "09:30",
          matrix: {
            "I+": [],
            "I-": [],
            "P+": [{ id: "allocation_rayyan", name: "Rayan" }],
            "P-": [],
          },
        },
      },
      {
        allocations: {
          name: "Rushani",
          id: "allocation_rushani",
          headCount: 2,
          ratio: [2, 1],
          timeStart: "09:15",
          timeEnd: "09:30",
          matrix: {
            "I+": [],
            "I-": [],
            "P+": [
              { id: "asset_obrien", name: "O'Brien" },
              { id: "asset_riley", name: "Riley" },
              { id: "location_y6", name: "Y6" },
            ],
            "P-": [],
          },
        },
        locations: {
          name: "ICT",
          id: "location_ICT",
          capacity: 8,
          timeStart: "09:15",
          timeEnd: "09:30",
          matrix: { "I+": [], "I-": [], "P+": [], "P-": [] },
        },
        assets: {
          name: "Riley",
          id: "asset_riley",
          timeStart: "09:15",
          timeEnd: "09:30",
          matrix: {
            "I+": [],
            "I-": [],
            "P+": [{ id: "allocation_rayyan", name: "Rayan" }],
            "P-": [],
          },
        },
      },
      {
        allocations: {
          name: "Rayan",
          id: "allocation_rayyan",
          ratio: [1, 2],
          timeStart: "09:15",
          timeEnd: "09:30",
          headCount: 8,
          matrix: {
            "I+": [],
            "I-": [],
            "P+": [
              { id: "asset_cameron", name: "Cameron" },
              { id: "asset_riley", name: "Riley" },
              { id: "location_amex", name: "Amex" },
            ],
            "P-": [],
          },
        },
        locations: {
          name: "ICT",
          id: "location_ICT",
          capacity: 8,
          timeStart: "09:15",
          timeEnd: "09:30",
          matrix: { "I+": [], "I-": [], "P+": [], "P-": [] },
        },
        assets: {
          name: "Cameron",
          id: "asset_cameron",
          timeStart: "09:15",
          timeEnd: "09:30",
          matrix: {
            "I+": [],
            "I-": [],
            "P+": [{ id: "allocation_rayyan", name: "Rayan" }],
            "P-": [],
          },
        },
      },
    ],
    "09:30": [
      {
        allocations: {
          name: "Rayan",
          id: "allocation_rayyan",
          ratio: [1, 2],
          timeStart: "09:30",
          timeEnd: "09:45",
          headCount: 8,
          matrix: {
            "I+": [],
            "I-": [],
            "P+": [
              { id: "asset_cameron", name: "Cameron" },
              { id: "asset_riley", name: "Riley" },
              { id: "location_amex", name: "Amex" },
            ],
            "P-": [],
          },
        },
        locations: {
          name: "Amex",
          id: "location_amex",
          timeStart: "09:30",
          timeEnd: "09:45",
          capacity: 10,
          matrix: { "I+": [], "I-": [], "P+": [], "P-": [] },
        },
        assets: {
          name: "Walker",
          id: "asset_walker",
          timeStart: "09:30",
          timeEnd: "09:45",
          matrix: {
            "I+": [],
            "I-": [],
            "P+": [{ id: "allocation_nkhaius", name: "N'khaius" }],
            "P-": [],
          },
        },
      },
      {
        allocations: {
          name: "Rushani",
          id: "allocation_rushani",
          headCount: 2,
          ratio: [2, 1],
          timeStart: "09:30",
          timeEnd: "09:45",
          matrix: {
            "I+": [],
            "I-": [],
            "P+": [
              { id: "asset_obrien", name: "O'Brien" },
              { id: "asset_riley", name: "Riley" },
              { id: "location_y6", name: "Y6" },
            ],
            "P-": [],
          },
        },
        locations: {
          name: "Amex",
          id: "location_amex",
          timeStart: "09:30",
          timeEnd: "09:45",
          capacity: 10,
          matrix: { "I+": [], "I-": [], "P+": [], "P-": [] },
        },
        assets: {
          name: "Riley",
          id: "asset_riley",
          timeStart: "09:30",
          timeEnd: "09:45",
          matrix: {
            "I+": [],
            "I-": [],
            "P+": [{ id: "allocation_rayyan", name: "Rayan" }],
            "P-": [],
          },
        },
      },
      {
        allocations: {
          name: "Rayan",
          id: "allocation_rayyan",
          ratio: [1, 2],
          timeStart: "09:30",
          timeEnd: "09:45",
          headCount: 8,
          matrix: {
            "I+": [],
            "I-": [],
            "P+": [
              { id: "asset_cameron", name: "Cameron" },
              { id: "asset_riley", name: "Riley" },
              { id: "location_amex", name: "Amex" },
            ],
            "P-": [],
          },
        },
        locations: {
          name: "Amex",
          id: "location_amex",
          timeStart: "09:30",
          timeEnd: "09:45",
          capacity: 10,
          matrix: { "I+": [], "I-": [], "P+": [], "P-": [] },
        },
        assets: {
          name: "Walker",
          id: "asset_walker",
          timeStart: "09:30",
          timeEnd: "09:45",
          matrix: {
            "I+": [],
            "I-": [],
            "P+": [{ id: "allocation_nkhaius", name: "N'khaius" }],
            "P-": [],
          },
        },
      },
    ],
    "09:45": [
      {
        allocations: {
          name: "Rayan",
          id: "allocation_rayyan",
          ratio: [1, 2],
          timeStart: "09:45",
          timeEnd: "10:00",
          headCount: 8,
          matrix: {
            "I+": [],
            "I-": [],
            "P+": [
              { id: "asset_cameron", name: "Cameron" },
              { id: "asset_riley", name: "Riley" },
              { id: "location_amex", name: "Amex" },
            ],
            "P-": [],
          },
        },
        locations: {
          name: "Hive",
          id: "location_hive",
          timeStart: "09:45",
          timeEnd: "10:00",
          capacity: 8,
          matrix: { "I+": [], "I-": [], "P+": [], "P-": [] },
        },
        assets: {
          name: "Walker",
          id: "asset_walker",
          timeStart: "09:45",
          timeEnd: "10:00",
          matrix: {
            "I+": [],
            "I-": [],
            "P+": [{ id: "allocation_nkhaius", name: "N'khaius" }],
            "P-": [],
          },
        },
      },
      {
        allocations: {
          name: "Rushani",
          id: "allocation_rushani",
          headCount: 2,
          ratio: [2, 1],
          timeStart: "09:45",
          timeEnd: "10:00",
          matrix: {
            "I+": [],
            "I-": [],
            "P+": [
              { id: "asset_obrien", name: "O'Brien" },
              { id: "asset_riley", name: "Riley" },
              { id: "location_y6", name: "Y6" },
            ],
            "P-": [],
          },
        },
        locations: {
          name: "ICT",
          id: "location_ICT",
          capacity: 8,
          timeStart: "09:45",
          timeEnd: "10:00",
          matrix: { "I+": [], "I-": [], "P+": [], "P-": [] },
        },
        assets: {
          name: "Cameron",
          id: "asset_cameron",
          timeStart: "09:45",
          timeEnd: "10:00",
          matrix: {
            "I+": [],
            "I-": [],
            "P+": [{ id: "allocation_rayyan", name: "Rayan" }],
            "P-": [],
          },
        },
      },
      {
        allocations: {
          name: "Rushani",
          id: "allocation_rushani",
          headCount: 2,
          ratio: [2, 1],
          timeStart: "09:45",
          timeEnd: "10:00",
          matrix: {
            "I+": [],
            "I-": [],
            "P+": [
              { id: "asset_obrien", name: "O'Brien" },
              { id: "asset_riley", name: "Riley" },
              { id: "location_y6", name: "Y6" },
            ],
            "P-": [],
          },
        },
        locations: {
          name: "ICT",
          id: "location_ICT",
          capacity: 8,
          timeStart: "09:45",
          timeEnd: "10:00",
          matrix: { "I+": [], "I-": [], "P+": [], "P-": [] },
        },
        assets: {
          name: "Riley",
          id: "asset_riley",
          timeStart: "09:45",
          timeEnd: "10:00",
          matrix: {
            "I+": [],
            "I-": [],
            "P+": [{ id: "allocation_rayyan", name: "Rayan" }],
            "P-": [],
          },
        },
      },
    ],
  };
  return (
    <Grid container>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Filter</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={filterKey}
          label="Age"
          onChange={(v) => setFilterKey(v.target.value as string)}
        >
          <MenuItem value={"assets"}>assets</MenuItem>
          <MenuItem value={"allocations"}>allocations</MenuItem>
          <MenuItem value={"locations"}>locations</MenuItem>
        </Select>
      </FormControl>
      {constructFiltered(testPhenome, filterKey)}
      {/* {data[stateKey].map((v: AllocationInterface, i: number) => (
      ))} */}
    </Grid>
  );
}
