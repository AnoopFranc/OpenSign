import React, { useState, useEffect } from "react";
import { SaveFileSize } from "../../constant/saveFileSize";
// import Parse from "parse";
// import sanitizeFileName from "../../primitives/sanitizeFileName";
import axios from "axios";

const FileUpload = (props) => {
  const [parseBaseUrl] = useState(localStorage.getItem("baseUrl"));
  const [parseAppId] = useState(localStorage.getItem("parseAppId"));
  const [_fileupload, setFileUpload] = useState("");
  const [fileload, setfileload] = useState(false);

  const [localValue, setLocalValue] = useState("");
  const [Message] = useState(false);
  const [percentage, setpercentage] = useState(0);

  const REQUIRED_FIELD_SYMBOL = "*";

  useEffect(() => {
    if (!props.formData) {
      setFileUpload([]);
      props.onChange(undefined);
    }
    // eslint-disable-next-line
  }, [props.formData]);
  const onChange = (e) => {
    try {
      let files = e.target.files;
      setLocalValue(e.target.files);
      if (typeof files[0] !== "undefined") {
        if (props.schema.filetypes && props.schema.filetypes.length > 0) {
          var fileName = files[0].name;
          var fileNameExt = fileName
            .substr(fileName.lastIndexOf(".") + 1)
            .toLowerCase();
          let Extensions = props.schema.filetypes.map((x) => x.toLowerCase());
          let arr = Extensions.filter((x) => x === fileNameExt);
          if (arr.length > 0) {
            console.log("multiple type");
          } else {
            alert(
              "Only these file types are accepted : " + Extensions.join(", ")
            );
          }
        }
        if (props.schema.maxfilesizeKB && props.schema.maxfilesizeKB !== "") {
          // console.log(Math.round(files[0].size / 1024));
          if (
            Math.round(Number(files[0].size) / 1024) >=
            props.schema.maxfilesizeKB
          ) {
            alert(
              `The selected file size is too large. Please select a file less than ${Math.round(
                props.schema.maxfilesizeKB / 1024
              )} MB`
            );
            return;
          }
        }
        handleFileUpload(files[0]);
      } else {
        alert("Please select file.");
        return false;
      }
    } catch (error) {
      alert(error.message);
      return false;
    }
  };

  const handleFileUpload = async (file) => {
    setfileload(true);
    const file_url = parseBaseUrl.slice(0, -4);
    const url = `${file_url}file_upload`;
    const formData = new FormData();
    formData.append("file", file);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        "X-Parse-Application-Id": parseAppId
      },
      onUploadProgress: function (progressEvent) {
        var percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setpercentage(percentCompleted);
      }
    };

    try {
      await axios
        .post(url, formData, config)
        .then((res) => {
          if (res.data.status === "Error") {
            alert(res.data.message);
          }
          setFileUpload(res.data.imageUrl);
          props.onChange(res.data.imageUrl);
          setfileload(false);
          setpercentage(0);

          if (res.data.imageUrl) {
            SaveFileSize(file.size, res.data.imageUrl);
            return res.data.imageUrl;
          }
        })
        .catch((err) => {
          alert(`${err.message}`);
          setfileload(false);
          setpercentage(0);
        });
    } catch (error) {
      alert(error.message);
      setfileload(false);
      setpercentage(0);
    }
  };

  let fileView =
    props.formData &&
    props.schema.uploadtype === "s3viajw" ? null : props.formData &&
      props.formData ? (
      <React.Fragment>
        <a
          href={props.formData}
          title={props.formData}
          style={{ paddingBottom: "10px", color: "blue"}}
        >
          Download
        </a>
      </React.Fragment>
    ) : fileload === false ? null : (
      <React.Fragment>
        <a
          href={_fileupload}
          title={_fileupload}
          style={{ paddingBottom: "10px" }}
        >
          Download
        </a>
        <br />
      </React.Fragment>
    );

  return (
    <React.Fragment>
      <div style={{ display: "inline-block" }}>
        <label htmlFor={props.name}>
          {props.schema.title}
          {props.required && (
            <span className="required">{REQUIRED_FIELD_SYMBOL}</span>
          )}
          {fileload ? (
            <div className="flex items-center gap-x-2">
              <div className="h-2 rounded-full w-[200px] md:w-[400px] bg-gray-200">
                <div
                  className="h-2 rounded-full bg-blue-500"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              <span className="text-black text-sm">{percentage}%</span>
            </div>
          ) : (
            Message && (
              <span style={{ fontSize: "9px", marginLeft: "4px" }}>
                Processing will take 5-10 mins....
              </span>
            )
          )}
          {props.schema.helpbody ? (
            <div className="dropdown pull-right">
              <i
                className="far fa-question-circle dropdown-toggle hovereffect"
                aria-hidden="true"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                style={{
                  fontSize: "12px",
                  color: "purple",
                  cursor: "pointer !important",
                  position: "relative",
                  bottom: "0px",
                  left: "0px",
                  paddingBottom: "4px",
                  paddingLeft: "4px"
                }}
              ></i>
              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
                style={{
                  marginleft: "-121px",
                  margintop: "-14px",
                  position: "absolute",
                  padding: "10px",
                  top: "102px!important"
                }}
              >
                <br />
                {props.schema.helplink ? (
                  <a
                    href={props.schema.helplink}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-xs btn-primary"
                  >
                    Read more..
                  </a>
                ) : null}
              </div>
            </div>
          ) : null}
          <span style={{ marginLeft: "10px" }}>{fileView}</span>
        </label>
      </div>

      <>
        {localValue ? (
          <input
            type="file"
            id="hashfile"
            style={{
              border: "1px solid #ccc",
              color: "gray",
              backgroundColor: "white",
              padding: "5px 10px",
              borderRadius: "4px",
              fontSize: "13px",
              width: "100%",
              fontWeight: "bold"
            }}
            accept="application/pdf,application/vnd.ms-excel"
            onChange={onChange}
          />
        ) : props.formData ? (
          <div
            style={{
              border: "1px solid #ccc",
              color: "gray",
              backgroundColor: "white",
              padding: "5px 10px",
              borderRadius: "4px",
              fontSize: "13px",
              width: "100%",
              fontWeight: "bold"
            }}
          >
            file selected : {props.formData.split("/")[3]}
          </div>
        ) : (
          <input
            type="file"
            id="hashfile"
            style={{
              border: "1px solid #ccc",
              color: "gray",
              backgroundColor: "white",
              padding: "5px 10px",
              borderRadius: "4px",
              fontSize: "13px",
              width: "100%",
              fontWeight: "bold"
            }}
            accept="application/pdf,application/vnd.ms-excel"
            onChange={onChange}
          />
        )}
      </>
    </React.Fragment>
  );
};

export default FileUpload;
