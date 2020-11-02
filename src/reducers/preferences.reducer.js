import dotProp from "dot-prop-immutable";

const INITIAL_STATE = {
  selectedDataset: null,
  selectedRound: null,
  datasets: [],
  rounds: [],
  loadingRounds: true,
  loadingDataset: true,
  dropDeliveryLoading: false,
};

export const preferencesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_DATASETS":
      return {
        ...state,
        datasets: action.payload,
      };

    case "SELECT_DATASET":
      return {
        ...state,
        selectedDataset: action.payload,
      };

    case "SELECT_ROUND": {
      const find = state.rounds.find(({ round }) => round.rounddeliveryid === action.payload);

      return {
        ...state,
        selectedRound: find,
      };
    }

    case "SET_ROUNDS":
      return {
        ...state,
        rounds: action.payload,
      };

    case "SET_LOADING_DATASETS":
      return {
        ...state,
        loadingDataset: action.payload,
      };

    case "SET_LOADING_ROUNDS":
      return {
        ...state,
        loadingRounds: action.payload,
      };

    case "UPDATE_DROP_DETAIL": {
      let newState = { ...state };
      const { drop, index, status, notes } = action.payload;
      const dropIndex = newState.selectedRound.drops.findIndex((d) => drop.drop.sortorder === d.drop.sortorder);

      state = dotProp.merge(state, `selectedRound.drops.${dropIndex}.drop_details.${index}`, {
        deliverystatusid: status,
        itemnote: notes,
      });

      return state;
    }

    case "SET_DROP_DELIVERED": {
      const { dropIndex, status, useAddress } = action.payload;

      state = dotProp.merge(state, `selectedRound.drops.${dropIndex}.drop`, {
        deliverystatusid: status,
        use_address: useAddress,
      });

      return state;
    }

    case "SET_DROP_DELIVERY_LOADING": {
      return {
        ...state,
        dropDeliveryLoading: action.payload,
      };
    }

    case "LOGOUT": {
      return {
        ...state,
        datasets: [],
        rounds: [],
        selectedDataset: null,
        loadingRounds: true,
        loadingDataset: true,
        dropDeliveryLoading: false,
      };
    }

    default:
      return state;
  }
};
