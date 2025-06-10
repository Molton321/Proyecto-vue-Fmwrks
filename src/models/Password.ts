import { DateTime } from "luxon";

export interface Password {
    id?: number;
    user_id?: number;
    content?: string;
    startAt?:DateTime;
    endAt?: DateTime;
}