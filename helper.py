from newspaper import Article
from textblob import TextBlob
import json
import sys



def main ():
    # converts json into dictionary with keys url and article
    review = json.loads(sys.argv[1])
    url = review['url'] or ""
    article_string = f"{review['article']}" or ""

    if url == "" and article_string != "":
         sentiment = textBlob(article_string)
         output = {"article":article_string, "sentiment": sentiment}
    else:
         article = Article(url)
         article.download()
         article.parse()
         article_string = article.text
         sentiment = textBlob(article_string)
         output = {"article":article_string, "sentiment": sentiment}
    # converts dictionary to a json obj wrapped in a string
    print(json.dumps(output))



def textBlob (article_string):
    b = TextBlob(article_string)
    sentiment_analysis = b.sentiment
    polarity = sentiment_analysis[0]
    objectivity = sentiment_analysis[1]

    #translates polarity into [very] positive or negative, or neutral
    if polarity < -0.5:
        sentiment = ["very negative"]
    elif polarity < 0:
        sentiment = ["negative"]
    elif polarity > 0.5:
        sentiment = ["very positive"]
    elif polarity > 0:
        sentiment = ["positive"]
    else:
        sentiment = ["neutral"]

    #translates objectivity into [very] objective or subjective
    if objectivity < 0.25:
        sentiment.append("very objective")
    elif objectivity < 0.5:
        sentiment.append("objective")
    elif objectivity <0.75:
        sentiment.append("subjective")
    else:
        sentiment.append("very subjective")

    return sentiment


if __name__ == "__main__":
    main()
