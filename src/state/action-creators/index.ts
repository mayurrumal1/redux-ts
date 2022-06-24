import axios from "axios";
import { Dispatch } from "react";
import { ActionType } from "../action-types";
import { Action } from "../actions";

export const searchRepositories = (term: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SEARCH_REPOSITORIES,
    });

    try {
      // call API using axios to fetch the matching list of packages.
      const { data } = await axios.get(
        "https://registry.npmjs.org/-/v1/search",
        {
          params: {
            text: term,
          },
        }
      );

      // get the package names from the api data
      const names = data.objects.map((result: any) => {
        return result.package.name;
      });

      // dispatch the action
      dispatch({
        type: ActionType.SEARCH_REPOSITORIES_SUCCESS,
        payload: names,
      });
    } catch (err) {
      // adding typeguard for error
      if (err instanceof Error) {
        dispatch({
          type: ActionType.SEARCH_REPOSITORIES_ERROR,
          payload: err.message,
        });
      } else {
        console.log("Unexpected Error", err);
      }
    }
  };
};
