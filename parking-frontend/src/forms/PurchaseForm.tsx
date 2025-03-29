import { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

interface PurchaseFormProps {
    price: string;
    onClose: () => void;
    onPurchase: () => void; // Колбэк при нажатии на кнопку "Купить"
}

const PurchaseForm = ({ price, onClose, onPurchase }: PurchaseFormProps) => {
    const [loading, setLoading] = useState(false);

    const handlePurchase = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Здесь может быть логика обработки покупки
        onPurchase();

        setLoading(false);
    };

    return (
        <Box
            component="form"
            onSubmit={handlePurchase}
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
                Покупка места
            </Typography>

            <TextField
                label="Стоимость"
                value={`${price} ₽`}
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
                    Отмена
                </Button>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={loading}
                    sx={{ fontWeight: 'bold' }}
                >
                    {loading ? 'Обработка...' : 'Купить'}
                </Button>
            </Box>
        </Box>
    );
};

export default PurchaseForm;