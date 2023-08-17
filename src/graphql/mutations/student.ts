import { gql } from 'graphql-request';
import { GQL_FRAGMENT_STUDENT_ENTITY_RESPONSE } from '../fragments/student';

export const GQL_MUTATION_CREATE_STUDENT = gql`
  ${GQL_FRAGMENT_STUDENT_ENTITY_RESPONSE}

  mutation CREATE_STUDENT(
  $name: String!,
  $slug: String!,
  $email: String,
  $gender: ENUM_STUDENT_GENDER!,
  $goal: ENUM_STUDENT_GOAL!,
  $phone: String,
  $height: Float,
  $weight: Float,
  $isOnDiet: Boolean!,
  $hasInjuries: Boolean!,
  $injuryRegion: ENUM_STUDENT_INJURYREGION,
  $injurySeverity: Int,
  $notes: String,

) {
  createStudent(
    data: {
      name: $name,
      slug: $slug,
      email: $email,
      gender: $gender,
      goal: $goal,
      phone: $phone,
      height: $height,
      weight: $weight,
      isOnDiet: $isOnDiet,
      hasInjuries: $hasInjuries,
      injuryRegion: $injuryRegion,
      injurySeverity: $injurySeverity,
      notes: $notes
    }
  ) {
    ...StudentEntityResponseFragment
  }
}
`;
