import React from 'react';
import {WanikaniLevelProgressionResponse} from "../typescript/types/wanikani-types";
import wanikaniService from "../services/wanikani";
import {useQuery} from "react-query";
import {Line} from "react-chartjs-2"
import annotationPlugin from 'chartjs-plugin-annotation';
import ChartDataLabels from 'chartjs-plugin-datalabels';

interface LevelProgressionProps {

}
const LevelProgression: React.FC<LevelProgressionProps> = () => {

    const levelProgressionQuery = useQuery<WanikaniLevelProgressionResponse, Error>("level_progression", wanikaniService.getLevelProgression)

    if(levelProgressionQuery.isLoading || levelProgressionQuery.isIdle) {
        return <div></div>
    }

    if(levelProgressionQuery.isError) {
        return <div>Error: {levelProgressionQuery.error.message}</div>
    }
    // no discriminated unions possible when destructuring.
    // however, while the above code cant be destructured to assert data existence, we want to continue with "data" for ease of use
    const data = levelProgressionQuery.data

    // in my case its currently levels 1,2,3 repeated as i reset at level 3 and it does NOT yet filter for resets
    // recommended development path: get resets and filter labels only for dates after latest reset
    const barLabels = data.data.map(object => object.data.level)

    const barDatasetData = data.data.map(object => {
        if(object.data.unlocked_at && object.data.passed_at) {
            const unlockedAt = object.data.unlocked_at as Date
            const passedAt = object.data.passed_at as Date
            const durationInDays = (new Date(passedAt).getTime() - new Date(unlockedAt).getTime()) / 1000 / 60 / 60 / 24
            return durationInDays.toPrecision(3)
        }
        // return 0 for levels where resets happened and for currently last level (last level should in future check against current date for duration)
        return 0
    })

    const barData = {
        labels: barLabels,
        datasets: [
            {
                label: '# of days',
                data: barDatasetData,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
                barPercentage: 1
            },
        ],
    };
    const options = {
        maintainAspectRatio: true,
        plugins: {
            datalabels: {
                color: "black",
                anchor: "end",
                align: "end"
            },
            autocolors: false,
            annotation: {
                annotations: {
                    point1: {
                        type: 'point',
                        xValue: 7,
                        yValue: 16,
                        backgroundColor: 'rgba(255, 99, 132, 1)'
                    }
                }
            }
        },
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    };

    return (
        <div>
            {/*<div>
                barDatasetData: {JSON.stringify(barDatasetData, null, 2)}
            </div>
            <pre>
                barLabels: {JSON.stringify(data.data[0], null, 2)}
            </pre>*/}
            <article style={{height: "100%"}}>
                <Line data={barData} type={"bar"} options={options} plugins={[annotationPlugin, ChartDataLabels]}/>
            </article>
        </div>
    )
}

export default LevelProgression
