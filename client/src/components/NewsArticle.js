import React, { Component } from 'react';

export default class NewsArticle extends Component {

    onMoreNewsButtonClick() {
        this.props.onMore(this.props.url);
    }

    render() {

        return (
            <div className="newsItem">
                <p>{this.props.title}</p>
                <button onClick={this.onMoreNewsButtonClick.bind(this)}>more...</button>
            </div>
        )
    };
}