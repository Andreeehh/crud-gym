import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';

import { gqlClient } from '../graphql/client';
import { GQL_QUERY_GET_TRAININGS } from '../graphql/queries/training';
import { serverSideRedirect } from '../utils/server-side-redirect';
import { PrivateComponent } from '../components/PrivateComponent';
import { TrainingsTemplate } from '../templates/Trainings';
import React from 'react';
import { Training } from 'types/Training';

export type TrainingsPageProps = {
  trainings?: Training[];
};

export type TrainingsResponse = {
  trainings: {
    data: Training[];
  };
};

export default function TrainingsPage({ trainings = [] }: TrainingsPageProps) {
  return (
    <PrivateComponent>
      <TrainingsTemplate trainings={trainings} />
    </PrivateComponent>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  if (!session) {
    return serverSideRedirect(ctx);
  }

  try {
    const request = await gqlClient.request<TrainingsResponse>(
      GQL_QUERY_GET_TRAININGS,
      null,
      {
        Authorization: `Bearer ${session.accessToken}`,
      },
    );

    return {
      props: {
        session,
        trainings: request.trainings.data,
      },
    };
  } catch (e) {
    console.log(e.message);
    return serverSideRedirect(ctx);
  }
};
