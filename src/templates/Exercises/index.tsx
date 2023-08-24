import { useSession } from 'next-auth/client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Wrapper } from '../../components/Wrapper';
import { gqlClient } from '../../graphql/client';
import { GQL_MUTATION_DELETE_EXERCISE } from '../../graphql/mutations/exercise';
import { Exercise } from 'types/Exercise';
import {
  executionTypeOptions,
  executionTypeOptionsPTBR,
  exerciseTypeOptions,
  exerciseTypeOptionsPTBR,
  muscleGroupOptions,
  muscleGroupOptionsPTBR,
} from 'components/FormBulkExercise';
import { mapOptionToPortuguese } from 'utils/map-options';
import { Button } from 'components/Button';

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
        <p
          key={'exercise-' + p.id}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Link href={`/exercises/${p.id}`}>
            <a style={{ fontSize: '2rem' }}>
              {p.attributes.name} |{' '}
              {mapOptionToPortuguese(
                p.attributes.type,
                exerciseTypeOptionsPTBR,
                exerciseTypeOptions,
              )}{' '}
              |{' '}
              {mapOptionToPortuguese(
                p.attributes.muscleGroup,
                muscleGroupOptionsPTBR,
                muscleGroupOptions,
              )}{' '}
              |{' '}
              {mapOptionToPortuguese(
                p.attributes.executionType,
                executionTypeOptionsPTBR,
                executionTypeOptions,
              )}
            </a>
          </Link>
          <Button onClick={() => handleDelete(p.id)} disabled={deleting}>
            Excluir
          </Button>
        </p>
      ))}
    </Wrapper>
  );
}
