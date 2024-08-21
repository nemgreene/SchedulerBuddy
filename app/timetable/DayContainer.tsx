"use client";
import { Box, Divider, Grid } from "@mui/material";
import React from "react";
import moment from "moment";

import {
  AllocationBlockInterface,
  AllocationInterface,
  ComputeInterface,
  NiceNames,
  Phenome,
  PhenomeBlock,
} from "../utilities/interfaces";
import DayAperture from "./DayAperture";
import DayCard from "./DayCard";
import { useSelector } from "react-redux";
import { DateSlice } from "../Redux/DateSlice";

export default function DayContainer({
  data,
  niceNames,
  disabled,
}: {
  data: AllocationInterface | { blocks: PhenomeBlock[]; name?: string };
  niceNames: NiceNames[];
  disabled: boolean;
}) {
  const { startTime, endTime } = useSelector((v: { dates: DateSlice }) => {
    return v.dates;
  });

  const { name, blocks } = data;

  return (
    <Box
      sx={{
        position: "relative",
        // overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        width: "75vw",
      }}
    >
      {name}

      <Box
        sx={{
          flexWrap: "nowrap",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          position: "relative",
          height: "100px",
        }}
      >
        {blocks?.map((v, i, a) => {
          if (v.allocations && v.assets && v.locations) {
            return (
              <React.Fragment key={i}>
                <DayCard
                  key={i}
                  data={v.allocations}
                  niceNames={niceNames}
                  height={100 / 3}
                />
                <DayCard
                  data={v.locations}
                  niceNames={niceNames}
                  height={100 / 3}
                  yOffset={100}
                />
                <DayCard
                  data={v.assets}
                  niceNames={niceNames}
                  height={100 / 3}
                  yOffset={200}
                />
              </React.Fragment>
            );
          }
          return <DayCard key={i} data={v} niceNames={niceNames} />;
        })}
      </Box>
      {/* <DayAperture disabled={disabled} /> */}
      <Divider />
    </Box>
  );
}
