import { gql } from 'graphql-request';

export const GQL_FRAGMENT_TRAINING_ENTITY_RESPONSE = gql`
    fragment ExerciseFragment on Exercise {
  name
  slug
  type
  muscleGroup
  executionType
}

fragment ExerciseEntityFragment on ExerciseEntity {
  id
  attributes {
    ...ExerciseFragment
  }
}

fragment ExerciseEntityResponse on ExerciseEntityResponse {
  data {
    ...ExerciseEntityFragment
  }
}

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
  attributes {
    ...StudentFragment
  }
}

fragment Training on Training {
  name
  description
  slug
  exercise_performances {
    data {
      id
      attributes {
        series
        type
        repetitionsExpected
        repetitionsExecuted
        loadOrTimeExpected
        loadOrTimeExecuted
        executionDate
        orderNumber
        exercise {
          ...ExerciseEntityResponse
        }
      }
    }
  }
  students {
    ...StudentRelationResponseCollection
  }
}

fragment TrainingEntity on TrainingEntity {
  id
  attributes {
    ...Training
  }
}

fragment TrainingEntityResponse on TrainingEntityResponse {
  data {
    ...TrainingEntity
  }
}

fragment StudentRelationResponseCollection on StudentRelationResponseCollection {
  data {
    ...StudentEntityFragment
  }
}
`;

export const GQL_FRAGMENT_TRAINING = gql`
    fragment ExerciseFragment on Exercise {
  name
  slug
  type
  muscleGroup
  executionType
}

fragment ExerciseEntityFragment on ExerciseEntity {
  id
  attributes {
    ...ExerciseFragment
  }
}

fragment ExerciseEntityResponse on ExerciseEntityResponse {
  data {
    ...ExerciseEntityFragment
  }
}

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
  attributes {
    ...StudentFragment
  }
}

fragment Training on Training {
  name
  description
  slug
  exercise_performances {
    data {
      id
      attributes {
        series
        type
        repetitionsExpected
        repetitionsExecuted
        loadOrTimeExpected
        loadOrTimeExecuted
        executionDate
        orderNumber
        exercise {
          ...ExerciseEntityResponse
        }
      }
    }
  }
  students {
    ...StudentRelationResponseCollection
  }
}

fragment TrainingEntity on TrainingEntity {
  id
  attributes {
    ...Training
  }
}

fragment StudentRelationResponseCollection on StudentRelationResponseCollection {
  data {
    ...StudentEntityFragment
  }
}

fragment TrainingEntityResponseCollection on TrainingEntityResponseCollection {
  data {
    ...TrainingEntity
  }
}
`;
