import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState, memo } from "react";
import { useSelector } from "react-redux";
import { DateSlice } from "../lib/features/DateSlice";
import {
  AllocationBlockInterface,
  DayCardVariant,
  MartrixChildInterface,
  NiceNames,
} from "../utilities/interfaces";
import { green } from "@mui/material/colors";
import { extractNameFromId } from "../utilities/utilities";
import MatrixTable from "../components/MatrixTable";

interface DayCardProps {
  data: AllocationBlockInterface;
  variant: DayCardVariant;
  niceNames: NiceNames[];
  yOffset?: number;
  height?: number;
}

export default memo(function DayCard({
  data,
  variant = "default",
  yOffset = 0,
  height = 0,
}: DayCardProps) {
  const { startTime, endTime } = useSelector((v: { dates: DateSlice }) => {
    return v.dates;
  });

  const dims = (
    timeStart: string | moment.Moment,
    timeEnd: string | moment.Moment
  ): { elapsed: number; duration: number; width: number; ml: number } => {
    const totalMinutes = endTime.diff(startTime, "minutes");
    const [localStartTime, localEndTime] = [
      moment(timeStart, "HH:mm"),
      moment(timeEnd, "HH:mm"),
    ];

    const elapsed = localStartTime.diff(startTime, "minutes");
    const duration = localEndTime.diff(localStartTime, "minutes");
    const width = (duration / totalMinutes) * 100;
    const elapsedWidth = (elapsed / totalMinutes) * 100;

    return {
      elapsed,
      duration,
      ml: (elapsedWidth / width) * 100,
      width,
    };
  };

  const cardDimensions = dims(data.timeStart, data.timeEnd);

  return (
    <Box
      className="dayCardContainer"
      sx={{
        touchAction: "none",
        userSelect: "none",
        position: "absolute",
        bgcolor: (t) => t.palette.secondary.main,
        display: "flex",
        flexDirection: "row",
        borderRadius: "10px",
        overflow: "hidden",
        width: `${cardDimensions.width}%`,
        transform: `translate(${cardDimensions.ml}%, ${yOffset}%)`,
        height: height ? `${height}%` : "100%",
      }}
    >
      <Box
        sx={{
          order: 1,
          width: "10px",
          bgcolor: (t) => t.palette.primary.main,
        }}
      >
        l
      </Box>
      <Box
        sx={{
          order: 3,
          width: "10px",
          bgcolor: (t) => t.palette.primary.main,
        }}
      >
        r
      </Box>
      <Box sx={{ flex: 1, order: 2, flexDirection: "column" }}>
        {variant !== "compact" && (
          <Box
            sx={{ display: "flex", flexDirection: "row", p: 1, pt: 0, pb: 0 }}
          >
            <Typography variant={"subtitle1"}>
              {moment.isMoment(data.timeStart)
                ? data.timeStart.format("HH:mm")
                : data.timeStart}
            </Typography>
            <Typography variant={"subtitle1"} sx={{ flex: 1 }}></Typography>
            <Typography variant={"subtitle1"}>
              {moment.isMoment(data.timeEnd)
                ? data.timeEnd.format("HH:mm")
                : data.timeEnd}
            </Typography>
          </Box>
        )}

        {data.name}
        {variant !== "compact" && (
          <Box
            sx={{ display: "flex", flexDirection: "row", flexWrap: "nowrap" }}
          >
            <MatrixTable matrix={data.matrix} />
          </Box>
        )}
      </Box>
    </Box>
  );
});
