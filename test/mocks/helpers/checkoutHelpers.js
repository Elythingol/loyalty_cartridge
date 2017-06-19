'use strict';


var proxyquire = require('proxyquire').noCallThru().noPreserveCache();

var collections = require('../util/collections');
var addressModel = require('../models/address');
var orderModel = require('../models/order');

var renderTemplateHelper = require('./renderTemplateHelper');
var shippingHelpers = require('./shippingHelpers');
var basketMgr = require('../dw/order/BasketMgr');


var server = {
    forms: {
        getForm: function (formName) {
            return {
                formName: formName,
                clear: function () {}
            };
        }
    }
};

var transaction = {
    wrap: function (callBack) {
        return callBack.call();
    },
    begin: function () {},
    commit: function () {}
};

var hookMgr = {
    callHook: function (extensionPoint, functionName, currentBasket) { // eslint-disable-line no-unused-vars
    }
};

var resource = {
    msg: function (param1, param2, param3) { // eslint-disable-line no-unused-vars
        return param1;
    }
};

var status = {
    OK: 0,
    ERROR: 1
};

var orderMgr = {
    createOrder: function (basket) { // eslint-disable-line no-unused-vars
        return { order: 'new order' };
    },
    placeOrder: function (order) { // eslint-disable-line no-unused-vars
        return status.OK;
    }
};

var order = {
    CONFIRMATION_STATUS_CONFIRMED: 'order confirmation status confirmed',
    EXPORT_STATUS_READY: 'order export status is ready'
};

function proxyModel() {
    return proxyquire('../../../cartridges/app_storefront_base/cartridge/scripts/checkout/checkoutHelpers', {
        'server': server,
        '*/cartridge/scripts/util/collections': collections,

        'dw/order/BasketMgr': basketMgr,
        'dw/util/HashMap': {},
        'dw/system/HookMgr': hookMgr,
        'dw/net/Mail': {},
        'dw/order/OrderMgr': orderMgr,
        'dw/order/PaymentInstrument': {},
        'dw/order/PaymentMgr': {},
        'dw/order/Order': order,
        'dw/system/Status': status,
        'dw/web/Resource': resource,
        'dw/system/Site': {},
        'dw/util/Template': {},
        'dw/system/Transaction': transaction,

        '~/cartridge/models/address': addressModel,
        '~/cartridge/models/order': orderModel,

        '~/cartridge/scripts/renderTemplateHelper': renderTemplateHelper,
        '~/cartridge/scripts/checkout/shippingHelpers': shippingHelpers
    });
}

module.exports = proxyModel();
