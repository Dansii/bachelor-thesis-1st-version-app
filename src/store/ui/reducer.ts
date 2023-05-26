import { HIDE_TOAST, SHOW_TOAST } from "./actions";
import { TAction } from "../store";

//----------------------------------------------------------------------------------------------------------------------
const initialState = {
  toast: {
    active: false,
    text: "",
  },
};
//----------------------------------------------------------------------------------------------------------------------

const uiReducer = (state = initialState, { type, payload }: TAction) => {
  switch (type) {
    case SHOW_TOAST:
      const { text } = payload;
      return { ...state, toast: { active: true, text } };
    case HIDE_TOAST:
      return { ...state, toast: { active: false, text: "" } };
    default:
      return state;
  }
};

export default uiReducer;
