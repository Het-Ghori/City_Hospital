import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TitleBox from '../UI/titlePart/TitleBox';
import CustomCard from '../UI/CustomCard';
import { addToCart } from '../redux/action/cart.action';
import { setAlert } from '../redux/slice/Alert.slice';
function Favourite() {
    const dispatch = useDispatch();
    const medicineState = useSelector((state) => state.medicines);
    const favouriteState = useSelector(state => state.favourites);

    let mediToFavData = favouriteState.favItmes.map((item) => {
        let filterData = medicineState.medicines.find((medicine) => medicine.id === item.fid);

        return { ...filterData, ...item }
    })

    const handleCart = (id) => {
        let addedCartItem = medicineState.medicines.find((val) => val.id === id)
        dispatch(setAlert({ text: addedCartItem.mediname + ' is successfully added in cart', color: 'success' }))
        dispatch(addToCart(id))
    }
    return (
        <section id="favourite" className="favourite">
            <div className="container">
                <TitleBox
                    titleText='Your Favourites'
                    subTitleText={[
                        'Welcome to favourite. You can see here your favourite product. Thank you !!!'
                    ]} />
                {
                    mediToFavData.length > 0 ?
                        <div className="row justify-content-center pb-4 g-4">
                            {
                                mediToFavData.map((val) => {
                                    return (
                                        <div className="col-xl-3 col-lg-4 col-md-6" key={val.fid}>
                                            <CustomCard cardData={val} onclick={handleCart} btnText={'Add to Cart'} />
                                        </div>
                                    )
                                })
                            }
                        </div> :
                        null
                }
            </div>
        </section>
    );
}

export default Favourite;