import $ from 'jquery';
import _ from 'lodash';
import "./body.css";

$(document).ready(function() {
    $('body').append('<p>Dashboard data for the students</p>');
    $('body').append('<button id="start-btn">Click here to get started</button>');
    $('body').append('<p id="count"></p>');

    let click_count = 0;

    function updateCounter() {
        click_count += 1;
        $('#count').text(`${click_count} clicks on the button`);
    }

    $('#count').text(`${click_count} clicks on the button`);

    $('#start-btn').on('click', _.debounce(updateCounter, 500));
});
