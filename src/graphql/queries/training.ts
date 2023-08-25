import { gql } from 'graphql-request';
import {
  GQL_FRAGMENT_TRAINING,
  GQL_FRAGMENT_TRAINING_ENTITY_RESPONSE,
} from '../fragments/training';

export const GQL_QUERY_GET_TRAININGS = gql`
  ${GQL_FRAGMENT_TRAINING}

  query GET_TRAININGS(
  $sort: [String] = ["createdAt:desc"]
  $searchValue: String
  $slug: String
  $student: ID
) {
  trainings(
    sort: $sort
  	filters: {
      slug: {eq: $slug}
      or: [
        {name: {containsi: $searchValue}}
        {description: {containsi: $searchValue}}
      ]
      students: {
        id: {eq: $student}
      }
    }
  ) {
    ...TrainingEntityResponseCollection
  }
}
`;

export const GQL_QUERY_GET_TRAINING = gql`
  ${GQL_FRAGMENT_TRAINING_ENTITY_RESPONSE}

  query GET_TRAINING($id: ID!) {
    training(id: $id) {
      ...TrainingEntityResponse
    }
  }
`;
