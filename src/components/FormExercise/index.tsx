import { Button } from 'components/Button';
import { TextInput } from 'components/TextInput';
import { useState } from 'react';
import {
  ExecutionType,
  Exercise,
  ExerciseType,
  MuscleGroup,
} from 'types/Exercise';
import * as Styled from '../FormStudent/styles';
import { ComboBox } from 'components/ComboBox';
import { mapOptionToEnglish, mapOptionToPortuguese } from 'utils/map-options';

export type FormExerciseProps = {
  onSave?: (exercise: Exercise) => Promise<void>;
  exercise?: Exercise;
};

// Exercise Type Options
export const exerciseTypeOptions = ['PULL', 'PUSH', 'FULL_BODY', 'OTHER'];

export const exerciseTypeOptionsPTBR = [
  'Puxar',
  'Empurrar',
  'Corpo Inteiro',
  'Outro',
];

// Muscle Group Options
export const muscleGroupOptions = ['UPPER_BODY', 'LOWER_BODY', 'CORE'];

export const muscleGroupOptionsPTBR = [
  'Parte Superior do Corpo',
  'Parte Inferior do Corpo',
  'Core',
];

// Execution Type Options
export const executionTypeOptions = [
  'ISOMETRIC',
  'AEROBIC',
  'RESISTANCE',
  'FLEXIBILITY',
  'BALANCE',
  'SPEED_AND_AGILITY',
  'POWER',
  'MOBILITY',
  'INTERVAL_CARDIO',
  'SPORTS',
  'FUNCTIONAL',
];

export const executionTypeOptionsPTBR = [
  'Isométrico',
  'Aeróbico',
  'Resistência',
  'Flexibilidade',
  'Equilíbrio',
  'Velocidade e Agilidade',
  'Potência',
  'Mobilidade',
  'Cardio Intervalado',
  'Esportes',
  'Funcional',
];

export const FormExercise = ({ exercise, onSave }: FormExerciseProps) => {
  const { attributes, id = '' } = exercise || {};
  const [saving, setSaving] = useState(false);
  const { name, slug, type, muscleGroup, executionType } = attributes || {};

  const [newName, setNewName] = useState(attributes ? name : '');
  const [nameErrorMessage, setNameErrorMessage] = useState('');
  const [shouldFocusName, setShouldFocusName] = useState(false);
  const [selectedExerciseTypeOption, setSelectedExerciseTypeOption] = useState(
    attributes
      ? mapOptionToPortuguese(
          type,
          exerciseTypeOptionsPTBR,
          exerciseTypeOptions,
        )
      : '',
  );

  const [selectedExerciseMuscleOption, setSelectedExerciseMuscleOption] =
    useState(
      attributes
        ? mapOptionToPortuguese(
            muscleGroup,
            muscleGroupOptionsPTBR,
            muscleGroupOptions,
          )
        : '',
    );

  const [
    selectedExerciseExecutionTypeOption,
    setSelectedExerciseExecutionTypeOption,
  ] = useState(
    attributes
      ? mapOptionToPortuguese(
          executionType,
          executionTypeOptionsPTBR,
          executionTypeOptions,
        )
      : '',
  );

  const handleSelectTypeOption = (option) => {
    setSelectedExerciseTypeOption(option);
  };

  const handleSelectMuscleOption = (option) => {
    setSelectedExerciseMuscleOption(option);
  };

  const handleSelectExecutionTypeOption = (option) => {
    setSelectedExerciseExecutionTypeOption(option);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!newName) {
      setNameErrorMessage('Adicione um nome');
      setShouldFocusName(true);
      return;
    }

    const selectedTypeOptionEnglish = mapOptionToEnglish(
      selectedExerciseTypeOption,
      exerciseTypeOptionsPTBR,
      exerciseTypeOptions,
    );
    const selectedMuscleGroupOptionEnglish = mapOptionToEnglish(
      selectedExerciseMuscleOption,
      muscleGroupOptionsPTBR,
      muscleGroupOptions,
    );
    const selectedExecutionTypeOptionEnglish = mapOptionToEnglish(
      selectedExerciseExecutionTypeOption,
      executionTypeOptionsPTBR,
      executionTypeOptions,
    );
    setSaving(true);
    try {
      const exerciseData: Exercise = {
        id,
        attributes: {
          name: newName,
          slug: attributes
            ? slug
            : newName
                .replace(/ /g, '-')
                .replace(/[^0-9a-zA-Z-]+/g, '')
                .toLowerCase(),
          type: selectedTypeOptionEnglish as ExerciseType,
          muscleGroup: selectedMuscleGroupOptionEnglish as MuscleGroup,
          executionType: selectedExecutionTypeOptionEnglish as ExecutionType,
        },
      };

      if (onSave) {
        await onSave(exerciseData);
      }
    } catch (error) {
      console.log(error.message);
      alert('Erro ao salvar');
    }

    setSaving(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Styled.TextInputGrid columns={2}>
        <TextInput
          name="exercise-name"
          label="Nome"
          value={newName}
          onInputChange={(v) => {
            setNewName(v);
            setNameErrorMessage('');
          }}
          errorMessage={nameErrorMessage}
          hasFocus={shouldFocusName}
        />
        <ComboBox
          label="Selecione um Tipo"
          name="type"
          errorMessage="" // Provide an error message if needed
          options={exerciseTypeOptionsPTBR}
          onSelectOption={handleSelectTypeOption}
          selectedOptionIndex={
            attributes
              ? exerciseTypeOptionsPTBR.indexOf(selectedExerciseTypeOption)
              : 0
          }
        />
      </Styled.TextInputGrid>
      <Styled.TextInputGrid columns={2}>
        <ComboBox
          label="Selecione um Grupo Muscular"
          name="group-muscle"
          errorMessage="" // Provide an error message if needed
          options={muscleGroupOptionsPTBR}
          onSelectOption={handleSelectMuscleOption}
          selectedOptionIndex={
            attributes
              ? muscleGroupOptionsPTBR.indexOf(selectedExerciseMuscleOption)
              : 0
          }
        />
        <ComboBox
          label="Selecione um Tipo de Execução"
          name="execution-type"
          errorMessage="" // Provide an error message if needed
          options={executionTypeOptionsPTBR}
          onSelectOption={handleSelectExecutionTypeOption}
          selectedOptionIndex={
            attributes
              ? executionTypeOptionsPTBR.indexOf(
                  selectedExerciseExecutionTypeOption,
                )
              : 0
          }
        />
      </Styled.TextInputGrid>

      <Button type="submit" disabled={saving}>
        {saving ? 'Salvando...' : 'Salvar'}
      </Button>
    </form>
  );
};
