const AWS = require('aws-sdk');

AWS.config.apiVersions = {
    translate: '2017-07-01'
};

AWS.config.update({
    accessKeyId: process.env.AWS_TRANSLATE_ID,
    secretAccessKey: process.env.AWS_TRANSLATE_SECRET,
    region: process.env.AWS_TRANSLATE_REGION,
  });

const translate = new AWS.Translate();

const translateText = (text, targetLang = 'pt', sourceLang = 'en') => {
    return new Promise((resolve, reject) => {
        const params = {
            SourceLanguageCode: sourceLang,
            TargetLanguageCode: targetLang,
            Text: text
        };
    
        translate.translateText(params, (err, resp) => {
            if(err) {
                reject(err);
            }
            resolve(resp.TranslatedText);
        });
    });
}

const translateObject = async (obj, langs = ['pt']) => {
    const resp = {};
    const langsToTranslate = langs;

    for(let lang of langsToTranslate) {
        for (let key in obj) {
            let word = '';

            try {
                word = await translateText(obj[key], lang);
            } catch(e) {
                word = null;
            }

            resp[lang] = resp[lang] || {};
            resp[lang][key] = word;
        }
    }

    return resp;
};

// translateObject({
//     key1: 'my text here',
//     key2: 'other text'
// }).then(console.log)
