import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "./counterSlice";
import moment from "moment";
import { updateTimes } from "./DateSlice";

export function Counter() {
  const date = useSelector((state) => state.dates.startTime);
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <button
          // aria-label="Increment value"
          onClick={() =>
            dispatch(updateTimes({ key: "startTime", time: moment() }))
          }
        >
          Increment
        </button>
        {date?.format("HH:mm")}
      </div>
    </div>
  );
}
