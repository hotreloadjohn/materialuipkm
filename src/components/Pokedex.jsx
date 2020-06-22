import React, { useEffect, useState } from 'react'
import { Grid, Card, CardContent, CardMedia, Typography, AppBar, Toolbar } from '@material-ui/core';
import { fade, makeStyles } from "@material-ui/core/styles";
import { useHistory } from 'react-router-dom';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    pokedexContainer: {
        paddingTop: "5%",
        paddingLeft: "5%",
        paddingRight: "5%",
    },
    card: {
        backgroundColor: "#d1f0e8"
    },
    cardMedia: {
        height: "200px",
        width: "200px",
        margin: "auto"
    },
    cardContent: {
        textAlign: "center",
    },
    capText: {
        textTransform: 'capitalize',
    },
    toolbar: {
        display: 'flex',
        flexDirection: 'row-reverse',
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },

    trainerName: {
        marginRight: '120px'
    }
}));



function Pokedex() {

    const classes = useStyles();

    const [pokedexData, setpokedexData] = useState([]);
    const [searchPoke, setSearchPoke] = useState('');
    const history = useHistory();

    useEffect(() => {
        const getPokedexData = async () => {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=807');
            const json = await response.json();

            setpokedexData(json.results);
        }
        getPokedexData();
    }, [])

    const createDexCard = (name, index) => {
        const imgURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`;
        return (
            <Grid key={index} item xs={12} sm={6} md={4} >
                <Card onClick={() => history.push(`pokemon/${index + 1}`)} className={classes.card}>
                    <CardContent className={classes.cardContent}>
                        <Typography className={classes.capText} variant="h4">{name}</Typography>
                    </CardContent>
                    <CardMedia className={classes.cardMedia} image={imgURL} />
                </Card>
            </Grid>
        )
    }

    const handleInput = (e) => {
        setSearchPoke(e.target.value);
    }

    return (
        <>
            <AppBar position="static">
                <Toolbar className={classes.toolbar}>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search Pokemon…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={handleInput}
                        />
                    </div>
                    <Typography className={classes.trainerName} variant='h3'>Pokemon Trainer John</Typography>
                </Toolbar>
            </AppBar>
            <Grid container spacing={3} className={classes.pokedexContainer}>
                {
                    pokedexData.length > 0 ? (
                        pokedexData.map((item, index) => {
                            return item.name.includes(searchPoke) && createDexCard(item.name, index)
                        })
                    ) :   <CircularProgress />
                }
              

            </Grid>
        </>
    )
}

export default Pokedex
