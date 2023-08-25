import { useSession } from 'next-auth/client';
import { FormExercise, FormExerciseProps } from '../../components/FormExercise';
import { Wrapper } from '../../components/Wrapper';
import React from 'react';
import { gqlClient } from 'graphql/client';
import { GQL_MUTATION_UPDATE_EXERCISE } from 'graphql/mutations/exercise';
import { useRouter } from 'next/router';
import { ResponseExercise } from 'types/Exercise';

export function UpdateExerciseTemplate({
  exercise,
  exercises = [],
}: FormExerciseProps) {
  const [session] = useSession();
  const router = useRouter();

  const handleSave = async (exerciseData) => {
    const { attributes, id } = exerciseData;
    try {
      await gqlClient.request<ResponseExercise>(
        GQL_MUTATION_UPDATE_EXERCISE,
        { id, ...attributes },
        {
          Authorization: `Bearer ${session.accessToken}`,
        },
      );
      router.push(`/exercises`);
    } catch (error) {
      console.error(error);
      alert('Error updating exercise');
    }
  };

  if (!exercise) {
    return (
      <Wrapper>
        <p>Exercise does not exist</p>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <FormExercise
        onSave={handleSave}
        exercise={exercise}
        exercises={exercises}
      />
    </Wrapper>
  );
}
