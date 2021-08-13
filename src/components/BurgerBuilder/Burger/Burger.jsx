import React from 'react';
import classes from './Burger.module.css';
import {BurgerIngredient} from './BurgerIngredient/BurgerIngredient'

export const Burger = (props) => {
   let transformedIngredients = Object.keys(props.ingredients)
        .map(ingKey => {
            return [ ...Array(props.ingredients[ingKey])].map((_, i) =>
                <BurgerIngredient
                    key={ingKey + i}
                    type={ingKey}
                />
            )
        })
        .reduce((arr, el) => {
            return arr.concat(el)
        }, [])

    return(
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top'/>
            { transformedIngredients.length === 0
                ? <p>Please start adding ingredients!</p>
                : transformedIngredients
            }
            <BurgerIngredient type='bread-bottom'/>
        </div>
    )
}