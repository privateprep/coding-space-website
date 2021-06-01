import { GET, POST, buildQueryString } from "../../utils/service";

export const signupForClass = params =>
  POST(
    `${process.env.DASHBOARD_BASE_URL}/services/class_signups/coding_space`,
    {
      class_signup: params,
    }
  );

export const getClassOverview = (classTypeId, isTrailClass = false) =>
  GET(
    `${
      process.env.DASHBOARD_BASE_URL
    }/feeds/coding_space/classes/${classTypeId}/overview?trial_class=${!!isTrailClass}`
  );

export const getPromoDetails = (
  classTypeId,
  code,
  isTrailClass = false,
  addonIds = [],
  parentEmail = ""
) => {
  let params = {};
  if (isTrailClass) {
    params["trial_class"] = true;
  }
  if (!!addonIds && !!addonIds.length) {
    params["addon_ids"] = addonIds;
  }
  if (!!parentEmail) {
    params["parent_email"] = parentEmail;
  }
  const queryString = buildQueryString(params);

  return GET(
    `${process.env.DASHBOARD_BASE_URL}/services/class_signups/${classTypeId}/promotions/${code}?${queryString}`
  );
};

export const getRewardsBalance = rewardsCode => {
  return GET(
    `${process.env.DASHBOARD_BASE_URL}/services/rewards/balance/${encodeURI(
      rewardsCode
    )}`
  );
};
