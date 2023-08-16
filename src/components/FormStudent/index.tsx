import * as Styled from './styles';

import React, { useState, useRef } from 'react';
import { Button } from '../Button';
import { TextInput } from '../TextInput';
import * as StyledInput from '../TextInput/styles';
import { CreateStrapiStudent } from '../../types/CreateStrapiStudent';
import { StrapiStudent } from '../../types/StrapiStudent';
import { CheckboxItem } from 'components/CheckBoxItem';
import { Email } from '@styled-icons/material-outlined';
import InputMask from 'react-input-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { getNumberFromBoolean } from 'utils/math-utils';

export type FormStudentProps = {
  onSave?: (post: CreateStrapiStudent) => Promise<void>;
  student?: StrapiStudent;
};

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

  const injuryOptions = [
    { id: 1, displayName: 'Sim' },
    { id: 0, displayName: 'Não' },
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
