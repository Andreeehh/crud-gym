import { Exercise } from './Exercise';
import { StrapiStudent } from './StrapiStudent';
import { Training } from './Training';

export type ExercisePerformanceType = 'TIME' | 'LOAD' | 'REPETITIONS';

export type ExercisePerformance = {
  series: number;
  type?: ExercisePerformanceType;
  repetitionsExpected?: number;
  repetitionsExecuted?: number;
  loadOrTimeExpected?: number;
  loadOrTimeExecuted?: number;
  executionDate?: string;
  orderNumber?: number;
  exercise: Exercise;
  student?: StrapiStudent;
  training?: Training;
};

export type ResponseExercisePerformance = {
  createExercisePerformance: {
    data: {
      id: string;
      attributes: ExercisePerformance;
    };
  };
};

export type ExercisePerformanceData = {
  id: string;
  attributes: CreateExercisePerformance;
};

export type CreateExercisePerformance = {
  series: number;
  type?: ExercisePerformanceType;
  repetitionsExpected?: number;
  repetitionsExecuted?: number;
  loadOrTimeExpected?: number;
  loadOrTimeExecuted?: number;
  executionDate?: string;
  orderNumber?: number;
  exercise: string;
  student?: string;
  training?: string;
};
