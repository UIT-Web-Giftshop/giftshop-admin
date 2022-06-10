import AjaxHelper from "../../services";

import { Admin, Resource, ListGuesser } from "react-admin";

import PersonIcon from '@mui/icons-material/Person';

import ProductList from "../products";
import { ProductEdit } from "../products/edit";
import { ProductCreate } from "../products/create";

import {UserList} from "../users"

import authoProvider from "../../providers/auth";

//import jsonServerProvider from "ra-data-json-server

export default function Exam() {
    return (
        <>
            <Admin
                dataProvider={AjaxHelper}
                authProvider={authoProvider}
                requireAuth
            >
                <Resource
                    name="products"
                    list={ProductList}
                    edit={ProductEdit}
                    create={ProductCreate}
                />
                <Resource
                    name="users"
                    list={UserList}
                    icon={PersonIcon}
                    // edit={ProductEdit}
                    // create={ProductCreate}
                />
                <Resource
                    name="orders"
                    list={ListGuesser}
                    icon={PersonIcon}
                    // edit={ProductEdit}
                    // create={ProductCreate}
                />
            </Admin>
        </>
    );
}
