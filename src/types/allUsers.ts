import { AllUserProfileV2 } from "./user-profile";

export interface AllUserStateProps {
    allUsers: AllUserProfileV2[];
    error: object | string | null;
}