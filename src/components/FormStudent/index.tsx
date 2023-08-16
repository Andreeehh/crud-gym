import * as Styled from './styles';

import React, { useState, useRef } from 'react';
import { Button } from '../Button';
import { TextInput } from '../TextInput';
import * as StyledInput from '../TextInput/styles';
import { CreateStrapiStudent } from '../../types/CreateStrapiStudent';
import { StrapiStudent } from '../../types/StrapiStudent';
import { CheckboxItem } from 'components/CheckBoxItem';
import { Email, Style } from '@styled-icons/material-outlined';
import InputMask from 'react-input-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { getNumberFromBoolean } from 'utils/math-utils';
import { RadioButton } from 'components/RadioButton';
import { Label } from 'components/Label';
import { ComboBox } from 'components/ComboBox';

export type FormStudentProps = {
  onSave?: (post: CreateStrapiStudent) => Promise<void>;
  student?: StrapiStudent;
};

export const injuryOptions = [
  'SHOULDER',
  'ANKLE',
  'LOWER BACK',
  'NECK',
  'KNEE',
  'HIP',
  'WRIST',
  'OTHER',
];

export const injuryOptionsPTBR = [
  'Ombro',
  'Tornozelo',
  'Lombar',
  'Pescoço',
  'Joelho',
  'Quadril',
  'Pulso',
  'Outro',
];

export const goalsOptions = [
  'MASS GAIN',
  'WEIGHT LOSS',
  'MOBILITY INCREASE',
  'INJURY RECOVERY',
  'OTHER',
];

export const goalsOptionsPTBR = [
  'Ganho de massa',
  'Perda de peso',
  'Aumento de mobilidade',
  'Recuperação de lesão',
  'Outro',
];

export const injurySeverity = ['1', '2', '3', '4', '5'];

export const FormStudent = ({ student, onSave }: FormStudentProps) => {
  const { attributes, id = '' } = student || {};
  const [saving, setSaving] = useState(false);
  const name = '';
  const weight = '';
  const height = '';
  const notes = '';
  if (attributes) {
    //todo
  }
  const genderOptions = [
    { id: 'male', displayName: 'Masculino' },
    { id: 'female', displayName: 'Feminino' },
  ];

  const initialGender = attributes ? attributes.gender : 'male';
  const initialInjury = attributes
    ? getNumberFromBoolean(attributes.hasInjuries)
    : 0;

  const [newName, setNewName] = useState(attributes ? name : '');
  const [nameErrorMessage, setNameErrorMessage] = useState('');
  const [shouldFocusName, setShouldFocusName] = useState(false);
  const [newWeight, setNewWeight] = useState(attributes ? weight : '');
  const [weightErrorMessage, setWeightErrorMessage] = useState('');
  const [shouldFocusWeight, setShouldFocusWeight] = useState(false);
  const [newHeight, setNewHeight] = useState(attributes ? height : '');
  const [heightErrorMessage, setHeightErrorMessage] = useState('');
  const [shouldFocusHeight, setShouldFocusHeight] = useState(false);
  const [newNotes, setNewNotes] = useState(attributes ? notes : '');
  const [notesErrorMessage, setNotesErrorMessage] = useState('');
  const [shouldFocusNotes, setShouldFocusNotes] = useState(false);
  const [selectedGender, setSelectedGender] = useState(initialGender);
  const [selectedInjury, setSelectedInjury] = useState(initialInjury);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [hasInjuries, setHasInjuries] = useState(false);
  const [isOnDiet, setIsOnDiet] = useState(false);
  const [selectedInjuryTypeOption, setSelectedInjuryTypeOption] = useState('');
  const [selectedInjurySeverityOption, setSelectedInjurySeverityOption] =
    useState('');
  const [selectedGoalOption, setSelectedGoalOption] = useState('');

  const handleSelectInjuryTypeOption = (option) => {
    setSelectedInjuryTypeOption(option);
  };

  const handleSelectInjurySeverityOption = (option) => {
    setSelectedInjurySeverityOption(option);
  };

  const handleSelectGoalOption = (option) => {
    setSelectedGoalOption(option);
  };

  const handleInjuriesChange = (value: string) => {
    setHasInjuries(value === 'yes');
  };

  const handleDietChange = (value: string) => {
    setIsOnDiet(value === 'yes');
  };

  const handleGenderChange = (id: string, isChecked: boolean) => {
    setSelectedGender(isChecked ? id : '');
  };

  const handleInjuryChange = (id: number, isChecked: boolean) => {
    setSelectedInjury(isChecked ? id : 0);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setSaving(true);

    if (onSave) {
      // await onSave();
    }
    alert('Mudanças salvas');

    setSaving(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        name="student-name"
        label="Nome"
        value={newName}
        onInputChange={(v) => {
          setNewName(v);
          setNameErrorMessage('');
        }}
        errorMessage={nameErrorMessage}
        hasFocus={shouldFocusName}
      />
      <Styled.TextInputGrid columns={2}>
        <ComboBox
          label="Selecione uma Objetivo"
          name="Goal"
          errorMessage="" // Provide an error message if needed
          options={goalsOptionsPTBR}
          onSelectOption={handleSelectGoalOption}
        />
      </Styled.TextInputGrid>
      <Styled.TextInputGrid columns={2}>
        <TextInput
          name="student-email"
          label="E-mail"
          onInputChange={(v) => setEmail(v)}
          value={email}
          icon={<Email />}
          type="email"
        />
        <InputMask
          mask="(99) 9 9999-9999"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        >
          {(inputProps) => (
            <StyledInput.Wrapper>
              <StyledInput.InputWrapper>
                <StyledInput.Input
                  name="student-phone"
                  placeholder="Telefone Celular"
                  {...inputProps}
                />
                <StyledInput.Label htmlFor="student-phone" element="input">
                  Telefone Celular
                </StyledInput.Label>
              </StyledInput.InputWrapper>
            </StyledInput.Wrapper>
          )}
        </InputMask>
      </Styled.TextInputGrid>

      <Styled.TextInputGrid columns={4}>
        <TextInput
          name="student-weight"
          label="Peso"
          value={newWeight}
          onInputChange={(v) => {
            setNewWeight(v);
            setWeightErrorMessage('');
          }}
          errorMessage={weightErrorMessage}
          hasFocus={shouldFocusWeight}
          type="number"
        />
        <TextInput
          name="student-height"
          label="Tamanho"
          value={newHeight}
          onInputChange={(v) => {
            setNewHeight(v);
            setHeightErrorMessage('');
          }}
          errorMessage={heightErrorMessage}
          hasFocus={shouldFocusHeight}
          type="number"
        />
        <CheckboxItem
          item={genderOptions[0]}
          isChecked={selectedGender === genderOptions[0].id}
          onCheckboxChange={handleGenderChange}
          firstItem={true}
        />
        <CheckboxItem
          item={genderOptions[1]}
          isChecked={selectedGender === genderOptions[1].id}
          onCheckboxChange={handleGenderChange}
          firstItem={false}
        />
      </Styled.TextInputGrid>
      <Styled.TextInputGrid columns={6}>
        <Label title="Lesões?" />
        <RadioButton
          label="Sim"
          name="has-injuries"
          value="yes"
          checked={hasInjuries}
          onRadioButtonChange={handleInjuriesChange}
          firstItem={false}
        />
        <RadioButton
          label="Não"
          name="has-not-injuries"
          value="no"
          checked={!hasInjuries}
          onRadioButtonChange={handleInjuriesChange}
          firstItem={false}
        />
        <Label title="Em Dieta?" />
        <RadioButton
          label="Sim"
          name="is-on-diet"
          value="yes"
          checked={isOnDiet}
          onRadioButtonChange={handleDietChange}
          firstItem={false}
        />
        <RadioButton
          label="Não"
          name="is-not-on-diet"
          value="no"
          checked={!isOnDiet}
          onRadioButtonChange={handleDietChange}
          firstItem={false}
        />
      </Styled.TextInputGrid>

      {hasInjuries && (
        <Styled.TextInputGrid columns={2}>
          <ComboBox
            label="Selecione uma Lesão"
            name="injuryRegion"
            errorMessage="" // Provide an error message if needed
            options={injuryOptionsPTBR}
            onSelectOption={handleSelectInjuryTypeOption}
          />
          <ComboBox
            label="Selecione um nível de gravidade"
            name="injurySeverity"
            errorMessage="" // Provide an error message if needed
            options={injurySeverity}
            onSelectOption={handleSelectInjurySeverityOption}
          />
        </Styled.TextInputGrid>
      )}

      <TextInput
        name="student-notes"
        label="Observações"
        value={newNotes}
        onInputChange={(v) => {
          setNewNotes(v);
          setNotesErrorMessage('');
        }}
        as="textarea"
        errorMessage={notesErrorMessage}
        hasFocus={shouldFocusNotes}
      />

      <Button type="submit" disabled={saving}>
        {saving ? 'Salvando...' : 'Salvar'}
      </Button>
    </form>
  );
};
