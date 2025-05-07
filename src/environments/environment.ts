export const environment = {
    production: true,    
    auth: {
        domain: 'Your Auth0 Domain',
        clientID: 'Your Auth0 Client ID',
    },
    authorizationParams: {
        redirectUri: window.location.origin,
    },    
    api: {
        POKE_API_URL: 'PokeAPI URI',
        BACKEND_API_URI: 'Your Backend API URI',        
        API_URI_BOOKMARKS: 'Your Bookmarks API URI/Bookmarks',
    },   
};
