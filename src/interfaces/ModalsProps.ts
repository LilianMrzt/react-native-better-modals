import { Dispatch, ReactNode, SetStateAction } from 'react';
import { StatusBarStyleType } from '../types/StatusBarStyleType';

export interface ModalProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    children: ReactNode;
    backdropOpacity?: number
    statusBarStyle?: StatusBarStyleType
}
