'use strict';

var Transaction = require('dw/system/Transaction');

function Handle(basket, paymentInformation) {
  var AmountDiscount = require('dw/campaign/AmountDiscount');
  const pointsDiscount = new AmountDiscount(paymentInformation.pointsToRedeem);
  Transaction.wrap(() => {
    basket.createPriceAdjustment('loyaltyApplied', pointsDiscount);
  });
  return { error: false };
}

function postAuthorization(_, order) {
  const site = require('dw/system/Site').getCurrent();
  const Money = require('dw/value/Money');
  const profile = customer.profile;
  const loyaltyApplied = order.getPriceAdjustmentByPromotionID('loyaltyApplied');
  if (!empty(loyaltyApplied)) {
    const pointsOnAccount = new Money(profile.custom.loyaltyPoints, site.getCurrencyCode());
    const loyaltyPointsApply = loyaltyApplied.basePrice.multiply(-1);
    Transaction.wrap(() => {
        profile.custom.loyaltyPoints = pointsOnAccount.subtract(loyaltyPointsApply).value;
    });
  }
  return;
}

exports.Handle = Handle;
exports.postAuthorization = postAuthorization;
