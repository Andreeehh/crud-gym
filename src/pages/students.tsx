import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';

import { gqlClient } from '../graphql/client';
import { GQL_QUERY_GET_STUDENTS } from '../graphql/queries/student';
import { serverSideRedirect } from '../utils/server-side-redirect';
import { PrivateComponent } from '../components/PrivateComponent';
import { StudentsTemplate } from '../templates/Students';
import { StrapiStudent } from '../types/StrapiStudent';
import React from 'react';

export type StudentsPageProps = {
  students?: StrapiStudent[];
};

export type StudentsResponse = {
  students: {
    data: StrapiStudent[];
  };
};

export default function StudentsPage({ students = [] }: StudentsPageProps) {
  return (
    <PrivateComponent>
      <StudentsTemplate students={students} />
    </PrivateComponent>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  if (!session) {
    return serverSideRedirect(ctx);
  }

  try {
    const request = await gqlClient.request<StudentsResponse>(
      GQL_QUERY_GET_STUDENTS,
      null,
      {
        Authorization: `Bearer ${session.accessToken}`,
      },
    );

    return {
      props: {
        session,
        students: request.students.data,
      },
    };
  } catch (e) {
    console.log(e.message);
    return serverSideRedirect(ctx);
  }
};
