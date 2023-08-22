import { gql } from 'graphql-request';
import { GQL_FRAGMENT_EXERCISE_ENTITY_RESPONSE } from '../fragments/exercise';

export const GQL_MUTATION_UPDATE_EXERCISE = gql`
  ${GQL_FRAGMENT_EXERCISE_ENTITY_RESPONSE}

  mutation UPDATE_EXERCISE(
  $id: ID!
  $name: String!,
  $slug: String!,
  $type: ENUM_EXERCISE_TYPE!,
  $muscleGroup: ENUM_EXERCISE_MUSCLEGROUP!,
  $executionType: ENUM_EXERCISE_EXECUTIONTYPE!
) {
  updateExercise(
    id: $id,
    data: {
      name: $name,
      slug: $slug,
      type: $type,
      muscleGroup: $muscleGroup,
      executionType: $executionType
    }
  ) {
    ...ExerciseEntityResponseFragment
  }
}

`;

export const GQL_MUTATION_CREATE_EXERCISE = gql`
  ${GQL_FRAGMENT_EXERCISE_ENTITY_RESPONSE}

  mutation CREATE_EXERCISE(
  $name: String!,
  $slug: String!,
  $type: ENUM_EXERCISE_TYPE!,
  $muscleGroup: ENUM_EXERCISE_MUSCLEGROUP!,
  $executionType: ENUM_EXERCISE_EXECUTIONTYPE!

) {
  createExercise(
    data: {
      name: $name,
      slug: $slug,
      type: $type,
      muscleGroup: $muscleGroup,
      executionType: $executionType
    }
  ) {
    ...ExerciseEntityResponseFragment
  }
}
`;

export const GQL_MUTATION_DELETE_EXERCISE = gql`
  ${GQL_FRAGMENT_EXERCISE_ENTITY_RESPONSE}

  mutation DELETE_EXERCISE($id: ID!){
  deleteExercise(id: $id){
    ...ExerciseEntityResponseFragment
  }
}
`;
