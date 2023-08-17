import { GetServerSideProps } from 'next';
import { PrivateComponent } from '../components/PrivateComponent';
import { UpdateStudentTemplate } from '../templates/UpdateStudent';
import { privateServerSideProps } from '../utils/private-server-side-props';
import { gqlClient } from 'graphql/client';
import { GQL_QUERY_GET_STUDENT } from 'graphql/queries/student';
import { Student } from 'types/Student';
import { StrapiStudent } from 'types/StrapiStudent';

export type StudentPageProps = {
  student: StrapiStudent;
};

export default function StudentPage({ student }: StudentPageProps) {
  return (
    <PrivateComponent>
      <UpdateStudentTemplate student={student} />
    </PrivateComponent>
  );
}

export type StudentResponse = {
  student: {
    data: Student;
  };
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return await privateServerSideProps(ctx, async (session) => {
    const { id } = ctx.params;

    try {
      const { student } = await gqlClient.request<StudentResponse>(
        GQL_QUERY_GET_STUDENT,
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
          student: student.data,
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
