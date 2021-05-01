import React from 'react';
import {QueryClient, QueryClientProvider} from "react-query";
import LevelProgression from "./components/LevelProgression";
import Assignments from "./components/Assignments";
import annotationPlugin from 'chartjs-plugin-annotation';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {Chart} from "chart.js";


Chart.register(annotationPlugin, ChartDataLabels)

interface AppProps {
}

const queryClient = new QueryClient()

const App: React.FC<AppProps> = () => {

    return (
        <QueryClientProvider client={queryClient}>
            <LevelProgression/>
{/*            <Assignments/>*/}
        </QueryClientProvider>
    )
}

export default App
