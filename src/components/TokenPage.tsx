import React, {FormEventHandler, useState} from 'react';
import {Button, Container, createStyles, Grid, TextField} from "@material-ui/core";
import {makeStyles, Theme} from "@material-ui/core/styles";

interface TokenPageProps {
    onTokenSubmit(token: string): void
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    container: {
        padding: theme.spacing(3),
    }
}))

const TokenPage: React.FC<TokenPageProps> = ({onTokenSubmit}) => {

    const classes = useStyles()

    const [formToken, setFormToken] = useState("")

    const formSubmit: FormEventHandler = (event): void => {
        event.preventDefault()
        onTokenSubmit(formToken)
        setFormToken("")
    }

    return (
        <Container className={classes.container} maxWidth="xs">
            <form onSubmit={formSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField onChange={(e) => setFormToken(e.target.value)}
                                           value={formToken}
                                           fullWidth
                                           label="WaniKani Token"
                                           size="small"
                                           variant="outlined" />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Button color="secondary" fullWidth type="submit" variant="contained">
                            Set Token
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default TokenPage;
