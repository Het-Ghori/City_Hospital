import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '../UI/button/Button';
import Typography from '@mui/material/Typography';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import FavoriteIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIconFilled from '@mui/icons-material/Favorite';

function CustomCard({ cardData, btnText, onclick, addToFavourite, removeToFavourite, favItmes, favouriteTrue }) {
    return (
        <Card className="p-4 position-relative shadow" style={{ height: '100%', position: 'relative' }}>
            <CardContent className='p-0'>
                <div className='d-flex justify-content-between align-items-center mb-4'>
                    <Typography variant="h5" sx={{
                        fontWeight: '700',
                        fontSize: '20px',
                        color: '#2c4964',
                    }} component="div">
                        {cardData.mediname}
                    </Typography>
                    {
                        favouriteTrue ?
                            favItmes ?
                                <Button size="small" classes='p-0 bg-transparent remove' onClick={() => removeToFavourite(cardData.id)}>
                                    <FavoriteIconFilled sx={{ color: '#FF6337' }} />
                                </Button>
                                :
                                <Button size="small" classes='p-0 bg-transparent add' onClick={() => addToFavourite(cardData.id)}>
                                    <FavoriteIcon sx={{ color: '#FF6337' }} />
                                </Button>
                            : null
                    }

                </div>
                <Typography sx={{ my: 1.5 }} variant="body2">
                    {cardData.medidesc}
                </Typography>
                <Typography color="text.secondary">
                    <b color="text.primary">Price:</b> <CurrencyRupeeIcon fontSize="16px" />
                    {cardData.mediprice}
                </Typography>
                <Typography color="text.secondary">
                    <b color="text.primary">Expriry Date:</b> {cardData.mediexpiry}
                </Typography>

                <CardActions className="more_about_medi py-5">
                    {
                        btnText ?
                            <Button size="small" classes='rounded px-3' onClick={() => onclick(cardData.id)}>{btnText}</Button>
                            : null
                    }
                </CardActions>
            </CardContent>
        </Card >
    );
}

export default CustomCard;