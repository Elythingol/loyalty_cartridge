const server = require('server');
server.extend(module.superModule);

server.append('Show', function (req, res, next) {
    res.setViewData({
        loyalty: {
            onAccount: customer.getProfile().custom.loyaltyPoints || 0
        }
    });
  return next();
});

module.exports = server.exports();
