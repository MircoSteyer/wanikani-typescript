import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    }),
);

interface NavigationBarProps {
    resetToken(): void
}

const NavigationBar: React.FC<NavigationBarProps> = ({resetToken}) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Wanikani Dashboard
                    </Typography>
                        <Link to={"/token"}>
                            <Button color="inherit" onClick={resetToken}>
                                New Token
                            </Button>
                        </Link>
                </Toolbar>
            </AppBar>
        </div>
    )
};

export default NavigationBar
