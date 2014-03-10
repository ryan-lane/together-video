{% set tv = pillar.get('tv', {}) -%}
{% set virtualenv = tv.get('virtualenv', '/srv/tv') -%}
{% set location = tv.get('location', '/vagrant') -%}

python_dependencies:
  pkg.installed:
    - pkgs:
      - python-redis
      - python-openid
      - python-flask
      - python-pip

pip_virtualenvwrapper:
  pip.installed:
    - name: virtualenvwrapper
    - require:
      - pkg: python_dependencies

{{ virtualenv }}:
  virtualenv.managed:
    - system_site_packages: True
    - requirements: "{{ location }}/requires.txt"
    - require:
      - pip: pip_virtualenvwrapper
