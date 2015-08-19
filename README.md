# lambda-rsa-keygen

[![Build Status](https://travis-ci.org/CodingSans/lambda-rsa-keygen.svg?branch=master)](https://travis-ci.org/CodingSans/lambda-rsa-keygen)

AWS Lambda function that generates RSA keys.

## Prerequisites

* [AWS Command Line Interface](http://docs.aws.amazon.com/cli/latest/userguide/installing.html)
* For Install and Uninstall you will need your [AWS Cli configured](http://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html).
* For Run on AWS you will need the `jq` package install.
  * APT: `sudo apt-get install jq`
  * BREW: `brew install jq`

## Get

```
git clone https://github.com/CodingSans/lambda-rsa-keygen.git
cd lambda-rsa-keygen
```
## Run

This will use `event.json` as input.

```
npm start
```

## Install to AWS

```
npm run aws-install
```

## Run on AWS

```
npm run aws-run
```

## Unistall from AWS

```
npm run aws-uninstall
```
