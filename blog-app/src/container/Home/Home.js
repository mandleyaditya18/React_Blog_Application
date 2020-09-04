import React, { Component } from 'react';
import RecentPosts from '../../components/RecentPosts/RecentPosts';
import Search from '../../components/Search/Search';
import classes from './Home.module.css';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import BlogPost from '../../components/BlogPost/BlogPost';
import axios from '../../axios-orders';
import ReactPaginate from 'react-paginate';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offset: 0,
            data: [],
            perPage: 5,
            currentPage: 0,
            loading: true,
            blogs: [],
            allPosts: []
        };
        this.handlePageClick = this.handlePageClick.bind(this);
    }

    receivedData() {
        axios.get('/blogPosts.json')
            .then(res => {

                const data = res.data;
                const fetchedPosts = [];
                for (let key in data) {
                    fetchedPosts.push({
                        ...data[key],
                        id:key
                    });
                }
                const slice = fetchedPosts.slice(this.state.offset, this.state.offset + this.state.perPage);
                this.setState({
                    pageCount: Math.ceil(fetchedPosts.length / this.state.perPage),
                    loading: false,
                    blogs: slice,
                    allPosts: fetchedPosts.reverse().slice(0,5)
                })
            })
            .catch(err => {
                this.setState({loading:false});
            });
    }

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.receivedData()
        });

    };

    componentDidMount () {
        this.receivedData();
    };

    subClass = [classes.pages, classes.pagination].join(' ');

    render () {
        // console.log(this.state.allPosts);
        return (
            <Aux>
                <div className={classes.root}>
                    <div className={classes.left}>
                        {this.state.blogs.map(blog => (
                            <BlogPost
                                key={blog.id}
                                blogData={blog.blogData} />
                        ))}   
                    </div>

                    <div className={classes.right}>
                        <Search />
                        <div className={classes.recPosts}>
                            <h2>Recent Posts</h2>
                            {this.state.allPosts.map(pd => (
                                <RecentPosts
                                    key={pd.id}
                                    title1={pd.blogData.title}/>
                            ))}
                        </div>
                    </div>
                </div>
                <div className={classes.bottom}>
                    <ReactPaginate
                        previousLabel={"prev"}
                        nextLabel={"next"}
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        pageCount={this.state.pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={this.handlePageClick}
                        containerClassName={classes.pagination}
                        subContainerClassName={this.subClass}
                        activeClassName={classes.active}/>
                </div>
            </Aux>
        )
    }
}

export default withErrorHandler(Home, axios);