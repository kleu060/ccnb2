## Environment
PHP 8.4 \
node v24.13.0 \
npm v8.19.4 

## Install Package
`npm install`

## Create configuration File
`cp js/cnofig.js.example js/config.js` \
`cp proxy/config.php.example js/config.php.example`

## Create Log File 
`mkdir /var/log/ccnb2` \
`chown apache:root ccnb2` \
`chmod 755 ccnb2`

## Apache Configuration
```
<VirtualHost *:80>
    #ServerName web1
    DocumentRoot /var/www/html
    ProxyPassMatch ^/(.*\.php(/.*)?)$ !

    <directory "/var/www/html">
        require all granted
        options indexes followsymlinks
        allowoverride all
    </directory>

   SetEnv API_URL http://192.168.82.173/ccnb2

    ErrorLog /var/log/httpd/node-app-error.log
    CustomLog /var/log/httpd/node-app-access.log combined
</VirtualHost>
```

##Deployment
`npm run build`

`dist/` will be generated, copy everythin inside dist/ to the production server /var/www/html/ccnb2

## Folder permission
Ensure proxy/files folder is writable by apache
