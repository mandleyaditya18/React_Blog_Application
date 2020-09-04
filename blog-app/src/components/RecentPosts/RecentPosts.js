import React from 'react';
import classes from './RecentPosts.module.css';

const recentPosts = (props) => {
    return (
        <div className={classes.RecentPosts}>
            <h2>Recent Posts</h2>
            <ul>
                <li>William Carlos Williams, “The Red Wheelbarrow”</li>
                <li>T. S. Eliot, “The Waste Land”</li>
                <li>Robert Frost, “The Road Not Taken”</li>
                <li>Gwendolyn Brooks, “We Real Cool”</li>
            </ul>
        </div>
    );
}

export default recentPosts;