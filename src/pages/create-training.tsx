import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import { PrivateComponent } from '../components/PrivateComponent';
import { serverSideRedirect } from '../utils/server-side-redirect';
import {
  CreateTrainingTemplate,
  CreateTrainingTemplateProps,
} from 'templates/CreateTraining';
import { gqlClient } from 'graphql/client';
import { StudentsResponse } from './students';
import { GQL_QUERY_GET_STUDENTS } from 'graphql/queries/student';
import { ExercisesResponse } from './exercises';
import { GQL_QUERY_GET_EXERCISES } from 'graphql/queries/exercise';

export default function TrainingPage({
  exercises,
  students,
}: CreateTrainingTemplateProps) {
  return (
    <PrivateComponent>
      <CreateTrainingTemplate exercises={exercises} students={students} />
    </PrivateComponent>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  if (!session) {
    return serverSideRedirect(ctx);
  }

  try {
    const requestStudent = await gqlClient.request<StudentsResponse>(
      GQL_QUERY_GET_STUDENTS,
      null,
      {
        Authorization: `Bearer ${session.accessToken}`,
      },
    );
    const requestExercise = await gqlClient.request<ExercisesResponse>(
      GQL_QUERY_GET_EXERCISES,
      null,
      {
        Authorization: `Bearer ${session.accessToken}`,
      },
    );
    return {
      props: {
        session,
        students: requestStudent.students.data,
        exercises: requestExercise.exercises.data,
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
