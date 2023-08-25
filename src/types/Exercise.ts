export type Exercise = {
  id: string;
  attributes: ExerciseAttributes;
};

export type ExerciseAttributes = {
  name: string;
  slug: string;
  type: ExerciseType;
  muscleGroup: MuscleGroup;
  executionType: ExecutionType;
};

export type ExerciseType = 'PULL' | 'PUSH' | 'FULL BODY' | 'OTHER';

export type MuscleGroup = 'UPPER BODY' | 'LOWER BODY' | 'CORE';

export type ExecutionType =
  | 'ISOMETRIC'
  | 'AEROBIC'
  | 'RESISTANCE'
  | 'FLEXIBILITY'
  | 'BALANCE'
  | 'SPEED AND AGILITY'
  | 'POWER'
  | 'MOBILITY'
  | 'INTERVAL CARDIO'
  | 'SPORTS'
  | 'FUNCTIONAL';

export type ResponseExercise = {
  createExercise: {
    data: Exercise;
  };
};
