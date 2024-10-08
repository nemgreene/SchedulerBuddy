import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import * as moment from "moment";
import { extendMoment } from "moment-range";
import { DayInterface } from "../../utilities/interfaces";
import data from "../../utilities/dummyDataTesting01.json";
// import data from "../utilities/dummyData.json";
const extendedMoment = extendMoment(moment);

export interface DateSlice {
  startTime: moment.Moment;
  endTime: moment.Moment;
  snapIncrement: number;
  timeSlots: Array<moment.Moment>;
  value: number;
  data: DayInterface;
}

const initialState: DateSlice = {
  value: 1,
  startTime: extendedMoment("9:00", "HH:mm"),
  endTime: extendedMoment("15:00", "HH:mm"),
  snapIncrement: 15,
  timeSlots: Array.from(
    extendedMoment
      .range(extendedMoment("9:00", "HH:mm"), extendedMoment("15:00", "HH:mm"))
      .by("minutes", { step: 15 })
  ),
  data: data,
};

export const dateSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    updateTimes: (
      state,
      action: PayloadAction<{
        time: moment.Moment;
        key: "startTime" | "endTime";
      }>
    ) => {
      state[action.payload.key] = action.payload.time;
      state.timeSlots = Array.from(
        extendedMoment
          .range(state.startTime, state.endTime)
          .by("minutes", { step: 15 })
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateTimes } = dateSlice.actions;

export default dateSlice.reducer;
