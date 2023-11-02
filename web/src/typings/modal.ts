import React from 'react';

export type ModalProps = {
  open: boolean;
  title: string;
  description?: string;
  children: React.ReactNode;
};
