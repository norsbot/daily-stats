# Nors Bot Daily Stats Service

## What is this?

This is a service that will send the stats of your bot to discord webhook. Using google spreadsheet as a database. Any contributions are welcome.

[Example spreadsheet](https://docs.google.com/spreadsheets/d/1mi2TmDPEH0Y-SLNLEk4gcLTTxK0u5fxLLGRVRm4puqE?usp=sharing)

## How do I use it?

1. Edit .env.example and rename it to .env
2. Fill in the required fields (For Google Service Account See [here](https://cloud.google.com/iam/docs/creating-managing-service-account-keys))
3. Run `npm install` or `yarn`
4. To build the project run `npm run build` or `yarn build` (if you want to build an executable, run `build:pkg:win` or `build:pkg:linux`)
5. To run the built project `npm run start:prod` or `yarn start:prod`

## Using executables 

1. Download the latest release from Releases tab
2. Extract the zip file
3. Edit .env.example and rename it to .env
4. Fill in the required fields (For Google Service Account See [here](https://cloud.google.com/iam/docs/creating-managing-service-account-keys))
5. Use Task Scheduler or crontab to run it automatically

