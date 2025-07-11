import { InvestorRegistrationResult, RegisterInvestorRequest } from "./types";
import { Principal } from "@dfinity/principal";
// import { plantify_backend } from "./declarations";

export const registerInvestor = async (
  _args: RegisterInvestorRequest
): Promise<InvestorRegistrationResult> => {
  try {
    // TODO: Replace with actual API call when backend is ready
    // const result = await plantify_backend.registerInvestor(args);
    // return result;

    // Return mock success for now
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { Success: Principal.anonymous() };
  } catch (error) {
    console.error("Error investor registration:", error);
    throw error;
  }
};
