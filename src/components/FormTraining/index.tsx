import { Button } from 'components/Button';
import { Exercise } from 'types/Exercise';
import * as Styled from '../FormStudent/styles';
import { Student } from 'types/Student';
import React, { useState } from 'react';
import { TextInput } from 'components/TextInput';
import { FilterAutocomplete } from 'components/FilterAutocomplete';
import { Label } from 'components/Label';
import { TrainingData } from 'types/Training';
import { ExercisePerformanceData } from 'types/ExercisePerformance';
import { getExerciseByName } from 'utils/exercises';
import { randomInt } from 'utils/math-utils';

export type FormTrainingProps = {
  onSave?: (
    training: TrainingData,
    exercisePerformances: ExercisePerformanceData[],
  ) => Promise<void>;
  exercises: Exercise[];
  students: Student[];
};

export const FormTraining = ({
  onSave,
  exercises,
  students,
}: FormTrainingProps) => {
  const [saving, setSaving] = useState(false);
  const [trainingData, setTrainingData] = useState([]);
  const [exercise, setExercise] = useState('');
  const [series, setSeries] = useState(3);
  const [weeks, setWeeks] = useState(0);
  const [weeksField, setWeeksField] = useState('1');

  const [repetitions, setRepetitions] = useState([]);
  const [repetitionsErrorMessage, setRepetitionsErrorMessage] = useState([]);
  const [shouldFocusRepetitions, setShouldFocusRepetitions] = useState([]);

  const exercisesNames = exercises.map((ex) => ex.attributes.name);

  const [name, setName] = useState('');
  const [nameErrorMessage, setNameErrorMessage] = useState('');
  const [shouldFocusName, setShouldFocusName] = useState(false);
  const [description, setDescription] = useState('');

  const handleAddExercise = () => {
    // Adicionar uma nova linha de exercício à tabela
    if (getExerciseByName(exercise, exercises) == null) {
      alert('Digite um nome de exercício existente');
      return;
    }
    const newExercise = {
      exercise,
      series,
    };

    setTrainingData([...trainingData, newExercise]);

    for (let i = 0; i < weeks; i++) {
      setRepetitions([...repetitions, '']);
      setRepetitionsErrorMessage([...repetitionsErrorMessage, '']);
      setShouldFocusRepetitions([...shouldFocusRepetitions, false]);
    }

    // Limpar os campos de entrada após adicionar o exercício
    setExercise('');
  };

  const updateRepetitions = (indexToUpdate, newRepetitionsValue) => {
    const updatedArray = [...repetitions];
    updatedArray[indexToUpdate] = newRepetitionsValue;
    setRepetitions(updatedArray);
  };

  const updateRepetitionsErrorMessage = (
    indexToUpdate,
    newRepetitionsErrorMessageValue,
  ) => {
    const updatedArray = [...repetitionsErrorMessage];
    updatedArray[indexToUpdate] = newRepetitionsErrorMessageValue;
    setRepetitionsErrorMessage(updatedArray);
  };

  const updateShouldFocusRepetitions = (
    indexToUpdate,
    newShouldFocusRepetitions,
  ) => {
    const updatedArray = [...shouldFocusRepetitions];
    updatedArray[indexToUpdate] = newShouldFocusRepetitions;
    setShouldFocusRepetitions(updatedArray);
  };

  const validateForm = () => {
    let formIsValid = true;

    // Verifique os campos de repetições
    repetitions.forEach((value, index) => {
      if (value === '') {
        updateRepetitionsErrorMessage(index, 'Campo obrigatório');
        updateShouldFocusRepetitions(index, true);
        formIsValid = false;
      }
    });

    if (name === '') {
      setShouldFocusName(true);
      setNameErrorMessage('Adicione um nome');
      formIsValid = false;
    }

    return formIsValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return; // Não envie o formulário se não for válido
    }

    const exercisePerformances: ExercisePerformanceData[] = [];
    trainingData.forEach((t, index) => {
      const exercise = getExerciseByName(
        trainingData[index].exercise as string,
        exercises,
      ).id;
      const series = trainingData[index].series as number;
      Array.from({ length: weeks }).map((_, weekIndex) => {
        const rep = Number(repetitions[index * weeks + weekIndex]);
        const exercisePerformanceData: ExercisePerformanceData = {
          id: '1',
          attributes: {
            repetitionsExpected: rep,
            series,
            exercise,
            orderNumber: weekIndex,
          },
        };
        exercisePerformances.push(exercisePerformanceData);
      });
    });

    const trainingToData: TrainingData = {
      id: '1',
      attributes: {
        name: name,
        slug:
          name
            .replace(/ /g, '-')
            .replace(/[^0-9a-zA-Z-]+/g, '')
            .toLowerCase()
            .slice(0, 40) + randomInt(0, 1000),
        weekAmount: weeks,
      },
    };

    setSaving(true);
    try {
      if (onSave) {
        await onSave(trainingToData, exercisePerformances);
      }
    } catch (error) {
      console.log(error.message);
      alert('Erro ao salvar');
    }

    setSaving(false);
  };

  const handleWeekClick = () => {
    setWeeks(Number(weeksField));
  };

  if (weeks == 0) {
    return (
      <>
        <TextInput
          name="weeks"
          label="Insira uma quantidade de Semanas"
          value={weeksField}
          onInputChange={(v) => {
            setWeeksField(v);
          }}
          errorMessage={''}
          hasFocus={false}
          type="number"
        />
        <Button type="button" onClick={handleWeekClick}>
          Continuar
        </Button>
      </>
    );
  }

  return (
    <>
      <TextInput
        name="name"
        label="Nome"
        value={name}
        onInputChange={(v) => {
          setName(v);
          setNameErrorMessage('');
        }}
        errorMessage={nameErrorMessage}
        hasFocus={!trainingData || shouldFocusName}
      />
      <TextInput
        name="description"
        label="Descrição"
        value={description}
        onInputChange={(v) => {
          setDescription(v);
        }}
        errorMessage={''}
        hasFocus={false}
        as="textarea"
      />
      <Styled.TextInputGrid columns={2}>
        <FilterAutocomplete
          label="Exercício"
          value={exercise}
          onChange={(newValue) => setExercise(newValue)}
          placeholder="Filtro por cidade..."
          options={exercisesNames}
        />
        <TextInput
          name="series"
          value={series.toString()}
          label="Nº séries"
          onInputChange={(v) => setSeries(Number(v))}
          type="number"
        />
      </Styled.TextInputGrid>
      <Styled.TextInputGrid columns={1}>
        <Button type="button" onClick={handleAddExercise}>
          Adicionar Exercício
        </Button>
      </Styled.TextInputGrid>
      {trainingData.length > 0 && (
        <Styled.TextInputGrid columns={1 + weeks}>
          <label></label>
          {Array.from({ length: weeks }).map((_, i) => (
            <>
              <Label title={'Semana ' + (i + 1)}></Label>
            </>
          ))}
        </Styled.TextInputGrid>
      )}

      {trainingData.map((exerciseData, exerciseIndex) => (
        <Styled.TextInputGrid columns={1 + weeks} key={exerciseIndex}>
          <TextInput
            name={`exercise-name${exerciseIndex + 1}`}
            value={exerciseData.exercise}
            label={`Exercício ${exerciseIndex + 1} Séries:${
              exerciseData.series
            }x`}
            readOnly={true}
          />
          {Array.from({ length: weeks }).map((_, weekIndex) => (
            <>
              <TextInput
                name={'repetitions-week-' + weekIndex}
                label="Rep"
                value={repetitions[exerciseIndex * weeks + weekIndex]}
                onInputChange={(v) => {
                  const fieldIndex = exerciseIndex * weeks + weekIndex;
                  updateRepetitions(fieldIndex, v);
                  updateRepetitionsErrorMessage(fieldIndex, '');
                  updateShouldFocusRepetitions(fieldIndex, false);
                }}
                errorMessage={
                  repetitionsErrorMessage[exerciseIndex * weeks + weekIndex]
                }
                hasFocus={
                  (exerciseIndex + 1 === trainingData.length &&
                    weekIndex == 0) ||
                  shouldFocusRepetitions[exerciseIndex * weeks + weekIndex]
                }
                type="number"
              />
            </>
          ))}
        </Styled.TextInputGrid>
      ))}

      <Button type="submit" disabled={saving} onClick={handleSubmit}>
        {saving ? 'Salvando...' : 'Salvar'}
      </Button>
    </>
  );
};
