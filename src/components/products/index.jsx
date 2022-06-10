import { List, Datagrid, BooleanField, EditButton } from 'react-admin';



import {TraitsField, TextField, NumberField, DetailField, ThumbnailField} from './fields'

export const ProductList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="id"/>
            <TextField source="sku" />
            <TextField source="name" />
            <TextField source="description" />
            <NumberField source="stock" />
            <NumberField source="price" />
            <TraitsField source="traits" />
            <DetailField source="detail" />
            <ThumbnailField source="imageUrl" />
            <BooleanField source="isActive" />
            <EditButton ></EditButton>
        </Datagrid>
    </List>
);

export default ProductList;