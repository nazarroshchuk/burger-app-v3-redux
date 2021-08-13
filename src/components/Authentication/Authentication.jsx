import React, {Component} from "react";
import {connect} from "react-redux";

import { Input } from "../UI/Input/Input";
import { Button } from "../UI/Button/Button";
import classes from './Authentication.module.css';
import { Spinner } from "../UI/Spinner/Spinner";
import { authenticationAction } from "../../actions";
import {Container} from "../UI/Container/Container";

class Authentication extends Component {
    state = {
        orderForm: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'E-mail address'
                },
                value: '',
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
            },
        },
        isFormValid: false,
        isSignUp: true,
    }


    onChangeHandler = (e, inputName) => {
        this.setState({isFormValid: true});

        const updatedControls = {
            ...this.state.orderForm,
            [inputName]: {
                ...this.state.orderForm[inputName],
                value: e.target.value
            }
        }

        this.setState({orderForm: updatedControls});
    }

    submitHandler = (e) => {
        e.preventDefault();
        this.props.onAuth(
            this.state.orderForm.email.value,
            this.state.orderForm.password.value,
            this.state.isSignUp,
        );
    }

    switchAuthModeHandler = () => {
        this.setState(state => ({isSignUp: !state.isSignUp}))
    }

    render() {
        const formInputsArray = [];

        for (const key in this.state.orderForm) {
            formInputsArray.push({
                id: key,
                options: this.state.orderForm[key],
            })
        }

        const form = formInputsArray.map(input =>
            <Input
                key={input.id}
                elementType={input.options.elementType}
                elementConfig={input.options.elementConfig}
                value={input.value}
                changed={e => this.onChangeHandler(e, input.id)}
            />
        )
        return (
           <Container>
               <form
                   onSubmit={this.submitHandler}
                   className={classes.Authentication}
               >
                   <h1>{!this.state.isSignUp ? 'Sign In' : 'Sing Up'}</h1>
                   {!this.props.loading ? form : <Spinner/>}
                   {
                       this.props.error &&
                       <p style={{color: 'red', textTransform: 'capitalize'}}>
                           {this.props.error.message.replace('_',' ').toLowerCase()}
                       </p>
                   }
                   <div className={classes.submit}>
                       <Button btnType='Success' type={'submit'}
                       >
                           {this.state.isSignUp ? 'SIGN UP' : 'SIGN IN'}
                       </Button>
                       <p>or</p>
                       <Button clicked={this.switchAuthModeHandler} btnType='SingUP' type={'button'}
                       >
                           Switch to {!this.state.isSignUp ? 'SIGN UP' : 'SIGN IN'}
                       </Button>
                   </div>
               </form>
           </Container>
        );
    }
};

const mapStateToProps = state => (
    {
        loading: state.authentication.loading,
        error: state.authentication.error,
        isAuthenticated: state.authentication.isAuthenticated,
    }
)

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(authenticationAction.authentication(email, password, isSignUp)),
    }
}

const connectedAuthentication = connect(mapStateToProps, mapDispatchToProps)(Authentication);
export {connectedAuthentication as Authentication};
