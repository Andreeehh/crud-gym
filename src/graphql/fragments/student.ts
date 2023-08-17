import { gql } from 'graphql-request';

export const GQL_FRAGMENT_STUDENT_ENTITY_RESPONSE = gql`
    fragment StudentFragment on Student {
      name
      slug
      email
      gender
      goal
      phone
      height
      weight
      isOnDiet
      hasInjuries
      injuryRegion
      injurySeverity
      notes
    }

    fragment StudentEntityFragment on StudentEntity {
      id
      attributes{
        ...StudentFragment
      }
    }

    fragment StudentEntityResponseFragment on StudentEntityResponse {
      data {
        ...StudentEntityFragment
      }
    }
`;

export const GQL_FRAGMENT_STUDENT = gql`
    fragment StudentFragment on Student {
      name
      slug
      email
      gender
      goal
      phone
      height
      weight
      isOnDiet
      hasInjuries
      injuryRegion
      injurySeverity
      notes
      createdAt
    }

    fragment StudentEntityFragment on StudentEntity {
      id
      attributes{
        ...StudentFragment
      }
    }

    fragment StudentEntityResponseCollectionFragment on StudentEntityResponseCollection {
      data {
        ...StudentEntityFragment
      }
    }
`;
