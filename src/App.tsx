import React, {useEffect, useState} from 'react';
import wanikaniService from "./services/wanikani"
import {WanikaniAssignment, WanikaniLevelProgression} from "./typescript/types/wanikani-types";

interface AppProps {
}

const App: React.FC<AppProps> = () => {

    const [levelProgression, setLevelProgression] = useState<WanikaniLevelProgression[]>([])
    const [assignments, setAssignments] = useState<WanikaniAssignment[]>([])

    useEffect(() => {
        const getData = async (): Promise<void> => {
            const levelProgression = await wanikaniService.getLevelProgression()
            setLevelProgression(levelProgression)
            const assignments = await wanikaniService.getAssignments()
            setAssignments(assignments)
        }
        getData()
    }, [])

    console.log(assignments.length)
    return (
        <div>
            <pre>
                levelProgression[0]: {JSON.stringify(levelProgression[0], null, 2)}
            </pre>
{/*            <pre>
                {JSON.stringify(levelProgression, null, 2)}
                {JSON.stringify(assignments, null, 2)}
            </pre>*/}
        </div>


    )
}

export default App
