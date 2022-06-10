import { Edit, SimpleForm, useUpdate } from "react-admin";
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'

import styles from "./fieldStyles.module.scss";

import {
    DetailInput,
    TextInput,
    NumberInput,
    MySelectArrayInput,
    MyBooleanInput,
    TextAreaInput,
    MyImageInput,
} from "../fields";

import MyToolbar from "../toolbar";

const choices = [
    { id: 1, value: "gift" },
    { id: 2, value: "friend" },
    { id: 3, value: "demo" },
    { id: 4, value: "family" },
];

export const ProductEdit = () => {
    const imageUrl = useSelector(state => state.products)?.imageUrl
    const navigate = useNavigate()
    const [update] = useUpdate()

    const handleSubmit = async (data) => {
        data.imageUrl = imageUrl
        update('products', {id: data.id,data})
        navigate('/products')
    };

    return (
        <Edit>
            <SimpleForm onSubmit={handleSubmit} toolbar={<MyToolbar></MyToolbar>}>
                <div className={styles.box}>
                    <div className={styles.grid}>
                        <TextInput disabled source="sku" />
                        <TextInput source="name" />
                        <TextAreaInput source="description" />
                        <NumberInput source="stock" />
                        <NumberInput source="price" />
                        <MySelectArrayInput source="traits" choices={choices} />
                        <MyBooleanInput source="isActive" />
                    </div>

                    <div className={styles.grid}>
                        <DetailInput source="detail"></DetailInput>
                        <MyImageInput source="imageUrl" />
                    </div>
                </div>
            </SimpleForm>
        </Edit>
    );
};
