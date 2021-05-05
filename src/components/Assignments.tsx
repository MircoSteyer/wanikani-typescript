import React from 'react';
import wanikaniService from "../services/wanikani";
import {WanikaniAssignmentResponse} from "../typescript/types/wanikani-types";
import {useQuery} from "react-query";

const Assignments = () => {

    const assignmentQuery = useQuery<WanikaniAssignmentResponse, Error>("assignments", wanikaniService.getAssignments)

    if(assignmentQuery.isLoading || assignmentQuery.isIdle) {
        return <div></div>
    }

    if(assignmentQuery.isError) {
        return <div>Error: {assignmentQuery.error.message}</div>
    }

    const data = assignmentQuery.data

    return (
        <pre>
            assignments[0]: {JSON.stringify(data.data[0], null, 2)}
        </pre>
    )
}

export default Assignments
