import {
  InvestorRegistrationResult,
  RegisterInvestorRequest,
} from "./declarations/plantify-backend.did";
import { plantify_backend } from "./declarations";

export const registerInvestor = async (
  args: RegisterInvestorRequest
): Promise<InvestorRegistrationResult> => {
  try {
    const result = await plantify_backend.registerInvestor(args);
    return result;
  } catch (error) {
    console.error("Error investor registration:", error);
    throw error;
  }
};
