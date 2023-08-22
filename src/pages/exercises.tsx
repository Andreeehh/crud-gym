import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';

import { gqlClient } from '../graphql/client';
import { GQL_QUERY_GET_EXERCISES } from '../graphql/queries/exercise';
import { serverSideRedirect } from '../utils/server-side-redirect';
import { PrivateComponent } from '../components/PrivateComponent';
import { ExercisesTemplate } from '../templates/Exercises';
import React from 'react';
import { Exercise } from 'types/Exercise';

export type ExercisesPageProps = {
  exercises?: Exercise[];
};

export type ExercisesResponse = {
  exercises: {
    data: Exercise[];
  };
};

export default function ExercisesPage({ exercises = [] }: ExercisesPageProps) {
  return (
    <PrivateComponent>
      <ExercisesTemplate exercises={exercises} />
    </PrivateComponent>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  if (!session) {
    return serverSideRedirect(ctx);
  }

  try {
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
        exercises: request.exercises.data,
      },
    };
  } catch (e) {
    console.log(e.message);
    return serverSideRedirect(ctx);
  }
};
