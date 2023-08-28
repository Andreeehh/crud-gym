import { useSession } from 'next-auth/client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Wrapper } from '../../components/Wrapper';
import { gqlClient } from '../../graphql/client';
import { GQL_MUTATION_DELETE_TRAINING } from '../../graphql/mutations/training';
import { Training } from 'types/Training';
import { Button } from 'components/Button';

export type TrainingsTemplateProps = {
  trainings?: Training[];
};

export function TrainingsTemplate({ trainings = [] }: TrainingsTemplateProps) {
  const [session] = useSession();
  const [stateTrainings, setStateTrainings] = useState(trainings);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    setStateTrainings(trainings);
  }, [trainings]);

  const handleDelete = async (id: string) => {
    setDeleting(true);

    try {
      await gqlClient.request(
        GQL_MUTATION_DELETE_TRAINING,
        {
          id,
        },
        {
          Authorization: `Bearer ${session.accessToken}`,
        },
      );

      setStateTrainings((s) => s.filter((p) => p.id !== id));
    } catch (e) {
      alert('Não foi possível excluir este training');
    }

    setDeleting(false);
  };

  return (
    <Wrapper>
      {stateTrainings.map((p) => (
        <p
          key={'training-' + p.id}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Link href={`/trainings/${p.id}`}>
            <a style={{ fontSize: '2rem' }}>{p.attributes.name}</a>
          </Link>
          <Button onClick={() => handleDelete(p.id)} disabled={deleting}>
            Excluir
          </Button>
        </p>
      ))}
    </Wrapper>
  );
}
