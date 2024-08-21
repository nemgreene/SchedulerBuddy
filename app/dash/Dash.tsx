"use client";
import React from "react";
import TimetableContainer from "../timetable/TimetableContainer";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { DateSlice } from "../Redux/DateSlice";

export default function Dash() {
  return (
    <Box>
      <TimetableContainer stateKey={"allocations"} />
    </Box>
  );
}
