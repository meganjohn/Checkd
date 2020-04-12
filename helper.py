from newspaper import Article
import sys

url = sys.argv[1]
article = Article(url)

article.download()
article.parse()
print(article.text)
