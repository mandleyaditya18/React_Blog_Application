import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import classes from './AddPost.module.css';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';

class AddPost extends Component {
    state = {
        blogForm : {
            title: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Title'
                },
                label: 'Title',
                value: ''
            },
            author: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Author'
                },
                label: 'Author',
                value: ''
            },
            content: {
                elementType: 'textarea',
                elementConfig: {
                    rows: '12',
                    placeholder: 'Write Blog Here...'
                },
                label: 'Content',
                value: ''
            }
        },
        loading: false
    }

    addPostHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const formData = {};
        for (let formElementIdentifier in this.state.blogForm) {
            formData[formElementIdentifier] = this.state.blogForm[formElementIdentifier].value;
        }
        const data = {
            blogData: formData
        }
        axios.post('/blogPosts.json', data)
            .then(response => {
                this.setState({loading: false});
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({loading:false});
            });
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedBlogForm = {
            ...this.state.blogForm
        }
        const updatedFormElement = {
            ...updatedBlogForm[inputIdentifier]
        }
        updatedFormElement.value = event.target.value;
        updatedBlogForm[inputIdentifier] = updatedFormElement;

        this.setState({blogForm: updatedBlogForm});
    }

    render () {
        const formElementsArray = [];
        for (let key in this.state.blogForm) {
            formElementsArray.push({
                id: key,
                config: this.state.blogForm[key]
            });
        }

        let form = (
            <form onSubmit={this.addPostHandler}>
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        label={formElement.config.label}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                <Button btnType="Success">ADD POST</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />;
        }

        return (
            <div className={classes.rootDiv}>
                <h2>Add a new Post</h2>
                <div className={classes.AddPost}>
                    {form}
                </div>
            </div>
        );
    }
}

export default AddPost;