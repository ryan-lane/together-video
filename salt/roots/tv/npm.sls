node_ppa:
  pkgrepo.managed:
    - ppa: chris-lea/node.js

install_nodejs:
  pkg.installed:
    - name: nodejs
    - require:
      - pkgrepo: node_ppa

bower:
  npm.installed:
    - require:
      - pkg: install_nodejs
