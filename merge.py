import IPython
import json
import csv

with open('us-states.json') as f:
    states = json.load(f)

with open('staffing-data.csv', newline='') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        state = next(x for x in states['features']
                     if x['properties']['name'] == row['state'])
        print(state['properties']['name'])
        state['properties']['pctChange'] = row['pctChange'].replace('%', '')

with open('data-states.json', 'w') as outfile:
    json.dump(states, outfile)
