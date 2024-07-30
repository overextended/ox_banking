import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { Character } from '~/src/common/typings';
import { isEnvBrowser } from '@/utils/misc';

const DEBUG_CHARACTER: Character = {
  cash: 3500,
};

const characterAtom = atom<Character>(isEnvBrowser() ? DEBUG_CHARACTER : { cash: 0 });

export const useCharacter = () => useAtomValue(characterAtom);
export const useSetCharacter = () => useSetAtom(characterAtom);
export const useCharacterState = () => useAtom(characterAtom);
