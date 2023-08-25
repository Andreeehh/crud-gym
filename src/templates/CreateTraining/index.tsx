import { useSession } from 'next-auth/client';
import { gqlClient } from '../../graphql/client';
import { Wrapper } from '../../components/Wrapper';
import { useRouter } from 'next/dist/client/router';
import { FormTraining } from 'components/FormTraining';
import { GQL_MUTATION_CREATE_TRAINING } from 'graphql/mutations/training';
import { ResponseTraining } from 'types/Training';
import { Student } from 'types/Student';
import { Exercise } from 'types/Exercise';

export type CreateTrainingTemplateProps = {
  students: Student[];
  exercises: Exercise[];
};

export function CreateTrainingTemplate({
  students,
  exercises,
}: CreateTrainingTemplateProps) {
  const router = useRouter();
  const [session] = useSession();

  const handleSave = async (trainingData) => {
    const { attributes } = trainingData;
    try {
      const response = await gqlClient.request<ResponseTraining>(
        GQL_MUTATION_CREATE_TRAINING, // Make sure you have this mutation imported
        { ...attributes },
        {
          Authorization: `Bearer ${session.accessToken}`,
        },
      );
      const createdTraining = response.createTraining.data;
      if (createdTraining) {
        // Redirect or perform any other action upon successful creation
        router.push(`/trainings`);
        alert('Criado');
      } else {
        throw new Error('Error creating training');
      }
    } catch (error) {
      console.error(error);
      alert('Error creating training');
    }
  };

  return (
    <Wrapper>
      <FormTraining
        onSave={handleSave}
        exercises={exercises}
        students={students}
      />
    </Wrapper>
  );
}
