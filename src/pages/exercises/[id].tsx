import { GetServerSideProps } from 'next';
import { PrivateComponent } from '../../components/PrivateComponent';
import { UpdateExerciseTemplate } from '../../templates/UpdateExercise';
import { privateServerSideProps } from '../../utils/private-server-side-props';
import { gqlClient } from 'graphql/client';
import { GQL_QUERY_GET_EXERCISE } from 'graphql/queries/exercise';
import { Exercise } from 'types/Exercise';

export type ExercisePageProps = {
  exercise: Exercise;
};

export default function ExercisePage({ exercise }: ExercisePageProps) {
  return (
    <PrivateComponent>
      <UpdateExerciseTemplate exercise={exercise} />
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
      return {
        props: {
          session,
          exercise: exercise.data,
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
