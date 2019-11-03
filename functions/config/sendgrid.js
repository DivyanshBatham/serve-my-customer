const functions = require('firebase-functions');
const sgMail = require('@sendgrid/mail');

const SENDGRID_API_KEY = functions.config().sendgrid.key;
const SENDGRID_INVITATION_TEMPLATE_ID = functions.config().sendgrid.invitationtemplate;
sgMail.setApiKey(SENDGRID_API_KEY);

module.exports = { sendgrid: sgMail, SENDGRID_INVITATION_TEMPLATE_ID };