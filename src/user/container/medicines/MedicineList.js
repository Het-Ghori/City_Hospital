import React from 'react';
import CustomCard from '../../UI/CustomCard';
import Loader from '../../UI/loader/Loader';
import Error from '../../UI/errorMsg/ErrorMsg'


function MedicineList({ mediData, handleCart, loading, error, addToFavourite, removeToFavourite, favItmes }) {
    return (
        <>
            {
                loading ?
                    <Loader /> :
                    error ?
                        <Error className='py-5' text={error} /> :
                        mediData.map((v, i) => {
                            return (
                                <div className="col-3 medicineLS" key={v.id}>
                                    <CustomCard
                                        btnText='Add to Cart'
                                        cardData={v}
                                        onclick={handleCart}
                                        addToFavourite={addToFavourite}
                                        removeToFavourite={removeToFavourite}
                                        favItmes={favItmes ? favItmes.some((item) => item.fid === v.id) : null}
                                        favouriteTrue={true}
                                    />
                                </div>
                            )
                        })
            }
        </>
    );
}

export default MedicineList;