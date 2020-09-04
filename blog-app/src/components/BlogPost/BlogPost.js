import React from 'react';
import classes from './BlogPost.module.css';

const blogPosts = (props) => {
    // const blogs = [];
    // for (let blog in props.blogData) {
    //     blogs.push({
    //         head: blog,
    //         author: blog['author'],
    //         value: props.blogData[blog] 
    //     });
    // }

    // // console.log(props.blogData['author']);

    // const blogOutput = blogs.map(ig => {
        
    //     return (
    //         console.log(ig.author),
    //         // <h2>{ig.author}</h2>
    //         <div key={ig.head}>
    //             {/* <h2>{ig.head}</h2> */}
    //             <p>{ig.value}</p>
    //         </div>
    //     );
    // })


    return (
        <div className={classes.BlogPosts}>
            <h2>{props.blogData['title']}</h2>
            <h4>~ {props.blogData['author']}</h4>
            <div>
                {props.blogData['content'].split("\n").map((i,key) => {
                    return <p key={key}>{i}</p>;
                })}
            </div>
        </div>
    );
};

export default blogPosts;