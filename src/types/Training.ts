import { ExercisePerformance } from './ExercisePerformance';
import { Student } from './Student';

export type Training = {
  name: string;
  slug: string;
  description?: string;
  exercisePerformances?: ExercisePerformance[];
  students?: Student[];
};
