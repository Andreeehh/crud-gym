import { gql } from 'graphql-request';
import {
  GQL_FRAGMENT_EXERCISE,
  GQL_FRAGMENT_EXERCISE_ENTITY_RESPONSE,
} from '../fragments/exercise';

export const GQL_QUERY_GET_EXERCISES = gql`
  ${GQL_FRAGMENT_EXERCISE}

  query GET_EXERCISES(
  $start: Int = 0
  $sort: [String] = ["createdAt:desc"]
) {
  exercises(pagination: { start: $start }, sort: $sort) {
    ...ExerciseEntityResponseCollectionFragment
  }
}
`;

export const GQL_QUERY_GET_EXERCISE = gql`
  ${GQL_FRAGMENT_EXERCISE_ENTITY_RESPONSE}

  query GET_EXERCISE($id: ID!) {
    exercise(id: $id) {
      ...ExerciseEntityResponseFragment
    }
  }
`;
