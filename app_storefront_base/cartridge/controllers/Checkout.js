'use strict';

var server = require('server');
var locale = require('~/cartridge/scripts/middleware/locale');

var BasketMgr = require('dw/order/BasketMgr');
var ShippingMgr = require('dw/order/ShippingMgr');

var AddressModel = require('~/cartridge/models/address');
var BillingModel = require('~/cartridge/models/billing');
var OrderModel = require('~/cartridge/models/order');
var Payment = require('~/cartridge/models/payment');
var PaymentInstrument = require('dw/order/PaymentInstrument');
var PaymentMgr = require('dw/order/PaymentMgr');
var ProductLineItemModel = require('~/cartridge/models/productLineItem');
var ShippingModel = require('~/cartridge/models/shipping');
var TotalsModel = require('~/cartridge/models/totals');

server.get('ShippingForm', server.middleware.include, function (req, res, next) {

    if (contentMgr) {
        var content = new Content(contentMgr);
        res.cacheExpiration(24);
        res.render('checkout/shipping/shipping', {});
    } else {
        logger.warn('Content asset with ID {0} was included but not found', req.querystring.cid);
    }
    next();
});

server.get('Start', locale, function (req, res, next) {
    var applicablePaymentCards;
    var applicablePaymentMethods;
    var countryCode = "US"; // req.geolocation.countryCode;
    var currentBasket = BasketMgr.getCurrentBasket();
    var currentCustomer = customer; // eslint-disable-line
    var billingAddress = currentBasket.billingAddress;
    var paymentAmount = currentBasket.totalGrossPrice;
    var paymentInstruments;
    var shipment = currentBasket.defaultShipment;
    var shippingAddress = shipment.shippingAddress;
    var shipmentShippingModel;

    // models
    var billingAddressModel;
    var billingModel;
    var orderModel;
    var orderTotals;
    var paymentModel;
    var productLineItemModel;
    var shippingAddressModel;
    var shippingModel;

    shipmentShippingModel = ShippingMgr.getShipmentShippingModel(
        currentBasket.defaultShipment
    );
    shippingAddressModel = new AddressModel(shippingAddress);
    shippingModel = new ShippingModel(
        currentBasket.defaultShipment,
        shipmentShippingModel,
        shippingAddressModel
    );

    applicablePaymentMethods = PaymentMgr.getApplicablePaymentMethods(
        currentCustomer,
        countryCode,
        paymentAmount.value
    );

    applicablePaymentCards = PaymentMgr.getPaymentMethod(PaymentInstrument.METHOD_CREDIT_CARD)
        .getApplicablePaymentCards(currentCustomer, countryCode, paymentAmount.value);

    paymentInstruments = currentBasket.paymentInstruments;

    paymentModel = new Payment(applicablePaymentMethods,
        applicablePaymentCards,
        paymentInstruments
    );

    billingAddressModel = new AddressModel(billingAddress);
    billingModel = new BillingModel(billingAddressModel, paymentModel);

    productLineItemModel = new ProductLineItemModel(currentBasket);
    orderTotals = new TotalsModel(currentBasket);

    var shippingForm = server.forms.getForm('shippingaddress');

    orderModel = new OrderModel(
        currentBasket,
        shippingModel,
        billingModel,
        orderTotals,
        productLineItemModel
    );

    var forms = {
        shippingForm: shippingForm
    };

    res.render('checkout/checkout', { order: orderModel, forms: forms } );
    next();
});

server.post('SubmitShipping', function (req, res, next) {
    this.on('route:BeforeComplete', function (req, res) { // eslint-disable-line no-shadow
        var form = server.forms.getForm( 'shippingaddress' );
        if (!form.valid) {
            res.setStatusCode(500);
        }
        res.json({ form: server.forms.getForm( 'shippingaddress' ) });
    });
    next();
});

server.post('SubmitPayment', function (req, res, next) {
    this.on('route:BeforeComplete', function (req, res) { // eslint-disable-line no-shadow
        var form = server.forms.getForm( 'payment' );
        if (!form.valid) {
            res.setStatusCode(500);
        }
        res.json({ form: server.forms.getForm( 'payment' ) });
    });
    next();
});

server.post('SubmitBilling', function (req, res, next) {
    this.on('route:BeforeComplete', function (req, res) { // eslint-disable-line no-shadow
        var form = server.forms.getForm( 'billingaddress' );
        if (!form.valid) {
            res.setStatusCode(500);
        }
        res.json({ form: server.forms.getForm( 'billingaddress' ) });
    });
    next();
});

module.exports = server.exports();
