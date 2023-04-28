PHP VERSION - min.8.1; recommended 8.2

================ENV==================
1. Zmień nazwę .env.toedit na .env
2. Uruchom z konsoli: php bin/console secrets:generate-keys
3. Uzupełnij i odkomentuj dane serwera mysql.
================ENV==================


================APACHE2==================
1. Uzupełnij VHOST dla APACHE2

<VirtualHost *:80>
    ServerName localhost
    ServerAdmin webmaster@localhost
    DocumentRoot "{{host_src}}"
    ErrorLog "{{logs_directory_src}}\logs\localhost.log"
    CustomLog "{{logs_directory_src}}\logs\localhost.access.log" common
</VirtualHost>

<VirtualHost *:80>
    ServerName gemma_gui.local
    ServerAdmin webmaster@gemma_gui.local
    DocumentRoot {{host_src}}/gemma_gui/public
    DirectoryIndex /index.php
    <Directory {{host_src}}/gemma_gui/public>
        AllowOverride None
        Order Allow,Deny
        Allow from All
        FallbackResource /index.php
    </Directory>
        <Directory {{host_src}}/gemma_gui/public/bundles>
        DirectoryIndex disabled
        FallbackResource disabled
    </Directory>
    ErrorLog "{{logs_directory_src}}\logs\gemma_gui.log"
    CustomLog "{{logs_directory_src}}\logs\gemma_gui.access.log" common
</VirtualHost>
================APACHE2==================


================APPS==================
1. POLECENIA:
Zainstaluj:
- composer (php) - >=2.5
- node.js >= 18
================APPS==================


================DATABASE==================
Uruchom polecenia w terminalu, z katalogu głównego:
composer update
php bin/console secrets:generate-keys
php bin/console doctrine:migrations:migrate
================DATABASE==================

================BUILD==================
npm update
npm install
npm fund
npm run dev
================BUILD==================



