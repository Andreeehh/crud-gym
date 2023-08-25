import { Button } from 'components/Button';
import { Exercise } from 'types/Exercise';
import * as Styled from '../FormStudent/styles';
import { Student } from 'types/Student';
import React, { useState } from 'react';
import { TextInput } from 'components/TextInput';
import { FilterAutocomplete } from 'components/FilterAutocomplete';
import { Label } from 'components/Label';

export type FormTrainingProps = {
  onSave?: (exercise: Exercise) => Promise<void>;
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

  const [loads, setLoads] = useState([]);
  const [loadsErrorMessage, setLoadsErrorMessage] = useState([]);
  const [shouldFocusLoads, setShouldFocusLoads] = useState([]);

  const exercisesNames = exercises.map((ex) => ex.attributes.name);

  const handleAddExercise = () => {
    // Adicionar uma nova linha de exercício à tabela
    const newExercise = {
      exercise,
      series,
    };

    setTrainingData([...trainingData, newExercise]);

    for (let i = 0; i < weeks; i++) {
      setRepetitions([...repetitions, '']);
      setRepetitionsErrorMessage([...repetitionsErrorMessage, '']);
      setShouldFocusRepetitions([...shouldFocusRepetitions, false]);
      setLoads([...loads, '']);
      setLoadsErrorMessage([...loadsErrorMessage, '']);
      setShouldFocusLoads([...shouldFocusLoads, false]);
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

  const updateLoads = (indexToUpdate, newLoadsValue) => {
    const updatedArray = [...loads];
    updatedArray[indexToUpdate] = newLoadsValue;
    setLoads(updatedArray);
  };

  const updateLoadsErrorMessage = (
    indexToUpdate,
    newLoadsErrorMessageValue,
  ) => {
    const updatedArray = [...loadsErrorMessage];
    updatedArray[indexToUpdate] = newLoadsErrorMessageValue;
    setLoadsErrorMessage(updatedArray);
  };

  const updateShouldFocusLoads = (indexToUpdate, newShouldFocusLoads) => {
    const updatedArray = [...shouldFocusLoads];
    updatedArray[indexToUpdate] = newShouldFocusLoads;
    setShouldFocusLoads(updatedArray);
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

    // Verifique os campos de cargas
    loads.forEach((value, index) => {
      if (value === '') {
        updateLoadsErrorMessage(index, 'Campo obrigatório');
        updateShouldFocusLoads(index, true);
        formIsValid = false;
      }
    });

    return formIsValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return; // Não envie o formulário se não for válido
    }

    setSaving(true);
    try {
      if (onSave) {
        // await onSave();
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
        />
        <Button type="button" onClick={handleWeekClick}>
          Continuar
        </Button>
      </>
    );
  }

  return (
    <>
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
        <Styled.TextInputGrid columns={2 + 2 * weeks} key={exerciseIndex}>
          <TextInput
            name={`exercise-name${exerciseIndex + 1}`}
            value={exerciseData.exercise}
            label={`Exercício ${exerciseIndex + 1}`}
            readOnly={true}
          />
          <TextInput
            name={`exercise-series${exerciseIndex + 1}`}
            value={exerciseData.series}
            label="Séries"
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
              <TextInput
                name={'load-week-' + weekIndex}
                label="Carga"
                value={loads[exerciseIndex * weeks + weekIndex]}
                onInputChange={(v) => {
                  const fieldIndex = exerciseIndex * weeks + weekIndex;
                  updateLoads(fieldIndex, v);
                  updateLoadsErrorMessage(fieldIndex, '');
                  updateShouldFocusLoads(fieldIndex, false);
                }}
                errorMessage={
                  loadsErrorMessage[exerciseIndex * weeks + weekIndex]
                }
                hasFocus={shouldFocusLoads[exerciseIndex * weeks + weekIndex]}
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
