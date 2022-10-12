const server = require('server');
const userLoggedIn = require('*/cartridge/scripts/middleware/userLoggedIn');
server.extend(module.superModule);

function getLoyaltyPercentage() {
  const Site = require('dw/system/Site').getCurrent();
  const Money = require('dw/value/Money');
  const savePercentage = Site.getCustomPreferenceValue('savePercentage');
  const loyaltyMoney = new Money(savePercentage, Site.getCurrencyCode());
  return loyaltyMoney.divide(100).getValue();
}

function calculateLoyaltyPoints(orderTotal, loyaltyPercentage) {
  return Math.floor(orderTotal.multiply(loyaltyPercentage).getValue());
}

function getOrderTotal(orderId) {
  const OrderMgr = require('dw/order/OrderMgr');
  return OrderMgr.getOrder(orderId).getTotalGrossPrice();
}

function addLoyaltyPoints(loyaltyPoints) {
  const Transaction = require('dw/system/Transaction');
  const existedPoints = customer.getProfile().custom.loyaltyPoints;
  Transaction.wrap(() => {
    customer.getProfile().custom.loyaltyPoints = (loyaltyPoints + existedPoints);
  });
}

function getLoyaltyPoints() {
  return customer.getProfile().custom.loyaltyPoints;
}

server.append('Confirm', userLoggedIn.validateLoggedIn, function (req, res, next) {
  const orderTotal = getOrderTotal(req.form.orderID);
  const loyaltyPercentage = getLoyaltyPercentage();
  const loyaltyPoints = calculateLoyaltyPoints(orderTotal, loyaltyPercentage);
  addLoyaltyPoints(loyaltyPoints);
  res.setViewData({
    loyalty: {
      onAccount: getLoyaltyPoints(),
      earned: loyaltyPoints
    }
  });
  return next();
});

module.exports = server.exports();
