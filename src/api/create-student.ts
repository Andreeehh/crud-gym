import { GQL_MUTATION_CREATE_STUDENT } from '../graphql/mutations/student';
import { gqlClient } from '../graphql/client';
import { Student, StudentAttributes } from 'types/Student';

export type ResponseStudent = {
  createStudent: {
    data: Student;
  };
};

export async function createStudentAndReturnData(
  student: StudentAttributes,
  session?: { accessToken: string },
): Promise<Student | null> {
  const {
    name,
    slug,
    email,
    gender,
    goal,
    phone,
    height,
    weight,
    isOnDiet,
    hasInjuries,
    injuryRegion,
    injurySeverity,
    notes,
  } = student;

  try {
    const response = await gqlClient.request<ResponseStudent>(
      GQL_MUTATION_CREATE_STUDENT,
      {
        name,
        slug,
        email,
        gender,
        goal,
        phone,
        height,
        weight,
        isOnDiet,
        hasInjuries,
        injuryRegion,
        injurySeverity,
        notes,
      },
      {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    );

    return response.createStudent.data;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}
