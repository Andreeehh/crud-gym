import { gql } from 'graphql-request';

export const GQL_FRAGMENT_EXERCISE_ENTITY_RESPONSE = gql`
    fragment ExerciseFragment on Exercise {
      name
      slug
      type
      muscleGroup
      executionType
    }

    fragment ExerciseEntityFragment on ExerciseEntity {
      id
      attributes{
        ...ExerciseFragment
      }
    }

    fragment ExerciseEntityResponseFragment on ExerciseEntityResponse {
      data {
        ...ExerciseEntityFragment
      }
    }
`;

export const GQL_FRAGMENT_EXERCISE = gql`
    fragment ExerciseFragment on Exercise {
      name
      slug
      type
      muscleGroup
      executionType
      createdAt
    }

    fragment ExerciseEntityFragment on ExerciseEntity {
      id
      attributes{
        ...ExerciseFragment
      }
    }

    fragment ExerciseEntityResponseCollectionFragment on ExerciseEntityResponseCollection {
      data {
        ...ExerciseEntityFragment
      }
    }
`;
