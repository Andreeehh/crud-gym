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
import { mapOptionToEnglish } from 'utils/map-options';
import { useRouter } from 'next/router';

export type FormBulkExerciseProps = {
  onSave?: (exercise: Exercise) => Promise<void>;
  createdExercises?: Exercise[];
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

export const FormBulkExercise = ({
  onSave,
  createdExercises,
}: FormBulkExerciseProps) => {
  const router = useRouter();
  const [amount, setAmount] = useState(1);
  const [newName, setNewName] = useState(['']);
  const [saving, setSaving] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState(['']);
  const [shouldFocusName, setShouldFocusName] = useState([true]);
  const [selectedExerciseTypeOption, setSelectedExerciseTypeOption] = useState([
    'Puxar',
  ]);

  const [selectedExerciseMuscleOption, setSelectedExerciseMuscleOption] =
    useState(['Parte Superior do Corpo']);

  const [
    selectedExerciseExecutionTypeOption,
    setSelectedExerciseExecutionTypeOption,
  ] = useState(['Isométrico']);

  const updateName = (indexToUpdate, newNameValue) => {
    const updatedArray = [...newName];
    updatedArray[indexToUpdate] = newNameValue;
    setNewName(updatedArray);
  };

  const updateNameErrorMessage = (indexToUpdate, newNameErrorMessageValue) => {
    const updatedArray = [...nameErrorMessage];
    updatedArray[indexToUpdate] = newNameErrorMessageValue;
    setNameErrorMessage(updatedArray);
  };

  const updateShouldFocusName = (indexToUpdate, newShouldFocusName) => {
    const updatedArray = [...shouldFocusName];
    updatedArray[indexToUpdate] = newShouldFocusName;
    setShouldFocusName(updatedArray);
  };

  const handleUpdateSelectedExerciseTypeOption = (index, value) => {
    setSelectedExerciseTypeOption((prevState) => {
      const newState = [...prevState];
      newState[index] = value;
      return newState;
    });
  };

  const handleUpdateSelectedExerciseMuscleOption = (index, value) => {
    setSelectedExerciseMuscleOption((prevState) => {
      const newState = [...prevState];
      newState[index] = value;
      return newState;
    });
  };

  const handleUpdateSelectedExerciseExecutionTypeOption = (index, value) => {
    setSelectedExerciseExecutionTypeOption((prevState) => {
      const newState = [...prevState];
      newState[index] = value;
      return newState;
    });
  };

  const handleAddClick = () => {
    setAmount(amount + 1);
    setNewName([...newName, '']);
    setNameErrorMessage([...nameErrorMessage, '']);
    setShouldFocusName([...shouldFocusName, false]);
    setSelectedExerciseTypeOption([
      ...selectedExerciseTypeOption,
      exerciseTypeOptionsPTBR[0],
    ]);
    setSelectedExerciseMuscleOption([
      ...selectedExerciseMuscleOption,
      muscleGroupOptionsPTBR[0],
    ]);
    setSelectedExerciseExecutionTypeOption([
      ...selectedExerciseExecutionTypeOption,
      executionTypeOptionsPTBR[0],
    ]);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    let error = false;
    newName.forEach((n, i) => {
      if (n === '') {
        updateNameErrorMessage(i, 'Adicione um nome');
        updateShouldFocusName(i, true);
        error = true;
      }
    });
    if (error) {
      return;
    }
    newName.forEach((n1, i1) => {
      newName.forEach((n2, i2) => {
        if (i1 !== i2 && n1 === n2) {
          updateNameErrorMessage(i2, 'Nome Igual');
          updateShouldFocusName(i2, true);
          error = true;
        }
      });
    });

    if (error) {
      return;
    }

    newName.forEach((n1, i) => {
      createdExercises.forEach((exercise) => {
        if (
          n1.toLocaleLowerCase() ===
          exercise.attributes.name.toLocaleLowerCase()
        ) {
          updateNameErrorMessage(i, 'Nome já existente');
          updateShouldFocusName(i, true);
          error = true;
        }
      });
    });

    if (error) {
      return;
    }

    setSaving(true);
    try {
      newName.forEach(async (name, index) => {
        const selectedTypeOptionEnglish = mapOptionToEnglish(
          selectedExerciseTypeOption[index],
          exerciseTypeOptionsPTBR,
          exerciseTypeOptions,
        );
        const selectedMuscleGroupOptionEnglish = mapOptionToEnglish(
          selectedExerciseMuscleOption[index],
          muscleGroupOptionsPTBR,
          muscleGroupOptions,
        );
        const selectedExecutionTypeOptionEnglish = mapOptionToEnglish(
          selectedExerciseExecutionTypeOption[index],
          executionTypeOptionsPTBR,
          executionTypeOptions,
        );
        const exerciseData: Exercise = {
          id: '1',
          attributes: {
            name,
            slug: name
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
      });
      router.push(`/exercises`);
    } catch (error) {
      console.log(error.message);
      alert('Erro ao salvar');
    }

    setSaving(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      {Array.from({ length: amount }).map((_, i) => (
        <Styled.TextInputGrid key={i} columns={1}>
          <Styled.TextInputGrid columns={2}>
            <TextInput
              name={`exercise-name-${i}`}
              label="Nome"
              value={newName[i]}
              onInputChange={(v) => {
                updateName(i, v);
                updateNameErrorMessage(i, '');
                updateShouldFocusName(i, false);
              }}
              errorMessage={nameErrorMessage[i]}
              hasFocus={shouldFocusName[i] || i == amount - 1}
            />
            <ComboBox
              label="Selecione um Tipo"
              name="type"
              errorMessage="" // Provide an error message if needed
              options={exerciseTypeOptionsPTBR}
              onSelectOption={(selectedOption) => {
                handleUpdateSelectedExerciseTypeOption(i, selectedOption);
              }}
              selectedOptionIndex={0}
            />
          </Styled.TextInputGrid>
          <Styled.TextInputGrid columns={2}>
            <ComboBox
              label="Selecione um Grupo Muscular"
              name="muscle-group"
              errorMessage="" // Provide an error message if needed
              options={muscleGroupOptionsPTBR}
              onSelectOption={(selectedOption) => {
                handleUpdateSelectedExerciseMuscleOption(i, selectedOption);
              }}
              selectedOptionIndex={0}
            />
            <ComboBox
              label="Selecione um Tipo de Execução"
              name="execution-type"
              errorMessage="" // Provide an error message if needed
              options={executionTypeOptionsPTBR}
              onSelectOption={(selectedOption) => {
                handleUpdateSelectedExerciseExecutionTypeOption(
                  i,
                  selectedOption,
                );
              }}
              selectedOptionIndex={0}
            />
          </Styled.TextInputGrid>
        </Styled.TextInputGrid>
      ))}
      <Styled.TextInputGrid columns={1}>
        <Button type="button" onClick={handleAddClick}>
          + Exercícios
        </Button>
      </Styled.TextInputGrid>

      <Button type="submit" disabled={saving}>
        {saving ? 'Salvando...' : 'Salvar'}
      </Button>
    </form>
  );
};
