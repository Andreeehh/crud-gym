import { useSession } from 'next-auth/client';
import { FormStudent, FormStudentProps } from '../../components/FormStudent';
import { Wrapper } from '../../components/Wrapper';
import React from 'react';
import { gqlClient } from 'graphql/client';
import { GQL_MUTATION_UPDATE_STUDENT } from 'graphql/mutations/student';
import { ResponseStudent } from 'api/create-student';
import { useRouter } from 'next/router';

export function UpdateStudentTemplate({ student }: FormStudentProps) {
  const [session] = useSession();
  const router = useRouter();

  const handleSave = async (studentData) => {
    const { attributes, id } = studentData;
    try {
      console.log('studentData from update', studentData);
      await gqlClient.request<ResponseStudent>(
        GQL_MUTATION_UPDATE_STUDENT,
        { id, ...attributes },
        {
          Authorization: `Bearer ${session.accessToken}`,
        },
      );
      router.push(`/students`);
    } catch (error) {
      console.error(error);
      alert('Error creating student');
    }
  };

  if (!student) {
    return (
      <Wrapper>
        <p>Student does not exist</p>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <FormStudent onSave={handleSave} student={student} />
    </Wrapper>
  );
}
