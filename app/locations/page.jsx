"use client";
import { Box, Button, Grid } from "@mui/material";
import React from "react";
import TimetableContainer from "../timetable/TimetableContainer";
import { Provider, useSelector } from "react-redux";
import { store } from "../Redux/store";

export default function page() {
  return (
    <Provider store={store}>
      <TimetableContainer stateKey={"locations"} />
    </Provider>
  );
}
