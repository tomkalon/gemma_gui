/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.scss';

// import bootstrap JS
// import 'bootstrap';

// start the Stimulus application
import './bootstrap';

// register jQuery
import $ from 'jquery';

// register React.JS components
import { registerReactControllerComponents } from '@symfony/ux-react';
registerReactControllerComponents(require.context('./react/controllers', true, /\.(j|t)sx?$/));

$(document).ready(function (){
    let selector = $('#change_settings_profile_settings');
    console.log(selector);
    selector.wrap('<div class="select_wrapper"></div>')
    selector.parent().prepend('<span>'+ $(this).find(':selected').text() +'</span>');

    selector.css('display', 'none');
    selector.parent().append('<ul class="select_inner"></ul>');
    selector.children().each(function(){
        var opttext = $(this).text();
        var optval = $(this).val();
        selector.parent().children('.select_inner').append('<li id="' + optval + '">' + opttext + '</li>');
    });



    selector.parent().find('li').on('click', function (){
        var cur = $(this).attr('id');
        selector.parent().children('span').text($(this).text());
        selector.children().removeAttr('selected');
        selector.children('[value="'+cur+'"]').attr('selected','selected');
        //console.log(selector.children('[value="'+cur+'"]').text());
        selector.parent().removeClass('openSelect');

        selector.parent().find('ul').hide();
    });
    selector.parent().find('span').on('click', function (){
        selector.parent().find('ul').slideToggle(200);

        selector.parent().toggleClass('openSelect');


    });
});

