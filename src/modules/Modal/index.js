import React from 'react';
import ReactModal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Button, TextField, Flex, Text, Box, IconContainer } from '../../atoms';
import { StyledReactModal, ModalHeader, StyledIconContainer } from './styles';

ReactModal.setAppElement('#root');

const Modal = (props) => {
    const { modalIsOpen, closeModal, icon, modalTitle } = props;
    return (
        <StyledReactModal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={{
                overlay: {
                    background: 'rgba(0,0,0,0.32)',
                }
            }}
            contentLabel="Example Modal"
        >
            <ModalHeader>
                <Flex.spaceBetween alignItems="center">
                    <Flex>
                        <IconContainer color="white" mr="0.5rem">
                            <FontAwesomeIcon
                                icon={icon}
                            />
                        </IconContainer>
                        <Text fontSize="1.1rem" color="white" fontWeight="medium">
                            {modalTitle}
                        </Text>
                    </Flex>
                    <StyledIconContainer onClick={closeModal}>
                        <FontAwesomeIcon
                            icon="times"
                        />
                    </StyledIconContainer>
                </Flex.spaceBetween>
            </ModalHeader>

            {props.children}

        </StyledReactModal>
    );
}

export default Modal;