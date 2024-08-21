import moment from "moment";

// allocations required
type ratioArray = [number, number];

export const matrixSymbols = {
  "I+": "Must Have",
  "P+": "Prefers To Have",
  "I-": "Must Not Have",
  "P-": "Pfreferst Not Have",
};

export interface MartrixChildInterface {
  name: string;
  id: string;
}

export type KeyInterface = "assets" | "allocations" | "locations" | string;

export interface MatrixInterface {
  "I+": MartrixChildInterface[];
  "P+": MartrixChildInterface[];
  "I-": MartrixChildInterface[];
  "P-": MartrixChildInterface[];
}

export interface AllocationBlockInterface {
  matrix: MatrixInterface;
  ratio?: Array<number>;
  capacity?: number;
  headCount?: number;
  timeStart: moment.Moment | string;
  timeEnd: moment.Moment | string;
  name?: string;
  id?: string;
}

export interface AllocationInterface {
  name: string;
  id: string;
  blocks: Array<AllocationBlockInterface>;
}

export interface ComputeInterface {
  blocks: OutputBlock[];
  name?: string;
  id?: string;
}

export interface DayInterface {
  allocations: Array<AllocationInterface>;
  assets: Array<AllocationInterface>;
  locations: Array<{}>;
}

export type NiceNames = {
  name: string;
  id: string;
};

export interface StructuredData {
  allocations: AllocationBlockInterface[];
  locations: AllocationBlockInterface[];
  assets: AllocationBlockInterface[];
}

export interface TimelineData {
  [key: string]: {
    allocations: AllocationBlockInterface[];
    assets: AllocationBlockInterface[];
    locations: AllocationBlockInterface[];
  };
}

export interface Phenome {
  [key: string]: PhenomeBlock[];
}
export interface PhenomeBlock {
  allocations: AllocationBlockInterface;
  assets: AllocationBlockInterface;
  locations: AllocationBlockInterface;
}
export interface OutputBlock {
  allocations: AllocationBlockInterface[];
  assets: AllocationBlockInterface[];
  locations: AllocationBlockInterface[];
}
