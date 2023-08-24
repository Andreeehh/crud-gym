import { useSession } from 'next-auth/client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Wrapper } from '../../components/Wrapper';
import { gqlClient } from '../../graphql/client';
import { GQL_MUTATION_DELETE_STUDENT } from '../../graphql/mutations/student';
import { StrapiStudent } from 'types/StrapiStudent';

export type StudentsTemplateProps = {
  students?: StrapiStudent[];
};

export function StudentsTemplate({ students = [] }: StudentsTemplateProps) {
  const [session] = useSession();
  const [stateStudents, setStateStudents] = useState(students);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    setStateStudents(students);
  }, [students]);

  const handleDelete = async (id: string) => {
    setDeleting(true);

    try {
      await gqlClient.request(
        GQL_MUTATION_DELETE_STUDENT,
        {
          id,
        },
        {
          Authorization: `Bearer ${session.accessToken}`,
        },
      );

      setStateStudents((s) => s.filter((p) => p.id !== id));
    } catch (e) {
      alert('Não foi possível excluir este student');
    }

    setDeleting(false);
  };

  return (
    <Wrapper>
      {stateStudents.map((p) => (
        <p key={'student-' + p.id}>
          <Link href={`/students/${p.id}`}>
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
