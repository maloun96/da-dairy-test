export const DROP_STATUSES = {
  OUTSTAND: 0,
  PARTIAL: 1,
  COMPLETE: 2,
  IMPOSIBLE: 3,
};

export const DROP_ITEM_STATUSES = {
  NORMAL: 0,
  MISSING: 1,
  DAMAGED_NOT_DELIVERED: 2,
  DAMAGED_DELIVERED: 3,
  OTHER: 4,
  DELIVERED: 5,
};

export const DELIVER_ENDPOINT = "/update_drop";
export const DELIVER_AND_LOCK_ENDPOINT = "/update_drop_lock";

export const API_VERSION = 5;
export const MESSAGE_SERVER_DOWN = "Server is down";
