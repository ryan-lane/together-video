{% set tv = pillar.get('tv', {}) -%}
{% set virtualenv = tv.get('virtualenv', '/srv/tv') -%}
{% set location = tv.get('location', '/vagrant') -%}
{% set workers = tv.get('workers', '2') -%}

install_uwsgi:
  pkg.installed:
    - pkgs:
      - uwsgi
      - uwsgi-plugin-python

uwsgi_tv_config:
  file.managed:
    - name: /etc/uwsgi/apps-available/tv.ini
    - source: salt://tv/files/tv-uwsgi.ini.jinja
    - context:
      virtualenv: {{ virtualenv }}
      location: {{ location }}
      workers: {{ workers }}
    - tempate: jinja

uwsgi_service:
  service.running:
    - name: uwsgi
    - watch:
      - file: uwsgi_tv_config
