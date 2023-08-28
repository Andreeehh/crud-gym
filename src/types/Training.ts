import { ExercisePerformance } from './ExercisePerformance';
import { Student } from './Student';

export type Training = {
  id: string;
  attributes: TrainingAttributes;
};

export type TrainingAttributes = {
  name: string;
  slug: string;
  description?: string;
  exercisePerformances?: ExercisePerformance[];
  students?: Student[];
  weekAmount: number;
};

export type CreateTraining = {
  name: string;
  slug: string;
  description?: string;
  exercisePerformances?: number[];
  students?: number[];
  weekAmount: number;
};

export type ResponseTraining = {
  createTraining: {
    data: {
      id: string;
      attributes: TrainingAttributes;
    };
  };
};

export type TrainingData = {
  id: string;
  attributes: CreateTraining;
};
