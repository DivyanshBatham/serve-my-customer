import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import firebase, { auth } from '../../../config/clientSdk';
import { AuthContext } from '../../../context/AuthContext';
import { Flex, Text, Button, Box, TextField, IconContainer } from '../../../atoms';
import { Loader } from '../../../components';
import { Modal } from '../../../modules';
import { ErrorText } from './styles';

const AccountSettings = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [deletingUser, setDeletingUser] = useState(false);
    const { user } = useContext(AuthContext);

    const closeModal = () => {
        setModalIsOpen(false);
    }

    const openModal = () => {
        setModalIsOpen(true);
    }

    const deleteUser = async (e) => {
        e.preventDefault();
        setDeletingUser(true);
        if (await reauthenticateUser()) {
            auth.currentUser.delete().then(function () {
                // User deleted.
                setDeletingUser(false);
            }).catch(function (error) {
                // An error happened.
                console.log(error);
                setDeletingUser(false);
            });
        }
    }

    const reauthenticateUser = async () => {
        const user = auth.currentUser;

        const credentail = firebase.auth.EmailAuthProvider.credential(
            user.email,
            password
        )

        try {
            await auth.currentUser.reauthenticateWithCredential(credentail);
            return true;
        } catch (err) {
            console.log(err);
            setError('The password is invalid');
            setDeletingUser(false);
            return false;
        }
    }

    const handleChange = (e) => {
        setPassword(e.target.value);
    }

    return (
        <>
            <h2>Account Settings</h2>

            <Box mt="1rem">
                <h3>Delete Account:</h3>
            </Box>
            <Text>Once you delete your account, there is no going back. Please be certain.</Text>
            
            <ul>
                {user.admin ? (
                    <>
                        <li>Delete your account & company account</li>
                        <li>Delete All the session data</li>
                        <li>Delete All the employees accounts</li>
                    </>
                ) : (
                        <li>Delete your account</li>
                    )}
            </ul>

            <Button m="2rem 1.5rem" onClick={openModal}>
                {false ?
                    (
                        <Loader sizes={['0.6rem', '0.7rem', '0.6rem']} bg="tertiaryText" />
                    ) : (
                        <Text>Delete your account</Text>
                    )
                }
            </Button>


            <Modal
                closeModal={closeModal}
                modalIsOpen={modalIsOpen}
                icon="exclamation-triangle"
                modalTitle="Delete Account"
            >
                <Text mb="1rem">
                    Once you delete your account, there is no going back.
                    <ul>
                        {user.admin ? (
                            <>
                                <li>Delete your account & company account</li>
                                <li>Delete All the session data</li>
                                <li>Delete All the employees accounts</li>
                            </>
                        ) : (
                                <li>Delete your account</li>
                            )}
                    </ul>
                </Text>
                <form onSubmit={deleteUser}>
                    <TextField
                        width="100%"
                        type="password"
                        name="password"
                        aria-label="Enter your password"
                        placeholder="Enter your password"
                        autoComplete="off"
                        value={password}
                        onChange={handleChange}
                        mb="1rem"
                    />
                    {error && <ErrorText>* {error}</ErrorText>}

                    <Flex justifyContent="flex-end">
                        <Button onClick={deleteUser} width="364px">
                            {deletingUser ? (
                                <Loader sizes={['0.6rem', '0.7rem', '0.6rem']} bg="tertiaryText" />
                            )
                                : (
                                    <Flex.verticallyCenter>
                                        <IconContainer mr="0.5rem" ml="-0.7rem">
                                            <FontAwesomeIcon
                                                icon="trash"
                                            />
                                        </IconContainer>
                                        <Text>I Understand, Delete the account</Text>
                                    </Flex.verticallyCenter>
                                )
                            }
                        </Button>
                    </Flex>
                </form>
            </Modal>
        </>
    );
}

export default AccountSettings;