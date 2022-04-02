import React from 'react';
import Tuits from "../../react-test-renderer/tuits/tuits";
import {useEffect, useState} from "react";

const MyDislikes = ({dislikeTuit = []}) => {
    const [dislikedTuits, setDislikedTuits] = useState([]);
    const findTuitsIDislike = () => {
        return dislikeTuit
    };
    useEffect(findTuitsIDislike, []);
    return(
        <div>
            <h1>My Dislikes</h1>
            <Tuits tuits={dislikeTuit}/>
        </div>
    )
}
export default MyDislikes;