import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import { PrivateComponent } from '../components/PrivateComponent';
import { serverSideRedirect } from '../utils/server-side-redirect';
import { CreateExerciseTemplate } from 'templates/CreateExercise';
import { ExercisesPageProps, ExercisesResponse } from './exercises';
import { gqlClient } from 'graphql/client';
import { GQL_QUERY_GET_EXERCISES } from 'graphql/queries/exercise';

export default function ExercisePage({ exercises = [] }: ExercisesPageProps) {
  return (
    <PrivateComponent>
      <CreateExerciseTemplate exercises={exercises} />
    </PrivateComponent>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  if (!session) {
    return serverSideRedirect(ctx);
  }

  const request = await gqlClient.request<ExercisesResponse>(
    GQL_QUERY_GET_EXERCISES,
    null,
    {
      Authorization: `Bearer ${session.accessToken}`,
    },
  );

  try {
    return {
      props: {
        session,
        exercises: request.exercises.data,
      },
    };
  } catch (error) {
    return {
      props: {
        session,
      },
    };
  }
};
