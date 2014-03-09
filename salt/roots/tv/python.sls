{% set tv = pillar.get('tv', {}) -%}
{% set location = tv.get('location', '/srv/tv') -%}
{% set requirements = tv.get('requirements', '/vagrant/requires.txt') -%}

python_dependencies:
  pkg.installed:
    - pkgs:
      - python-redis
      - python-openid
      - python-flask
      - python-pip

pip_virtualenvwrapper:
  pip.installed:
    - require:
      - pkg: python-pip

{{ location }}:
  virtualenv.managed:
    - system_site_packages: True
    - requirements: {{ requirements }}
    - require:
      - pip: pip_virtualenvwrapper
      - pip: pip_uwsgi
