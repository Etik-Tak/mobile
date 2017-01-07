export class Util {
    static currentTime() {
      return new Date().getTime() / 1000.0;
    }

    static buildUrl(url: string, params: {[index: string]: any}) : string {
      var completeUrl: string = url;
      var delimiter = "?";
      for (var key in params) {
        completeUrl += delimiter;
        completeUrl += key + "=" + encodeURIComponent(params[key]);
        delimiter = "&";
      }
      return completeUrl;
    }
}
