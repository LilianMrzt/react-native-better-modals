import { ReactNode } from 'react';

export interface ModalContextType {
    register: (content: ReactNode) => void;
    unregister: () => void;
}
