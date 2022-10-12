const server = require('server');
const userLoggedIn = require('*/cartridge/scripts/middleware/userLoggedIn');
server.extend(module.superModule);

server.append('Show', userLoggedIn.validateLoggedIn, function (req, res, next) {
    res.setViewData({
        loyalty: {
            onAccount: customer.getProfile().custom.loyaltyPoints || 0
        }
    });
  return next();
});

module.exports = server.exports();
