import React from 'react';
import Typist from 'react-typist';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    welcomeWrapper: {
        width: '100%',
        color: 'white',
    },
    welcomeBig: {
        fontSize: '33px',
        fontWeight: 'bold',
    },
    welcomeBigLast: {
        fontSize: '33px',
        fontWeight: 'bold',
        marginTop: 25,
    },
    welcomeTag: {
        margin: 10,
        fontSize: '25px',
        fontWeight: 'bold',
    },
}));

export default function WelcomeContainer() {
    const classes = useStyles();
    return (
        <div className={classes.welcomeWrapper}>
            <Typist avgTypingDelay={90} cursor={{ show: false }}>
                <p className={classes.welcomeBig}>과 안에서 하나되는 우리,</p>
                <Typist.Delay ms={500} />
                <p className={classes.welcomeTag}>#학과공지</p>
                <Typist.Delay ms={300} />
                <p className={classes.welcomeTag}>#과행사</p>
                <Typist.Delay ms={300} />
                <p className={classes.welcomeTag}>#커뮤니티</p>
                <Typist.Delay ms={300} />
                <p className={classes.welcomeTag}>#질문</p>
                <Typist.Delay ms={300} />
                <p className={classes.welcomeTag}>#재능기부</p>
                <Typist.Delay ms={300} />
                <p className={classes.welcomeTag}>#장터</p>
                <Typist.Delay ms={500} />
                <p className={classes.welcomeBigLast}>우리 같이 키위해요!</p>
            </Typist>
        </div>
    );
}
