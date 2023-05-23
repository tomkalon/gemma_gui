import $ from "jquery";
import {element} from "prop-types";


// select form custom style
$(document).ready(function () {
    let selector = $('#change_settings_profile_settings');
    selector.wrap('<div class="select_wrapper"></div>')
    selector.parent().prepend('<span>' + $(this).find(':selected').text() + '</span>');
    selector.css('display', 'none');
    selector.parent().append('<ul class="select_inner"></ul>');
    selector.children().each(function () {
        var opttext = $(this).text();
        var optval = $(this).val();
        selector.parent().children('.select_inner').append('<li id="' + optval + '">' + opttext + '</li>');
    });
    selector.parent().find('li').on('click', function () {
        var cur = $(this).attr('id');
        selector.parent().children('span').text($(this).text());
        selector.children().removeAttr('selected');
        selector.children('[value="' + cur + '"]').attr('selected', 'selected');
        selector.parent().removeClass('openSelect');
        selector.parent().find('ul').hide();
    });
    selector.parent().find('span').on('click', function () {
        selector.parent().find('ul').slideToggle(200);

        selector.parent().toggleClass('openSelect');
    });
});

// alerts and modals
function modalBoxHandler (name) {
    const close = name + '-close';
    const open = name + '-open';
    const infoPopup = document.querySelector("[" + name + "]");
    const closeInfoPopup = document.querySelectorAll("[" + close + "]");
    const openInfoPopup = document.querySelectorAll("[" + open + "]");

    if (closeInfoPopup && infoPopup) {
        closeInfoPopup.forEach(element => {
            element.addEventListener("click", () => {
                infoPopup.classList.remove("open");
            })
        });
    }
    if (openInfoPopup && infoPopup) {
        openInfoPopup.forEach(element => {
            element.addEventListener("click", () => {
                infoPopup.classList.add("open");
            })
        });
    }
}

$(document).ready(function () {
    setTimeout(() => {
        $('.js-alert').fadeOut(1500);
    }, 2000);

    const modal = document.querySelectorAll('[data-modal]');
    modal.forEach(element => {
        modalBoxHandler (element.getAttributeNames()[0]);
    })
})

