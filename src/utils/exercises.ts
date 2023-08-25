import { Exercise } from 'types/Exercise';

export const getExerciseByName = (
  name: string,
  exercises: Exercise[],
): Exercise | null => {
  return (
    exercises.find((exercise) => exercise.attributes.name === name) || null
  );
};
