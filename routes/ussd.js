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

  var sessionlength = text.split('*').length;
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
        message = 'CON COVID-19 Symptom Reporting\n';
        message += 'Welcome\n';
        message += '1: Submit my info\n';
        message += '2: About this app\n';
        message += '3: Exit\n';
        res.send(message, 200);
      }
    });
  } else if (txt[0] === '1' && text === '1') {
    //If DB miss, we present the input menu to user
    message = 'CON Do you have a fever?\n';
    message += '1: No\n';
    message += '2: Yes\n';
    res.send(message, 200);
  } else if (txt[0] === '1' && sessionlength === 2) {
    message = 'CON Are you coughing?\n';
    message += '1: No\n';
    message += '2: Yes\n';
    res.send(message, 200);
  } else if (txt[0] === '1' && sessionlength === 3) {
    message = 'CON Are you having difficulty breathing?\n';
    message += '1: No\n';
    message += '2: Yes\n';
    res.send(message, 200);
  } else if (txt[0] === '1' && sessionlength === 4) {
    message = 'CON In the last 14 days, have you traveled to any countries with cases of COVID-19?\n';
    message += '1: No\n';
    message += '2: Yes\n';
    res.send(message, 200);
  } else if (txt[0] === '1' && sessionlength === 5) {
    message = 'CON Have you met with any person showing symptons of COVID-19?\n';
    message += '1: No\n';
    message += '2: Yes\n';
    res.send(message, 200);
  } else if (txt[0] === '1' && sessionlength === 6) {
    message = 'CON What is the name of neighbourhood/estate?\n';
    res.send(message, 200);
  } else if (length sessionlength=== 7 && txt[0] === '1') {
    //We commit to db
    message = 'END Thank you, your information has been recorded.';
    res.send(message, 200);

    db.Registrant.create({
      has_fever: txt[1],
      is_coughing: txt[2],
      breathing_issues: txt[3]),
      travel_last_14_days: txt[4],
      met_with_corona_patient: txt[5],
      neighbourhood_or_estate: txt[6],
      phone_number: phoneNumber
    }).then(function(Registrant) {
      console.log('Registrant added', Registrant);
    });
  } else if (text === '2') {
    message = 'END Made with love by Wiza Jalakasi\n';
    message += 'Your phone number and data is stored securely.\n';
    message += 'We will only share info with Ministry of Health.\n';
    message += 'Questions? @wizaj on Twitter\n';
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
