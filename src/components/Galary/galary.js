import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { addGallery, getGallery, deleteGallery } from "../../store/Actions/Gallery";
import { NotificationManager } from "react-notifications";
import Slider from "react-slick";
import S3 from "aws-s3";


const Galleries = (props) => {
    const userBucket = JSON.parse(localStorage.getItem('user')).bucket_folder_name;
// aws-s3 uploader//
const config = {
    bucketName: "myhomeinfo-s3",
    dirName: userBucket,
    region: "us-west-2",
    accessKeyId: "AKIAW4MIDXMBT4OOUQMJ",
    secretAccessKey: "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",
  };
  const S3Client = new S3(config);
  const generate_random_string = (string_length) => {
    let random_string = "";
    let random_ascii;
    let ascii_low = 65;
    let ascii_high = 90;
    for (let i = 0; i < string_length; i++) {
      random_ascii = Math.floor(
        Math.random() * (ascii_high - ascii_low) + ascii_low,
      );
      random_string += String.fromCharCode(random_ascii);
    }
    return random_string;
  };
    let houseId = props.location.state.house_id ? props.location.state.house_id : "";
    const [id, setId] = useState('');
    const [attachment, setAttachment] = useState('');
    const [album_name, setAlbum_name] = useState('group_1');
    const [download, setDownload] = useState('');
    const [docName, setDocName] = useState('');
    const [house_id, setHouse_id] = useState(houseId);
    const [groupname, setGroupname] = useState('');
    // const [groupType, setGroupType] = useState('group_1');
    const [groupTypeOption, setGroupTypeOption] = useState('group_1');
    const [active, setActive] = useState("Home");
      
      
    useEffect(() => {
        if (attachment) {
            console.log("console_album_name",album_name)
            const newFileName =
            generate_random_string(4) +
            attachment.name.split(".").slice(0, -1).join(".");
            
            S3Client.uploadFile(attachment,newFileName)
            .then((data) => {  
                var form = new FormData();
                form.append('id', id);
                form.append('house_id', house_id);
                form.append("attachment", data.location);
                form.append("album_name", album_name);
                props.addGallery(form);
                console.log("dataofimg",form) 
                setAttachment("");
                setGroupTypeOption(album_name);
            })
        }
    }, [attachment]);

    // useEffect(()=> {
    //     // var form = new FormData();
    //     // form.append('id', id);
    //     // form.append('house_id', house_id);
    //     // form.append("album_name", album_name);
    //     props.getGallery({album_name : album_name, house_id: house_id});
    // }, [album_name]);

    useEffect(() => {
    //   if(props.galleries && props.galleries > 0)
    //   {
    //     setGroupTypeOption(props.galleries[0].album_name) 
    //   }
        props.getGallery({ album_name: groupTypeOption, house_id: house_id });
    }, [groupTypeOption])

    const handleDocumentUpload = (event) => {
        setAttachment(event.target.files[0])
        // setAlbum_name(event.target.files[0]['groupType'])
        // setGroupname(event.target.files[0]['name']);
        // setGroupType(groupType);
        // setGroupOption(event.target.value);
    }

    const handleAlbumsChange = (e) => {
        setGroupTypeOption(e.target.value);
        // setGroupTypeOption(props.galleries[0].album_name) 
    }

    const handleDelete = (id,docFile) => {
        const newFileName = docFile.split('/')[4]
        S3Client.deleteFile(newFileName).then((data) => {
            if(data.fileName !== undefined)
            {
                props.deleteGallery({ id: id, house_id: house_id, album_name: groupTypeOption });
            }
            else {
                props.deleteGallery({ id: id, house_id: house_id, album_name: groupTypeOption });
            }
        } )
       }

    const handleDocType = (type) => {
        setActive(type);
        let doc = [];
        if (props.links && props.links.length > 0) {
            for (let i = 0; i < props.links.length; i++) {
                if (props.links[i]["category"] == type) {
                    doc.push(props.links[i]);
                }
            }
        }
    }
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: props.galleries !== undefined && props.galleries.length > 3 ? 3 : props.galleries !== undefined && props.galleries.length,
        slidesToScroll: 3
    };
    const [isOpen, setIsopen] = React.useState(false)
    return (
        <div className="container-fluid loan">
            <div className="list-flex">
                <h4>Gallery</h4>
                <i className="glyphicon glyphicon-info-sign btn-lg info-logo" data-toggle="modal" data-target="#exampleModal" onClick={() => setIsopen(true)}></i>
            </div>
            <div className="contact-form mt-10">
                <div className="row top-bar">
                    <div className="col-md-12">
                        <span className={active === "Home" ? "active-bar mr-50" : "mr-50"} onClick={(e) => handleDocType("Home")}>Home</span>
                        <span className={active === "Personal" ? "active-bar mr-50" : "mr-50"} onClick={(e) => handleDocType("Personal")}>Personal</span>
                        <span className={active === "Other" ? "active-bar mr-50" : "mr-50"} onClick={(e) => handleDocType("Other")}>Other</span>
                    </div>
                </div>
                <div className="row " style={{ marginTop: "2%" }}>
                    <div className="col-md-4">
                        <div className="form-group">
                            <input type="radio" id="group_1" name="groupType" value="group_1" onChange={e => {
                                setAlbum_name(e.target.value)
                                setGroupname("Select");
                            }} checked={album_name == "group_1" ? "checked" : ""} />
                            &nbsp;
                            <label htmlFor="group_1">Group-1</label>
                            &nbsp;&nbsp;
                            <input type="radio" id="group_2" name="groupType" value="group_2" onChange={e => {
                                setGroupname("Select");
                                setAlbum_name(e.target.value)
                            }} checked={album_name == "group_2" ? "checked" : ""} />
                            &nbsp;<label htmlFor="group_2">Group-2</label><br />
                        </div>
                        <div className="form-group">
                            <label htmlFor="attachment">Select Image</label>
                            <label htmlFor="file" className="fileContainer">
                                <div className="attachfile" align="center">
                                    <i>Click here to attach Image</i>
                                    <p>{docName ? docName : ""}</p>
                                  
                                </div>
                                <input type="file" style={{ height: "0px" }} id="file" onChange={(event) => handleDocumentUpload(event)} className="form-control" style={{ "visibility": "hidden" }} accept="audio/*,video/*,image/*" />
                            </label>
                        </div>
                    </div>

                    {/* <div className="col-md-2" style={{marginTop: "2%"}}>
                        <a type="button"  className="btn btn-primary btn-sm addNewItem " href={download ? download : "javascript:void(0)"}><span className="glyphicon glyphicon-download-alt"> </span> Download Attachment</a>
                        <button type="button"  className="btn btn-primary btn-sm addNewItem " onClick={()=>handleDelete(id)}><span className="glyphicon glyphicon-trash"> </span> Delete Attachment </button>
                    </div> */}
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <div className="form-group">
                            <label htmlFor="Albums">Albums</label>
                            <select className="form-control" value={groupTypeOption} onChange={e => handleAlbumsChange(e)} >
                                <option value="" disabled>Select</option>
                                <option value="group_1">Group-1</option>
                                <option value="group_2">Group-2</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-md-8"></div>
                </div>
            </div>

            {/* *Galary Code */}
            <div className="contact-form galary">
                <h4>{groupTypeOption === "group_1" ? "Group 1" : "Group 2"} </h4>
                <div className="row">
                    <Slider {...settings}>
                        {
                            props.galleries !== undefined && props.galleries.map((image) =>
                             {
                                // if(image.album_name === groupTypeOption) {
                                    return (
                                        <div className="col-md-3">
                                            <div className="imageArea">
                                                <img src={image.attachment} id="img-upload" />
                                            </div>
                                            <div className="galaryBody">
                                                <div className="date">{image.uploaded_at}</div>
                                                <div className="deleteImage">
                                                    <span className="glyphicon glyphicon-trash" onClick={(e) => handleDelete(image.id,image.attachment)}></span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                // }
                            }
                            )
                        }
                    </Slider>
                </div>
                {isOpen === true &&
                    <div className="modal" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" den="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel"></h5>
                                    <button type="button" className="close" onClick={() => setIsopen(false)}>
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
            {/* Galary Code Completed */}
        </div>
    )
}


const mapStateToProps = (state) => (
    {
        galleries: state.Gallery.galleries.data
    });

const mapDispatchToProps = {
    addGallery,
    getGallery,
    deleteGallery
}

export default connect(mapStateToProps, mapDispatchToProps)(Galleries);