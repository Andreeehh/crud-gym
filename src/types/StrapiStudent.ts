import { Gender } from './Gender';
import { Goal } from './Goal';
import { InjuryRegion } from './InjuryRegion';

export type StrapiStudent = {
  id?: string;
  attributes: {
    name: string;
    slug: string;
    email: string;
    password: string;
    phone: string;
    height: number;
    gender: Gender;
    weight: number;
    isOnDiet: boolean;
    hasInjuries: boolean;
    injuryRegion: InjuryRegion;
    injurySeverity: number;
    goal: Goal;
    notes: string;
    createdAt?: string;
  };
};
