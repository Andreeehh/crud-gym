import { useSession } from 'next-auth/client';
import { gqlClient } from '../../graphql/client';
import { Wrapper } from '../../components/Wrapper';
import { useRouter } from 'next/dist/client/router';
import { FormTraining } from 'components/FormTraining';
import {
  GQL_MUTATION_CREATE_TRAINING,
  GQL_MUTATION_UPDATE_TRAINING,
} from 'graphql/mutations/training';
import { ResponseTraining, TrainingData } from 'types/Training';
import { Student } from 'types/Student';
import { Exercise } from 'types/Exercise';
import {
  ExercisePerformanceData,
  ResponseExercisePerformance,
} from 'types/ExercisePerformance';
import { GQL_MUTATION_CREATE_EXERCISE_PERFORMANCE } from 'graphql/mutations/exercise-performance';

export type CreateTrainingTemplateProps = {
  students: Student[];
  exercises: Exercise[];
};

export function CreateTrainingTemplate({
  students,
  exercises,
}: CreateTrainingTemplateProps) {
  const router = useRouter();
  const [session] = useSession();

  const handleSave = async (
    trainingData: TrainingData,
    exercisePerformancesData: ExercisePerformanceData[],
  ) => {
    const { attributes } = trainingData;
    try {
      const response = await gqlClient.request<ResponseTraining>(
        GQL_MUTATION_CREATE_TRAINING, // Make sure you have this mutation imported
        { ...attributes },
        {
          Authorization: `Bearer ${session.accessToken}`,
        },
      );
      const trainingId = response.createTraining.data.id;
      if (trainingId) {
        const exercisePerformances = [];
        exercisePerformancesData.forEach(async (exercisePerformance) => {
          const { attributes } = exercisePerformance;
          const response = await gqlClient.request<ResponseExercisePerformance>(
            GQL_MUTATION_CREATE_EXERCISE_PERFORMANCE,
            { ...attributes, training: trainingId },
            {
              Authorization: `Bearer ${session.accessToken}`,
            },
          );
          exercisePerformances.push(response.createExercisePerformance.data.id);
        });
        if (exercisePerformances) {
          await gqlClient.request<ResponseTraining>(
            GQL_MUTATION_UPDATE_TRAINING,
            { id: trainingId, exercises: exercisePerformances },
            {
              Authorization: `Bearer ${session.accessToken}`,
            },
          );
          alert('Criado');
        }
      } else {
        throw new Error('Error creating training');
      }
    } catch (error) {
      console.error(error.message);
      alert('Error creating training');
    }
  };

  return (
    <Wrapper>
      <FormTraining
        onSave={handleSave}
        exercises={exercises}
        students={students}
      />
    </Wrapper>
  );
}
