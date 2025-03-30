import * as React from 'react';
import {Box, Button, Modal, Typography, Stack} from '@mui/material';
import BookingForm from "../forms/BookingForm.tsx";
import PurchaseForm from "../forms/PurchaseForm.tsx";
import SpotInfo from "../components/SpotInfo.tsx";
import {useLocation} from "react-router-dom";
import {ParkingSpotStatus} from "../constants/enum.ts";


const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    textAlign: 'center'
};

interface BookingModalProps {
    open: boolean;
    onClose: () => void;
    spotNumber: string;
    onBook: (bookingDetails: {
        start: string;
        end: string;
    }) => void;
    onPurchase?: () => void;
    status: string
}

function BookingModal({open, onClose, spotNumber, onBook, onPurchase, status}: BookingModalProps) {
    const [activeForm, setActiveForm] = React.useState<'choice' | 'booking' | 'another'>('choice');

    const handleClose = () => {
        setActiveForm('choice');
        onClose();
    };

    const location = useLocation();
    const user = location.state?.user;

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={modalStyle}>
                {activeForm === 'choice' && (
                    <>
                        <Typography variant="h6" gutterBottom>
                            Выберите действие для места {spotNumber}
                        </Typography>
                        <Stack spacing={2}>
                            <Button
                                variant="contained"
                                onClick={() => setActiveForm('booking')}
                            >
                                Забронировать
                            </Button>
                            {
                                user.userType === "REGULAR_USER_TYPE" &&
                                <Button
                                    variant="outlined"
                                    onClick={() => setActiveForm('another')}
                                >
                                    Купить
                                </Button>
                            }
                            <Button
                                variant="text"
                                onClick={handleClose}
                                sx={{mt: 2}}
                            >
                                Отмена
                            </Button>
                        </Stack>
                    </>
                )}

                {activeForm === 'booking' && (
                    (user.userType === "REGULAR_USER_TYPE" &&
                        <BookingForm
                            number={spotNumber}
                            userId={user.userId}
                            onClose={() => setActiveForm('choice')}
                            onBook={(details) => {
                                onBook(details);
                                handleClose();
                            }}
                        />)

                    ||
                    (user.userType === "ADMINISTRATOR_USER_TYPE" &&
                        (status === ParkingSpotStatus.FreeParkingLotStatus &&
                            <BookingForm
                                number={spotNumber}
                                userId={user.userId}
                                onClose={() => setActiveForm('choice')}
                                onBook={(details) => {
                                    onBook(details);
                                    handleClose();
                                }}
                            />
                        )
                        ||
                        (status !== ParkingSpotStatus.FreeParkingLotStatus &&
                            <SpotInfo
                                vehicle={"vehicle"}
                                onClose={() => setActiveForm('choice')}
                            />
                        )
                    )
                )}

                {activeForm === 'another' &&
                    (user.userType === "REGULAR_USER_TYPE" &&
                        <PurchaseForm
                            price="1500"
                            onClose={() => setActiveForm('choice')}
                            onPurchase={() => {
                                onPurchase()
                                console.log('Покупка совершена');
                                handleClose();
                            }}
                        />)
                }

            </Box>
        </Modal>
    );
}

export default BookingModal;