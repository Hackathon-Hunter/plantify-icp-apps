import {
  FarmerRegistrationResult,
  RegisterFarmerRequest,
} from "./declarations/plantify-backend.did";
import { plantify_backend } from "./declarations";

export const registerFarmer = async (
  args: RegisterFarmerRequest
): Promise<FarmerRegistrationResult> => {
  try {
    const result = await plantify_backend.registerFarmer(args);
    return result;
  } catch (error) {
    console.error("Error investor registration:", error);
    throw error;
  }
};
