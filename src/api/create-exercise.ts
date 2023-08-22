import { GQL_MUTATION_CREATE_EXERCISE } from '../graphql/mutations/exercise';
import { gqlClient } from '../graphql/client';
import { Exercise, ExerciseAttributes } from 'types/Exercise';

export type ResponseExercise = {
  createExercise: {
    data: Exercise;
  };
};

export async function createExerciseAndReturnData(
  exercise: ExerciseAttributes,
  session?: { accessToken: string },
): Promise<Exercise | null> {
  const { name, slug, type, muscleGroup, executionType } = exercise;

  try {
    const response = await gqlClient.request<ResponseExercise>(
      GQL_MUTATION_CREATE_EXERCISE,
      {
        name,
        slug,
        type,
        muscleGroup,
        executionType,
      },
      {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    );

    return response.createExercise.data;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}
