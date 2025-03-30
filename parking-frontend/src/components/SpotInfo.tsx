import { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

interface SpotInfoProps {
    onClose: () => void;
    vehicle: string
}

const SpotInfo = ({ onClose, vehicle }: SpotInfoProps) => {
    const [loading, setLoading] = useState(false);


    return (
        <Box
            component="form"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
                maxWidth: 400,
                mx: 'auto',
                p: 3,
                borderRadius: 2,
                bgcolor: 'background.paper',
                boxShadow: 1
            }}
        >
            <Typography variant="h6" align="center">
                Место занято
            </Typography>

            <TextField
                label="Номер машины"
                value={`${vehicle}`}
                InputProps={{
                    readOnly: true,
                }}
                fullWidth
                sx={{
                    '& .MuiInputBase-input': {
                        fontWeight: 'bold',
                        fontSize: '1.2rem',
                        textAlign: 'center'
                    }
                }}
            />

            <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                    variant="outlined"
                    fullWidth
                    onClick={onClose}
                >
                    Назад
                </Button>
            </Box>
        </Box>
    );
};

export default SpotInfo;