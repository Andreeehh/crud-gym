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
  executionDate: string;
  orderNumber: number;
  exercise: Exercise;
  student?: StrapiStudent;
  training?: Training;
};
