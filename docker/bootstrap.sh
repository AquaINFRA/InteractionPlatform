# app configuration
echo "Adjust configuration"

cp /usr/share/nginx/html/config.prod.json /usr/share/nginx/html/config.json

UI_SETTINGS=/usr/share/nginx/html/config.json

/bin/sed -i "s|__SOLR_URL__|${SOLR_URL}|" $UI_SETTINGS
/bin/sed -i "s|__SOLR_CORE_SELECTOR__|${SOLR_CORE_SELECTOR}|" $UI_SETTINGS


