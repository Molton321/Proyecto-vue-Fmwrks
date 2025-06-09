import { DateTime } from "luxon";

export interface userRole {
    id?: number;
    user_id?: number;
    role_id?: number;
    startAt?: DateTime;
    endAt?: DateTime;
}