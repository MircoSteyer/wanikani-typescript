import axios, {AxiosRequestConfig} from "axios";
import {
    WanikaniAssignmentResponse,
    WanikaniLevelProgressionResponse,
    WanikaniSingleLevelProgressionResponse
} from "../typescript/types/wanikani-types";

let apiToken = ""
let config: AxiosRequestConfig = {
    headers: {
        "Wanikani-Revision": "20170710",
        Authorization: `Bearer ${apiToken}`
    }
}

const setApiToken = (token: string): void => {
    apiToken = token
    config = {...config, headers: {...config.headers, Authorization: `Bearer ${apiToken}`}}
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
    setApiToken,
    getLevelProgression,
    getSingleLevelProgression,
    getAssignments
}

export default wanikaniService
