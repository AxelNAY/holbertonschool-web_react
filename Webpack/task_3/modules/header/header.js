import $ from 'jquery';
import "./header.css";

$(document).ready(function() {
    $("header").prepend('<div id="logo"></div>');
    $('header').append('<h1>Holberton Dashboard</h1>');

    console.log("Init header");
});
