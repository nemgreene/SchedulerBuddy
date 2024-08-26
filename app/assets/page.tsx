"use client";

import { Box, Grid } from "@mui/material";
import React from "react";
import TimetableContainer from "../timetable/TimetableContainer";
import { Provider, useSelector } from "react-redux";
import { store } from "../Redux/store";
import { DateSlice } from "../lib/features/DateSlice";

export default function page() {
  return (
    <Provider store={store}>
      <TimetableContainer stateKey={"assets"} />
    </Provider>
  );
}
