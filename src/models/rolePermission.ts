import { DateTime } from "luxon";

export interface rolePermission {
    id?: number;
    role_id?: number;
    permission_id?: number;
    startAt?: DateTime;
    endAt?: DateTime;
}