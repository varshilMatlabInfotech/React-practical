import type { USERI } from "@/types/Index";

interface INITIALSTATE {
  data: USERI[];
  isLoading: boolean;
  isError: boolean;
}

export const initialState: INITIALSTATE = {
  data: [],
  isLoading: false,
  isError: false,
};
