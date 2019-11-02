import React from 'react';
import ReactModal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Button, TextField, Flex, Text, Box, IconContainer } from '../../atoms';
import { StyledReactModal, ModalHeader, StyledIconContainer } from './styles';

ReactModal.setAppElement('#root');

const Modal = (props) => {
    const {modalIsOpen, closeModal } = props;
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
                                icon="user-plus"
                            />
                        </IconContainer>
                        <Text fontSize="1.1rem" color="white" fontWeight="medium">
                            Invite Employee
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
            {/* <Text mb="1rem">We will email the registration link to your employee.</Text>
                <form>
                    <TextField
                        width="100%"
                        type="text"
                        name="email"
                        aria-label="Employee's Email"
                        placeholder="Employee's Email"
                        autoComplete="off"
                        // value={email}
                        // onChange={this.handleChange}
                        mb="1rem"
                    />
                    <br />

                    <Flex justifyContent="flex-end">
                        <Button.secondary mr="1rem">Cancel</Button.secondary>
                        <Button onClick={() => alert("Send Email")}>
                            <Flex>
                                <IconContainer mr="0.5rem" ml="-0.7rem">
                                    <FontAwesomeIcon
                                        icon="paper-plane"
                                    />
                                </IconContainer>
                                <Text>
                                    Send
                            </Text>
                            </Flex>
                        </Button>
                    </Flex>
                </form> */}
        </StyledReactModal>
    );
}

export default Modal;