import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    capText: {
        textTransform: 'capitalize',
    }
});

function Pokemon() {
    const classes = useStyles();
    const {id} = useParams();
    const history = useHistory();
    const fullImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;

    const [pokemonDetails, setpokemonDetails] = useState({})

    useEffect(() => {
        const getPokemonDetails = async () => {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            const json = await response.json();        
            setpokemonDetails(json);
        }
        getPokemonDetails();
    },[id])

    return (
        <div>
            <button onClick={() => history.goBack() }>go back</button>
            <Typography className={classes.capText} variant='h2'>{pokemonDetails.name}</Typography>
            <img style={{width: '400px', height: '400px'}} src={fullImageUrl} alt={pokemonDetails.name}/>
            <Typography variant='h4'>Base Experience: {pokemonDetails.base_experience}</Typography>
            <Typography variant='h4'>Weight: {pokemonDetails.weight}</Typography>
            <Typography variant='h4'>Height: {pokemonDetails.height}</Typography>
        </div>
    )
}

export default Pokemon
