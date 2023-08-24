import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import { PrivateComponent } from '../components/PrivateComponent';
import { serverSideRedirect } from '../utils/server-side-redirect';
import {
  CreateBulkExerciseTemplate,
  CreateBulkExerciseTemplateProps,
} from 'templates/CreateBulkExercise';
import { gqlClient } from 'graphql/client';
import { ExercisesResponse } from './exercises';
import { GQL_QUERY_GET_EXERCISES } from 'graphql/queries/exercise';

export default function ExercisePage({
  createdExercises = [],
}: CreateBulkExerciseTemplateProps) {
  return (
    <PrivateComponent>
      <CreateBulkExerciseTemplate createdExercises={createdExercises} />
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
        createdExercises: request.exercises.data,
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
