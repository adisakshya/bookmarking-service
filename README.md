# Bookmarking Service
REST API for a bookmarking application (just like chrome bookmarks) using Node/Express and MongoDB

[![](https://img.shields.io/badge/docs%20-view%20API%20Documentation-blue.svg?style=for-the-badge&logo=appveyor)](https://adisakshya.github.io/bookmarking-service/) [![version](https://img.shields.io/badge/Version-1.0.0-blue.svg?style=for-the-badge&logo=appveyor)](https://github.com/adisakshya/bookmarking-service) [![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-blue.svg?style=for-the-badge&logo=appveyor)](https://github.com/adisakshya/bookmarking-service/pulls) [![Open Source](https://img.shields.io/badge/Open%20Source-Love-red.svg?style=for-the-badge&logo=appveyor)]()

A bookmarking-service built using ExpressJS, MongoDB.

## Operating Instructions

### Fork

- Fork this repository
	- "Forking" adds a copy of [adisakshya/bookmarking-service](https://github.com/adisakshya/bookmarking-service/) repository to your GitHub account as `https://github.com/YourGitHubUserName/bookmarking-service`
- Or you can download or clone this repository
	- You can clone the repository executing below command in a location of your choice of your system.
	```$ git clone https://github.com/adisakshya/bookmarking-service.git```
- That's it your almost done, now in the repository root, run the following command
```$ cd src/```, this will take you to main source code directory.

### Local Development

### Prerequisites

- Make sure you have (not necessary)
  - Docker installed

#### Using Docker

- Make sure you have docker installed before proceeding.
	- In source directory ```src/```, run the following command
		- ```docker-compose up --build -d```
    - Running docker-compose in detached mode
- As soon as the build completes you are all set to get started with bookmarking-service.
- Now you have successfully setup bookmarking-service,
	- Please find the api-documentation for application server [here](https://adisakshya.github.io/bookmarking-service/).
  - It describe all routes that define the operation the application server.

#### Without Docker

- Make sure you have running MongoDB database and connection string as well.
	- In database config file ```src/bookmark/config/config.json```, replace the connection string with yours
	- That's it! Now from directory ```src/bookmark/```, the following command
		- ```npm start```, to start the bookmarking service
    - ```npm test```, to run tests on the bookmarking service
- Now you have successfully setup bookmarking-service without docker,
	- Please find the api-documentation for application server [here](https://adisakshya.github.io/bookmarking-service/).
  - It describe all routes that define the operation the application server.

#### Production & Test Dockerfiles

- In directory ```src/bookmark/```, there are two Dockerfiles
		- ```prod.Dockerfile & test.Dockerfile```
- They are added to aid in the testing process during Continuous Integration (CI) Builds.
- The ```prod.Dockerfile``` is for production image, and ```test.Dockerfile``` for test image.
- You'll have a container with the production code, as well as the required environment.
- You can now add tests and development libraries and run these tests in the same environment production environment with the same code and the same version of libraries and frameworks. 
- This is a great advantage of this method, because testing in a build machine (like Jenkins) may lead to unexpected surprises in production, caused by changes in the environment.

#### Running tests

##### Using test.Dockerfile

- Operate from directory ```src/bookmark/```
- Build the production docker image using following command
  - ```docker build -t adisakshya/bookmark-service:tag -f prod.Dockerfile```
- Now build and run the test docker image using following command
  - ```docker build -t adisakshya/bookmark-service-test:tag -f test.Dockerfile --build-arg PRODUCTION_IMAGE_TAG=tag```
  - ```docker run adisakshya/bookmark-service-test:tag```

##### Using npm

- Operate from directory ```src/bookmark/```
- Make sure you have running MongoDB database and connection string as well.
	- In database config file ```src/bookmark/config/config.json```, replace the connection string with yours
- Now run the tests using following command
  - ```npm test```

When tests complete, junit reports are generated that describe the passing and failing test cases. The can be found at ```src/bookmarks/build/reports```. I have added a sample report from tests that I ran.

## Suggest Features

Is a feature you care about currently missing? Make sure to browse the [issue tracker](https://github.com/adisakshya/bookmarking-service/issues?q=is%3Aissue+is%3Aopen+sort%3Areactions-%2B1-desc) and add your ":+1:" reaction to the issues you care most about, as we also use those reactions to prioritize issues.

## Contributing

There are multiple ways to contribute to this project, read about them [here](https://github.com/adisakshya/bookmarking-service/blob/master/.github/CONTRIBUTING.md).

## JustStarIt

🌟 Star this repo if bookmarking-service helped you.

## License

All versions of the app are open-sourced, read more about this [LICENSE](https://github.com/adisakshya/bookmarking-service/blob/master/LICENSE).
