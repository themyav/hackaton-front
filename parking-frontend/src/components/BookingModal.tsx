import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import BookingForm from "./BookingForm.tsx";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2,
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
}

function BookingModal({ open, onClose, spotNumber, onBook }: BookingModalProps) {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <BookingForm
                    spotNumber={spotNumber}
                    onClose={onClose}
                    onBook={onBook}
                />
            </Box>
        </Modal>
    );
}

export default BookingModal;