import React, { Component } from 'react';

import { Scrollbars } from 'react-custom-scrollbars';

import NewsArticle from './NewsArticle';

const API_KEY = "59cbc6de3b034db9b7daad3c1e4b85b2";
const NEWS_COUNT = 10;

export default class News extends Component {
    
    constructor() {
        super();

        let newsArray = [];
        for (let i = 0; i < NEWS_COUNT; i++) { 
            newsArray.push({ title: "", url: "", });
        }

        this.state = {
            news: newsArray,
            newsFrame: {
                show: false,
                url: "",
            }
        }
    };

    componentDidMount() {
        this.getNews();
    };

    getNews() {
        let request_url = "https://newsapi.org/v2/top-headlines?sources=spiegel-online&apiKey=" + API_KEY;

        fetch(request_url)
        .then(res => {
            if (res.status === 200) {
              return res.json();
            } else {
              this.showNewsError("Error (Status: " + res.status + ") while fetching data from: " + request_url);
            };
        }).then(newsJson => {
            this.displayNews(newsJson);
        })
        .catch(error => this.showNewsError(error));

        setTimeout(() => {
            this.getNews();
          }, 600000);
    };

    displayNews(news) {
        let newsArray = [];
        for (let i = 0; i < NEWS_COUNT; i++) { 
            newsArray.push({
                title: news.articles[i].title,
                url: news.articles[i].url,
            });
        };

        this.setState({
            news: newsArray,
        });
    };

    createNewsList() {
        let newsList = [];

        for (let i = 0; i < NEWS_COUNT; i++) { 
            newsList.push(<NewsArticle key={i} title={this.state.news[i].title} url={this.state.news[i].url} onMore={this.onMoreNewsButtonClick.bind(this)} />);
        };

        return newsList;
    }

    showNewsError(error) {
        console.log(error);
    };

    onMoreNewsButtonClick(newUrl) {
        this.setState({
            newsFrame: {
                url: newUrl,
            },
        });

        let newsFrame = document.getElementById("newsFrame");
        let newsFrameBackButton = document.getElementById("newsFrameBackButton");
        newsFrameBackButton.style.display = "block";

        newsFrame.classList.add("newsFrameAppear");
        newsFrameBackButton.classList.add("newsFrameBackButtonAppear");

        setTimeout(() => {
            newsFrame.style.top = "15vh";
            newsFrame.classList.remove("newsFrameAppear");
            newsFrameBackButton.style.opacity = "100";
            newsFrameBackButton.classList.remove("newsFrameBackButtonAppear");
        }, 1000);
    };

    onCloseNewsFrame() {
        let newsFrame = document.getElementById("newsFrame");
        let newsFrameBackButton = document.getElementById("newsFrameBackButton");

        newsFrame.classList.add("newsFrameDisappear");
        newsFrameBackButton.classList.add("newsFrameBackButtonDisappear");

        setTimeout(() => {
            newsFrame.style.top = "100vh";
            newsFrame.classList.remove("newsFrameDisappear");
            newsFrameBackButton.style.opacity = "0";
            newsFrameBackButton.classList.remove("newsFrameBackButtonDisappear");

            newsFrameBackButton.style.display = "none";
        }, 1000);
    };

    setImageByTheme() {
        if (this.props.theme === "nightTheme") {
            return require('../images/back_dark.png');
        } else {
            return require('../images/back.png');
        }
    }

    render() {
        let backImage = this.setImageByTheme();

        return (
            <div className="news">
                <h2>News.</h2>

                <Scrollbars className="newsList" style={{ width: "100%", height: "20vh", autoHide: true}}>
                    { this.createNewsList() }
                </Scrollbars>

                <button id="newsFrameBackButton" onClick={this.onCloseNewsFrame.bind(this)}>
                    <img src={backImage} alt='newsFrameBackButton' />
                </button>
                <iframe id="newsFrame" src={this.state.newsFrame.url} name='NewsFrame' title='NewsFrame'></iframe>
            </div>
        );
    };
}