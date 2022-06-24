import { useSelector, TypedUseSelectorHook } from "react-redux"; // "useSelector" is similaar to "mapStateToProps" function in class based components
import { RootState } from "../state";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
