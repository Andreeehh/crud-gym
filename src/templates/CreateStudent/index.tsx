import { useSession } from 'next-auth/client';
import { gqlClient } from '../../graphql/client';
import { Wrapper } from '../../components/Wrapper';
import { useRouter } from 'next/dist/client/router';
import { FormStudent } from 'components/FormStudent';

export function CreateStudentTemplate() {
  const router = useRouter();
  const [session] = useSession();

  const handleSave = null;

  return (
    <Wrapper>
      <FormStudent onSave={handleSave} />
    </Wrapper>
  );
}
