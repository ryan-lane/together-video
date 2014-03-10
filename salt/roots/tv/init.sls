{% set tv = pillar.get('tv', {}) -%}
{% set user = tv.get('user', 'tv') -%}
{% set run = tv.get('run', '/usr/bin/python /vagrant/runserver.py') -%}

include:
  - tv.python
  - tv.nginx
  - tv.uwsgi
  - redis.server
  - nginx

tv_group:
  group.present:
    - name: {{ user }}

tv_user:
  user.present:
    - name: {{ user }}
    - gid_from_name: True
    - home: /var/lib/{{ user }}
    - group: {{ user }}
    - system: True
    - require:
      - group: tv_group

tv_upstart:
  file.managed:
    - name: /etc/init/tv.conf
    - source: salt://tv/files/tv-upstart.conf.jinja
    - template: jinja
    - context:
        user: {{ user }}
        group: {{ user }}
    - user: root
    - group: root
    - mode: 644

tv_service:
  service.running:
    - name: tv
    - enable: True
    - reload: True
    - require:
      - file: tv_upstart
      - user: tv_user
      - group: tv_group
