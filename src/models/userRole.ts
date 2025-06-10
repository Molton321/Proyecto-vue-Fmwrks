import { DateTime } from "luxon";

export interface UserRole {
    id?: number;
    user_id?: number;
    role_id?: number;
    startAt?: DateTime;
    endAt?: DateTime;
}