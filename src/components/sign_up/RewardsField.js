import React, { useEffect, useState } from "react";
import { Link } from "gatsby";
import ThreeDotLoader from "../shared/three-dot-loader";

const defaultRewardsMsg = {
  type: "info",
  message: "Enter your rewards redemption code and click 'GET BALANCE'.",
};

const isDefined = thing => typeof thing !== "undefined" && thing !== "";

const RewardsField = ({
  getRewardsBalance,
  availableRewardsBalance,
  applyBalance,
  appliedRewardsAmount,
  appliedRewardsCode,
  nonRewardsPrice,
  clearRewardsPricing,
}) => {
  const [showInput, setShowInput] = useState(!!availableRewardsBalance);
  const [rewardsCode, setRewardsCode] = useState(appliedRewardsCode || "");
  const [amountToApply, setAmountToApply] = useState("");
  const [isGetting, setIsGetting] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [rewardsMessage, setRewardsMessage] = useState(defaultRewardsMsg);

  useEffect(() => {
    if (!!availableRewardsBalance && !!nonRewardsPrice) {
      const smallerValue = Math.min(
        Number(availableRewardsBalance),
        Number(nonRewardsPrice)
      );
      setAmountToApply(smallerValue);
    }
  }, [availableRewardsBalance, nonRewardsPrice]);

  const getBalance = async () => {
    if (!rewardsCode) return; // just to be safe... button should be disabled otherwise

    setIsGetting(true);
    setRewardsMessage(); // clear last message

    try {
      await getRewardsBalance(rewardsCode); // success handled in OverviewPage
    } catch (error) {
      if (error.status === 422) {
        setRewardsMessage({
          type: "error",
          message: error.body.message,
        });
        clearRewardsPricing();
      } else if (error.status === 404) {
        setRewardsMessage({
          type: "error",
          message: `Sorry, we couldn't find a rewards account matching code '${rewardsCode}'`,
        });
        clearRewardsPricing();
      } else {
        throw error; // something else happened let HB know
      }
    } finally {
      setIsGetting(false);
    }
  };

  const applyRewards = async () => {
    const amount = Number(amountToApply);
    if (Number.isNaN(amount)) return; // just to be safe...

    setIsApplying(true);
    setRewardsMessage(); // clear last message
    clearRewardsPricing("onlyClearApplied"); // clear applied amount
    const wouldBePrice = Number(nonRewardsPrice) - amountToApply;

    if (amount < 0) {
      setRewardsMessage({
        type: "error",
        message: "Cannot apply a negative amount",
      });
    } else if (amount > Number(availableRewardsBalance)) {
      setRewardsMessage({
        type: "error",
        message: "Cannot exceed the Available Balance",
      });
    } else if (amount > Number(nonRewardsPrice)) {
      setRewardsMessage({
        type: "error",
        message: "Cannot exceed the Price",
      });
    } else if (wouldBePrice > 0 && wouldBePrice < 1) {
      setRewardsMessage({
        type: "error",
        message: "Cannot owe between $0 and $1",
      });
    } else {
      await applyBalance(amount);
      if (amount === 0) {
        setRewardsMessage({
          type: "info",
          message: `$${amount.toFixed(
            2
          )} has been applied.\nAre you sure this was on purpose?`,
        });
      } else {
        setRewardsMessage({
          type: "info",
          message: `Balance has been applied.\nThanks for spreading the word!`,
        });
      }
    }

    setIsApplying(false);
  };

  if (!showInput) {
    return (
      <button
        disabled={isGetting}
        className="small-button"
        type="button"
        onClick={() => setShowInput(true)}
      >
        USE REWARDS
      </button>
    );
  }

  const getBalanceDisabled = isGetting || !rewardsCode;
  const applyRewardsDisabled = isGetting || !amountToApply;

  let remainingRewards;

  if (isDefined(appliedRewardsAmount) && appliedRewardsAmount !== "0") {
    remainingRewards = (
      Number(availableRewardsBalance) - Number(appliedRewardsAmount)
    ).toFixed(2);
  }

  return (
    <div className="rewards-field">
      <label htmlFor="rewardsCode" style={{ fontWeight: "bold" }}>
        Rewards Redemption Code
      </label>
      <div
        className="input-wrapper"
        style={{ display: "flex", flexFlow: "row wrap" }}
      >
        <input
          id="rewardsCode"
          type="text"
          value={rewardsCode}
          onChange={event => setRewardsCode(event.target.value)}
          style={{ width: 132, marginRight: 10 }}
        />
        <button
          disabled={getBalanceDisabled}
          className={`small-button ${
            getBalanceDisabled ? "small-button--disabled" : ""
          }`}
          type="button"
          onClick={getBalance}
        >
          {isGetting ? <ThreeDotLoader /> : "GET BALANCE"}
        </button>
      </div>
      {isDefined(availableRewardsBalance) && (
        <div
          className="available-rewards-wrapper"
          style={{ marginTop: ".5rem" }}
        >
          <p>
            <strong style={{ marginRight: ".5rem" }}>Available Balance</strong>
            <span
              style={{
                textDecoration: !!remainingRewards ? "line-through" : "none",
              }}
            >
              {`$${availableRewardsBalance}`}
            </span>
            {!!remainingRewards && ` $${remainingRewards}`}
          </p>
          <div
            className="input-wrapper"
            style={{ display: "flex", flexFlow: "row wrap" }}
          >
            <input
              id="amountToApply"
              type="number"
              step="0.01"
              value={amountToApply}
              onChange={event => setAmountToApply(event.target.value)}
              style={{ width: 132, marginRight: 10 }}
            />
            <button
              disabled={applyRewardsDisabled}
              className={`small-button ${
                applyRewardsDisabled ? "small-button--disabled" : ""
              }`}
              type="button"
              onClick={applyRewards}
            >
              {isApplying ? <ThreeDotLoader /> : "APPLY"}
            </button>
          </div>
        </div>
      )}
      {!!rewardsMessage && (
        <p
          className={`rewards-message rewards-message--${rewardsMessage.type}`}
        >
          {rewardsMessage.message}
          {rewardsMessage.message === defaultRewardsMsg.message && (
            <>
              {" "}
              If you do not know your code, get it{" "}
              <Link
                to="/referral_program"
                style={{ textDecoration: `underline` }}
              >
                here
              </Link>
              .
            </>
          )}
        </p>
      )}
    </div>
  );
};

export default RewardsField;
