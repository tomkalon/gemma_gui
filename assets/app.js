/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.scss';

// import custom JS file
import './js/scripts.js';

// import bootstrap JS
// import 'bootstrap';

// start the Stimulus application
import './bootstrap';

// register jQuery
import $ from 'jquery';

// register React.JS components
import { registerReactControllerComponents } from '@symfony/ux-react';
registerReactControllerComponents(require.context('./react/controllers', true, /\.(j|t)sx?$/));

