import React, { Component } from 'react';
import RecentPosts from '../../components/RecentPosts/RecentPosts';
import Search from '../../components/Search/Search';
import classes from './Home.module.css';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import BlogPost from '../../components/BlogPost/BlogPost';
import axios from '../../axios-orders';
import ReactPaginate from 'react-paginate';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offset: 0,
            data: [],
            perPage: 5,
            currentPage: 0,
            loading: true,
            blogs: []
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
                    blogs: slice
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
        return (
            <Aux>
                <div className={classes.root}>
                    <div className={classes.left}>
                        {this.state.blogs.map(blog => (
                            <BlogPost
                                key={blog.id}
                                blogData={blog.blogData} />
                        ))}
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
                    <div className={classes.right}>
                        <Search />
                        <RecentPosts />
                    </div>
                </div>
                <div className={classes.bottom}></div>
            </Aux>
        )
    }
}

export default Home;