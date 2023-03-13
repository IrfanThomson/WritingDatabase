import praw

reddit = praw.Reddit(client_id = 'oHi53xVuF6QqmGPW6JIczA', client_secret = 'f113IeizMyzzWwl2obtCYPf1c5xgCQ', username ='llIlIIIlllIlIlI ', password='ohnoyoufoundmypassword', user_agent='myagent')

print(reddit.submission("nljmsd").title)

# collection = reddit.subreddit("wanderwilder").collections("a5087059-61a2-4412-90f4-f588528a72ba")
# for submission in collection:
#     print(submission.title, submission.permalink)

# for collection in reddit.subreddit("wanderwilder").collections:
#     print(collection.permalink)