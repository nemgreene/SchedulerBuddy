"use client";
import { Box, Button, Grid } from "@mui/material";
import React from "react";
import TimetableContainer from "../timetable/TimetableContainer";
import { Provider, useSelector } from "react-redux";
import { store } from "../Redux/store";
import { DateSlice } from "../lib/features/DateSlice";
import ComputationDash from "./ComputationDash";

export default function page() {
  return (
    <Provider store={store}>
      <ComputationDash />
    </Provider>
  );
}
