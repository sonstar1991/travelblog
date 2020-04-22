const withCSS = require('@zeit/next-css')
const withImages = require('next-images')
const path = require('path');
const withPlugins = require('next-compose-plugins');



module.exports= withCSS({

        publicRuntimeConfig:{
            APP_NAME: 'TravelBlog',
            API_DEVELOPMENT: 'https://ancient-wildwood-59537.herokuapp.com/api',
            PRODUCTION: false,
            DOMAIN_DEVELOPMENT: 'http://localhost:3000',
            DOMAIN_PRODUCTION: 'http://localhost:3000',
            DISQUS_SHORTNAME:'travelblog-7',
            GOOGLE_CLIENT_ID: '875836555829-4aaqc40emomvaq58ud5gbuvnnnpd4l45.apps.googleusercontent.com'
        }
})



