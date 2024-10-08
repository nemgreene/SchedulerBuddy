import React from "react";
import { Box, Button, Grid } from "@mui/material";
import { Provider, useSelector } from "react-redux";

import { AllocationInterface, NiceNames } from "../utilities/interfaces";
import DayContainer from "./DayContainer";
import { DateSlice } from "../lib/features/DateSlice";
import EntryForm from "../components/Forms/EntryForm";
import EntryDetails from "../components/EntryDetails";

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
    <Grid container sx={{ width: "100vw", p: 2, pt: 1, pb: 1 }}>
      <Grid item xs={12} container>
        {data[stateKey].map((v: AllocationInterface, i: number) => (
          <Grid item xs={12} container key={i}>
            <Grid item xs={3}>
              <EntryDetails entryData={v} />
              {/* <EntryForm variant="add" signature={stateKey} /> */}
              {/* <DayContainer data={v} niceNames={niceNames} /> */}
            </Grid>
            <Grid item xs={9}>
              <DayContainer data={v} niceNames={niceNames} />
            </Grid>
          </Grid>
        ))}
        <Grid item xs={3}>
          <Button fullWidth sx={{ pt: 10, pb: 10 }}>
            Add item
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
