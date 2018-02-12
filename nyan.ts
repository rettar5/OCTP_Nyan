import { OdnTweetData, OdnTweets } from "../../../odnTweets"
import { OdnPlugins, OdnPluginResultData } from "../../../odnPlugins";
import { Log } from "../../../odnUtils";

export class Nyan {
  constructor(private tweetData: OdnTweetData, private fullName: string) {}

  /**
   * プラグインのメイン処理を実行
   *
   * @param {(isProcessed?: boolean) => void} finish
   */
  run(finish: (isProcessed?: boolean) => void) {
    Log.d(this.tweetData.text);

    const tweets = new OdnTweets(this.tweetData.accountData);
    tweets.text = "なにが" + this.tweetData.text + "ですか、恥を知りなさい。";
    tweets.targetTweetId = this.tweetData.idStr;

    // ツイートを投稿
    tweets.postTweet((isSuccess) => {
      // 元ツイートをお気に入り登録
      tweets.likeTweet();
      finish();
    });
  }

  /**
   * プラグインを実行するかどうか判定
   *
   * @param {OdnTweetData} tweetData
   * @returns {boolean}
   */
  static isValid(tweetData: OdnTweetData): boolean {
    return tweetData.text.match(/^(((にゃ|ニャ|ﾆｬ)(ー|-|-|ｰ)*(ん|ン|ﾝ))|(meow))(。|!|！)?$/gi) ? true : false;
  }
}
