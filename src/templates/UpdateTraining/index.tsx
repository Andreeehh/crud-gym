import { useSession } from 'next-auth/client';
import { FormTraining, FormTrainingProps } from '../../components/FormTraining';
import { Wrapper } from '../../components/Wrapper';
import React from 'react';
import { gqlClient } from 'graphql/client';
import { GQL_MUTATION_UPDATE_TRAINING } from 'graphql/mutations/training';
import { useRouter } from 'next/router';
import { ResponseTraining, TrainingData } from 'types/Training';
import { ExercisePerformanceData } from 'types/ExercisePerformance';

export function UpdateTrainingTemplate({
  training,
  students,
  exercises,
}: FormTrainingProps) {
  const [session] = useSession();
  const router = useRouter();

  const handleSave = async (
    trainingData: TrainingData,
    exercisePerformancesData: ExercisePerformanceData[],
  ) => {
    const { attributes, id } = trainingData;
    try {
      await gqlClient.request<ResponseTraining>(
        GQL_MUTATION_UPDATE_TRAINING,
        { id, ...attributes },
        {
          Authorization: `Bearer ${session.accessToken}`,
        },
      );
      router.push(`/trainings`);
    } catch (error) {
      console.error(error);
      alert('Error updating training');
    }
  };

  if (!training) {
    return (
      <Wrapper>
        <p>Training does not exist</p>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <FormTraining
        onSave={handleSave}
        exercises={exercises}
        students={students}
        training={training}
      />
    </Wrapper>
  );
}
