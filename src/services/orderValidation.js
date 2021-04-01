import * as yup from 'yup';

export const userSchema = yup.object().shape({
    name: yup.string().max(25).required(),
    street: yup.string().required(),
    zip: yup.string().min(5).required(),
    country: yup.string().required(),
    email: yup.string().email().required(),
    deliveryMethod: yup.string().required(),
});
