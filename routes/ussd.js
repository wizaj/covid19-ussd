'use strict';

var db = require('./../models');
var apiconfig = {
  apiKey: process.env.AT_APIKEY,
  username: process.env.AT_USERNAME,
  format: 'json' // or xml
};
var AfricasTalking = require('africastalking')(apiconfig);
var sms = AfricasTalking.SMS;
var changeCase = require('proper-upper-case');
var validate = require('valib');

exports.wiredUssd = function(req, res) {

  var message = '';

  var sessionId = req.body.sessionId;
  var serviceCode = req.body.serviceCode;
  var phoneNumber = req.body.phoneNumber;
  var text = req.body.text;

  console.log(sessionId, serviceCode, phoneNumber, text);

  var length = text.split('*').length;
  var txt = text.split('*');
  res.contentType('text/plain');

  if (text === '') {
    db.Registrant.findOne({
      where: {
        phone_number: phoneNumber
      }
    }).then(function(registrant) {
      if (registrant) {
        //Registrant exists, terminate application
        message = 'END Thank you. You have already submitted your information to us.'
        ';
        res.send(message, 200);
      } else {
        //No registrant, serve the menu
        message = 'CON COVID-19 Self Reporting\n';
        message += 'Welcome\n';
        message += '1: Submit my info\n';
        message += '2: About this app\n';
        message += '3: Exit\n';
        res.send(message, 200);
      }
    });
  } else if (text === '1' && txt[0] === '1') {
    //If DB miss, we present the input menu to user
    message = 'CON Do you have a fever?';
    message += '1: No\n';
    message += '2: Yes\n';
    res.send(message, 200);
  } else if (length === 2 && txt[0] === '1') {
    message = 'CON Are you coughing?';
    message += '1: No\n';
    message += '2: Yes\n';
    res.send(message, 200);
  } else if (length === 3 && txt[0] === '1') {
    //We commit to db
    var options = text.split('*');
    message = 'END Thank you ' + changeCase(options[1]) + ', sending your info to the cloud :)';
    res.send(message, 200);

    db.Registrant.create({
      first_name: changeCase(options[1]),
      last_name: changeCase(options[2]),
      language_pref: changeCase(options[0]),
      phone_number: phoneNumber
    }).then(function(Registrant) {
      console.log('Registrant added', Registrant);
    });

    var smsOptions = {
      to: phoneNumber,
      message: 'Thank you ' + changeCase(options[1]) + '. See? This works!'
    };

    return sms.send(smsOptions)
      .then(function(s) {
        console.log('[SUCCESS] -> SMS Send');
        console.log(JSON.stringify(s, 0, 4) + '\n');
        res.send(message, 200);
      })
      .catch(function(err) {
        console.log('[FAILURE] -> SMS Send');
        console.log(err + '\n');
        res.send(message, 200);
      });
  } else if (text === '2') {
    message = 'END Made with love by Wiza Jalakasi\n';
    message += 'An app to to demo AT USSD APIs\n';
    message += 'Powered by Africa\'s Talking\n';
    message += 'Web: http://www.africastalking.com\n';
    message += 'Email: wiza@jalaka.si\n';
    res.send(message, 200);
  } else if (text === '3') {
    message = 'END Thank you. Remember to stay home, self-distance, do not shake hands if you step out. Wear a mask if you are coughing or sneezing. Keep washing hands.';
    res.send(message, 200);
  } else {
    message = 'END Sorry, you entered an invalid option.';
    res.send(message, 200);
  }
};
