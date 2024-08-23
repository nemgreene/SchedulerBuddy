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
import type { ReactDOMAttributes } from "@use-gesture/react/dist/declarations/src/types";

export default function DayAperture({
  disabled = false,
  children,
}: {
  disabled: boolean;
  children: JSX.Element;
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

  /** Converts mouseX position relative to container to a pixel snap increment
   * Used to control the Xtranslate of the labelSpring
   *
   * @param mouseX {number} MouseX position relative to container
   * @param width {number} WIdth of container
   * @returns {number} Snapped Pixel value
   */
  function extractStep(
    mouseX: number,
    width: number = bounds.width,
    offset: number = 0
  ) {
    return Math.floor(round(mouseX, width / (timeSlots.length - 1), offset));
  }

  /**Converts mouseX position relative to container to an index snap increment
   * Used to control the contents of the labelSpring
   *
   * @param mouseX {number} MouseX position relative to container
   * @param width {number} WIdth of container
   * @returns {number} Snapped index value
   */
  function extractIndex(mouseX: number, width: number = bounds.width) {
    return (
      clamp(
        round((mouseX / width) * (timeSlots.length - 1), 1, 0),
        0,
        timeSlots.length
      ) + 1
    );
  }

  const offset = (bounds.width / timeSlots.length) * -0.5;

  const handleMove = (e) => {
    let [mouseX, mouseY] = e.values;

    const step = extractStep(mouseX - bounds.left);
    let index: number = extractIndex(mouseX - bounds.left);

    setSteppedTime(timeSlots[index - 1] || startTime);
    labelApi.start({
      immediate: true,
      x: clamp(step, 0, bounds.width),
    });

    if (!isNaN(dragging)) {
      let start = selectorSpring.x.get();

      let localMousePos = clamp(
        Math.floor(
          extractStep(
            mouseX - bounds.left,
            bounds.width,
            (bounds.width / timeSlots.length) * -0.5
          )
        ),
        offset,
        bounds.width
      );
      if (localMousePos < dragging) {
        selectorApi.start({
          immediate: true,
          x: localMousePos - 1,
          width: Math.floor(dragging - localMousePos),
        });
      } else if (localMousePos === dragging) {
        selectorApi.start({
          immediate: true,
          x: localMousePos,
          width: 0,
        });
      } else {
        selectorApi.start({
          immediate: true,
          width: clamp(
            extractStep(step - start),
            0,
            bounds.width - dragging + offset
          ),
          x: Math.floor(dragging) - 1,
          config: { tension: 210, friction: 20 },
        });
      }
    }
  };

  const handleDragStart = (e) => {
    let [mouseX, ...rest] = e.values;
    setDragging(
      Math.floor(extractStep(mouseX - bounds.left, bounds.width, offset))
    );

    selectorApi.start({
      x: Math.floor(extractStep(mouseX - bounds.left, bounds.width, offset)),
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
  ) as unknown as (...args: any[]) => ReactDOMAttributes;

  return (
    <Box
      {...bindMove()}
      sx={{
        // border: "1px solid black",
        width: "70vw",
        // overflow: "hidden",
        p: 0,
        m: 0,
        ml: 10,
        touchAction: "none",
        flex: 1,
        position: "relative",
        height: "100%",
        borderRight: "1px solid grey",
        borderLeft: "1px solid grey",
      }}
      ref={ref}
      className="DayApertureContainer"
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
      <animated.div
        className={"labelSpringContainer"}
        style={{
          // ...labelSpring,
          opacity: { ...labelSpring }.opacity,
          transform: labelSpring.x.to(
            (x) => `translate3d(calc(${x}px - 50%), -100%, 0)`
          ),
          width: `${bounds.width / timeSlots.length}px`,
          display: "flex",
          justifyContent: "center",
          position: "absolute",
          zIndex: 100,
        }}
      >
        {steppedTime.format("HH:mm")}
      </animated.div>
      {/* <Box sx={{ flex: 1 }}> */}
      {/* <Box sx={{ position: "absolute", height: "100%" }}>{children}</Box> */}
      <Box
        className="DayApertureChild"
        sx={{ zIndex: 10, position: "relative", height: "100%" }}
      >
        {children}
      </Box>
      <Box
        className="DayApertureGrid"
        sx={{ position: "absolute", width: "100%", top: 0, height: "100%" }}
      >
        <DayTable timeSlots={timeSlots} />
      </Box>

      <Box
        sx={{
          alignContent: "flex-start",
          flexDirection: "column",
          display: "flex",
        }}
      ></Box>
    </Box>
  );
}
