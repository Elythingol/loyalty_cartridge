'use strict';

function processForm(req, paymentForm, viewData) {
    viewData.paymentMethod = {
        value: paymentForm.paymentMethod.value,
        htmlName: paymentForm.paymentMethod.value
    };
    viewData.paymentInformation = {
        pointsToRedeem: paymentForm.pointsToRedeem.htmlValue
    };
    return { error: false, viewData: viewData };
}

function savePaymentInformation() {
    return;
}

exports.processForm = processForm;
exports.savePaymentInformation = savePaymentInformation;
