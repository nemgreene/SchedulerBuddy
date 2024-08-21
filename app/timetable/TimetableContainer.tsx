import React from "react";
import { Box, Grid } from "@mui/material";
import { Provider, useSelector } from "react-redux";

import { AllocationInterface, NiceNames } from "../utilities/interfaces";
import DayContainer from "./DayContainer";
import { DateSlice } from "../Redux/DateSlice";

export default function TimetableContainer({ stateKey }: { stateKey: string }) {
  const { data } = useSelector((v: { dates: DateSlice }) => {
    return v.dates;
  });

  const niceNames: NiceNames[] = [
    ...data.allocations,
    ...data.assets,
    ...data.locations,
  ].map((v: NiceNames) => ({ name: v.name, id: v.id }));

  return (
    <Grid container>
      {data[stateKey].map((v: AllocationInterface, i: number) => (
        <Grid item xs={12} key={i}>
          <DayContainer data={v} niceNames={niceNames} />
        </Grid>
      ))}
    </Grid>
  );
}
