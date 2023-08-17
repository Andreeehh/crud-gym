import { Gender } from './Gender';
import { Goal } from './Goal';
import { InjuryRegion } from './InjuryRegion';

export type Student = {
  id: string;
  attributes: StudentAttributes;
};

export type StudentAttributes = {
  name: string;
  slug: string;
  email?: string;
  gender: Gender;
  goal: Goal;
  phone?: string;
  height?: number;
  weight?: number;
  isOnDiet: boolean;
  hasInjuries: boolean;
  injuryRegion?: InjuryRegion | null;
  injurySeverity?: number | null;
  notes?: string;
};
