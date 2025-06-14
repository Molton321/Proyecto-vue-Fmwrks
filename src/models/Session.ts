import { DateTime } from "luxon";

export interface Session {
    id?: number;
    token?: string;
    expiration?: DateTime;
    FACode?: string;
    state?: string;
    user_id?: number;
}