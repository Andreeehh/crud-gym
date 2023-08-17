import { useSession } from 'next-auth/client';
import { FormStudent, FormStudentProps } from '../../components/FormStudent';
import { Wrapper } from '../../components/Wrapper';
import React from 'react';
import { gqlClient } from 'graphql/client';
import { GQL_MUTATION_UPDATE_STUDENT } from 'graphql/mutations/student';
import { ResponseStudent } from 'api/create-student';

export function UpdateStudentTemplate({ student }: FormStudentProps) {
  const [session] = useSession();
  console.log('updateStudent');
  console.log(student);

  const handleSave = async (studentData) => {
    const { attributes, id } = studentData;
    try {
      await gqlClient.request<ResponseStudent>(
        GQL_MUTATION_UPDATE_STUDENT, // Make sure you have this mutation imported
        { id, ...attributes },
        {
          Authorization: `Bearer ${session.accessToken}`,
        },
      );
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
