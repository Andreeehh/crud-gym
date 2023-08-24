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
import {
  executionTypeOptions,
  executionTypeOptionsPTBR,
  exerciseTypeOptions,
  exerciseTypeOptionsPTBR,
  muscleGroupOptions,
  muscleGroupOptionsPTBR,
} from 'components/FormBulkExercise';

export type FormSameTypeExerciseProps = {
  onSave?: (exercise: Exercise) => Promise<void>;
  createdExercises?: Exercise[];
};

export const FormSameTypeExercise = ({
  onSave,
  createdExercises,
}: FormSameTypeExerciseProps) => {
  const router = useRouter();
  const [amount, setAmount] = useState(1);
  const [newName, setNewName] = useState(['']);
  const [saving, setSaving] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState(['']);
  const [shouldFocusName, setShouldFocusName] = useState([true]);
  const [selectedExerciseTypeOption, setSelectedExerciseTypeOption] =
    useState('Puxar');

  const [selectedExerciseMuscleOption, setSelectedExerciseMuscleOption] =
    useState('Parte Superior do Corpo');

  const [
    selectedExerciseExecutionTypeOption,
    setSelectedExerciseExecutionTypeOption,
  ] = useState('Isométrico');

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

  const handleSelectTypeOption = (option) => {
    setSelectedExerciseTypeOption(option);
  };

  const handleSelectMuscleOption = (option) => {
    setSelectedExerciseMuscleOption(option);
  };

  const handleSelectExecutionTypeOption = (option) => {
    setSelectedExerciseExecutionTypeOption(option);
  };

  const handleAddClick = () => {
    setAmount(amount + 1);
    setNewName([...newName, '']);
    setNameErrorMessage([...nameErrorMessage, '']);
    setShouldFocusName([...shouldFocusName, false]);
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
      newName.forEach(async (name) => {
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
      <Styled.TextInputGrid columns={3}>
        <ComboBox
          label="Selecione um Tipo"
          name="type"
          errorMessage="" // Provide an error message if needed
          options={exerciseTypeOptionsPTBR}
          onSelectOption={handleSelectTypeOption}
          selectedOptionIndex={0}
        />
        <ComboBox
          label="Selecione um Grupo Muscular"
          name="group-muscle"
          errorMessage="" // Provide an error message if needed
          options={muscleGroupOptionsPTBR}
          onSelectOption={handleSelectMuscleOption}
          selectedOptionIndex={0}
        />
        <ComboBox
          label="Selecione um Tipo de Execução"
          name="execution-type"
          errorMessage="" // Provide an error message if needed
          options={executionTypeOptionsPTBR}
          onSelectOption={handleSelectExecutionTypeOption}
          selectedOptionIndex={0}
        />
      </Styled.TextInputGrid>
      {Array.from({ length: amount }).map((_, i) => (
        <Styled.TextInputGrid key={i} columns={1}>
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
