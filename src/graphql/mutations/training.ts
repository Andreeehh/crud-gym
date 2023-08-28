import { gql } from 'graphql-request';
import { GQL_FRAGMENT_TRAINING_ENTITY_RESPONSE } from '../fragments/training';

export const GQL_MUTATION_UPDATE_TRAINING = gql`
  ${GQL_FRAGMENT_TRAINING_ENTITY_RESPONSE}

  mutation UPDATE_TRAINING(
  $id: ID!,
  $name: String,
  $slug: String,
  $description: String,
  $exercisePerformances: [ID]
  $students: [ID]
  $weekAmount: Int
) {
  updateTraining(
    id: $id
    data: {
      name: $name,
      slug: $slug,
      description: $description,
      exercise_performances: $exercisePerformances,
      students: $students
      weekAmount: $weekAmount
    }
  ) {
    ...TrainingEntityResponse
  }
}

`;

export const GQL_MUTATION_CREATE_TRAINING = gql`
${GQL_FRAGMENT_TRAINING_ENTITY_RESPONSE}


  mutation CREATE_TRAINING(
  $name: String!,
  $slug: String!,
  $description: String,
  $exercisePerformances: [ID]
  $students: [ID]
  $weekAmount: Int
) {
  createTraining(
    data: {
      name: $name,
      slug: $slug,
      description: $description,
      exercise_performances: $exercisePerformances,
      students: $students
      weekAmount: $weekAmount
    }
  ) {
    ...TrainingEntityResponse
  }
}
`;

export const GQL_MUTATION_DELETE_TRAINING = gql`
  ${GQL_FRAGMENT_TRAINING_ENTITY_RESPONSE}

  mutation DELETE_TRAINING($id: ID!){
  deleteTraining(id: $id){
    ...TrainingEntityResponse
  }
}
`;
