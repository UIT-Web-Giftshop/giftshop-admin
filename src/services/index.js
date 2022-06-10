import axios from "axios";

import { URL_DOMAIN_V1 } from "./API";

const AjaxHelper = {};

AjaxHelper.get = (url, params, options) => {
    return axios.get(url, { params: params, ...options });
};

AjaxHelper.post = (url, params, options) => {
    return axios.post(url, params, options);
};

AjaxHelper.put = (url, params, options) => {
    return axios.put(url, params, options);
};

AjaxHelper.delete = (url, options) => {
    return axios.delete(url, options);
};

AjaxHelper.getList = async (url, params, options) => {
    const configedUrl = configUrl(url);

    var result = await axios.get(configedUrl, params, options);

    result = configResult(url, result, "get list");

    return result;
    // return {
    //     data: [
    //         {
    //             id: "test03",
    //             description: "A sweet valentine gift for girlfriend",
    //             detail: { color: "red", material: "wood" },
    //             imageUrl: "http://loremflickr.com/640/480/city",
    //             isActive: true,
    //             name: "gift demo 03",
    //             price: 50.25,
    //             sku: "test03",
    //             stock: 54,
    //             traits: ["gift", "demo", "valentine", "girl"],
    //         },
    //     ],
    //     total: 1,
    // };
};
AjaxHelper.getOne = async (url, params) => {
    const configedUrl = `${configUrl(url)}/sku/${params.id}`;

    var result = await axios.get(configedUrl);

    result = configResult(url, result, "get one");

    return result;
    // return {
    //     data: {
    //         id: "test03",
    //         description: "A sweet valentine gift for girlfriend",
    //         detail: { color: "red", material: "wood" },
    //         imageUrl: "http://loremflickr.com/640/480/city",
    //         isActive: true,
    //         name: "gift demo 03",
    //         price: 50.25,
    //         sku: "test03",
    //         stock: 54,
    //         traits: ["gift", "demo", "valentine", "girl"],
    //     },
    // };
};
AjaxHelper.update = async function (url, payload) {
    var { id, ...restData } = payload?.data;

    const configedUrl = `${configUrl(url)}/${restData?.sku}`;

    await axios.put(configedUrl, restData);

    const result = await AjaxHelper.getOne(url, payload?.data);

    return {data:payload?.data};
    //return result
};

AjaxHelper.create = async function (url, payload) {
    const configedUrl = `${configUrl(url)}`;

    var result = await axios.post(configedUrl, payload?.data);

    console.log(result);

    return { data: { id: payload?.sku, ...payload?.data } };
    return {
        data: {
            id: "test03",
            description: "A sweet valentine gift for girlfriend",
            detail: { color: "red", material: "wood" },
            imageUrl: "http://loremflickr.com/640/480/city",
            isActive: true,
            name: "gift demo 03",
            price: 50.25,
            sku: "test03",
            stock: 54,
            traits: ["gift", "demo", "valentine", "girl"],
        },
    };
};

export default AjaxHelper;

//----------------------------------------------------------------
const configUrl = (url) => {
    switch (url) {
        case "products":
            return `${URL_DOMAIN_V1}/${url}`;
        case "users":
            return `${URL_DOMAIN_V1}/${url}`; 
        default:
            return url;
    }
};

//----------------------------------------------------------------
const configResult = (url, result, action) => {
    switch (url) {
        case "products": {
            switch (action) {
                case "get list": {
                    var data = {};
                    data = result?.data?.data?.items?.map((item, idx) => ({
                        id: item.sku,
                        ...item,
                    }));
                    const total = result?.data?.data?.itemsCount;

                    return { data, total };
                }
                case "get one": {
                    var data = {};
                    data = result?.data?.data;
                    data.id = data?.sku;

                    return { data };
                }
                case "update": {
                }
                default:
                    return result;
            }
        }
        case "users": {
            switch (action) {
                case "get list": {
                    var data = {};
                    data = result?.data?.data?.items
                    console.log(data)
                    const total = result?.data?.data?.itemsCount;

                    return { data, total };
                }
                case "get one": {
                    var data = {};
                    data = result?.data?.data;
                    data.id = data?.sku;

                    return { data };
                }
                case "update": {
                }
                default:
                    return result;
            }
        }
        case "order": {
            switch (action) {
                case "get list": {
                    var data = {};
                    data = result?.data?.data?.items
                    console.log(data)
                    const total = result?.data?.data?.itemsCount;

                    return { data, total };
                }
                case "get one": {
                    var data = {};
                    data = result?.data?.data;
                    data.id = data?.sku;

                    return { data };
                }
                case "update": {
                }
                default:
                    return result;
            }
        }
        default:
            return result;
    }
};
