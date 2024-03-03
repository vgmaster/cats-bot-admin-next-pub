import { type TRegistrationForm } from "./registrationForm";

export type TRegistationData = Omit<TRegistrationForm, "passwordConfirm">;
