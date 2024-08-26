import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { Phenome } from "../../utilities/interfaces";

export interface PhenomeSlice {
  phenome: {};
}

const initialState: PhenomeSlice = {
  phenome: {},
};

export const phenomeSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setStorePhenome: (
      state,
      action: PayloadAction<{
        phenome: {};
      }>
    ) => {
      state.phenome = action.payload.phenome;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setStorePhenome } = phenomeSlice.actions;

export default phenomeSlice.reducer;
