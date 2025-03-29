import * as React from 'react';
import { Box, Button, Modal, Typography, Stack } from '@mui/material';
import BookingForm from "../forms/BookingForm.tsx";
import PurchaseForm from "../forms/PurchaseForm.tsx";


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
        spot: string;
        start: string;
        end: string;
        price: string;
    }) => void;
    onPurchase?: () => void; // Колбэк для второй формы
}

function BookingModal({ open, onClose, spotNumber, onBook, onPurchase }: BookingModalProps) {
    const [activeForm, setActiveForm] = React.useState<'choice' | 'booking' | 'purchse'>('choice');

    const handleClose = () => {
        setActiveForm('choice');
        onClose();
    };

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
                            <Button
                                variant="outlined"
                                onClick={() => setActiveForm('purchse')}
                            >
                                Купить
                            </Button>
                            <Button
                                variant="text"
                                onClick={handleClose}
                                sx={{ mt: 2 }}
                            >
                                Отмена
                            </Button>
                        </Stack>
                    </>
                )}

                {activeForm === 'booking' && (
                    <BookingForm
                        spotNumber={spotNumber}
                        onClose={() => setActiveForm('choice')}
                        onBook={(details) => {
                            onBook(details);
                            handleClose();
                        }}
                    />
                )}

                {activeForm === 'purchse' && (
                    <PurchaseForm
                        price="1500"
                        onClose={() => setActiveForm('choice')}
                        onPurchase={() => {
                            onPurchase()
                            console.log('Покупка совершена');
                            handleClose();
                        }}
                    />
                )}
            </Box>
        </Modal>
    );
}

export default BookingModal;