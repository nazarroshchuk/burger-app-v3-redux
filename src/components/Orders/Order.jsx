import React from 'react';
import classes from './Order.module.css'

export const Order = ({ ingredients, price}) => {
    const ingredientsInArr = [];

    for (const key in ingredients) {
        ingredientsInArr.push({
            ingredient: key,
            count: ingredients[key],
        })
    }

    const inredientsInPage = ingredientsInArr.map((ing, index) => (
        <span
            className={classes.Ingredient}
            key={index}
        >
            {ing.ingredient}: {ing.count}
        </span>
    ))

    return (
        <div className={classes.Order}>
            <p>Ingredients: {inredientsInPage}</p>
            <p>Price: <strong>USD {price}</strong></p>
        </div>
    )
}
