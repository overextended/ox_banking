import React from 'react';

type ModalSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export type ModalProps = {
  open: boolean;
  title: string;
  description?: string;
  size?: ModalSize | number;
  children: React.ReactNode;
};
