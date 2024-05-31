
## Introduction

An example of how to create a third party add-ons library for Sisense Compose SDK

This library contains two chart components, Histogram and HistgoramChart. Histogram renders a Histogram based on a semantic query against a data model and HistogramChart renders frequency data from a static table.

Demo: https://csdk-react.sisense.com/extensions

The code for the components are in './lib' folder.

Note this requires @sisense/sdk-ui and @sisense/sdk-data version 1.11.x or higher.

## Updating
Generate changeset by running:

npx changeset

Then commit the changeset log to trigger the GitHub Action.