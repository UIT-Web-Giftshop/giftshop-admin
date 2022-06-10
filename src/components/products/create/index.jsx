import { Create, SimpleForm } from "react-admin";
import { useNavigate } from "react-router-dom";

import styles from "./createStyles.module.scss";

import { useDispatch, useSelector } from "react-redux";
import { changeInvalidate , changeNewSku} from "../productSlice";
import AjaxHelper from "../../../services";

import {
    DetailInput,
    TextInput,
    NumberInput,
    MySelectArrayInput,
    MyBooleanInput,
    TextAreaInput,
    MyCreateImageInput,
    CreateTextInput
} from "../fields";

const choices = [
    { id: 1, value: "gift" },
    { id: 2, value: "friend" },
    { id: 3, value: "demo" },
    { id: 4, value: "family" },
];

export const ProductCreate = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const newSku = useSelector(state => state.products.newSkU)
    const imageUrl = useSelector(state => state.products)?.imageUrl

    const handleSubmit = async (data) => {

        data.sku = newSku;
        data.imageUrl = imageUrl;
        if (!data?.sku) {
            dispatch(
                changeInvalidate({
                    validateHelper: {
                        isValid: false,
                        message: "Sku is required",
                    },
                })
            );
            setTimeout(() => {
                dispatch(
                    changeInvalidate({
                        validateHelper: { isValid: true, message: "" },
                    })
                );
            }, 1500);
            return;
        } else {
            try {
                const result = await AjaxHelper.getOne("products", {
                    id: data?.sku,
                });
                dispatch(
                    changeInvalidate({
                        validateHelper: {
                            isValid: false,
                            message: "Sku is existed",
                        },
                    })
                );
                setTimeout(() => {
                    dispatch(
                        changeInvalidate({
                            validateHelper: { isValid: true, message: "" },
                        })
                    );
                }, 1500);
                return;
            } catch (err) {
                if (err.response.status !== 400) {
                    dispatch(
                        changeInvalidate({
                            validateHelper: {
                                isValid: false,
                                message: err.message,
                            },
                        })
                    );
                    setTimeout(() => {
                        dispatch(
                            changeInvalidate({
                                validateHelper: { isValid: true, message: "" },
                            })
                        );
                    }, 1500);
                }
            }
        }
        if (!data?.name) {
            dispatch(
                changeInvalidate({
                    validateHelper: {
                        isValid: false,
                        message: "Name is required",
                    },
                })
            );
            setTimeout(() => {
                dispatch(
                    changeInvalidate({
                        validateHelper: { isValid: true, message: "" },
                    })
                );
            }, 1500);
            return;
        }
        if (!data?.stock) {
            dispatch(
                changeInvalidate({
                    validateHelper: {
                        isValid: false,
                        message: "Stock is required",
                    },
                })
            );
            setTimeout(() => {
                dispatch(
                    changeInvalidate({
                        validateHelper: { isValid: true, message: "" },
                    })
                );
            }, 1500);
            return;
        }
        if (!data?.price) {
            dispatch(
                changeInvalidate({
                    validateHelper: {
                        isValid: false,
                        message: "Price is required",
                    },
                })
            );
            setTimeout(() => {
                dispatch(
                    changeInvalidate({
                        validateHelper: { isValid: true, message: "" },
                    })
                );
            }, 1500);
            return;
        }
        await AjaxHelper.create("products", { id: data.sku, data });
        dispatch(changeNewSku(''))
        navigate("/products");
    };
    return (
        <Create {...props}>
            <SimpleForm onSubmit={handleSubmit}>
                <div className={styles.box}>
                    <div className={styles.grid}>
                        <CreateTextInput
                            source="sku"
                        />
                        <TextInput source="name" />
                        <TextAreaInput source="description" />
                        <NumberInput source="stock" />
                        <NumberInput source="price" />
                        <MySelectArrayInput source="traits" choices={choices} />
                        <MyBooleanInput source="isActive" />
                    </div>

                    <div className={styles.grid}>
                        <DetailInput source="detail"></DetailInput>
                        <MyCreateImageInput source="imageUrl" />
                    </div>
                </div>
            </SimpleForm>
        </Create>
    );
};
