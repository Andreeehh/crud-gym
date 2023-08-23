import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import { PrivateComponent } from '../components/PrivateComponent';
import { serverSideRedirect } from '../utils/server-side-redirect';
import { CreateBulkExerciseTemplate } from 'templates/CreateBulkExercise';

export default function ExercisePage() {
  return (
    <PrivateComponent>
      <CreateBulkExerciseTemplate />
    </PrivateComponent>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  if (!session) {
    return serverSideRedirect(ctx);
  }

  try {
    return {
      props: {
        session,
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
