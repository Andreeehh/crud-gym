import { GetServerSideProps } from 'next';
import { PrivateComponent } from '../../components/PrivateComponent';
import { UpdateExerciseTemplate } from '../../templates/UpdateExercise';
import { privateServerSideProps } from '../../utils/private-server-side-props';
import { gqlClient } from 'graphql/client';
import {
  GQL_QUERY_GET_EXERCISE,
  GQL_QUERY_GET_EXERCISES,
} from 'graphql/queries/exercise';
import { Exercise } from 'types/Exercise';
import { ExercisesResponse } from 'pages/exercises';

export type ExercisePageProps = {
  exercise: Exercise;
  exercises: Exercise[];
};

export default function ExercisePage({
  exercise,
  exercises = [],
}: ExercisePageProps) {
  return (
    <PrivateComponent>
      <UpdateExerciseTemplate exercise={exercise} exercises={exercises} />
    </PrivateComponent>
  );
}

export type ExerciseResponse = {
  exercise: {
    data: Exercise;
  };
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return await privateServerSideProps(ctx, async (session) => {
    const { id } = ctx.params;

    try {
      const { exercise } = await gqlClient.request<ExerciseResponse>(
        GQL_QUERY_GET_EXERCISE,
        {
          id,
        },
        {
          Authorization: `Bearer ${session.accessToken}`,
        },
      );
      const request = await gqlClient.request<ExercisesResponse>(
        GQL_QUERY_GET_EXERCISES,
        null,
        {
          Authorization: `Bearer ${session.accessToken}`,
        },
      );
      return {
        props: {
          session,
          exercise: exercise.data,
          exercises: request.exercises.data,
        },
      };
    } catch (e) {
      console.log(e.message);
      return {
        props: {
          session,
        },
      };
    }
  });
};
