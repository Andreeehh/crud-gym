import { Button } from 'components/Button';
import { useState } from 'react';
import { Exercise } from 'types/Exercise';
import * as Styled from '../FormStudent/styles';
import { Student } from 'types/Student';

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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

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

  return (
    <form onSubmit={handleSubmit}>
      <Button type="submit" disabled={saving}>
        {saving ? 'Salvando...' : 'Salvar'}
      </Button>
    </form>
  );
};
