import { useSession } from 'next-auth/client';
import { gqlClient } from '../../graphql/client';
import { Wrapper } from '../../components/Wrapper';
import { GQL_MUTATION_CREATE_EXERCISE } from 'graphql/mutations/exercise';
import { FormBulkExercise } from 'components/FormBulkExercise';
import { Exercise, ResponseExercise } from 'types/Exercise';

export type CreateBulkExerciseTemplateProps = {
  createdExercises?: Exercise[];
};

export function CreateBulkExerciseTemplate({
  createdExercises = [],
}: CreateBulkExerciseTemplateProps) {
  const [session] = useSession();

  const handleSave = async (exerciseData) => {
    const { attributes } = exerciseData;
    try {
      const response = await gqlClient.request<ResponseExercise>(
        GQL_MUTATION_CREATE_EXERCISE, // Make sure you have this mutation imported
        { ...attributes },
        {
          Authorization: `Bearer ${session.accessToken}`,
        },
      );
      const createdExercise = response.createExercise.data;
      if (createdExercise) {
        // Redirect or perform any other action upon successful creation
        // router.push(`/exercises`);
        // alert('Criados');
      } else {
        throw new Error('Error creating exercise');
      }
    } catch (error) {
      console.error(error);
      alert('Error creating exercise');
    }
  };

  return (
    <Wrapper>
      <FormBulkExercise
        onSave={handleSave}
        createdExercises={createdExercises}
      />
    </Wrapper>
  );
}
