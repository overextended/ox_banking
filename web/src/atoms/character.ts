import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { isEnvBrowser } from '../utils/misc';

export interface Character {
  cashBalance: number;
  groups: { [key: string]: number };
}

const characterAtom = atom<Character>({
  key: 'character',
  default: {
    cashBalance: 0,
    groups: {},
  },
});

export const useCharacter = () => useRecoilValue(characterAtom);
export const useSetCharacter = () => useSetRecoilState(characterAtom);
export const useCharacterState = () => useRecoilState(characterAtom);
