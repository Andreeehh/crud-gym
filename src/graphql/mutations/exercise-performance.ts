import { gql } from 'graphql-request';
import { GQL_FRAGMENT_EXERCISE_PERFORMANCE_ENTITY_RESPONSE } from '../fragments/exercise-performance';

export const GQL_MUTATION_UPDATE_EXERCISE = gql`
  ${GQL_FRAGMENT_EXERCISE_PERFORMANCE_ENTITY_RESPONSE}

  mutation UPDATE_EXERCISE_PERFORMANCE(
  $id: ID!,
  $exercise: ID
  $student: ID
  $training: ID
  $series: Int
  $repetitionsExpected: Int
  $repetitionsExecuted: Int
  $loadOrTimeExpected: Int
  $loadOrTimeExecuted: Int
  $type: ENUM_EXERCISEPERFORMANCE_TYPE
) {
  updateExercisePerformance(
    id: $id
    data: {
      series: $series
      exercise: $exercise
      student: $student
      training: $training
      repetitionsExpected: $repetitionsExpected
      repetitionsExecuted: $repetitionsExecuted
      loadOrTimeExpected: $loadOrTimeExpected
      loadOrTimeExecuted: $loadOrTimeExecuted
      type: $type
    }
  ) {
    ...ExercisePerformanceEntityResponseFragment
  }
}

`;

export const GQL_MUTATION_CREATE_EXERCISE_PERFORMANCE = gql`
  ${GQL_FRAGMENT_EXERCISE_PERFORMANCE_ENTITY_RESPONSE}

  mutation CREATE_EXERCISE_PERFORMANCE(
  $exercise: ID
  $student: ID
  $training: ID
  $series: Int
  $repetitionsExpected: Int
  $repetitionsExecuted: Int
  $loadOrTimeExpected: Int
  $loadOrTimeExecuted: Int
  $type: ENUM_EXERCISEPERFORMANCE_TYPE
) {
  createExercisePerformance(
    data: {
      series: $series
      exercise: $exercise
      student: $student
      training: $training
      repetitionsExpected: $repetitionsExpected
      repetitionsExecuted: $repetitionsExecuted
      loadOrTimeExpected: $loadOrTimeExpected
      loadOrTimeExecuted: $loadOrTimeExecuted
      type: $type
    }
  ) {
    ...ExercisePerformanceEntityResponseFragment
  }
}
`;

export const GQL_MUTATION_DELETE_EXERCISE_RESPONSE = gql`
  ${GQL_FRAGMENT_EXERCISE_PERFORMANCE_ENTITY_RESPONSE}

  mutation DELETE_EXERCISE_PERFORMANCE($id: ID!){
    deleteExercisePerformance(id: $id){
    ...ExerciseEntityResponseFragment
  }
}
`;
