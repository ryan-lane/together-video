{% set tv = pillar.get('tv', {}) -%}
{% set virtualenv = tv.get('virtualenv', '/srv/tv') -%}
{% set location = tv.get('location', '/vagrant') -%}
{% set workers = tv.get('workers', '2') -%}

install_uwsgi:
  pkg.installed:
    - pkgs:
      - uwsgi
      - uwsgi-plugin-python

/etc/uwsgi/apps-available/tv.ini:
  file.managed:
    - name: /etc/uwsgi/apps-available/tv.ini
    - source: salt://tv/files/tv-uwsgi.ini.jinja
    - template: jinja
    - context:
      virtualenv: {{ virtualenv }}
      location: {{ location }}
      workers: {{ workers }}
    - require:
      - pkg: install_uwsgi

/etc/uwsgi/apps-enabled/tv.ini:
  file.symlink:
    - target: /etc/uwsgi/apps-available/tv.ini
    - require:
      - file: /etc/uwsgi/apps-available/tv.ini
    - require:
      - pkg: install_uwsgi

uwsgi_service:
  service.running:
    - name: uwsgi
    - watch:
      - file: /etc/uwsgi/apps-available/tv.ini
      - file: /etc/uwsgi/apps-enabled/tv.ini
