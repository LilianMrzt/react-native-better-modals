import React, { FC, useEffect, useRef } from 'react';
import {
    StyleSheet,
    TouchableWithoutFeedback,
    StatusBar,
    BackHandler,
    Animated,
    View,
} from 'react-native';
import { useModalPortal } from './ModalContext';
import { ModalProps } from '../interfaces/ModalsProps';
import { StatusBarStyleType } from '../types/StatusBarStyleType';

const Modal: FC<ModalProps> = ({
    isOpen,
    setIsOpen,
    children,
    backdropOpacity = 0.5,
    statusBarStyle = 'light-content',
}) => {
    const { register, unregister } = useModalPortal();
    const opacity = useRef(new Animated.Value(0)).current;

    const openModal = () => {
        opacity.setValue(0);
        Animated.timing(opacity, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
        }).start();
    };

    const closeModal = () => {
        Animated.timing(opacity, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true,
        }).start(() => {
            unregister();
            setIsOpen(false);
        });
    };

    useEffect(() => {
        const onBackPress = () => {
            if (isOpen) {
                closeModal();
                return true;
            }
            return false;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            onBackPress
        );

        return () => backHandler.remove();
    }, [isOpen, setIsOpen]);

    useEffect(() => {
        if (isOpen) {
            openModal();

            register(
                <TouchableWithoutFeedback
                    onPress={closeModal}
                >
                    <View
                        style={styles.overlay}
                    >
                        <View
                            style={styles.statusBarBackground}
                        />
                        <Animated.View
                            style={[
                                styles.overlay,
                                {
                                    opacity,
                                    backgroundColor: `rgba(0, 0, 0, ${backdropOpacity})`,
                                },
                            ]}
                        >
                            <StatusBar
                                backgroundColor={'transparent'}
                                barStyle={statusBarStyle as StatusBarStyleType}
                            />
                            <TouchableWithoutFeedback>
                                {children}
                            </TouchableWithoutFeedback>
                        </Animated.View>
                    </View>
                </TouchableWithoutFeedback>
            );
        } else {
            closeModal();
        }

        return () => unregister();
    }, [isOpen, register, unregister, setIsOpen, children, opacity]);

    return null;
};

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    statusBarBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: StatusBar.currentHeight || 24,
        backgroundColor: 'white',
    },
});

export default Modal;
