{% set tv = pillar.get('tv', {}) -%}
{% set port = tv.get('nginx_port', '8080') -%}

/etc/nginx/sites-available/tv.conf:
  file.managed:
    - source: salt://tv/files/tv-nginx.conf.jinja
    - template: jinja
    - context:
      port: {{ port }}
    - user: root
    - group: root
    - mode: 644
    - watch_in:
      - service: nginx
    - require:
      - pkg: nginx

/etc/nginx/sites-enabled/000-tv.conf:
  file.symlink:
    - target: /etc/nginx/sites-available/tv.conf
    - require:
      - file: /etc/nginx/sites-available/tv.conf
    - watch_in:
      - service: nginx
    - require:
      - pkg: nginx
