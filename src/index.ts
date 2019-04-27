import AWS from "aws-sdk";
import { ConfigurationOptions } from "aws-sdk/lib/config";

class AWSTranslateJSON {
  translate: AWS.Translate;
  sourceLang: string;
  tagetLangs: Array<string>;

  constructor(
    awsConfig?: ConfigurationOptions,
    sourceLang: string = "en",
    tagetLangs: Array<string> = ["en"]
  ) {
    AWS.config.apiVersions = {
      translate: "2017-07-01"
    };

    if (awsConfig) {
      AWS.config.update(awsConfig);
    }

    this.sourceLang = sourceLang;
    this.tagetLangs = tagetLangs;

    this.translate = new AWS.Translate();
  }

  translateJSON = async (
    obj: any,
    langs: string[] = this.tagetLangs,
    displayLang: boolean = true
  ) => {
    const resp: any = {};
    const langsToTranslate = langs;

    for (let lang of langsToTranslate) {
      for (let key in obj) {
        let word = "";

        try {
          word =
            typeof obj[key] === "object"
              ? ((await this.translateJSON(obj[key], [lang], false)) as string)
              : ((await this.translateText(
                  obj[key],
                  this.sourceLang,
                  lang
                )) as string);
        } catch (e) {
          console.error(e);

          word = "";
        }

        if (displayLang) {
          resp[lang] = resp[lang] || {};
          resp[lang][key] = word;
        } else {
          resp[key] = word;
        }
      }
    }

    return resp;
  };

  translateText = (text = "", sourceLang: string, targetLang: string) =>
    new Promise((resolve, reject) => {
      if (!targetLang || !sourceLang) reject("Missing source or target lang");

      const params = {
        SourceLanguageCode: sourceLang,
        TargetLanguageCode: targetLang,
        Text: text
      };

      this.translate.translateText(params, (err, resp) => {
        if (err) {
          reject(err);
        }
        resolve(resp.TranslatedText);
      });
    });
}

export default AWSTranslateJSON;
