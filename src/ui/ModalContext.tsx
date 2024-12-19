import React, { createContext, ReactNode, useContext, useState, useCallback, FC } from 'react';
import { ModalProviderProps } from '../interfaces/ModalProviderProps';
import { ModalContextType } from '../interfaces/ModalContextType';

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: FC<ModalProviderProps> = ({
    children,
}) => {
    const [modalContent, setModalContent] = useState<ReactNode | null>(null);

    const register = useCallback((content: ReactNode) => setModalContent(content), []);
    const unregister = useCallback(() => setModalContent(null), []);

    return (
        <ModalContext.Provider
            value={{ register, unregister }}
        >
            {children}
            {modalContent && (
                <>
                    {modalContent}
                </>
            )}
        </ModalContext.Provider>
    );
};

export const useModalPortal = (): ModalContextType => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModalPortal must be used within a ModalPortalProvider');
    }
    return context;
};
