import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DateSlice } from "../Redux/DateSlice";
import { StructuredData, Phenome, TimelineData } from "../utilities/interfaces";
import {
  intializePopulation,
  structureData,
  mutationFunction,
  timelineStructuredData,
  populationSize,
  fitnessFunction,
  crossoverFunction,
} from "./utilities";
import ComputationDisplayTable from "./ComputationDisplayTable";

export default function ComputationDash() {
  const [phenome, setPhenome] = useState<Phenome>({});

  const { data, timeSlots, snapIncrement } = useSelector(
    (v: { dates: DateSlice }) => {
      return v.dates;
    }
  );

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
    // console.log(geneticalgorithm.bestScore());
    // geneticalgorithm.evolve();
    // geneticalgorithm.evolve();
    for (var loop = 1; loop <= 100; loop++) {
      geneticalgorithm.evolve();
    }
    // console.log(geneticalgorithm.best());
    // console.log(geneticalgorithm.bestScore());
    // console.log(timelineDestructuredData(geneticalgorithm.best()));
    const best: Phenome = geneticalgorithm.best();
    setPhenome(best);
  };
  useEffect(() => {
    handleEvolve();
  }, []);

  return (
    <div>
      <ComputationDisplayTable phenome={phenome} />
    </div>
  );
}
