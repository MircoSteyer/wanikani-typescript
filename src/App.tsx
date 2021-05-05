import React, {useEffect, useState} from 'react';
import {QueryClient, QueryClientProvider} from "react-query";
import LevelProgression from "./components/LevelProgression";
import Assignments from "./components/Assignments";
import annotationPlugin from 'chartjs-plugin-annotation';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {Chart} from "chart.js";
import NavigationBar from "./components/NavigationBar";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import {Redirect} from "react-router"
import TokenPage from "./components/TokenPage";
import wanikaniService from "./services/wanikani"


Chart.register(annotationPlugin, ChartDataLabels)
const queryClient = new QueryClient()


interface AppProps {
}

const App: React.FC<AppProps> = () => {

    const [userToken, setUserToken] = useState("")

    useEffect(() => {
        const userToken = window.localStorage.getItem("wanikani-token")
        if(userToken) {
            setUserToken(userToken)
            wanikaniService.setApiToken(userToken)
        }
    }, [])

    const onTokenSubmit = (token: string): void => {
        setUserToken(token)
        wanikaniService.setApiToken(token)
        window.localStorage.setItem("wanikani-token", token)
    }

    const resetToken = (): void => {
        wanikaniService.setApiToken("")
        window.localStorage.removeItem("wanikani-token")
        setUserToken("")
        queryClient.removeQueries()
    }

    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <NavigationBar resetToken={resetToken}/>
                <Switch>
                    <Route exact path={"/"}>
                        {userToken ? <Redirect to={"/dashboard"}/> : <Redirect to={"/token"} />}
                    </Route>
                    <Route path={"/token"}>
                        {userToken ? <Redirect to={"/dashboard"}/> : <TokenPage onTokenSubmit={onTokenSubmit}/>}
                    </Route>
                    <Route path={"/dashboard"}>
                        <LevelProgression/>
                        <Assignments/>
                    </Route>
                </Switch>
            </Router>
        </QueryClientProvider>
    )
}

export default App
