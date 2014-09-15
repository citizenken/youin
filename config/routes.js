/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': {
    view: 'homepage'
  },

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  *  If a request to a URL doesn't match any of the custom routes above, it  *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

  // 'post /event/create': {
  //   controller: 'EventController',
  //   action: 'create',
  // },

  'get /event/:id/invitations': {
    controller: 'EventController',
    action: 'invitations',
  },

  'get /user/:id/invitations': {
    controller: 'UserController',
    action: 'invitations',
  },

  'post /invitation/:id/status': {
    controller: 'InvitationController',
    action: 'status',
  },
  
  'post /event/nearby': {
    controller: 'EventController',
    action: 'nearby',
  },
  
  /// Auth routes
  'get /login': {
    controller: 'AuthController',
    action: 'login',
  },

  'get /logout': {
    controller: 'AuthController',
    action: 'logout',
  },

  'get /register': {
    controller: 'AuthController',
    action: 'register',
  },

  'post /auth/local': {
    controller: 'AuthController',
    action: 'callback',
  },

  'post /auth/local/:action': {
    controller: 'AuthController',
    action: 'callback',
  },

  'get /auth/:provider': {
    controller: 'AuthController',
    action: 'provider',
  },

  'get /auth/:provider/callback': {
    controller: 'AuthController',
    action: 'callback',
  },

  'get /auth/:provider/:action': 'AuthController.callback',

};