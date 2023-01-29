import { useRecordContext } from "react-admin";
import { useController } from "react-hook-form";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeImage, changeNewSku } from "../productSlice";
import { http } from "../../../services";

import { URL_DOMAIN_V1 } from "../../../services/API";

import axios from "axios";

import EditIcon from "@mui/icons-material/Edit";

import { SelectArrayInput, BooleanInput } from "react-admin";

import { StrimString } from "../../../utils/strimString";
import { SplitCamelCase } from "../../../utils/splitCamelcase";

import styles from "./fieldStyles.module.scss";

export const TraitsField = ({ source }) => {
  const record = useRecordContext();
  return <div>{record && record[source]?.join(", ")}</div>;
};

export const TextField = ({ source }) => {
  const record = useRecordContext();
  return <div>{record && StrimString(record[source], 20)}</div>;
};

export const NumberField = ({ source }) => {
  const record = useRecordContext();
  return <div>{record && record[source]}</div>;
};

export const DetailField = ({ source }) => {
  const record = useRecordContext()?.[source];
  const keys = record && Object.keys(record);

  return (
    <div>
      {record &&
        keys &&
        keys
          .filter((key) => record[key])
          .map((key, idx) => {
            return <div key={idx}>{`${key}: ${record[key]}`}</div>;
          })}
    </div>
  );
};

export const ThumbnailField = ({ source }) => {
  const record = useRecordContext();

  return (
    <object data="https://stackoverflow.com/does-not-exist.png" type="image/png">
    <img
      className={styles.thumbnail}
      // style={{ backgroundImage: `url(${record && record[source]})` }}
      src={record && record[source]}
      alt="img"
    ></img>
  </object>
  );
};

//edit component

export const DetailInput = ({ source }) => {
  const keys = ["color", "size", "material", "weight", "height"];

  const inputs =
    keys && keys.map((key) => DetailPropsInput(key, `${source}.${key}`));

  return (
    <div className={styles.input__detail}>
      <div>Detail</div>
      <div className={styles.props}>{inputs && inputs.map((item) => item)}</div>
    </div>
  );
};

export const DetailPropsInput = (key, source) => {
  const input = useController({ name: source });

  return (
    <div key={key} className={styles.field}>
      <div>{SplitCamelCase(key)}</div>
      <input
        className={styles.input__text}
        {...input.field}
        type="text"
        placeholder={key}
      />
    </div>
  );
};

export const TextInput = (props) => {
  const { source, disabled } = props;

  const inputText = useController({ name: source });

  return (
    <div className={styles.field}>
      <div>{SplitCamelCase(source)}</div>
      <input
        disabled={disabled}
        className={styles.input__text}
        {...inputText.field}
        type="text"
        placeholder={source}
      />
    </div>
  );
};

export const CreateTextInput = (props) => {
  const { source } = props;
  const dispatch = useDispatch();
  const value = useSelector((state) => state.products.newSkU);

  const handleChange = (e) => {
    dispatch(changeNewSku(e.target.value));
  };

  return (
    <div className={styles.field}>
      <div>{SplitCamelCase(source)}</div>
      <input
        className={styles.input__text}
        type="text"
        onChange={handleChange}
        value={value}
        placeholder={source}
      />
    </div>
  );
};

export const TextAreaInput = ({ source }) => {
  const inputText = useController({ name: source });

  return (
    <div className={styles.field}>
      <div>{SplitCamelCase(source)}</div>
      <textarea
        className={styles.input__text}
        {...inputText.field}
        placeholder={source}
      />
    </div>
  );
};

export const NumberInput = ({ source }) => {
  const inputNumber = useController({ name: source });

  return (
    <div className={styles.field}>
      <div>{SplitCamelCase(source)}</div>
      <input
        className={styles.input__number}
        {...inputNumber.field}
        type="number"
        placeholder={source}
      />
    </div>
  );
};

export const MySelectArrayInput = ({ source, choices }) => {
  return (
    <div className={styles.field}>
      <div>{SplitCamelCase(source)}</div>
      <SelectArrayInput
        source={source}
        choices={choices}
        optionText={"value"}
        optionValue={"value"}
        label={false}
      />
    </div>
  );
};

export const MyBooleanInput = ({ source }) => {
  return (
    <div className={styles.field}>
      <div>{SplitCamelCase(source)}</div>
      <BooleanInput
        className={styles.input__boolean}
        source={source}
        label={false}
      />
    </div>
  );
};

export const MyImageInput = ({ source }) => {
  const record = useRecordContext();
  const input = useController({ name: source });

  const dispatch = useDispatch();

  const [file, setFile] = useState();
  const [responeUrl, setResponseUrl] = useState();

  useEffect(() => {
    const formData = new FormData();
    formData.append("File", file);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    const upImage = async () => {
      const result =
        file &&
        (await http.http.post(
          `${URL_DOMAIN_V1}/Images/upload/product/${record?.["sku"]}`,
          formData,
          config
        ));
      setResponseUrl(result?.data?.data);
    };
    upImage();
  }, [file]);
  useEffect(() => {
    dispatch(changeImage({ imageUrl: responeUrl }));
    input.field.onChange();
  }, [responeUrl]);

  const handleSelectFile = (e) => {
    setFile(e.target.files?.[0]);
  };

  const handleRemove = (e) => setFile();

  const handlePreventOpenFile = () => {};

  return (
    <div className={styles.field}>
      <div>Image</div>
      <div
        onClick={handlePreventOpenFile}
        className={styles.input__image}
        style={{
          backgroundImage: `url(${
            (file && URL.createObjectURL(file)) || record?.[source]
          }`,
        }}
      >
        <div className={styles.layout}></div>
        <div className={styles.icon}>
          <EditIcon sx={{ fontSize: 24, color: "white" }}></EditIcon>
        </div>
        <input
          className={styles.img}
          type="file"
          onChange={handleSelectFile}
          accept="image/*"
        />
      </div>
      <div className={styles.remove} onClick={handleRemove}>
        Remove image
      </div>
    </div>
  );
};

export const MyCreateImageInput = ({ source }) => {
  const input = useController({ name: source });

  const sku = useSelector((state) => state.products.newSkU);

  const dispatch = useDispatch();

  const [file, setFile] = useState();
  const [responeUrl, setResponseUrl] = useState();

  useEffect(() => {
    const formData = new FormData();
    formData.append("File", file);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    const upImage = async () => {
      const result =
        file &&
        (await http.http.post(
          `${URL_DOMAIN_V1}/Images/upload/product/new/${sku}`,
          formData,
          config
        ));
      setResponseUrl(result?.data?.data);
    };
    upImage();
  }, [file]);
  useEffect(() => {
    dispatch(changeImage({ imageUrl: responeUrl }));
    input.field.onChange();
  }, [responeUrl]);

  const handleSelectFile = (e) => {
    setFile(e.target.files?.[0]);
  };

  const handleRemove = (e) => setFile();

  const handlePreventOpenFile = () => {};

  return (
    <div className={styles.field}>
      <div>Image</div>
      <div
        onClick={handlePreventOpenFile}
        className={styles.input__image}
        style={{
          backgroundImage: `url(${file && URL.createObjectURL(file)}`,
        }}
      >
        <div className={styles.layout}></div>
        <div className={styles.icon}>
          <EditIcon sx={{ fontSize: 24, color: "white" }}></EditIcon>
        </div>
        <input
          className={styles.img}
          type="file"
          onChange={handleSelectFile}
          accept="image/*"
        />
      </div>
      <div className={styles.remove} onClick={handleRemove}>
        Remove image
      </div>
    </div>
  );
};

export const MyImageInputString = ({ source }) => {
  const value = useSelector((state) => state.product)?.imageUrl;
  const input = useController({ name: source });

  return (
    <div style={{ display: "none" }} className={styles.field}>
      <div>{SplitCamelCase(source)}</div>
      <input
        className={styles.input__text}
        {...input.field}
        value={value}
        placeholder={source}
      />
    </div>
  );
};
