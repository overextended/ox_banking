import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { ModalProps } from '@/typings/modal';

const modalContainerAtom = atom<HTMLElement | null>(null);

const modalAtom = atom<ModalProps>({
  open: false,
  title: '',
  description: '',
  children: null,
});

export const useModalContainer = () => useAtomValue(modalContainerAtom);
export const useSetModalContainer = () => useSetAtom(modalContainerAtom);

export const useSetModal = () => useSetAtom(modalAtom);
export const useModalState = () => useAtom(modalAtom);
