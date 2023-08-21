# Nors Bot Daily Stats Service (WIP)

## What is this?

This is a service that will send the stats of your bot to discord webhook. Using google spreadsheet as a database. The project is in development so any contributions are welcome.

[Example spreadsheet](https://docs.google.com/spreadsheets/d/1mi2TmDPEH0Y-SLNLEk4gcLTTxK0u5fxLLGRVRm4puqE?usp=sharing)

![image](https://user-images.githubusercontent.com/26010736/203591041-dc412291-7eaf-4ae4-ac90-3c5d1f94fc92.png)


## How do I use it?

1. Edit .env.example and rename it to .env
2. Fill in the required fields (For Google Service Account See [here](https://cloud.google.com/iam/docs/creating-managing-service-account-keys))
3. Run `npm install` or `yarn`
4. To build the project run `npm run build` or `yarn build` (if you want to build an executable, run `build:pkg:win` or `build:pkg:linux`)
5. To run the built project `npm run start:prod` or `yarn start:prod`

## Using executables 

1. Download the latest release from [Releases](https://github.com/norsbot/daily-stats/releases) tab
2. Extract the zip file
3. Edit .env.example and rename it to .env
4. Fill in the required fields (For Google Service Account See [here](https://cloud.google.com/iam/docs/creating-managing-service-account-keys))
5. Use Task Scheduler or crontab to run it automatically

## To-Do
- [ ] Deployment with github workflows
- [ ] Detailed document about building & deployment
- [ ] More statistics about bot? Monthly, Yearly etc.
