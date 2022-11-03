const server = require('server');

server.post('UpdatePoints', function (req, res, next) {
  if (!req.currentCustomer.profile) {
    return next();
  }
  const { customerNo, points } = JSON.parse(req.body);
  const profile = require('dw/customer/CustomerMgr').getProfile(customerNo.toString().trim());
  const Transaction = require('dw/system/Transaction');
  try {
    Transaction.begin();
    profile.custom.loyaltyPoints = points;
    Transaction.commit();
  } catch (error) {
    const logger = require('dw/system/Logger').getLogger('loyalty', 'loyalty');
    logger.error('customer no {0} got an error', customerNo);
    Transaction.rollback();
  }
  res.json({});
  return next();
});

server.use('RemovePoints', function (req, res, next) {
  if (!req.currentCustomer.profile) {
    return next();
  }
  var basket = require('dw/order/BasketMgr').getCurrentBasket();
  const loyaltyApplied = basket.getPriceAdjustmentByPromotionID('loyaltyApplied');
  if (!empty(loyaltyApplied)) {
    require('dw/system/Transaction').wrap(() => {
      basket.removePriceAdjustment(loyaltyApplied);
    });
  }
  require('*/cartridge/scripts/checkout/checkoutHelpers').recalculateBasket(basket);
  res.json({});
  return next();
});

module.exports = server.exports();
