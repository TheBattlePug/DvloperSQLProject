import { KeycloakService } from 'keycloak-angular';

export function initializeKeycloak(keycloak: KeycloakService): () => Promise<boolean> {

    return () =>
      keycloak.init({
        config: {
          url: "http://localhost:8080/",
          realm: "master",
          clientId: "mysqlclient",
        },
        initOptions: {
          checkLoginIframe: false,
          onLoad: "check-sso",
          checkLoginIframeInterval: 25,
        },
        loadUserProfileAtStartUp: true,
        enableBearerInterceptor: true,
        authorizationHeaderName: "access-token",
      });
  
    }
