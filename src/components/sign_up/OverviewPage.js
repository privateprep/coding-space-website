import React, { useCallback, useEffect, useState } from "react";
import { Field } from "formik";
import { trialField } from "./formFields";
import MapDisplay from "../MapDisplay";
import "leaflet/dist/leaflet.css";

import CalendarDisplay from "./CalendarDisplay";
import FormikCheckboxGroup from "./FormikCheckboxGroup";
import FormField from "./FormField";
import Wizard from "./Wizard";

import PromoField from "./PromoField";
import RewardsField from "./RewardsField";

import * as api from "./api";

const OverviewPage = ({
  overview,
  enrollmentType,
  classTypeId,
  isTrialClass,
  parentState: { setFieldValue, values },
}) => {
  let startingPrice = !!overview ? Number(overview.base_price) : NaN;
  const [basePrice, setBasePrice] = useState(startingPrice);
  const isOnline = overview.locationName.toLowerCase().includes("online");

  // abort previous action
  const clearPromoPricing = useCallback(() => {
    setFieldValue("promo_code", "");
    setFieldValue("promo_amount_off", "");
  }, [setFieldValue]);

  const clearRewardsPricing = useCallback(
    resetType => {
      if (resetType !== "onlyClearApplied") {
        setFieldValue("rewards_redemption_code", "");
        setFieldValue("available_rewards_balance", "");
      }
      setFieldValue("applied_rewards_amount", "");
    },
    [setFieldValue]
  );

  const applyPromo = useCallback(
    async promoCode => {
      if (Number.isNaN(basePrice)) return; // just to be safe...
      if (!promoCode) return; // to avoid unneeded refetch

      const { amountOff } = await api.getPromoDetails(
        classTypeId,
        promoCode,
        isTrialClass,
        values.addon_ids,
        values.parent_email
      );

      setFieldValue("promo_code", promoCode);
      setFieldValue("promo_amount_off", amountOff);
    },
    [
      basePrice,
      classTypeId,
      isTrialClass,
      values.addon_ids,
      values.parent_email,
      setFieldValue,
    ]
  );

  const getRewardsBalance = useCallback(
    async rewardsCode => {
      const { balance } = await api.getRewardsBalance(rewardsCode);

      setFieldValue("rewards_redemption_code", rewardsCode);
      setFieldValue("available_rewards_balance", balance);
    },
    [setFieldValue]
  );

  const applyBalance = amount =>
    setFieldValue("applied_rewards_amount", amount);
  // set hidden fields ~onLoad
  useEffect(() => {
    if (!values.price_shown_to_customer) {
      setFieldValue("class_type_id", classTypeId);
      setFieldValue("enrollment_type", enrollmentType);
      setFieldValue("price_shown_to_customer", startingPrice);
    }
  }, [
    values.price_shown_to_customer,
    setFieldValue,
    classTypeId,
    enrollmentType,
    startingPrice,
  ]);

  // watch for changes to addons, update basePrice as needed
  useEffect(() => {
    let addonPrice = 0;

    if (!!values.addon_ids && !!values.addon_ids.length) {
      addonPrice = values.addon_ids
        .map(addonId =>
          overview.addons.find(addon => addon.addonId.toString() === addonId)
        )
        .map(addon => Number(addon.price))
        .reduce((a, b) => a + b, 0);
    }

    let nextBasePrice = (startingPrice + addonPrice).toFixed(2); // turns to string avoiding .000000001 float

    setBasePrice(nextBasePrice);
  }, [
    values.addon_ids,
    overview.addons,
    startingPrice,
    setBasePrice,
    setFieldValue,
  ]);

  // watch for changes to price, reapply promo as needed
  useEffect(() => {
    if (basePrice !== startingPrice || !!values.promo_code) {
      applyPromo(values.promo_code);
    }
  }, [startingPrice, basePrice, values.promo_code, applyPromo]);

  // watch for price change
  // - ensure applied rewards not too big
  // -- could happen if promo applied after rewards
  // - ensure collection threshold met
  useEffect(() => {
    const priceShown = Number(values.price_shown_to_customer);
    if (Number.isNaN(priceShown) || priceShown >= 1 || priceShown === 0) return;

    const appliedRewards = Number(values.applied_rewards_amount);
    if (Number.isNaN(appliedRewards) || appliedRewards === 0) return;

    if (priceShown < 0) {
      setFieldValue(
        "applied_rewards_amount",
        (appliedRewards + priceShown).toFixed(2)
      );
      setFieldValue("price_shown_to_customer", "0");
      return;
    }

    // 0 < price <= 1
    // stripe doesn't allow
    const availableRewards = Number(values.available_rewards_balance);
    if (availableRewards >= appliedRewards + priceShown) {
      // round up
      setFieldValue(
        "applied_rewards_amount",
        (appliedRewards + priceShown).toFixed(2)
      );
      setFieldValue("price_shown_to_customer", "0");
    } else {
      // push down
      setFieldValue(
        "applied_rewards_amount",
        (appliedRewards - priceShown).toFixed(2)
      );
      setFieldValue("price_shown_to_customer", "1.00");
    }
  }, [
    setFieldValue,
    values.price_shown_to_customer,
    values.applied_rewards_amount,
    values.available_rewards_balance,
  ]);

  // watch for changes to basePrice, promo_amount, applied_rewards
  // calculate, set price_shown_to_customer as appropriate
  useEffect(() => {
    let newPrice = Number(basePrice);
    if (Number.isNaN(newPrice)) return; // to be safe

    // apply promo
    if (!!values.promo_amount_off) {
      newPrice -= Number(values.promo_amount_off);
    }
    // apply rewards
    if (!!values.applied_rewards_amount) {
      newPrice -= Number(values.applied_rewards_amount);
    }

    newPrice = newPrice.toFixed(2); // becomes string

    if (newPrice !== values.price_shown_to_customer) {
      setFieldValue("price_shown_to_customer", newPrice);
    }
  }, [
    setFieldValue,
    basePrice,
    values.promo_amount_off,
    values.applied_rewards_amount,
    values.price_shown_to_customer,
  ]);

  const priceShown = values.price_shown_to_customer;
  const hasPriceUpdated = !!priceShown && basePrice !== priceShown;

  const nonRewardsPrice = values.promo_amount_off
    ? (basePrice - values.promo_amount_off).toFixed(2)
    : basePrice;

  const sessions = isTrialClass
    ? overview.sessions.filter(s => s.allowsTrial)
    : overview.sessions;

  const addressCoords =
    overview.locationLat && overview.locationLong
      ? [overview.locationLat, overview.locationLong]
      : null;

  return (
    <Wizard.Page>
      {() => (
        <React.Fragment>
          <div className="overview-page">
            <div className="title overview-page__title">
              <h2 className="overview-page__title__name">
                {overview.categoryName}
              </h2>
              {!!overview.categoryDescription && (
                <p className="overview-page__title__description">
                  {overview.categoryDescription}
                </p>
              )}
            </div>
            <div className="overview-page__row">
              <ul className="details">
                <li>
                  <strong>{overview.classTypeName}</strong>{" "}
                  {overview.semester.split(" ").join(" Semester ")}
                </li>
                {isTrialClass && (
                  <li className="trial-class-wrapper">
                    <FormField
                      field={{
                        ...trialField,
                        options: sessions.map(session => ({
                          label: session.optionLabel,
                          value: session.sessionId,
                        })),
                      }}
                    />
                  </li>
                )}
                {!isTrialClass && (
                  <>
                    <li>
                      <strong>Dates </strong>
                      {`${overview.dateRange} | ${overview.sessionCount} Sessions`}
                    </li>
                    <li>
                      <strong>Time </strong>
                      {overview.scheduledTimeRange}
                    </li>
                  </>
                )}
                <li>
                  <strong>Price</strong>{" "}
                  <span
                    style={{
                      textDecoration: hasPriceUpdated ? "line-through" : "none",
                    }}
                  >
                    {`$${basePrice}`}
                  </span>{" "}
                  {hasPriceUpdated && <span>{`$${priceShown}`}</span>}
                  <div className="promo-rewards-wrapper">
                    <PromoField
                      applyPromo={applyPromo}
                      appliedPromoAmount={values.promo_amount_off}
                      appliedPromoCode={values.promo_code}
                      clearPromoPricing={clearPromoPricing}
                    />
                    <RewardsField
                      getRewardsBalance={getRewardsBalance}
                      availableRewardsBalance={values.available_rewards_balance}
                      applyBalance={applyBalance}
                      appliedRewardsAmount={values.applied_rewards_amount}
                      appliedRewardsCode={values.rewards_redemption_code}
                      nonRewardsPrice={nonRewardsPrice}
                      clearRewardsPricing={clearRewardsPricing}
                    />
                  </div>
                </li>
              </ul>

              <div className="calendar-wrapper">
                <CalendarDisplay events={sessions} />
              </div>
            </div>

            {!!overview.addons && !!overview.addons.length && (
              <div className="overview-page__row overview-page__row--addons">
                <div className="addons-container">
                  <strong>Optional Addons</strong>
                  <FormikCheckboxGroup
                    name="addon_ids"
                    options={overview.addons.map(addon => ({
                      label: addon.optionLabel,
                      id: addon.addonId.toString(),
                      ...addon,
                    }))}
                  />
                  {overview.addons.some(addon =>
                    addon.optionLabel.includes("Lunch")
                  ) && (
                    <blockquote
                      style={{ lineHeight: "1.25rem", fontSize: "1rem" }}
                    >
                      Unless you specifically purchase lunch when you register
                      for camp, campers must bring their own lunch.{" "}
                      <strong>
                        We ask that there be no nuts at camp to be sensitive to
                        any allergies our campers may have.
                      </strong>{" "}
                      Lunch purchases cannot be refunded once the session
                      begins, and campers cannot purchase lunch on their own.
                      Purchased lunches will be from a local deli.
                    </blockquote>
                  )}
                </div>
              </div>
            )}

            <div className="overview-page__row overview-page__row">
              {!!addressCoords && <MapDisplay addressCoords={addressCoords} />}
              <ul className="details">
                <li>
                  <strong>Location</strong>
                  <br />
                  <p>{overview.locationName}</p>
                  <hr />
                  {isOnline ? (
                    <p>
                      This is a virtual class. After you sign up, we will reach
                      out with specific instructions to be sure you are prepared
                      to join the class!
                    </p>
                  ) : (
                    <React.Fragment>
                      <p>{overview.locationName}</p>
                      <a
                        className="address-link"
                        href={overview.locationAddressLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {overview.locationAddress}{" "}
                        <img
                          src={
                            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='16' height='10' viewBox='0 0 16 10'%3E%3Cscript xmlns=''/%3E%3Ctitle%3EArrow Right%3C/title%3E%3Cdefs%3E%3Cpolygon id='arrow-right-a' points='10 0 10 4 0 4 0 6 10 6 10 10 16 4.94'/%3E%3C/defs%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cmask id='arrow-right-b' fill='%23fff'%3E%3Cuse xlink:href='%23arrow-right-a'/%3E%3C/mask%3E%3Cuse fill='%23212B36' fill-rule='nonzero' xlink:href='%23arrow-right-a'/%3E%3Cg fill='%23274548' mask='url(%23arrow-right-b)'%3E%3Crect width='18' height='18' rx='4' transform='translate(-1 -4)'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"
                          }
                          alt="Next page"
                        />
                      </a>
                      <hr />
                      <p>{overview.locationNotes}</p>
                    </React.Fragment>
                  )}
                </li>
              </ul>
            </div>

            {/* hidden fields set via props or manual setFieldValue calls */}
            <Field type="hidden" name="class_type_id" value={classTypeId} />
            <Field
              type="hidden"
              name="enrollment_type"
              value={values.enrollment_type}
            />
            <Field
              type="hidden"
              name="price_shown_to_customer"
              value={values.price_shown_to_customer}
            />
            <Field type="hidden" name="promo_code" value={values.promo_code} />
            <Field
              type="hidden"
              name="promo_amount_off"
              value={values.promo_amount_off}
            />
            <Field
              type="hidden"
              name="rewards_redemption_code"
              value={values.rewards_redemption_code}
            />
            <Field
              type="hidden"
              name="available_rewards_balance"
              value={values.available_rewards_balance}
            />
            <Field
              type="hidden"
              name="applied_rewards_amount"
              value={values.applied_rewards_amount}
            />
          </div>
        </React.Fragment>
      )}
    </Wizard.Page>
  );
};

export default OverviewPage;
