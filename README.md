# AWS Translate JSON

Translate object values into other languages using the AWS translate API

## Install as a npm package

- `npm install aws-translate-json`

## Usage

### Create an AWS account (Skip this step if you already have one):

- Create an account [here](https://aws.amazon.com).

*There is a free tier to use the translation API that you can check [here](https://aws.amazon.com/pt/translate/pricing/).*

### Create an IAM account with AWS Translation permissions only (Recommended):

- Login on AWS console and navigate to [IAM panel](https://console.aws.amazon.com/iam/home)
- Click on `Users` tab
- Click on `Add User` button
- Follow the steps and add a `User` with access to the Translation API only
- Store the `access key` and the `secret` in a secure place

### Usage example:

```javascript
const { AWSTranslateJSON } = require('aws-translate-json');

const awsConfig = {
    accessKeyId: process.env.AWS_TRANSLATE_ID,
    secretAccessKey: process.env.AWS_TRANSLATE_SECRET,
    region: process.env.AWS_TRANSLATE_REGION,
}

const source = "en";
const taget = ["pt", "it", "es"];

const { translateJSON } = new AWSTranslateJSON(awsConfig, source, taget);

translateJSON({
    key1: "my text here",
    key2: "other text",
    key3: {
        key4: "nested text"
    }
}).then(console.log);

/* OUTPUT:
    {
        pt: {
            key1: 'meu texto aqui',
            key2: 'outro texto',
            key3: {
                key4: 'texto aninhado'
            }
        },
        it: {
            key1: 'il mio testo qui',
            key2: 'altro testo',
            key3: {
                key4: 'testo nidificato'
            }
        },
        es: {
            key1: 'mi texto aquí',
            key2: 'otro texto',
            key3: {
                key4: 'texto anidado'
            }
        }
    }
*/
```
