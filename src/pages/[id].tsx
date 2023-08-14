import { GetServerSideProps } from 'next';
import { PrivateComponent } from '../components/PrivateComponent';
import { UpdateStudentTemplate } from '../templates/UpdateStudent';
import { privateServerSideProps } from '../utils/private-server-side-props';

export default function StudentPage() {
  return (
    <PrivateComponent>
      <UpdateStudentTemplate />
    </PrivateComponent>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return await privateServerSideProps(ctx, async (session) => {
    const { id } = ctx.params;

    try {
      return {
        props: {
          session,
        },
      };
    } catch (e) {
      return {
        props: {
          session,
        },
      };
    }
  });
};
