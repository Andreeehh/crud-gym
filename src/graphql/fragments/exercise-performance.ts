import { gql } from 'graphql-request';

export const GQL_FRAGMENT_EXERCISE_PERFORMANCE_ENTITY_RESPONSE = gql`
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

fragment StudentEntityResponseFragment on StudentEntityResponse {
  data {
    ...StudentEntityFragment
  }
}

fragment Training on Training {
  name
  description
  slug
  weekAmount
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

fragment ExercisePerformanceFragment on ExercisePerformance {
  series
  type
  repetitionsExpected
  repetitionsExecuted
  loadOrTimeExpected
  loadOrTimeExecuted
  executionDate
  exercise {
    ...ExerciseEntityResponse
  }
  student {
    ...StudentEntityResponseFragment
  }
  training {
    ...TrainingEntityResponse
  }
}

fragment ExercisePerformanceEntityFragment on ExercisePerformanceEntity {
  id
  attributes {
    ...ExercisePerformanceFragment
  }
}

fragment ExercisePerformanceEntityResponseFragment on ExercisePerformanceEntityResponse {
  data {
    ...ExercisePerformanceEntityFragment
  }
}

fragment StudentRelationResponseCollection on StudentRelationResponseCollection {
  data {
    ...StudentEntityFragment
  }
}
`;

export const GQL_FRAGMENT_EXERCISE_PERFORMANCE = gql`
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

fragment StudentEntityResponseFragment on StudentEntityResponse {
  data {
    ...StudentEntityFragment
  }
}

fragment Training on Training {
  name
  description
  slug
  weekAmount
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

fragment ExercisePerformanceFragment on ExercisePerformance {
  series
  type
  repetitionsExpected
  repetitionsExecuted
  loadOrTimeExpected
  loadOrTimeExecuted
  executionDate
  exercise {
    ...ExerciseEntityResponse
  }
  student {
    ...StudentEntityResponseFragment
  }
  training {
    ...TrainingEntityResponse
  }
}

fragment ExercisePerformanceEntityFragment on ExercisePerformanceEntity {
  id
  attributes {
    ...ExercisePerformanceFragment
  }
}

fragment StudentRelationResponseCollection on StudentRelationResponseCollection {
  data {
    ...StudentEntityFragment
  }
}

query GET_EXERCISES($start: Int = 0, $sort: [String] = ["createdAt:desc"]) {
  exercisePerformances(pagination: { start: $start }, sort: $sort) {
    data {
      ...ExercisePerformanceEntityFragment
    }
  }
}

`;
