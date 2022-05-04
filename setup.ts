import * as qs from 'qs'
import * as readline from 'readline';
import axios, { AxiosRequestConfig, AxiosPromise } from 'axios';

class Setup {
    constructor() {
        this.fetchRefreshToken();
    }

    async fetchRefreshToken() {
        let rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        // admin app
        var msalConfig = {
            auth: {
                clientId: "<client id here>",
                tenantId: "<tenant id here>",                
                redirectURI: "http://localhost/",
                clientSecret: "<client secret here>"
            }
          };
        
        var scopes = ["Presence.Read"];
    
        var uri = `https://login.microsoftonline.com/${msalConfig.auth.tenantId}/oauth2/v2.0/authorize?client_id=${msalConfig.auth.clientId}&response_type=code&redirect_uri=${encodeURI(msalConfig.auth.redirectURI)}&response_mode=query&scope=${encodeURI(scopes.join(" "))}&state=12345`;

        console.log('Copy this url into a window to sign in:');    
        console.log(uri);
        console.log();

        // then take the provided code and call  
        rl.question('Enter the code you received from using the url above: ', async (codeUri) => {
            let uriParts = codeUri.split('&');
            let code:string;

            uriParts.forEach((val) => {
                let codeIndex = val.indexOf('code=');
                
                if (codeIndex != -1) {
                    code = val.substring(codeIndex + 5, val.length)
                }
            });

            if (!code) {
                console.error('Code string could not be found!')
                return;
            } else {
                console.log(code);
            }

            var requestData = {
                client_id: msalConfig.auth.clientId,
                scopes: encodeURI(scopes.join(" ")),
                code,
                redirect_uri: encodeURI(msalConfig.auth.redirectURI),
                grant_type: 'authorization_code',
                client_secret: encodeURI(msalConfig.auth.clientSecret)
            };

            axios.post(`https://login.microsoftonline.com/${msalConfig.auth.tenantId}/oauth2/v2.0/token`, qs.stringify(requestData), 
                { headers: {
                    'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                } 
                })
                .then(function (response) {
                    // handle success
                    console.log(response);
                    console.log();
                    console.log(response.data.refresh_token);
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                    console.log(requestData);
                    
                })

                rl.close();            
        });
    }
}

new Setup