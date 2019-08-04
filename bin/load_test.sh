#!/bin/bash
artillery run -o 'logs/load.json' config/artillery.yml
forever stopall
