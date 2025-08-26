export enum ActionIds {
  DEV_ACTIONS = "DEV_ACTIONS",
  USB_ACTIONS = "USB_ACTIONS",
  COMBINED_ACTIONS = "COMBINED_ACTIONS",
}

export const actionDefinitions = {
  TURN_OFF_DEV_MODE: {
    identifier: "TURN_OFF_DEV_MODE",
    buttonTitle: "Turn Off Dev Mode",
  },
};

export const notificationCategories = {
  DEV_ACTIONS: [actionDefinitions.TURN_OFF_DEV_MODE],
  COMBINED_ACTIONS: [actionDefinitions.TURN_OFF_DEV_MODE],
};
