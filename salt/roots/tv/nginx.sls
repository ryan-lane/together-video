/etc/nginx/sites-available/tv.conf:
  file.managed:
    - source: salt://tv/files/tv-nginx.conf.jinja
    - template: jinja
    - user: root
    - group: root
    - mode: 644

/etc/nginx/sites-enabled/000-tv.conf:
  file.symlink:
    - target: /etc/nginx/sites-available/tv.conf
