import { gql } from 'graphql-request';
import {
  GQL_FRAGMENT_EXERCISE_PERFORMANCE,
  GQL_FRAGMENT_EXERCISE_PERFORMANCE_ENTITY_RESPONSE,
} from 'graphql/fragments/exercise-performance';

export const GQL_QUERY_GET_EXERCISE_PERFORMANCES = gql`
  ${GQL_FRAGMENT_EXERCISE_PERFORMANCE}

  query GET_EXERCISE_PERFORMANCES(
  $sort: [String] = ["createdAt:desc"]
  $studentId: IDFilterInput,
  $trainingId: IDFilterInput,

) {
  exercisePerformances(
    sort: $sort,
    filters: {
      student: {
        id: $studentId
      }
      training: {
        id: $trainingId
      }
    }
  ) {
    data {
      ...ExercisePerformanceEntityFragment
    }
  }
}
`;

export const GQL_QUERY_GET_EXERCISE_PERFORMANCE = gql`
  ${GQL_FRAGMENT_EXERCISE_PERFORMANCE_ENTITY_RESPONSE}

  query GET_EXERCISE_PERFORMANCE($id: ID!) {
  exercisePerformance(id: $id) {
    ...ExercisePerformanceEntityResponseFragment
  }
}
`;
