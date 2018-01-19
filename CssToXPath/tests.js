'use strict';

let cssToXPath = require('./cssToXPath');

console.log("1: " + (cssToXPath("div") === "//div"));
console.log("2: " + (cssToXPath(".test-class") === "//*[contains(@class,'test-class')]"));
console.log("3: " + (cssToXPath("#test-id") === "//*[@id='test-id']"));
console.log("4: " + (cssToXPath("[type=testtype]") === "//*[@type='testtype']"));
console.log("5: " + (cssToXPath("[data-type=testdata]") === "//*[@data-type='testdata']"));
console.log("6: " + (cssToXPath("[class='test data cl']") === "//*[@class='test data cl']"));
console.log("7: " + (cssToXPath("[data='test-data']") === "//*[@data='test-data']"));
console.log("8: " + (cssToXPath("a[value=testvalue]") === "//a[@value='testvalue']"));
console.log("9: " + (cssToXPath("[class=test][type=submit]") === "//*[@class='test' and @type='submit']"));
console.log("10: " + (cssToXPath("div span") === "//div//span"));
console.log("11: " + (cssToXPath("[class=testclass] button") === "//*[@class='testclass']//button"));
console.log("12: " + (cssToXPath("a") === "//a"));
console.log("13: " + (cssToXPath("a div span button") === "//a//div//span//button"));
console.log("14: " + (cssToXPath("div[type=text][checked=false] span[dt-args='t b p']") === "//div[@type='text' and @checked='false']//span[@dt-args='t b p']"));
console.log("15: " + (cssToXPath(".open [data-toggle]") === "//*[contains(@class,'open')]//*[@data-toggle]"));
console.log("16: " + (cssToXPath(".uui-profile-menu") === "//*[contains(@class,'uui-profile-menu')]"));