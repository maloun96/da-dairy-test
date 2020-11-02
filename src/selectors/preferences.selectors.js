import { createSelector } from "reselect";
import flow from "lodash/fp/flow";
import map from "lodash/fp/map";
import flatten from "lodash/fp/flatten";
import filter from "lodash/fp/filter";
import { DROP_ITEM_STATUSES, DROP_STATUSES } from "constants/index";

export const getSelectedRound = (state) => state.preferences.selectedRound;

export const getDropDetailsByPublicationId = (state, publicationid) =>
  createSelector(getSelectedRound, ({ drops }) =>
    flow(
      map((drop) => drop.drop_details),
      flatten,
      filter((drop_detail) => drop_detail.publicationid === publicationid)
    )(drops)
  )(state);

export const getAllDrops = (state) => createSelector([getSelectedRound], (round) => round.drops)(state);

export const getIncompleteDrops = (state) =>
  createSelector([getSelectedRound], (round) =>
    round.drops.filter(({ drop }) => drop.deliverystatusid === DROP_STATUSES.PARTIAL)
  )(state);

export const getToDeliverDrops = (state) =>
  createSelector(getSelectedRound, (round) =>
    round.drops.filter(
      ({ drop }) => drop.deliverystatusid === DROP_STATUSES.PARTIAL || drop.deliverystatusid === DROP_STATUSES.OUTSTAND
    )
  )(state);

export const getCompletedDrops = (state) =>
  createSelector(getSelectedRound, (round) =>
    round.drops.filter(({ drop }) => drop.deliverystatusid === DROP_STATUSES.COMPLETE)
  )(state);

export const getDropBySortOrder = (state, sortorder) =>
  createSelector([getSelectedRound], ({ drops }) => drops.find((d) => d.drop.sortorder === sortorder))(state);

export const isDelivered = (deliverystatusid) =>
  deliverystatusid === DROP_ITEM_STATUSES.DELIVERED || deliverystatusid === DROP_ITEM_STATUSES.DAMAGED_DELIVERED;
