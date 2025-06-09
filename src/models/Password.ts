import { DateTime } from "luxon";

export interface password {
    id?: number;
    user_id?: number;
    content?: string;
    startAt?:DateTime;
    endAt?: DateTime;
}