"use client";

import { Box } from "@mui/material";
import React from "react";
import moment from "moment";
import { useGesture } from "@use-gesture/react";
import { animated, useSpring } from "@react-spring/web";
import useMeasure from "react-use-measure";
import { useSelector } from "react-redux";
import { DateSlice } from "../Redux/DateSlice";
import DayTable from "./DayTable";

export default function DayAperture({
  disabled = false,
}: {
  disabled: boolean;
}) {
  const { timeSlots, startTime, endTime } = useSelector(
    (v: { dates: DateSlice }) => v.dates
  );

  const [steppedTime, setSteppedTime] = React.useState<moment.Moment>(moment());
  const [dragging, setDragging] = React.useState<number | undefined>(undefined);

  const [ref, bounds] = useMeasure();

  const [labelSpring, labelApi] = useSpring(() => ({
    x: bounds.width / 2,
    opacity: 0,
  }));
  const [selectorSpring, selectorApi] = useSpring(() => ({
    x: 0,
    y: 50,
    width: 0,
  }));

  const round = (number: number, increment: number, offset: number): number => {
    return Math.round(number / increment) * increment + offset;
  };
  function clamp(number, min, max) {
    return Math.max(min, Math.min(number, max));
  }

  function extractStep(x: number, width: number = bounds.width) {
    let offset: number = (width / timeSlots.length) * -1;
    // offset =
    let increment: number = width / timeSlots.length;
    let step: number = round(x, increment, offset);
    return step;
  }
  function extractIndex(mouseX: number, width: number = bounds.width) {
    return clamp(
      round((mouseX / width) * timeSlots.length, 1, 0),
      0,
      timeSlots.length
    );
  }

  const handleMove = (e) => {
    let [mouseX, mouseY] = e.values;
    // const step = extractStep(mouseX + bounds.width / (timeSlots.length * 2));
    // let index: number = extractIndex(
    //   mouseX + bounds.width / (timeSlots.length * 2)
    // );
    const step = extractStep(mouseX);
    let index: number = extractIndex(mouseX);

    setSteppedTime(timeSlots[index - 1] || startTime);
    labelApi.start({
      immediate: true,
      x: clamp(
        step,
        0,
        (bounds.width / timeSlots.length) * (timeSlots.length - 1)
      ),
    });

    if (!isNaN(dragging)) {
      let start = selectorSpring.x.get();
      // selectorApi.start();
      if (extractStep(mouseX) < dragging) {
        selectorApi.start({
          immediate: true,
          x: extractStep(mouseX),
          width: dragging - extractStep(mouseX),
        });
      } else if (extractStep(mouseX) === dragging) {
        selectorApi.start({
          immediate: true,
          x: extractStep(mouseX),
          width: 0,
        });
      } else {
        selectorApi.start({
          immediate: true,
          width: extractStep(mouseX - start),
          config: { tension: 210, friction: 20 },
        });
      }
    }
  };

  const handleDragStart = (e) => {
    let [mouseX, ...rest] = e.values;
    setDragging(extractStep(mouseX));
    selectorApi.start({
      x: extractStep(mouseX),
      width: 0,
      immediate: true,
    });
  };

  const handleDragEnd = (e) => {
    setDragging(undefined);
  };

  const bindMove = useGesture(
    disabled
      ? {}
      : {
          onDragStart: handleDragStart,
          onDragEnd: handleDragEnd,
          onMove: handleMove,
          onHover: ({ hovering }) => {
            labelApi.start({ opacity: hovering ? 1 : 0 });
            // labelApi.start({ opacity: hovering ? 1 : 1 });
          },
        }
  );

  return (
    <Box
      {...bindMove()}
      sx={{
        border: "1px solid black",
        width: "100%",
        overflow: "hidden",
        p: 0,
        m: 0,
        touchAction: "none",
        flex: 1,
      }}
      ref={ref}
    >
      <animated.div
        style={{
          position: "absolute",
          padding: 0,
          overflow: "hidden",
          backgroundColor: "red",
          borderRadius: "5px",
          zIndex: "10",
          height: "100%",

          ...selectorSpring,
          x: selectorSpring.x.to(
            (v) => bounds.width / (timeSlots.length * 2) + v
          ),
        }}
      >
        selection
      </animated.div>
      <Box
        sx={{
          alignContent: "flex-start",
          flexDirection: "column",
          display: "flex",
        }}
      >
        <Box>
          <animated.div
            style={{
              ...labelSpring,
              width: `${bounds.width / timeSlots.length}px`,
              display: "flex",
              justifyContent: "center",
            }}
          >
            {steppedTime.format("HH:mm")}
          </animated.div>
        </Box>
        <Box sx={{ flex: 1 }}>{/* <DayTable timeSlots={timeSlots} /> */}</Box>
      </Box>
    </Box>
  );
}
