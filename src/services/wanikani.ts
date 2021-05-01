import axios, {AxiosRequestConfig} from "axios";
import {
    WanikaniAssignment,
    WanikaniAssignmentResponse,
    WanikaniLevelProgression,
    WanikaniLevelProgressionResponse,
    WanikaniSingleLevelProgressionResponse
} from "../typescript/types/wanikani-types";

const apiToken = "a76680e7-dce2-4702-b847-0cb48ba895e0"
const config: AxiosRequestConfig = {
    headers: {
        "Wanikani-Revision": "20170710",
        Authorization: `Bearer ${apiToken}`
    }
}

const getLevelProgression = async (): Promise<WanikaniLevelProgressionResponse> => {
    try {
        const levelProgression = await axios.get<WanikaniLevelProgressionResponse>(`https://api.wanikani.com/v2/level_progressions`, config)
        return levelProgression.data
    }
    catch (err) {
        throw(err)
    }
}

const getSingleLevelProgression = async (): Promise<WanikaniSingleLevelProgressionResponse> => {
    try {
        const levelProgression = await axios.get<WanikaniSingleLevelProgressionResponse>(`https://api.wanikani.com/v2/level_progressions/514143`, config)
        return levelProgression.data
    }
    catch (err) {
        throw(err)
    }
}

const getAssignments = async (): Promise<WanikaniAssignmentResponse> => {
    try {
        const assignments = await axios.get<WanikaniAssignmentResponse>(`https://api.wanikani.com/v2/assignments`, config)
        return assignments.data
    }
    catch (err) {
        throw(err)
    }
}

const wanikaniService = {
    getLevelProgression,
    getSingleLevelProgression,
    getAssignments
}

export default wanikaniService
