import { useSession } from 'next-auth/client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Wrapper } from '../../components/Wrapper';
import { gqlClient } from '../../graphql/client';
import { GQL_MUTATION_DELETE_EXERCISE } from '../../graphql/mutations/exercise';
import { Exercise } from 'types/Exercise';

export type ExercisesTemplateProps = {
  exercises?: Exercise[];
};

export function ExercisesTemplate({ exercises = [] }: ExercisesTemplateProps) {
  const [session] = useSession();
  const [stateExercises, setStateExercises] = useState(exercises);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    setStateExercises(exercises);
  }, [exercises]);

  const handleDelete = async (id: string) => {
    setDeleting(true);

    try {
      await gqlClient.request(
        GQL_MUTATION_DELETE_EXERCISE,
        {
          id,
        },
        {
          Authorization: `Bearer ${session.accessToken}`,
        },
      );

      setStateExercises((s) => s.filter((p) => p.id !== id));
    } catch (e) {
      alert('Não foi possível excluir este exercise');
    }

    setDeleting(false);
  };

  return (
    <Wrapper>
      <h1>Olá {session?.user?.name || 'ninguém'}</h1>

      {stateExercises.map((p) => (
        <p key={'exercise-' + p.id}>
          <Link href={`/exercises/${p.id}`}>
            <a>{p.attributes.name}</a>
          </Link>{' '}
          |{' '}
          <button onClick={() => handleDelete(p.id)} disabled={deleting}>
            Excluir
          </button>
        </p>
      ))}
    </Wrapper>
  );
}
