# NC News

News aggregator web app where users can comment and vote on articles, built using React.

The deployed version is hosted using Netlify, and can be found at https://nc-news-carces.netlify.app/

Back-end uses my NC News API, which can be found at https://github.com/Carces/be-nc-news

## Table of Contents

1.  [Documentation](#documentation)
    1.  [Features](#features)
    2.  [Limitations](#limitations)
2.  [Credits](#credits)
3.  [License](#support)

# Documentation

The front-end web app was built using create-react-app, and axios was used for making calls to the back-end API.
Deployed to Netlify using Netlify CLI.

## Features

- Presents users with a Reddit-style feed of news articles.
- Each topic has its own page, to view only articles related to that topic.
- Users can upvote and downvote articles and comments.
- Users can post and delete their own comments on an article.
- Articles can be sorted by number of votes, number of comments, or time posted, in either ascending or descending order.

## Limitations

User login and registration has not yet been implemented - comments are currently posted as a hardcoded demo user.

The back-end API is hosted using the free tier of Render, which means that the API is suspended when not in use.
As a result, the first time you view the web app, it may take around 30 seconds for the API to start up and begin supplying data.

The UI was designed mobile-first, but due to time constraints has not yet been optimised for desktop viewing. 
For best results, please use a mobile device to view.

Multiple planned features have not yet been added, such as allowing users to post new articles, create new topics and view user profiles.

# Credits

NC News was originally produced as part of project for the Northcoders software development bootcamp.

The seed data (articles, topics, users etc.) in the NC News database was supplied by Northcoders.

# License

Copyright (c) 2023 Theo Johnson (GitHub: Carces)

Licensed under the MIT license.
