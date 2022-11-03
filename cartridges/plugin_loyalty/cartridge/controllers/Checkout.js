const server = require('server');
server.extend(module.superModule);

server.append('Begin', function (req, res, next) {
    if (!req.currentCustomer.profile) {
        return next();
    }
    const BasketMgr = require('dw/order/BasketMgr');
    const URLUtils = require('dw/web/URLUtils');
    const loyaltyApplied = BasketMgr.getCurrentBasket().getPriceAdjustmentByPromotionID('loyaltyApplied');
    let appliedAmount = 0;
    if(!empty(loyaltyApplied)) {
        appliedAmount = loyaltyApplied.basePrice.multiply(-1).value;
    }
    res.setViewData({
        loyalty: {
            onAccount: customer.getProfile().custom.loyaltyPoints || 0,
            appliedAmount: appliedAmount,
            removeUrl: URLUtils.https('Loyalty-RemovePoints').toString()
        }
    });
  return next();
});

module.exports = server.exports();
