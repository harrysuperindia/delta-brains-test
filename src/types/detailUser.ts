import { UserProfileV2 } from "./user-profile";

export interface DetailUserStateProps {
    user: UserProfileV2[];
    userDetail: UserProfileV2;
    error: object | string | null;
}