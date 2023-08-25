import { useSession } from 'next-auth/client';
import { gqlClient } from '../../graphql/client';
import { Wrapper } from '../../components/Wrapper';
import { useRouter } from 'next/dist/client/router';
import { FormStudent } from 'components/FormStudent';
import { GQL_MUTATION_CREATE_STUDENT } from 'graphql/mutations/student';
import { ResponseStudent } from 'types/Student';

export function CreateStudentTemplate() {
  const router = useRouter();
  const [session] = useSession();

  const handleSave = async (studentData) => {
    const { attributes } = studentData;
    try {
      const response = await gqlClient.request<ResponseStudent>(
        GQL_MUTATION_CREATE_STUDENT, // Make sure you have this mutation imported
        { ...attributes },
        {
          Authorization: `Bearer ${session.accessToken}`,
        },
      );
      const createdStudent = response.createStudent.data;
      if (createdStudent) {
        // Redirect or perform any other action upon successful creation
        router.push(`/students`);
        alert('Criado');
      } else {
        throw new Error('Error creating student');
      }
    } catch (error) {
      console.error(error);
      alert('Error creating student');
    }
  };

  return (
    <Wrapper>
      <FormStudent onSave={handleSave} />
    </Wrapper>
  );
}
