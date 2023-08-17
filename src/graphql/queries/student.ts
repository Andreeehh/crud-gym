import { gql } from 'graphql-request';
import {
  GQL_FRAGMENT_STUDENT,
  GQL_FRAGMENT_STUDENT_ENTITY_RESPONSE,
} from '../fragments/student';

export const GQL_QUERY_GET_STUDENTS = gql`
  ${GQL_FRAGMENT_STUDENT}

  query GET_STUDENTS(
  $start: Int = 0
  $sort: [String] = ["createdAt:desc"]
) {
  students(pagination: { start: $start }, sort: $sort) {
    ...StudentEntityResponseCollectionFragment
  }
}
`;

export const GQL_QUERY_GET_STUDENT = gql`
  ${GQL_FRAGMENT_STUDENT_ENTITY_RESPONSE}

  query GET_STUDENT($id: ID!) {
    student(id: $id) {
      ...StudentEntityResponseFragment
    }
  }
`;
