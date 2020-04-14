from textblob import TextBlob
import sys

article = sys.argv[1]
b = TextBlob(article)
sentiment_analysis = b.sentiment
polarity = sentiment_analysis[0]
objectivity = sentiment_analysis[1]

#translates polarity into [very] positive or negative, or neutral
if polarity < -0.5:
    sentiment = ['very negative']
elif polarity < 0:
    sentiment = ['negative']
elif polarity > 0.5:   
    sentiment = ['very positive']
elif polarity > 0:
    sentiment = ['positive']
else:
    sentiment = ['neutral']

#translates objectivity into [very] objective or subjective
if objectivity < 0.25:
    sentiment.append('very objective')
elif objectivity < 0.5:
    sentiment.append('objective')
elif objectivity <0.75:
    sentiment.append('subjective')
else:
    sentiment.append('very subjective')

print (sentiment)