import * as Styled from './styles';

import React, { useState } from 'react';
import { Button } from '../Button';
import { TextInput } from '../TextInput';
import { CreateStrapiStudent } from '../../types/CreateStrapiStudent';
import { StrapiStudent } from '../../types/StrapiStudent';

export type FormStudentProps = {
  onSave?: (post: CreateStrapiStudent) => Promise<void>;
  student?: StrapiStudent;
};

export const FormStudent = ({ student, onSave }: FormStudentProps) => {
  const { attributes, id = '' } = student || {};
  const [saving, setSaving] = useState(false);
  const name = '';
  const weight = '';
  const notes = '';
  if (attributes) {
    //todo
  }

  const [newName, setNewName] = useState(attributes ? name : '');
  const [nameErrorMessage, setNameErrorMessage] = useState('');
  const [shouldFocusName, setShouldFocusName] = useState(false);
  const [newWeight, setNewWeight] = useState(attributes ? weight : '');
  const [weightErrorMessage, setWeightErrorMessage] = useState('');
  const [shouldFocusWeight, setShouldFocusWeight] = useState(false);
  const [newNotes, setNewNotes] = useState(attributes ? notes : '');
  const [notesErrorMessage, setNotesErrorMessage] = useState('');
  const [shouldFocusNotes, setShouldFocusNotes] = useState(false);

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
