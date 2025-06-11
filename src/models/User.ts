export interface User {
    id?: number; // Auto-incremented ID, not to be sent to the client
    name?: string;
    email?: string;
    password?: string; // Just for internal use, not to be sent to the client
    picture?: string; // Just for internal use, not to be sent to the client
    token?: string; // Just for internal use, not to be sent to the client
}