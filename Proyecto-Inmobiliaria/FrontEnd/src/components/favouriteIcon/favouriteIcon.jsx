import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { postFav, updateFav } from '../../services/score.service';
import "./favouriteIcon.css";
import { useDispatch, useStore } from '../../store/StoreProvider';
import { types } from '../../store/StoreReducer';

const FavouriteIcon = ({ product }) => {
    const [favourite, setFavourite] = useState(false);
    const navigate = useNavigate();
    const { user, isLogged, favs } = useStore();
    const dispatch = useDispatch();
    const productId = product.id;

    const isFav = () => {
        return favs.some(productFav => productFav.id === productId);
    }

    useEffect(() => {
        if (isLogged) setFavourite(isFav());
    }, [])

    const add = () => {
        postFav(user.id, productId, user.tokenJwt);
    }

    //pasamos de esto, hay que tratar de resolverlo de otra manera
    const modify = () => {
        updateFav(user.id, user.tokenJwt);
    }

    const handleFavoriteClick = () => {
        if (!isLogged) return navigate("/login");

        if (favourite) {
            add();
            dispatch({
                type: types.favsAdd,
                payload: [product]
            });
        }
        setFavourite(!favourite);
    }

    return (
        <>
            {favourite ? <FontAwesomeIcon
                icon={faHeart}
                className="gv-heart-icon-card"
                color="#FF0000"
                onClick={handleFavoriteClick}
            /> : <FontAwesomeIcon
                icon={faHeart}
                className="gv-heart-icon-card"
                color="#fff"
                onClick={handleFavoriteClick}
            />}

        </>
    )
}

export default FavouriteIcon;