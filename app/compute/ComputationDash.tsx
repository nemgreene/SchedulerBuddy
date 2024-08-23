import React, { useCallback, useEffect, useMemo, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { DateSlice } from "../Redux/DateSlice";
import {
  StructuredData,
  Phenome,
  TimelineData,
  DayInterface,
  KeyInterface,
} from "../utilities/interfaces";
import {
  intializePopulation,
  structureData,
  mutationFunction,
  timelineStructuredData,
  populationSize,
  fitnessFunction,
  crossoverFunction,
  constructFiltered,
} from "./utilities";
import ComputationDisplayTable from "./ComputationDisplayTable";
import { Button } from "@mui/material";
import { setStorePhenome } from "../Redux/PhenomeSlice";

export default function ComputationDash() {
  const dispatch = useDispatch();

  const {
    dates: { data, snapIncrement, timeSlots },
    phenome: { phenome },
  } = useSelector((v: { dates: DateSlice; phenome: Phenome }) => {
    return { phenome: v.phenome, dates: v.dates };
  }, shallowEqual);

  const [filterKey, setFilterKey] = useState<KeyInterface>("allocations");

  const structuredData: StructuredData = structureData(data);
  const timelineData: TimelineData = timelineStructuredData(
    structuredData,
    snapIncrement,
    timeSlots
  );

  const population = [...intializePopulation(timelineData)];
  var config = {
    mutationFunction: (v: Phenome) => mutationFunction(v, timelineData),
    crossoverFunction: (a: Phenome, b: Phenome) =>
      crossoverFunction(a, b, timelineData),
    fitnessFunction: (v: Phenome) => {
      const fitness = fitnessFunction(v);
      return fitness;
    },
    // doesABeatBFunction: (a, b) => {
    //   console.log(a, b);
    // },
    // population: () => [...intializePopulation(timelineData)],
    population,
    populationSize: populationSize, // defaults to 10
  };
  var GeneticAlgorithmConstructor = require("geneticalgorithm");
  var geneticalgorithm = GeneticAlgorithmConstructor(config);

  const handleEvolve = () => {
    // for (let count = 0; count < 50; count++) {
    // console.log(count);
    // geneticalgorithm.evolve();
    // }
    console.log(geneticalgorithm.bestScore());
    dispatch(
      setStorePhenome({
        phenome: constructFiltered(geneticalgorithm.best(), filterKey),
      })
    );
  };

  const updateFilter = (key) => {
    dispatch(
      setStorePhenome({
        phenome: constructFiltered(geneticalgorithm.best(), key),
      })
    );
  };

  return (
    <div>
      <Button onClick={() => handleEvolve()}>Click</Button>
      <ComputationDisplayTable
        phenome={phenome}
        updateFilter={updateFilter}
        filterKey={filterKey}
        setFilterKey={setFilterKey}
      />
    </div>
  );
}
