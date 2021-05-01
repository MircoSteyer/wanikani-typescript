import React from 'react';
import wanikaniService from "../services/wanikani";
import {WanikaniAssignmentResponse} from "../typescript/types/wanikani-types";
import {useQuery} from "react-query";

const Assignments = () => {

    /*const queryClient = useQueryClient()*/

    const {isLoading, isError, data, error} = useQuery<WanikaniAssignmentResponse, Error>("assignments", wanikaniService.getAssignments)

    if(isLoading) {
        return <div>Is Loading...</div>
    }

    if(isError) {
        return <div>Error: {error!.message}</div>
    }

    return (
        <pre>
            assignments[0]: {JSON.stringify(data, null, 2)}
        </pre>
    )
}

export default Assignments
